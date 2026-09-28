const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { authenticate } = require('../middleware/auth.middleware');
const { PRODUCTS: FALLBACK_PRODUCTS } = require('../data/catalog');

const IN_MEMORY_WISHLISTS = new Map();

router.use(authenticate);

// GET /api/wishlist
router.get('/', async (req, res) => {
  try {
    if (process.env.DATABASE_URL) {
      try {
        const items = await prisma.wishlistItem.findMany({
          where: { userId: req.user.id },
          include: { product: true },
          orderBy: { addedAt: 'desc' },
        });
        if (items) {
          return res.json(items.map(i => ({ ...i, product: formatPrices(i.product) })));
        }
      } catch (dbErr) {
        // Fall back below
      }
    }

    const userWishlist = IN_MEMORY_WISHLISTS.get(req.user.id) || [];
    res.json(userWishlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// POST /api/wishlist
router.post('/', async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId required' });

    let product = null;
    if (process.env.DATABASE_URL) {
      try {
        product = await prisma.product.findUnique({ where: { id: productId } });
      } catch {}
    }

    if (!product) {
      product = FALLBACK_PRODUCTS.find(p => p.id === productId || p.slug === productId);
    }

    if (!product) return res.status(404).json({ error: 'Product not found' });

    const userWishlist = IN_MEMORY_WISHLISTS.get(req.user.id) || [];
    const exists = userWishlist.some(i => i.productId === product.id);
    if (exists) return res.status(409).json({ error: 'Already in wishlist' });

    const wishItem = {
      id: 'wish_' + Date.now(),
      userId: req.user.id,
      productId: product.id,
      product: formatPrices(product),
      addedAt: new Date().toISOString(),
    };

    userWishlist.push(wishItem);
    IN_MEMORY_WISHLISTS.set(req.user.id, userWishlist);

    res.status(201).json(wishItem);
  } catch (err) {
    console.error('[Wishlist/Add]', err);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

// DELETE /api/wishlist/:productId
router.delete('/:productId', async (req, res) => {
  try {
    const userWishlist = IN_MEMORY_WISHLISTS.get(req.user.id) || [];
    const updated = userWishlist.filter(i => i.productId !== req.params.productId && i.id !== req.params.productId);
    IN_MEMORY_WISHLISTS.set(req.user.id, updated);
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

function formatPrices(p) {
  return { ...p, price: Math.round(p.price / 100), originalPrice: p.originalPrice ? Math.round(p.originalPrice / 100) : null };
}

module.exports = router;
