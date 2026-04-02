# Inventory Management Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-purple)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Prisma](https://img.shields.io/badge/Prisma-5-yellowgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

A full-stack inventory management dashboard built with Next.js, Express, Prisma, and PostgreSQL. Visualize sales, purchases, expenses, and product stock in one place.

## Screenshots

![Dashboard Demo](docs/screenshots/dashboard-demo.png)
![Expenses Demo](docs/screenshots/expenses-demo.png)
![Products Demo](docs/screenshots/products-demo.png)

## Features

- **Dashboard** — at-a-glance metrics: popular products, sales summary, purchase summary, expense breakdown, and trending stat cards
- **Products** — searchable product grid with the ability to create new products
- **Inventory** — tabular view of all stock with filtering
- **Users** — searchable user list
- **Expenses** — pie chart breakdown by category with list/chart toggle
- **Dark mode** — persisted via Redux + localStorage
- **Docker Compose** — one command to run the full stack (DB + API + frontend) with automatic seeding on first run

## Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Frontend   | Next.js 14, React 18, TypeScript                       |
| UI         | Tailwind CSS, Material UI (DataGrid), Recharts, Lucide |
| State      | Redux Toolkit, RTK Query, Redux Persist                |
| Backend    | Express, TypeScript                                    |
| ORM        | Prisma 5                                               |
| Database   | PostgreSQL 16                                          |
| Containers | Docker Compose                                         |

## Project Structure

```
├── client/                 # Next.js frontend
│   └── src/app/
│       ├── (components)/   # Shared components (Sidebar, Navbar, etc.)
│       ├── dashboard/      # Dashboard page & cards
│       ├── products/       # Products page
│       ├── inventory/      # Inventory DataGrid
│       ├── users/          # Users DataGrid
│       ├── expenses/       # Expenses chart
│       └── settings/       # Settings page
├── server/                 # Express API
│   └── src/
│       ├── controllers/    # Route handlers
│       └── routes/         # Route definitions
├── server/prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.ts             # Seed script (runs once on empty DB)
│   └── seedData/           # JSON seed files
├── docker-compose.yml
└── terraform/              # AWS infrastructure (optional)
```

## API Endpoints

| Method | Path                | Description                          |
| ------ | ------------------- | ------------------------------------ |
| GET    | `/health`           | Health check                         |
| GET    | `/dashboard`        | Aggregated dashboard metrics         |
| GET    | `/products?search=` | List products (optional name search) |
| POST   | `/products`         | Create a product                     |
| GET    | `/users`            | List all users                       |
| GET    | `/expenses`         | Expense breakdown by category        |

## Running with Docker

```bash
docker compose up -d --build
```

That's it. The stack:

1. Starts PostgreSQL
2. Runs Prisma migrations
3. Seeds demo data on the first run (skipped automatically on subsequent restarts so your data is preserved)
4. Starts the API on port `3001`
5. Starts the frontend on port `3000`

Open `http://localhost:3000`

## Database Schema

```
Products       productId, name, price, rating?, stockQuantity
Users          userId, name, email
Sales          saleId, productId (FK), quantity, unitPrice, totalAmount, timestamp
Purchases      purchaseId, productId (FK), quantity, unitCost, totalCost, timestamp
Expenses       expenseId, category, amount, timestamp
SalesSummary   salesSummaryId, totalValue, changePercentage?, date
PurchaseSummary  purchaseSummaryId, totalPurchased, changePercentage?, date
ExpenseSummary   expenseSummaryId, totalExpenses, date
ExpenseByCategory  expenseByCategorySummaryId, expenseSummaryId (FK), category, amount, date
```
