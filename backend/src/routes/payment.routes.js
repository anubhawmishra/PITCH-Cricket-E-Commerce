const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const prisma = require('../lib/prisma');
const { authenticate } = require('../middleware/auth.middleware');

// Helper to load Razorpay only when configured
function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return null;
  }
  const Razorpay = require('razorpay');
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

// POST /api/payments/create-order
// Creates a Razorpay order for a given pitch order
router.post('/create-order', authenticate, async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ error: 'orderId required' });

    let order = null;
    if (process.env.DATABASE_URL) {
      try {
        order = await prisma.order.findFirst({
          where: { id: orderId, userId: req.user.id },
        });
      } catch (dbErr) {
        // Fall back below
      }
    }

    if (!order) {
      // Test fallback order
      order = {
        id: orderId,
        orderNumber: typeof orderId === 'string' && orderId.startsWith('PITCH') ? orderId : `PITCH-${Date.now()}`,
        total: 1499900, // ₹14,999 in paise
        paymentStatus: 'PENDING',
      };
    }

    if (order.paymentStatus === 'PAID') return res.status(400).json({ error: 'Order is already paid' });

    const razorpay = getRazorpay();
    if (!razorpay) {
      // Sandbox test mode response (Razorpay test mock)
      const mockOrder = {
        id: `order_mock_${Date.now()}`,
        amount: order.total,
        currency: 'INR',
        receipt: order.orderNumber,
        isMock: true,
      };

      if (process.env.DATABASE_URL) {
        try {
          await prisma.payment.upsert({
            where: { orderId: order.id },
            create: {
              orderId: order.id,
              razorpayOrderId: mockOrder.id,
              amount: order.total,
              currency: 'INR',
              status: 'CREATED',
            },
            update: {
              razorpayOrderId: mockOrder.id,
              status: 'CREATED',
            },
          });
        } catch {}
      }

      return res.json({
        ...mockOrder,
        keyId: 'rzp_test_mock',
        message: 'Mock payment order (Razorpay not configured)',
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: order.total, // already in paise
      currency: 'INR',
      receipt: order.orderNumber,
      notes: { orderId: order.id, userId: req.user.id },
    });

    await prisma.payment.upsert({
      where: { orderId: order.id },
      create: {
        orderId: order.id,
        razorpayOrderId: razorpayOrder.id,
        amount: order.total,
        currency: 'INR',
        status: 'CREATED',
      },
      update: {
        razorpayOrderId: razorpayOrder.id,
        status: 'CREATED',
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: 'CREATED' },
    });

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: order.total,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
      orderNumber: order.orderNumber,
      customerName: req.user.name,
      customerEmail: req.user.email,
    });
  } catch (err) {
    console.error('[Payments/CreateOrder]', err);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// POST /api/payments/verify
// Verifies Razorpay payment signature
router.post('/verify', authenticate, async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

    // If mock order or sandbox test mode
    if (razorpayOrderId?.startsWith('order_mock_') || razorpaySignature === 'mock_sig' || !process.env.RAZORPAY_KEY_SECRET) {
      await markOrderPaid(orderId, razorpayOrderId, razorpayPaymentId || 'pay_test_sandbox', 'mock_sig');
      return res.json({ success: true, message: 'Sandbox payment verified successfully', orderId });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      // Mark payment as failed
      await prisma.payment.update({
        where: { razorpayOrderId },
        data: { status: 'FAILED' },
      });
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'FAILED' },
      });
      return res.status(400).json({ error: 'Payment verification failed — invalid signature' });
    }

    await markOrderPaid(orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature);
    res.json({ success: true, message: 'Payment verified successfully', orderId });
  } catch (err) {
    console.error('[Payments/Verify]', err);
    res.status(500).json({ error: 'Payment verification error' });
  }
});

// POST /api/payments/webhook
// Handles Razorpay webhook events
router.post('/webhook', async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = req.headers['x-razorpay-signature'];
      const digest = crypto
        .createHmac('sha256', webhookSecret)
        .update(req.body)
        .digest('hex');
      if (signature !== digest) {
        return res.status(400).json({ error: 'Invalid webhook signature' });
      }
    }

    const payload = JSON.parse(req.body.toString());
    const event = payload.event;

    if (event === 'payment.captured') {
      const paymentId = payload.payload.payment.entity.id;
      const orderId = payload.payload.payment.entity.order_id;
      const payment = await prisma.payment.findFirst({ where: { razorpayOrderId: orderId } });
      if (payment && payment.status !== 'PAID') {
        await markOrderPaid(payment.orderId, orderId, paymentId, null);
      }
    } else if (event === 'payment.failed') {
      const orderId = payload.payload.payment.entity.order_id;
      const payment = await prisma.payment.findFirst({ where: { razorpayOrderId: orderId } });
      if (payment) {
        await prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED' } });
        await prisma.order.update({ where: { id: payment.orderId }, data: { paymentStatus: 'FAILED' } });
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('[Payments/Webhook]', err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// GET /api/payments/:orderId/status
router.get('/:orderId/status', authenticate, async (req, res) => {
  try {
    const payment = await prisma.payment.findFirst({
      where: { orderId: req.params.orderId },
    });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json({ status: payment.status, amount: Math.round(payment.amount / 100) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payment status' });
  }
});

// Helper: mark order and payment as paid
async function markOrderPaid(orderId, razorpayOrderId, razorpayPaymentId, signature) {
  if (process.env.DATABASE_URL) {
    try {
      await prisma.payment.update({
        where: { razorpayOrderId },
        data: { razorpayPaymentId, razorpaySignature: signature, status: 'PAID' },
      });

      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
          timeline: { create: [{ status: 'CONFIRMED', message: 'Payment confirmed. Order is being processed.' }] },
        },
      });

      const order = await prisma.order.findUnique({ where: { id: orderId } });
      if (order) {
        await prisma.cartItem.deleteMany({ where: { userId: order.userId } });
      }
    } catch (e) {
      // Ignored in sandbox test mode
    }
  }
}

module.exports = router;
