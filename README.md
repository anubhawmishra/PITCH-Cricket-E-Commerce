# PITCH™ — Full-Stack AI Cricket E-Commerce Platform

> **Designed & Developed by Anubhaw Mishra**<br />
> A premium full-stack cricket equipment marketplace powered by React, Node.js, PostgreSQL, and AI.<br />
> 🌐 **Live Store:** [https://pitch-cricket-store.vercel.app/](https://pitch-cricket-store.vercel.app/)

---

## 🏏 Overview

PITCH™ is a production-quality full-stack cricket e-commerce platform featuring:

- **Premium UI** — Cinematic hero, 3D product views, smooth animations, glassmorphism
- **Real e-commerce** — Cart, wishlist, checkout, orders, payments
- **AI Shopping Assistant** — FRIDAY, powered by Google Gemini
- **Product Comparison** — Side-by-side comparison of up to 4 products
- **Authentication** — JWT-based login/register with bcrypt hashing
- **Payments** — Razorpay integration (test mode)
- **Database** — PostgreSQL via Prisma ORM
- **Custom Bat Builder** — Interactive 5-step bat customization tool

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 8, Tailwind CSS 4 |
| State | Context API (Cart, Store, Auth, Comparison) |
| Backend | Node.js 20, Express.js |
| Database | PostgreSQL (Neon Serverless) |
| ORM | Prisma |
| Auth | JWT + bcrypt |
| AI | Google Gemini 1.5 Flash (via backend) |
| Payments | Razorpay Test Mode |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 📁 Folder Structure

```
Pitch-main/
├── src/                    ← Frontend (React/Vite)
│   ├── components/
│   │   ├── layout/         ← Header, Footer, Cursor, Grain
│   │   ├── modals/         ← Cart, Checkout, Auth, Search, Product Detail
│   │   ├── friday/         ← FRIDAY AI chat widget
│   │   ├── comparison/     ← Product comparison panel
│   │   └── common/         ← Toast, Marquee, etc.
│   ├── context/            ← CartContext, StoreContext, AuthContext, ComparisonContext
│   ├── pages/              ← All pages
│   ├── services/           ← api.js (all backend calls)
│   └── data/               ← Local product data (frontend fallback)
├── backend/                ← Node.js/Express backend
│   ├── server.js           ← Main entry point
│   ├── src/
│   │   ├── routes/         ← auth, products, cart, wishlist, orders, payments, reviews, friday
│   │   ├── middleware/     ← auth.middleware.js
│   │   └── lib/            ← prisma.js singleton
│   ├── prisma/
│   │   ├── schema.prisma   ← Database schema
│   │   └── seed.js         ← Database seeder (25+ products)
│   └── .env.example        ← Environment variable template
├── public/                 ← Static assets
├── .env.example            ← Frontend env template
├── .gitignore
└── vercel.json             ← Vercel deployment config
```

---

## 🚀 Local Development Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ (local or Docker)
- npm

---

### 1. Frontend Setup

```bash
# From project root
npm install
cp .env.example .env.local
# Edit .env.local: set VITE_API_BASE_URL=http://localhost:5000/api
npm run dev
```

Frontend runs at: http://localhost:5173

---

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values (see Environment Variables section below)
```

---

### 3. PostgreSQL Setup

**Option A — Local PostgreSQL:**
```bash
# Create database
createdb pitch_cricket

# Or via psql
psql -c "CREATE DATABASE pitch_cricket;"
```

**Option B — Docker:**
```bash
docker run -d --name pitch-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=pitch_cricket \
  -p 5432:5432 postgres:15
```

---

### 4. Database Migration & Seed

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Push schema to database (dev)
npx prisma db push

# Or run migrations
npx prisma migrate dev --name init

# Seed with 25+ cricket products
node prisma/seed.js
```

---

### 5. Start Backend

```bash
cd backend
npm start          # production
# or
npm run dev        # development with hot reload (nodemon)
```

Backend API runs at: http://localhost:5000/api  
Health check: http://localhost:5000/api/health

---

## 🔑 Environment Variables

### Frontend (`.env.local`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
```

### Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/pitch_cricket?schema=public
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
```

---

## 🌐 Deployment

### Frontend → Vercel

- **Live URL:** [https://pitch-cricket-store.vercel.app/](https://pitch-cricket-store.vercel.app/)

1. Push to GitHub
2. Connect repo to Vercel
3. **Root Directory:** `(leave blank or set to project root)`
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Environment Variables:** Add `VITE_API_BASE_URL` pointing to your Render backend

### Backend → Render

- **Live Service:** [https://pitch-cricket-e-commerce.onrender.com](https://pitch-cricket-e-commerce.onrender.com)
- **Health Check Endpoint:** [https://pitch-cricket-e-commerce.onrender.com/api/health](https://pitch-cricket-e-commerce.onrender.com/api/health)

1. Create a new **Web Service** on Render
2. Connect your GitHub repository (`main` branch)
3. **Root Directory:** `backend`
4. **Build Command:** `npm install && npm run build`
5. **Start Command:** `npm start`
6. **Environment Variables:** Add `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `GEMINI_API_KEY`
7. **Health Check Path:** `/api/health`

### Database → Neon Serverless PostgreSQL

1. Create a PostgreSQL database on [Neon](https://neon.tech) (PostgreSQL 16+)
2. In the Neon Console, obtain both connection strings:
   - **`DATABASE_URL`**: Pooled connection (`-pooler` endpoint) for runtime application operations
   - **`DIRECT_URL`**: Direct, unpooled connection for Prisma CLI schema operations
3. Schema validation and client generation: `npm run build` (runs `prisma generate`)
4. Initial database seeding: `node prisma/seed.js`

---

## 💳 Razorpay Test Mode Setup

1. Create account at [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Switch to **Test Mode**
3. Go to Settings → API Keys → Generate Test Key
4. Copy `Key ID` → `RAZORPAY_KEY_ID` (frontend + backend)
5. Copy `Key Secret` → `RAZORPAY_KEY_SECRET` (backend ONLY — never frontend)
6. For webhooks: Settings → Webhooks → Add URL: `https://your-render-app.onrender.com/api/payments/webhook`

**Test Cards:**
- Visa: `4242 4242 4242 4242` | Expiry: `12/28` | CVV: `123`
- UPI: Use any UPI ID in test mode

---

## 🤖 FRIDAY AI Setup (Google Gemini)

1. Go to [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Create an API key
3. Add to backend `.env`: `GEMINI_API_KEY=your_key`
4. Model: `gemini-1.5-flash` (recommended — fast + capable)

**IMPORTANT:** The Gemini API key is ONLY on the backend. The frontend calls `/api/friday/chat` which proxies to Gemini server-side.

---

## 🔌 API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | — | Health check |
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Login |
| GET | `/api/auth/me` | ✅ | Get profile |
| PATCH | `/api/auth/me` | ✅ | Update profile (name, phone) |
| DELETE | `/api/auth/me` | ✅ | Delete account & personal data (DPDP Act erasure) |
| POST | `/api/auth/change-password` | ✅ | Change account password |
| POST | `/api/auth/addresses` | ✅ | Save delivery address |
| GET | `/api/products` | — | List products (filter/sort/search) |
| GET | `/api/products/:id` | — | Product detail |
| GET | `/api/products/categories` | — | All categories |
| GET | `/api/products/brands` | — | All brands |
| POST | `/api/products/compare` | — | Compare 2–4 products |
| GET | `/api/cart` | ✅ | Get cart |
| POST | `/api/cart` | ✅ | Add to cart |
| PATCH | `/api/cart/:id` | ✅ | Update quantity |
| DELETE | `/api/cart/:id` | ✅ | Remove item |
| POST | `/api/cart/sync` | ✅ | Sync guest cart after login |
| GET | `/api/wishlist` | ✅ | Get wishlist |
| POST | `/api/wishlist` | ✅ | Add to wishlist |
| DELETE | `/api/wishlist/:id` | ✅ | Remove from wishlist |
| POST | `/api/orders` | ✅ | Create order |
| GET | `/api/orders` | ✅ | List orders |
| GET | `/api/orders/:id` | ✅ | Order detail |
| POST | `/api/orders/:id/cancel` | ✅ | Cancel order |
| GET | `/api/orders/track/:orderNumber` | — | Public order tracking |
| POST | `/api/payments/create-order` | ✅ | Create Razorpay order |
| POST | `/api/payments/verify` | ✅ | Verify payment |
| POST | `/api/payments/webhook` | — | Razorpay webhook |
| POST | `/api/friday/chat` | — | FRIDAY AI chat |

---

## 🧪 Testing & Verification Commands

```bash
# Frontend production build
npm run build

# Frontend and backend linting
npm run lint

# Prisma schema validation (from backend directory)
cd backend && npx prisma validate
```

---

## 🔒 Security

- JWT authentication with 7-day expiry
- bcrypt password hashing (cost factor 12)
- Helmet.js security headers
- CORS restricted to frontend origin
- Rate limiting: 500 req/15min global, 20 req/15min for auth
- FRIDAY: 20 req/min rate limit
- Server-side price calculation — frontend prices never trusted for payment
- Razorpay signature verification server-side
- All secrets in environment variables — NEVER in code or frontend
- `.gitignore` blocks all `.env` files

---

## 📦 Features

### ✅ Implemented
- [x] Home page (cinematic hero, parallax, animations)
- [x] Shop page (filter, search, sort, grid/list view)
- [x] Product detail modal (3D tilt, specs, add to cart)
- [x] Cart (localStorage + server sync)
- [x] Wishlist (UI context, backend ready)
- [x] Product comparison (up to 4, expandable panel)
- [x] Custom bat builder (5-step wizard)
- [x] Authentication (login/register, JWT)
- [x] Checkout modal (multi-step)
- [x] Payment (Razorpay integration)
- [x] Order management (create, list, track, cancel)
- [x] FRIDAY AI assistant (Gemini + fallback)
- [x] Journal / Cricket guides
- [x] About page
- [x] Contact page
- [x] FAQ page
- [x] Shipping & Returns page
- [x] Track order page
- [x] Toast notifications
- [x] Clean native cursor navigation & interactive cricket shot animations
- [x] Film grain overlay
- [x] Responsive (mobile/tablet/desktop)
- [x] Legal & consumer compliance pages (Privacy Policy, Terms, Grievance Redressal, Shipping & Returns)

---

## 🎨 Brand

**PITCH™** — Cricket E-Commerce Platform  
Designed & Developed by **Anubhaw Mishra**  
AI Assistant: **FRIDAY** (Gemini 1.5 Flash)
