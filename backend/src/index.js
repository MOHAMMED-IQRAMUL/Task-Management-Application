const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

const corsOptions = { origin: process.env.CORS_ORIGIN || '*' };
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// health endpoint used by frontend to detect availability
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

// centralized error handler
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));

process.on('SIGINT', async () => {
  try { await prisma.$disconnect(); } catch (e) { console.error(e) }
  process.exit(0);
});
