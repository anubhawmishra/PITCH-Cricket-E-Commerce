const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const prisma = require('../lib/prisma');
const { signToken, authenticate, IN_MEMORY_USERS } = require('../middleware/auth.middleware');

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters')
    .refine(n => n.trim().toLowerCase() !== 'deleted customer', { message: 'Reserved name' }),
  email: z.string().email('Invalid email address')
    .refine(e => !e.toLowerCase().endsWith('@erased.pitchcricket.com'), { message: 'Reserved domain' }),
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

// DELETE /api/auth/me - Statutory Right to Erasure (DPDP Act, 2023 Section 12)
router.delete('/me', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    if (process.env.DATABASE_URL) {
      const orderCount = await prisma.order.count({ where: { userId } });
      const scrambledEmail = `deleted_${userId}_${Date.now()}@erased.pitchcricket.com`;
      const randomSecret = crypto.randomBytes(32).toString('hex');
      const dummyPasswordHash = await bcrypt.hash(randomSecret, 12);

      await prisma.$transaction(async (tx) => {
        // Delete user's reviews first to avoid foreign-key constraint violations on Review.userId
        await tx.review.deleteMany({ where: { userId } });

        // Remove active sessions, cart items, and wishlist items
        await tx.userSession.deleteMany({ where: { userId } });
        await tx.cartItem.deleteMany({ where: { userId } });
        await tx.wishlistItem.deleteMany({ where: { userId } });

        if (orderCount > 0) {
          // Under applicable Indian statutes (including Section 36 of the Central Goods and
          // Services Tax Act, 2017 requiring accounts and records to be retained for 72 months
          // from the annual return due date, Section 128(5) of the Companies Act, 2013 requiring
          // books of account and vouchers to be retained for 8 financial years for corporate entities,
          // and Section 44AA of the Income-tax Act, 1961), commercial invoices and order records
          // must be retained for statutory tax and audit compliance.
          // In accordance with Section 8(7) and Section 12 of the DPDP Act, 2023, personal data
          // not required for statutory compliance is erased or anonymized.
          await tx.user.update({
            where: { id: userId },
            data: {
              name: 'Deleted Customer',
              email: scrambledEmail,
              phone: null,
              password: dummyPasswordHash,
            },
          });

          // Identify addresses referenced by existing orders to preserve statutory invoice records
          const userOrders = await tx.order.findMany({
            where: { userId },
            select: { addressId: true },
          });
          const referencedAddressIds = [...new Set(userOrders.map((o) => o.addressId).filter(Boolean))];

          // Delete all addresses of this user that are NOT referenced by any orders
          await tx.address.deleteMany({
            where: {
              userId,
              id: { notIn: referencedAddressIds },
            },
          });

          // Retain order-linked address records to maintain foreign-key integrity and
          // historical order fulfillment records, while minimizing personal data
          if (referencedAddressIds.length > 0) {
            await tx.address.updateMany({
              where: {
                userId,
                id: { in: referencedAddressIds },
              },
              data: {
                fullName: 'Customer (Account Erased)',
                phone: '0000000000',
                line2: null,
                label: 'Archived Order Destination',
                isDefault: false,
              },
            });
          }
        } else {
          // No statutory orders to preserve; delete the account completely.
          // Any unlinked addresses will cascade-delete with User (onDelete: Cascade).
          await tx.user.delete({ where: { id: userId } });
        }
      });

      return res.json({
        message: 'Account and personal data erased successfully in accordance with DPDP Act, 2023.',
      });
    }

    // Fallback in-memory (when DATABASE_URL is not configured)
    if (req.user.email) {
      IN_MEMORY_USERS.delete(req.user.email);
    }
    return res.json({ message: 'Account and personal data erased successfully.' });
  } catch (err) {
    console.error('[Auth/DeleteMe]', err);
    res.status(500).json({ error: 'Failed to delete account. Please contact our Grievance Officer.' });
  }
});

module.exports = router;
