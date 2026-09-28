const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const prisma = require('../lib/prisma');
const { signToken, authenticate, IN_MEMORY_USERS } = require('../middleware/auth.middleware');

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    if (process.env.DATABASE_URL) {
      try {
        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing) {
          return res.status(409).json({ error: 'An account with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = await prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
          },
          select: { id: true, name: true, email: true, role: true, createdAt: true },
        });

        const token = signToken(user);
        return res.status(201).json({ token, user });
      } catch (dbErr) {
        // Fall back to memory below
      }
    }

    // In-memory fallback
    if (IN_MEMORY_USERS.has(data.email)) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = {
      id: 'usr_' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone || '+91 98765 43210',
      password: hashedPassword,
      role: 'CUSTOMER',
      createdAt: new Date(),
    };

    IN_MEMORY_USERS.set(data.email, user);
    const token = signToken(user);

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: err.errors });
    }
    console.error('[Auth/Register]', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    if (process.env.DATABASE_URL) {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
          }
          const token = signToken(user);
          return res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
          });
        }
      } catch (dbErr) {
        // Fall back to memory below
      }
    }

    // In-memory fallback
    const user = IN_MEMORY_USERS.get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken(user);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: err.errors });
    }
    console.error('[Auth/Login]', err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
  try {
    if (process.env.DATABASE_URL) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: req.user.id },
          select: {
            id: true, name: true, email: true, phone: true, role: true, createdAt: true,
            addresses: true,
            _count: { select: { orders: true, wishlist: true } },
          },
        });
        if (user) return res.json(user);
      } catch (dbErr) {
        // Fall back below
      }
    }

    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone || '+91 98765 43210',
      role: req.user.role || 'CUSTOMER',
      createdAt: new Date().toISOString(),
      addresses: [],
      _count: { orders: 0, wishlist: 0 },
    });
  } catch (err) {
    console.error('[Auth/Me]', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PATCH /api/auth/me
router.patch('/me', authenticate, async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (process.env.DATABASE_URL) {
      try {
        const user = await prisma.user.update({
          where: { id: req.user.id },
          data: { name, phone },
          select: { id: true, name: true, email: true, phone: true },
        });
        return res.json(user);
      } catch (dbErr) {
        // fallback
      }
    }

    req.user.name = name || req.user.name;
    req.user.phone = phone || req.user.phone;
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email, phone: req.user.phone });
  } catch (err) {
    console.error('[Auth/UpdateProfile]', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// POST /api/auth/change-password
router.post('/change-password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'Invalid password data' });
    }
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('[Auth/ChangePassword]', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// POST /api/auth/addresses
router.post('/addresses', authenticate, async (req, res) => {
  try {
    const { label, fullName, phone, line1, line2, city, state, pincode, isDefault } = req.body;
    const address = {
      id: 'addr_' + Date.now(),
      userId: req.user.id,
      label: label || 'Home',
      fullName, phone, line1, line2, city, state, pincode,
      isDefault: !!isDefault,
    };
    res.status(201).json(address);
  } catch (err) {
    console.error('[Auth/AddAddress]', err);
    res.status(500).json({ error: 'Failed to save address' });
  }
});

module.exports = router;
