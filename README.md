# Task Management Application

Full-stack task management app (React + Node.js + Prisma + MongoDB) with JWT auth.

See `frontend` and `backend` folders for instructions.

Quick start

- Backend

  1. cd backend
  2. copy `.env.example` -> `.env` and fill `DATABASE_URL`, `JWT_SECRET`, optionally `CORS_ORIGIN`
  3. npm install
  4. npx prisma generate && npx prisma db push
  5. npm run seed (optional) (username: test, password: test@1234)
  6. npm run dev

- Frontend

  1. cd frontend
  2. copy `.env.example` -> `.env` and set `VITE_API_URL` if needed
  3. npm install
  4. npm run dev

Requirements coverage (high level)

- Authentication with JWT: implemented (backend `POST /api/auth/register`, `POST /api/auth/login`; frontend stores token in localStorage)
- Protected routes: backend middleware verifies JWT; frontend uses a ProtectedRoute
- Task CRUD: implemented under `/api/tasks` and frontend pages to create, view, update (status), delete tasks
- Validation: Zod on backend; Zod + React Hook Form on frontend
- DB: Prisma configured for MongoDB; User and Task models exist

Next steps / optional

- Add unit/integration tests (Jest + supertest) for backend API
- Improve UI and UX, add pagination, filters
- Add Dockerfiles and/or CI pipeline

-----

## Full README (local development)

This repository contains two main folders:

- `backend` — Node.js + Express API using Prisma and MongoDB.
- `frontend` — Vite + React frontend with Tailwind, Redux Toolkit, Axios, and React Hook Form + Zod.

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (URI for a dev database)

### Environment variables

Backend (`backend/.env`)

- DATABASE_URL - MongoDB connection string
- JWT_SECRET - strong secret for signing JWT tokens
- PORT - (optional) server port, default 4000
- CORS_ORIGIN - (optional) set allowed origin for CORS

Frontend (`frontend/.env`)

- VITE_API_URL - front-end API base e.g. `http://localhost:4000/api`

### Backend - setup and run

1. cd backend
2. copy `.env.example` -> `.env` and fill the values
3. npm install
4. npx prisma generate && npx prisma db push
5. (optional) npm run seed — seeds a default user `alice` / `password123` and a couple of tasks
6. npm run dev

API server will start on `http://localhost:4000` by default.

### Frontend - setup and run

1. cd frontend
2. copy `.env.example` -> `.env` and set `VITE_API_URL` if different
3. npm install
4. npm run dev

Frontend runs on Vite dev server (usually `http://localhost:5173`)

### API Endpoints

Authentication

- POST /api/auth/register
  - Body: { username: string, password: string }
  - Response: { id, username }

- POST /api/auth/login
  - Body: { username: string, password: string }
  - Response: { token }

Tasks (protected — requires Authorization: Bearer `&lt;token&gt;`)

- GET /api/tasks
  - Returns an array of tasks belonging to the authenticated user

- POST /api/tasks
  - Body: { title: string, description?: string, status?: 'pending' | 'completed' }
  - Creates a new task for the user

- PUT /api/tasks/:id
  - Body: any fields to update (title, description, status)
  - Updates the task (user must own it)

- DELETE /api/tasks/:id
  - Deletes the task (user must own it)

Task shape

- id: string
- title: string
- description?: string
- status: 'pending' | 'completed'
- userId: string

### Notes about security & production

- Keep `JWT_SECRET` secret and strong. Do not commit `.env` to source control.
- Use HTTPS and secure cookies or other storage strategies for tokens in production.

### Scripts (repo overview)

- backend
  - `npm run dev` — start backend in dev with nodemon
  - `npm run seed` — run `prisma/seed.js` to create sample data
  - `npx prisma db push` / `npx prisma generate` — Prisma commands

- frontend
  - `npm run dev` — start Vite dev server

### What's implemented

- User registration and login (JWT)
- Task CRUD operations scoped to the authenticated user
- Frontend auth and tasks UI using React + Redux Toolkit + React Hook Form
- Validation with Zod on backend and frontend
- Seed script to create an example user and tasks
