const express = require('express')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('../src/routes/auth')
const taskRoutes = require('../src/routes/tasks')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

module.exports = app
