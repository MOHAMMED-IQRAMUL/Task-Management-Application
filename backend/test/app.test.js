const request = require('supertest')
const { PrismaClient } = require('@prisma/client')
const app = require('../testHelpers/app')
const prisma = new PrismaClient()

describe('Auth and Tasks API (basic)', () => {
  let token
  let taskId

  beforeAll(async () => {
    // Note: app helper starts server instance
    // Ensure test DB is clean - careful with production DB
  })

  afterAll(async () => {
    await prisma.task.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.$disconnect()
  })

  test('register -> login -> create task -> get tasks', async () => {
    const user = { username: 'testuser', password: 'pass1234' }
    await request(app).post('/api/auth/register').send(user).expect(200)
    const login = await request(app).post('/api/auth/login').send(user).expect(200)
    token = login.body.token
    expect(token).toBeTruthy()

    const create = await request(app).post('/api/tasks').set('Authorization', `Bearer ${token}`).send({ title: 'T1' }).expect(201)
    taskId = create.body.id

    const list = await request(app).get('/api/tasks').set('Authorization', `Bearer ${token}`).expect(200)
    expect(Array.isArray(list.body)).toBe(true)
  })
})
