# Monorepo - Next.js Frontend & NestJS Backend

This monorepo contains a Next.js frontend application and a NestJS backend application.

## Project Structure

```
monorepo/
├── apps/
│   ├── frontend/          # Next.js app (React, TypeScript, Tailwind, Material UI, React Query)
│   └── backend/           # NestJS app (TypeScript, Express)
├── package.json           # Root package.json with workspaces
└── .gitignore
```

## Prerequisites

- Node.js 18+ (LTS)
- npm, yarn, or pnpm
- PostgreSQL 12+ (for backend)

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Servers

```bash
npm run dev
```

This will start:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Build for Production

```bash
npm run build
```

## Individual Services

### Frontend

```bash
cd apps/frontend
npm run dev
```

### Backend

1. **Set up PostgreSQL Database:**

   Create a PostgreSQL database:

   ```bash
   createdb shopping_list
   ```

   Or using psql:

   ```sql
   CREATE DATABASE shopping_list;
   ```

2. **Configure Environment Variables:**

   **Backend Environment Variables:**
   
   Copy the example file and create a `.env` file in `apps/backend/`:
   
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   ```
   
   Then edit `apps/backend/.env` with your actual values:
   
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=shopping_list
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend Environment Variables:**
   
   Copy the example file and create a `.env` file in `apps/frontend/`:
   
   ```bash
   cp apps/frontend/.env.example apps/frontend/.env
   ```
   
   Then edit `apps/frontend/.env` with your actual values:
   
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```
   
   **Note:** In Next.js, only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

3. **Start the Backend:**

   ```bash
   cd apps/backend
   npm run start:dev
   ```

   Note: TypeORM will automatically create the database tables on first run (synchronize is enabled in development).

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Material UI (MUI)
- React Query (TanStack Query)

### Backend

- NestJS
- TypeScript
- Express
- PostgreSQL
- TypeORM
