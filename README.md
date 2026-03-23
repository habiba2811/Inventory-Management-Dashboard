# Inventory Management Dashboard

![Next.js](https://img.shields.io/badge/Next.js-Frontend-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-purple)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Prisma](https://img.shields.io/badge/Prisma-ORM-yellowgreen)
![Terraform](https://img.shields.io/badge/Terraform-Infrastructure%20Management-orange)
![AWS](https://img.shields.io/badge/AWS-Deployment-lightgrey)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

Full-stack inventory management dashboard with a Next.js frontend, an Express + Prisma backend, and Terraform configuration for infrastructure work.

## Stack

- Frontend: Next.js 14, React 18, TypeScript
- UI: Tailwind CSS, Material UI, Recharts, Lucide
- State management: Redux Toolkit, RTK Query, Redux Persist
- Backend: Express, TypeScript, Prisma
- Database: PostgreSQL
- Local services: Docker Compose
- Infrastructure: Terraform

## What It Includes

- Dashboard metrics for sales, purchases, expenses, and popular products
- Product management with search and product creation
- Users, inventory, expenses, and settings views
- PostgreSQL-backed API with Prisma models for products, users, sales, purchases, and expense summaries

```

## Screenshots

![Dashboard Demo](docs/screenshots/dashboard-demo.png)
![Expenses Demo](docs/screenshots/expenses-demo.png)
![Products Demo](docs/screenshots/products-demo.png)
```

## Local Setup

### 1. Create environment files

Create `server/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/inventory_db?schema=public"
PORT=3001
```

Create `client/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### 2. Install dependencies

From the repository root:

```powershell
npm install
npm run install:all
```

### 3. Start the project

```powershell
npm run dev:setup
```

Open:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

### 4. Seed demo data

To start with fresh seeded data:

```powershell
npm run dev:fresh
```
