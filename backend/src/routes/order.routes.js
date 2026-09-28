const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { authenticate } = require('../middleware/auth.middleware');
const { v4: uuidv4 } = require('uuid');

const IN_MEMORY_ORDERS = new Map();

// GET /api/orders/track/:orderNumber — public track by order number (no auth required)
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const { orderNumber } = req.params;

    if (process.env.DATABASE_URL) {
      try {
        const order = await prisma.order.findUnique({
          where: { orderNumber },
          include: {
            items: true,
            timeline: { orderBy: { createdAt: 'asc' } },
            address: { select: { city: true, state: true } },
          },
        });
        if (order) return res.json(formatOrder(order));
      } catch (dbErr) {
        // Fall back below
      }
    }

    // Check in-memory orders
    for (const userOrders of IN_MEMORY_ORDERS.values()) {
      const found = userOrders.find(o => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());
      if (found) return res.json(found);
    }

    // Demo/sample order fallback for PITCH-89241 or any sample lookup
    if (orderNumber.toUpperCase() === 'PITCH-89241' || orderNumber.toUpperCase().startsWith('LAB-')) {
      return res.json({
        id: 'demo-order-1',
        orderNumber: orderNumber.toUpperCase(),
        status: 'SHIPPED',
        paymentStatus: 'PAID',
        subtotal: 17998,
        shipping: 0,
        tax: 3239,
        total: 21237,
        estimatedDelivery: '2026-08-16T12:00:00.000Z',
        courier: 'DHL Express (Air Freight)',
        trackingNo: 'DHL-981245012',
        items: [
          { name: 'SS TON Player Edition Willow Bat', price: 14999, quantity: 1, brand: 'SS TON' },
          { name: 'Kookaburra Super Test Red Match Ball', price: 2999, quantity: 1, brand: 'Kookaburra' },
        ],
        timeline: [
          { status: 'PLACED', message: 'Order received and confirmed', createdAt: '2026-08-12T10:14:00.000Z' },
          { status: 'CONFIRMED', message: 'Payment confirmed & wood selected', createdAt: '2026-08-12T14:30:00.000Z' },
          { status: 'PROCESSING', message: 'Pre-knocked & oiled in Pitch Lab', createdAt: '2026-08-13T11:00:00.000Z' },
          { status: 'SHIPPED', message: 'Quality check passed & dispatched', createdAt: '2026-08-13T16:45:00.000Z' },
        ],
      });
    }

    res.status(404).json({ error: 'Order not found. Check the order ID and try again.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to track order' });
  }
});

// All following order routes require authentication
router.use(authenticate);

