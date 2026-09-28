/**
 * Prisma seed file — populates the PostgreSQL database with the complete PITCH™ cricket catalog
 * Run: node prisma/seed.js
 */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
const { PRODUCTS } = require('../src/data/catalog');

async function main() {
  console.log('🌱 Seeding PITCH™ database with authentic cricket catalog...');

  // Create demo admin user
  const adminPassword = await bcrypt.hash('PitchAdmin@2026', 12);
  await prisma.user.upsert({
    where: { email: 'admin@pitchcricket.com' },
    update: {},
    create: {
      email: 'admin@pitchcricket.com',
      name: 'Pitch Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user ready: admin@pitchcricket.com');

  // Upsert all products
  let count = 0;
  for (const product of PRODUCTS) {
    const { id, ...productData } = product;
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: productData,
      create: productData,
    });
    count++;
  }

  console.log(`✅ ${count} cricket products seeded successfully across all 11 categories!`);
  console.log('🏏 PITCH™ database seeded and operational!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
