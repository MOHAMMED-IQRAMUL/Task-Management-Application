const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const auth = require('../middleware/auth');
const prisma = new PrismaClient();

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']).optional()
});

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const userId = req.user.sub;
    const tasks = await prisma.task.findMany({ where: { userId } });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = taskSchema.parse(req.body);
    const userId = req.user.sub;
    const task = await prisma.task.create({ data: { ...data, userId } });
    res.status(201).json(task);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = taskSchema.partial().parse(req.body);
    const userId = req.user.sub;
    // ensure ownership
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) return res.status(404).json({ error: 'Not found' });
    const updated = await prisma.task.update({ where: { id }, data });
    res.json(updated);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.sub;
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) return res.status(404).json({ error: 'Not found' });
    await prisma.task.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
