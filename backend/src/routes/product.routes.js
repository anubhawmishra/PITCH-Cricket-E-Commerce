const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { optionalAuth } = require('../middleware/auth.middleware');
const { PRODUCTS: FALLBACK_PRODUCTS } = require('../data/catalog');

// Helper to check if DB is reachable
async function isDbConnected() {
  if (!process.env.DATABASE_URL) return false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

// GET /api/products — list with filters
router.get('/', async (req, res) => {
  try {
    const {
      category, brand, minPrice, maxPrice, rating,
      sort = 'featured', featured, bestseller, newArrival,
      search, page = 1, limit = 40,
    } = req.query;

    const dbUp = await isDbConnected();

    if (dbUp) {
      const where = { active: true };

      if (category && category !== 'all') where.category = category;
      if (brand && brand !== 'all') where.brand = brand;
      if (featured === 'true') where.featured = true;
      if (bestseller === 'true') where.bestseller = true;
      if (newArrival === 'true') where.newArrival = true;
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseInt(minPrice) * 100;
        if (maxPrice) where.price.lte = parseInt(maxPrice) * 100;
      }
      if (rating) where.rating = { gte: parseFloat(rating) };
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }

      const orderBy = {};
      if (sort === 'price-low') orderBy.price = 'asc';
      else if (sort === 'price-high') orderBy.price = 'desc';
      else if (sort === 'rating') orderBy.rating = 'desc';
      else if (sort === 'newest') orderBy.createdAt = 'desc';
      else if (sort === 'popular') orderBy.reviewCount = 'desc';
      else { orderBy.featured = 'desc'; }

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const [products, total] = await Promise.all([
        prisma.product.findMany({ where, orderBy, skip, take: parseInt(limit) }),
        prisma.product.count({ where }),
      ]);

      if (total > 0) {
        return res.json({
          products: products.map(formatProduct),
          pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
        });
      }
    }

    // In-memory fallback
    let filtered = [...FALLBACK_PRODUCTS].filter(p => p.active !== false);

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    if (brand && brand !== 'all') {
      filtered = filtered.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (featured === 'true') {
      filtered = filtered.filter(p => p.featured);
    }
    if (bestseller === 'true') {
      filtered = filtered.filter(p => p.bestseller);
    }
    if (newArrival === 'true') {
      filtered = filtered.filter(p => p.newArrival);
    }
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(minPrice) * 100);
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(maxPrice) * 100);
    }
    if (rating) {
      filtered = filtered.filter(p => (p.rating || 0) >= parseFloat(rating));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sort === 'popular') filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));

    const total = filtered.length;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginated = filtered.slice(skip, skip + parseInt(limit));

    res.json({
      products: paginated.map(formatProduct),
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
      source: dbUp ? 'database' : 'catalog_cache',
    });
  } catch (err) {
    console.error('[Products/List]', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/categories
router.get('/categories', async (req, res) => {
  try {
    const dbUp = await isDbConnected();
    if (dbUp) {
      const cats = await prisma.product.groupBy({
        by: ['category'],
        where: { active: true },
        _count: { id: true },
      });
      if (cats.length > 0) {
        return res.json(cats.map(c => ({ id: c.category, label: formatCategoryLabel(c.category), count: c._count.id })));
      }
    }

    const catCounts = {};
    FALLBACK_PRODUCTS.forEach(p => {
      catCounts[p.category] = (catCounts[p.category] || 0) + 1;
    });

    const result = Object.entries(catCounts).map(([cat, count]) => ({
      id: cat,
      label: formatCategoryLabel(cat),
      count,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/products/brands
router.get('/brands', async (req, res) => {
  try {
    const dbUp = await isDbConnected();
    if (dbUp) {
      const brands = await prisma.product.groupBy({
        by: ['brand'],
        where: { active: true },
        _count: { id: true },
      });
      if (brands.length > 0) {
        return res.json(brands.map(b => ({ name: b.brand, count: b._count.id })));
      }
    }

    const brandCounts = {};
    FALLBACK_PRODUCTS.forEach(p => {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    });

    res.json(Object.entries(brandCounts).map(([name, count]) => ({ name, count })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
});

// POST /api/products/compare
router.post('/compare', async (req, res) => {
  try {
    const { productIds } = req.body;
    if (!Array.isArray(productIds) || productIds.length < 2 || productIds.length > 4) {
      return res.status(400).json({ error: 'Provide 2–4 product IDs to compare' });
    }

    const dbUp = await isDbConnected();
    if (dbUp) {
      const products = await prisma.product.findMany({
        where: { id: { in: productIds }, active: true },
      });
      if (products.length > 0) {
        return res.json(products.map(formatProduct));
      }
    }

    const matched = FALLBACK_PRODUCTS.filter(p => productIds.includes(p.id) || productIds.includes(p.slug));
    res.json(matched.map(formatProduct));
  } catch (err) {
    console.error('[Products/Compare]', err);
    res.status(500).json({ error: 'Failed to compare products' });
  }
});

// GET /api/products/:id
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const dbUp = await isDbConnected();
    if (dbUp) {
      const product = await prisma.product.findFirst({
        where: { OR: [{ id: req.params.id }, { slug: req.params.id }], active: true },
        include: {
          reviews: {
            include: { user: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      });

      if (product) {
        const related = await prisma.product.findMany({
          where: { category: product.category, active: true, NOT: { id: product.id } },
          take: 4,
        });

        return res.json({ ...formatProduct(product), related: related.map(formatProduct) });
      }
    }

    const product = FALLBACK_PRODUCTS.find(p => p.id === req.params.id || p.slug === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const related = FALLBACK_PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
      .map(formatProduct);

    res.json({ ...formatProduct(product), related });
  } catch (err) {
    console.error('[Products/Detail]', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

function formatProduct(p) {
  return {
    ...p,
    price: Math.round(p.price / 100),
    originalPrice: p.originalPrice ? Math.round(p.originalPrice / 100) : null,
    discount: p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0,
  };
}

function formatCategoryLabel(cat) {
  const labels = {
    bats: 'Cricket Bats',
    balls: 'Cricket Balls',
    batting: 'Batting Gear',
    helmets: 'Helmets',
    wicketkeeping: 'Wicketkeeping',
    bags: 'Cricket Bags',
    clothing: 'Cricket Clothing',
    footwear: 'Cricket Footwear',
    training: 'Training Equipment',
    accessories: 'Accessories',
    protection: 'Protection Equipment',
  };
  return labels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
}

module.exports = router;
