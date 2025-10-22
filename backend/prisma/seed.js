const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const username = 'test';
  const password = await bcrypt.hash('test@1234', 10);
  let user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    user = await prisma.user.create({ data: { username, password } });
    console.log('Created user', user.username);
  }

  const tasks = [
    { title: 'Buy groceries', description: 'milk, bread, eggs' },
    { title: 'Read book', description: 'Finish chapter 3' }
  ];

  for (const t of tasks) {
    await prisma.task.create({ data: { ...t, userId: user.id } });
  }
  console.log('Seeded tasks');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