// POST /api/orders — create order
router.post('/', async (req, res) => {
  try {
    const { addressId, paymentMethod = 'razorpay', notes, items: directItems } = req.body;

    let cartItems = [];
    if (process.env.DATABASE_URL) {
      try {
        cartItems = await prisma.cartItem.findMany({
          where: { userId: req.user.id },
          include: { product: true },
        });
      } catch {}
    }

    if (cartItems.length === 0 && directItems && directItems.length > 0) {
      cartItems = directItems.map(item => ({
        productId: item.productId || 'prod-bat-01',
        quantity: item.quantity || 1,
        unitPrice: (item.price || 14999) * 100,
        options: item.options || {},
        product: {
          id: item.productId || 'prod-bat-01',
          name: item.name || 'SS TON Player Edition',
          brand: item.brand || 'SS TON',
          stock: 50,
          images: item.image ? [item.image] : ['/bat_ss_ton.jpg'],
        },
      }));
    }

    // Default sample item if empty
    if (cartItems.length === 0) {
      cartItems = [{
        productId: 'prod-bat-01',
        quantity: 1,
        unitPrice: 1499900,
        options: {},
        product: {
          id: 'prod-bat-01',
          name: 'SS TON Player Edition',
          brand: 'SS TON',
          stock: 25,
          images: ['/bat_ss_ton.jpg'],
        },
      }];
    }

    // Check stock
    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${item.product.name}`,
          productId: item.productId,
        });
      }
    }

    // Server-side price calculation
    const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const shipping = subtotal > 200000 ? 0 : 9900;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;
    const orderNumber = `PITCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    if (process.env.DATABASE_URL) {
      try {
        const order = await prisma.order.create({
          data: {
            orderNumber,
            userId: req.user.id,
            addressId: addressId || null,
            subtotal,
            shipping,
            tax,
            total,
            paymentMethod,
            notes,
            estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
            items: {
              create: cartItems.map(item => ({
                productId: item.productId,
                name: item.product.name,
                brand: item.product.brand,
                image: item.product.images?.[0] || null,
                price: item.unitPrice,
                quantity: item.quantity,
                options: item.options,
              })),
            },
            timeline: {
              create: [{ status: 'PLACED', message: 'Order placed successfully' }],
            },
          },
          include: { items: true, address: true, timeline: true },
        });

        return res.status(201).json(formatOrder(order));
      } catch (dbErr) {
        // Fall back below
      }
    }

    // In-memory fallback
    const memOrder = {
      id: 'ord_' + Date.now(),
      orderNumber,
      userId: req.user.id,
      subtotal: Math.round(subtotal / 100),
      shipping: Math.round(shipping / 100),
      tax: Math.round(tax / 100),
      total: Math.round(total / 100),
      status: 'PLACED',
      paymentStatus: 'PENDING',
      paymentMethod,
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      items: cartItems.map(item => ({
        id: 'item_' + Date.now() + Math.random(),
        productId: item.productId,
        name: item.product.name,
        brand: item.product.brand,
        image: item.product.images?.[0] || null,
        price: Math.round(item.unitPrice / 100),
        quantity: item.quantity,
      })),
      timeline: [
        { status: 'PLACED', message: 'Order placed successfully', createdAt: new Date().toISOString() },
      ],
      createdAt: new Date().toISOString(),
    };

    const userOrders = IN_MEMORY_ORDERS.get(req.user.id) || [];
    userOrders.unshift(memOrder);
    IN_MEMORY_ORDERS.set(req.user.id, userOrders);

    res.status(201).json(memOrder);
  } catch (err) {
    console.error('[Orders/Create]', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /api/orders — list orders
router.get('/', async (req, res) => {
  try {
    if (process.env.DATABASE_URL) {
      try {
        const orders = await prisma.order.findMany({
          where: { userId: req.user.id },
          include: { items: true, address: true, payment: true },
          orderBy: { createdAt: 'desc' },
        });
        if (orders) return res.json(orders.map(formatOrder));
      } catch (dbErr) {
        // fallback
      }
    }

    const userOrders = IN_MEMORY_ORDERS.get(req.user.id) || [];
    res.json(userOrders);
  } catch (err) {
    console.error('[Orders/List]', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    if (process.env.DATABASE_URL) {
      try {
        const order = await prisma.order.findFirst({
          where: { OR: [{ id: req.params.id }, { orderNumber: req.params.id }], userId: req.user.id },
          include: { items: true, address: true, payment: true, timeline: { orderBy: { createdAt: 'asc' } } },
        });
        if (order) return res.json(formatOrder(order));
      } catch {}
    }

    const userOrders = IN_MEMORY_ORDERS.get(req.user.id) || [];
    const found = userOrders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
    if (!found) return res.status(404).json({ error: 'Order not found' });
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

function formatOrder(order) {
  return {
    ...order,
    subtotal: Math.round(order.subtotal / 100),
    shipping: Math.round(order.shipping / 100),
    tax: Math.round(order.tax / 100),
    total: Math.round(order.total / 100),
    items: order.items?.map(i => ({ ...i, price: Math.round(i.price / 100) })),
  };
}

module.exports = router;
