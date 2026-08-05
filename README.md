# Dealership Manager

Web application for managing an automobile dealership's inventory. Built with React, Express, and PostgreSQL.

## Features

- **Dashboard** — Financial overview with charts, recent activity, top-selling vehicles, and old inventory alerts.
- **Vehicle management** — Multi-step form for adding vehicles with brand/model/trim auto-linking, detailed view with specs and supplier info.
- **Supplier management** — CRUD for suppliers.
- **User administration** — Role-based access control (admin/user) with session-based authentication.

## Screenshots

![Add Vehicle](screenshots/screenshot04.png)

![Login](screenshots/screenshot01.webp)

![Vehicle Details](screenshots/screenshot03.png)

![Dashboard](screenshots/screenshot02.png)

![Admin Panel](screenshots/screenshot05.png)

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS v4, shadcn/ui, Zustand, React Query, react-hook-form, react-router-dom

**Backend:** Express, TypeScript, Prisma ORM, PostgreSQL, Zod, bcryptjs, express-session

**Runtime:** Bun

## Run Backend

```bash
cd backend
bun install
bun run dev
```

## Run Frontend

```bash
cd frontend
bun install
bun dev
```

## Database

Requires PostgreSQL. Create a `.env` file in `backend/`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/dealership_manager_db"
SESSION_KEY="your-session-secret"
```

Then run migrations:

```bash
cd backend
bun prisma-migrate-dev
bun prisma-seed
```
