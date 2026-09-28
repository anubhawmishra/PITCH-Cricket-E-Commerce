const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const JWT_SECRET = process.env.JWT_SECRET || 'pitch_dev_secret_change_in_production';

// In-memory store for dev / test mode when Postgres is offline
const IN_MEMORY_USERS = new Map();

/**
 * Middleware: authenticate JWT token
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (process.env.DATABASE_URL) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: { id: true, email: true, name: true, role: true },
        });

        if (user) {
          req.user = user;
          return next();
        }
      } catch (e) {
        // Fall back to memory below
      }
    }

    // In-memory lookup or decoded token info
    const memUser = Array.from(IN_MEMORY_USERS.values()).find(u => u.id === decoded.userId);
    if (memUser) {
      req.user = { id: memUser.id, name: memUser.name, email: memUser.email, role: memUser.role };
      return next();
    }

    if (decoded.userId) {
      req.user = {
        id: decoded.userId,
        name: decoded.name || 'Pitch Member',
        email: decoded.email || 'member@pitchwillowlab.com',
        role: decoded.role || 'CUSTOMER',
      };
      return next();
    }

    return res.status(401).json({ error: 'User not found' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    next(err);
  }
};

/**
 * Middleware: authenticate but don't require it (for guest-friendly routes)
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (process.env.DATABASE_URL) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: { id: true, email: true, name: true, role: true },
        });
        if (user) {
          req.user = user;
          return next();
        }
      } catch {
        // fallback
      }
    }

    const memUser = Array.from(IN_MEMORY_USERS.values()).find(u => u.id === decoded.userId);
    req.user = memUser ? { id: memUser.id, name: memUser.name, email: memUser.email, role: memUser.role } : null;
    next();
  } catch {
    req.user = null;
    next();
  }
};

/**
 * Middleware: require ADMIN role
 */
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
};

const signToken = (user) => {
  const payload = typeof user === 'string' ? { userId: user } : { userId: user.id, email: user.email, name: user.name, role: user.role };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = { authenticate, optionalAuth, requireAdmin, signToken, IN_MEMORY_USERS };
