/**
 * Frontend API service layer
 * All backend calls go through here — never expose secrets to frontend
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ─── Token management ────────────────────────────────────────────────────────
export const getToken = () => localStorage.getItem('pitch_token');
export const setToken = (t) => localStorage.setItem('pitch_token', t);
export const clearToken = () => localStorage.removeItem('pitch_token');

// ─── Base fetch wrapper ──────────────────────────────────────────────────────
async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearToken();
    // Dispatch event so AuthContext can react
    window.dispatchEvent(new CustomEvent('pitch:unauthorized'));
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || 'Request failed'), { status: res.status, data });
  return data;
}

const get = (path) => request(path);
const post = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) });
const patch = (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) });
const del = (path) => request(path, { method: 'DELETE' });

// ─── Health ──────────────────────────────────────────────────────────────────
export const health = () => get('/health');

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (data) => post('/auth/register', data),
  login: (email, password) => post('/auth/login', { email, password }),
  me: () => get('/auth/me'),
  updateProfile: (data) => patch('/auth/me', data),
  changePassword: (data) => post('/auth/change-password', data),
  addAddress: (data) => post('/auth/addresses', data),
};

// ─── Products ────────────────────────────────────────────────────────────────
export const productsApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')).toString();
    return get(`/products${query ? `?${query}` : ''}`);
  },
  get: (id) => get(`/products/${id}`),
  categories: () => get('/products/categories'),
  brands: () => get('/products/brands'),
  compare: (ids) => post('/products/compare', { productIds: ids }),
};

// ─── Cart ────────────────────────────────────────────────────────────────────
export const cartApi = {
  get: () => get('/cart'),
  add: (productId, quantity, options) => post('/cart', { productId, quantity, options }),
  update: (itemId, quantity) => patch(`/cart/${itemId}`, { quantity }),
  remove: (itemId) => del(`/cart/${itemId}`),
  clear: () => del('/cart'),
  sync: (items) => post('/cart/sync', { items }),
};

// ─── Wishlist ────────────────────────────────────────────────────────────────
export const wishlistApi = {
  get: () => get('/wishlist'),
  add: (productId) => post('/wishlist', { productId }),
  remove: (productId) => del(`/wishlist/${productId}`),
};

// ─── Orders ──────────────────────────────────────────────────────────────────
export const ordersApi = {
  create: (data) => post('/orders', data),
  list: () => get('/orders'),
  get: (id) => get(`/orders/${id}`),
  cancel: (id) => post(`/orders/${id}/cancel`),
  track: (orderNumber) => get(`/orders/track/${orderNumber}`),
};

// ─── Payments ────────────────────────────────────────────────────────────────
export const paymentsApi = {
  createOrder: (orderId) => post('/payments/create-order', { orderId }),
  verify: (data) => post('/payments/verify', data),
  status: (orderId) => get(`/payments/${orderId}/status`),
};

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const reviewsApi = {
  list: (productId) => get(`/reviews/product/${productId}`),
  add: (productId, data) => post(`/reviews/product/${productId}`, data),
};

// ─── FRIDAY AI ───────────────────────────────────────────────────────────────
export const fridayApi = {
  chat: (message, context) => post('/friday/chat', { message, context }),
  status: () => get('/friday/status'),
};

// ─── Is backend reachable? ───────────────────────────────────────────────────
export const checkBackendAvailable = async () => {
  try {
    const result = await health();
    return { available: true, data: result };
  } catch {
    return { available: false };
  }
};
