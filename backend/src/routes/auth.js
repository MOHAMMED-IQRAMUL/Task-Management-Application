const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { username: data.username } });
    if (existing) return res.status(400).json({ error: 'Username already taken' });
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({ data: { username: data.username, password: hashed } });
    res.json({ id: user.id, username: user.username });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const loginSchema = z.object({ username: z.string(), password: z.string() });

router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { username: data.username } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
