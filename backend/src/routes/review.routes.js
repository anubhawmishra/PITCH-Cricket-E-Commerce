const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { authenticate, optionalAuth } = require('../middleware/auth.middleware');

// GET /api/products/:id/reviews (via review router)
// Actually mounted at /api/reviews/:productId
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: req.params.productId },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
    res.json({ reviews, average: Math.round(avg * 10) / 10, count: reviews.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews/:productId
router.post('/product/:productId', authenticate, async (req, res) => {
  try {
    const { rating, title, body } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check if user has purchased this product
    const purchase = await prisma.orderItem.findFirst({
      where: {
        productId: req.params.productId,
        order: { userId: req.user.id, paymentStatus: 'PAID' },
      },
    });

    const review = await prisma.review.upsert({
      where: { userId_productId: { userId: req.user.id, productId: req.params.productId } },
      create: {
        productId: req.params.productId,
        userId: req.user.id,
        rating: parseInt(rating),
        title,
        body,
        verifiedPurchase: !!purchase,
      },
      update: {
        rating: parseInt(rating),
        title,
        body,
      },
      include: { user: { select: { name: true } } },
    });

    // Update product rating
    const allReviews = await prisma.review.findMany({ where: { productId: req.params.productId } });
    const avg = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
    await prisma.product.update({
      where: { id: req.params.productId },
      data: { rating: Math.round(avg * 10) / 10, reviewCount: allReviews.length },
    });

    res.status(201).json(review);
  } catch (err) {
    console.error('[Reviews/Add]', err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

module.exports = router;
