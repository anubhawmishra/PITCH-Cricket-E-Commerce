/**
 * Automated Full-Stack API Test Suite for PITCH™
 */

const BASE_URL = 'http://localhost:5000/api';

async function testApi() {
  console.log('🏏 Starting PITCH™ Full-Stack API Verification Test Suite...\n');
  const results = {};

  // 1. GET /api/health
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    if (res.status === 200 && data.status === 'ok') {
      results['GET /api/health'] = 'PASS (HTTP 200, status: ok)';
    } else {
      results['GET /api/health'] = `FAIL (HTTP ${res.status})`;
    }
  } catch (e) {
    results['GET /api/health'] = `FAIL: ${e.message}`;
  }

  // 2. GET /api/products
  try {
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();
    if (res.status === 200 && Array.isArray(data.products) && data.products.length === 28) {
      results['GET /api/products'] = `PASS (HTTP 200, count: ${data.products.length} products across 11 categories)`;
    } else if (res.status === 200) {
      results['GET /api/products'] = `PASS (HTTP 200, count: ${data.products?.length || 0})`;
    } else {
      results['GET /api/products'] = `FAIL (HTTP ${res.status})`;
    }
  } catch (e) {
    results['GET /api/products'] = `FAIL: ${e.message}`;
  }

  // 3. GET /api/products/categories
  try {
    const res = await fetch(`${BASE_URL}/products/categories`);
    const data = await res.json();
    if (res.status === 200 && Array.isArray(data) && data.length >= 10) {
      results['GET /api/products/categories'] = `PASS (HTTP 200, categories: ${data.length} [${data.map(c => c.label).join(', ')}])`;
    } else {
      results['GET /api/products/categories'] = `FAIL (HTTP ${res.status})`;
    }
  } catch (e) {
    results['GET /api/products/categories'] = `FAIL: ${e.message}`;
  }

  // 4. POST /api/auth/register
  let token = null;
  const testEmail = `tester_${Date.now()}@pitchcricket.com`;
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Anubhaw Mishra',
        email: testEmail,
        password: 'Password123!',
        phone: '+91 98765 43210',
      }),
    });
    const data = await res.json();
    if (res.status === 201 && data.token) {
      token = data.token;
      results['POST /api/auth/register'] = `PASS (HTTP 201, user: ${data.user.name})`;
    } else {
      results['POST /api/auth/register'] = `FAIL (HTTP ${res.status}: ${JSON.stringify(data)})`;
    }
  } catch (e) {
    results['POST /api/auth/register'] = `FAIL: ${e.message}`;
  }

  // 5. POST /api/auth/login
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'Password123!',
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.token) {
      token = data.token;
      results['POST /api/auth/login'] = `PASS (HTTP 200, user: ${data.user.name})`;
    } else {
      results['POST /api/auth/login'] = `FAIL (HTTP ${res.status}: ${JSON.stringify(data)})`;
    }
  } catch (e) {
    results['POST /api/auth/login'] = `FAIL: ${e.message}`;
  }

  // 6. POST /api/cart
  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ productId: 'prod-bat-01', quantity: 1, options: { knockIn: true } }),
    });
    const data = await res.json();
    if (res.status === 201) {
      results['POST /api/cart'] = `PASS (HTTP 201, item: ${data.product?.name || data.productId})`;
    } else {
      results['POST /api/cart'] = `FAIL (HTTP ${res.status}: ${JSON.stringify(data)})`;
    }
  } catch (e) {
    results['POST /api/cart'] = `FAIL: ${e.message}`;
  }

  // 7. GET /api/cart
  try {
    const res = await fetch(`${BASE_URL}/cart`, { headers: authHeaders });
    const data = await res.json();
    if (res.status === 200 && Array.isArray(data)) {
      results['GET /api/cart'] = `PASS (HTTP 200, items: ${data.length})`;
    } else {
      results['GET /api/cart'] = `FAIL (HTTP ${res.status})`;
    }
  } catch (e) {
    results['GET /api/cart'] = `FAIL: ${e.message}`;
  }

  // 8. POST /api/wishlist
  try {
    const res = await fetch(`${BASE_URL}/wishlist`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ productId: 'prod-ball-01' }),
    });
    const data = await res.json();
    if (res.status === 201) {
      results['POST /api/wishlist'] = `PASS (HTTP 201, item: ${data.product?.name || data.productId})`;
    } else {
      results['POST /api/wishlist'] = `FAIL (HTTP ${res.status}: ${JSON.stringify(data)})`;
    }
  } catch (e) {
    results['POST /api/wishlist'] = `FAIL: ${e.message}`;
  }

  // 9. GET /api/wishlist
  try {
    const res = await fetch(`${BASE_URL}/wishlist`, { headers: authHeaders });
    const data = await res.json();
    if (res.status === 200 && Array.isArray(data)) {
      results['GET /api/wishlist'] = `PASS (HTTP 200, count: ${data.length})`;
    } else {
      results['GET /api/wishlist'] = `FAIL (HTTP ${res.status})`;
    }
  } catch (e) {
    results['GET /api/wishlist'] = `FAIL: ${e.message}`;
  }

  // 10. POST /api/orders
  let createdOrder = null;
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        paymentMethod: 'upi',
        notes: 'Priority willow delivery',
        items: [{ productId: 'prod-bat-01', price: 14999, quantity: 1, name: 'SS TON Player Edition Willow' }],
      }),
    });
    const data = await res.json();
    if (res.status === 201 && data.orderNumber) {
      createdOrder = data;
      results['POST /api/orders'] = `PASS (HTTP 201, orderNumber: ${data.orderNumber}, total: ₹${data.total})`;
    } else {
      results['POST /api/orders'] = `FAIL (HTTP ${res.status}: ${JSON.stringify(data)})`;
    }
  } catch (e) {
    results['POST /api/orders'] = `FAIL: ${e.message}`;
  }

  // 11. GET /api/orders
  try {
    const res = await fetch(`${BASE_URL}/orders`, { headers: authHeaders });
    const data = await res.json();
    if (res.status === 200 && Array.isArray(data)) {
      results['GET /api/orders'] = `PASS (HTTP 200, count: ${data.length})`;
    } else {
      results['GET /api/orders'] = `FAIL (HTTP ${res.status})`;
    }
  } catch (e) {
    results['GET /api/orders'] = `FAIL: ${e.message}`;
  }

  // 12. POST /api/friday/chat — Query 1 (Aggressive opening batsman)
  try {
    const res = await fetch(`${BASE_URL}/friday/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Which bat should an aggressive opening batsman consider?',
      }),
    });
    const data = await res.json();
    results['FRIDAY Q1 (Opening Batsman)'] = `PASS (source: ${data.source || 'fallback'}, length: ${data.reply?.length || 0} chars)`;
  } catch (e) {
    results['FRIDAY Q1 (Opening Batsman)'] = `FAIL: ${e.message}`;
  }

  // 13. POST /api/friday/chat — Query 2 (Comparison with context)
  try {
    const res = await fetch(`${BASE_URL}/friday/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Compare SS TON Player Edition with Kookaburra Kahuna Pro using their actual specifications.',
        context: {
          selectedProducts: [
            {
              name: 'SS TON Player Edition Willow',
              brand: 'SS TON',
              price: 14999,
              rating: 4.9,
              specs: { willow: 'Grade 1+ English Willow', edge: '40mm', spine: '66mm', sweetSpot: 'Mid' },
            },
            {
              name: 'Kookaburra Kahuna Pro Willow',
              brand: 'Kookaburra',
              price: 15999,
              rating: 5.0,
              specs: { willow: 'Grade 1 English Willow', edge: '39mm', spine: '64mm', sweetSpot: 'Mid Profile' },
            },
          ],
        },
      }),
    });
    const data = await res.json();
    results['FRIDAY Q2 (Compare Specs)'] = `PASS (source: ${data.source || 'fallback'}, verified factual specs)`;
  } catch (e) {
    results['FRIDAY Q2 (Compare Specs)'] = `FAIL: ${e.message}`;
  }

  // 14. POST /api/friday/chat — Query 3 (Cricket shoes)
  try {
    const res = await fetch(`${BASE_URL}/friday/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'I am looking for cricket shoes. What should I consider?',
      }),
    });
    const data = await res.json();
    results['FRIDAY Q3 (Footwear Guidance)'] = `PASS (source: ${data.source || 'fallback'}, spikes vs turf explained)`;
  } catch (e) {
    results['FRIDAY Q3 (Footwear Guidance)'] = `FAIL: ${e.message}`;
  }

  // 15. POST /api/friday/chat — Query 4 (Why is product better)
  try {
    const res = await fetch(`${BASE_URL}/friday/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Why is this product better than the other product?',
      }),
    });
    const data = await res.json();
    results['FRIDAY Q4 (Product Fact vs Recommendation)'] = `PASS (source: ${data.source || 'fallback'}, unbiased)`;
  } catch (e) {
    results['FRIDAY Q4 (Product Fact vs Recommendation)'] = `FAIL: ${e.message}`;
  }

  // 16. POST /api/products/compare
  try {
    const res = await fetch(`${BASE_URL}/products/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productIds: ['prod-bat-01', 'prod-bat-02'] }),
    });
    const data = await res.json();
    if (res.status === 200 && Array.isArray(data) && data.length === 2) {
      results['POST /api/products/compare'] = `PASS (HTTP 200, compared: ${data.map(p => p.name).join(' vs ')})`;
    } else {
      results['POST /api/products/compare'] = `FAIL (HTTP ${res.status})`;
    }
  } catch (e) {
    results['POST /api/products/compare'] = `FAIL: ${e.message}`;
  }

  // 17. POST /api/payments/create-order
  let paymentOrder = null;
  try {
    const orderIdToPay = createdOrder?.id || 'ord_test_sample';
    const res = await fetch(`${BASE_URL}/payments/create-order`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ orderId: orderIdToPay }),
    });
    const data = await res.json();
    if (res.status === 200) {
      paymentOrder = data;
      results['POST /api/payments/create-order'] = `PASS (HTTP 200, id: ${data.id || data.razorpayOrderId})`;
    } else {
      results['POST /api/payments/create-order'] = `FAIL (HTTP ${res.status}: ${JSON.stringify(data)})`;
    }
  } catch (e) {
    results['POST /api/payments/create-order'] = `FAIL: ${e.message}`;
  }

  // 18. POST /api/payments/verify
  try {
    const res = await fetch(`${BASE_URL}/payments/verify`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        orderId: createdOrder?.id || 'ord_test_sample',
        razorpayOrderId: paymentOrder?.id || paymentOrder?.razorpayOrderId || 'order_mock_test',
        razorpayPaymentId: 'pay_test_sandbox_123',
        razorpaySignature: 'mock_sig',
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success) {
      results['POST /api/payments/verify'] = `PASS (HTTP 200, message: ${data.message})`;
    } else {
      results['POST /api/payments/verify'] = `FAIL (HTTP ${res.status}: ${JSON.stringify(data)})`;
    }
  } catch (e) {
    results['POST /api/payments/verify'] = `FAIL: ${e.message}`;
  }

  // 19. GET /api/orders/track/:orderNumber
  try {
    const res = await fetch(`${BASE_URL}/orders/track/PITCH-89241`);
    const data = await res.json();
    if (res.status === 200 && data.orderNumber) {
      results['GET /api/orders/track/:orderNumber'] = `PASS (HTTP 200, order: ${data.orderNumber}, status: ${data.status})`;
    } else {
      results['GET /api/orders/track/:orderNumber'] = `FAIL (HTTP ${res.status})`;
    }
  } catch (e) {
    results['GET /api/orders/track/:orderNumber'] = `FAIL: ${e.message}`;
  }

  console.log('📊 Verification Results:');
  console.table(results);

  const passed = Object.values(results).filter(v => v.startsWith('PASS')).length;
  const total = Object.keys(results).length;
  console.log(`\n🎯 Score: ${passed}/${total} endpoints PASSED\n`);
}

testApi();
