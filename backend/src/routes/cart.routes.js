const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { authenticate } = require('../middleware/auth.middleware');
const { PRODUCTS: FALLBACK_PRODUCTS } = require('../data/catalog');

// In-memory fallback cart store for dev / test mode
const IN_MEMORY_CARTS = new Map();

router.use(authenticate);

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    if (process.env.DATABASE_URL) {
      try {
        const items = await prisma.cartItem.findMany({
          where: { userId: req.user.id },
          include: { product: true },
          orderBy: { createdAt: 'asc' },
        });
        if (items) {
          return res.json(items.map(item => ({
            ...item,
            product: formatPrices(item.product),
            unitPrice: Math.round(item.unitPrice / 100),
          })));
        }
      } catch (dbErr) {
        // Fall back below
      }
    }

    const userCart = IN_MEMORY_CARTS.get(req.user.id) || [];
    res.json(userCart);
  } catch (err) {
    console.error('[Cart/Get]', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart — add or update item
router.post('/', async (req, res) => {
  try {
    const { productId, quantity = 1, options = {} } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId is required' });

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
    if (product.stock < 1) return res.status(400).json({ error: 'Product is out of stock' });

    const extraCost = ((options.knockIn ? 80000 : 0) + (options.oiling ? 30000 : 0) + (options.engraving ? 50000 : 0));
    const unitPrice = product.price + extraCost;

    if (process.env.DATABASE_URL) {
      try {
        const existing = await prisma.cartItem.findFirst({
          where: { userId: req.user.id, productId: product.id },
        });

        let item;
        if (existing) {
          item = await prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + quantity, options, unitPrice },
            include: { product: true },
          });
        } else {
          item = await prisma.cartItem.create({
            data: { userId: req.user.id, productId: product.id, quantity, options, unitPrice },
            include: { product: true },
          });
        }

        return res.status(201).json({ ...item, unitPrice: Math.round(item.unitPrice / 100), product: formatPrices(item.product) });
      } catch (dbErr) {
        // Fall back below
      }
    }

    // In-memory fallback
    const userCart = IN_MEMORY_CARTS.get(req.user.id) || [];
    const existingIndex = userCart.findIndex(item => item.productId === product.id);

    let cartItem;
    if (existingIndex > -1) {
      userCart[existingIndex].quantity += quantity;
      userCart[existingIndex].options = options;
      cartItem = userCart[existingIndex];
    } else {
      cartItem = {
        id: 'cart_' + Date.now(),
        userId: req.user.id,
        productId: product.id,
        quantity,
        options,
        unitPrice: Math.round(unitPrice / 100),
        product: formatPrices(product),
      };
      userCart.push(cartItem);
    }

    IN_MEMORY_CARTS.set(req.user.id, userCart);
    res.status(201).json(cartItem);
  } catch (err) {
    console.error('[Cart/Add]', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// PATCH /api/cart/:itemId
router.patch('/:itemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const userCart = IN_MEMORY_CARTS.get(req.user.id) || [];
    const idx = userCart.findIndex(i => i.id === req.params.itemId || i.productId === req.params.itemId);

    if (idx > -1) {
      if (quantity <= 0) {
        userCart.splice(idx, 1);
        return res.json({ message: 'Item removed from cart' });
      }
      userCart[idx].quantity = quantity;
      return res.json(userCart[idx]);
    }

    res.json({ message: 'Cart updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// DELETE /api/cart/:itemId
router.delete('/:itemId', async (req, res) => {
  try {
    const userCart = IN_MEMORY_CARTS.get(req.user.id) || [];
    const updated = userCart.filter(i => i.id !== req.params.itemId && i.productId !== req.params.itemId);
    IN_MEMORY_CARTS.set(req.user.id, updated);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
});

// DELETE /api/cart
router.delete('/', async (req, res) => {
  IN_MEMORY_CARTS.set(req.user.id, []);
  res.json({ message: 'Cart cleared' });
});

// POST /api/cart/sync
router.post('/sync', async (req, res) => {
  const { items = [] } = req.body;
  const userCart = IN_MEMORY_CARTS.get(req.user.id) || [];
  for (const item of items) {
    const p = FALLBACK_PRODUCTS.find(prod => prod.id === item.productId || prod.slug === item.productId);
    if (p) {
      userCart.push({
        id: 'cart_' + Date.now() + Math.random(),
        userId: req.user.id,
        productId: p.id,
        quantity: item.quantity || 1,
        options: item.options || {},
        unitPrice: Math.round(p.price / 100),
        product: formatPrices(p),
      });
    }
  }
  IN_MEMORY_CARTS.set(req.user.id, userCart);
  res.json(userCart);
});

function formatPrices(p) {
  return { ...p, price: Math.round(p.price / 100), originalPrice: p.originalPrice ? Math.round(p.originalPrice / 100) : null };
}

module.exports = router;
