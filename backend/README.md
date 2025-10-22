# Backend (Express + Prisma + MongoDB)

Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Generate Prisma client and push schema: `npx prisma generate` then `npx prisma db push`
4. Seed DB (optional): `npm run seed` — creates a sample user (`alice` / `password123`) and tasks
5. Start dev server: `npm run dev`

Notes:

- To restrict CORS, set `CORS_ORIGIN` in `.env`.
- If you need to re-generate Prisma client programmatically, run `npm run prepare`.

API Endpoints

- POST /api/auth/register { username, password }
- POST /api/auth/login { username, password } -> { token }
- GET /api/tasks (Bearer token)
- POST /api/tasks { title, description?, status? } (Bearer token)
- PUT /api/tasks/:id (Bearer token)
- DELETE /api/tasks/:id (Bearer token)
