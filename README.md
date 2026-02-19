# Inventory-Management-Dashboard

![Next.js](https://img.shields.io/badge/Next.js-Frontend-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-purple)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Prisma](https://img.shields.io/badge/Prisma-ORM-yellowgreen)
![Terraform](https://img.shields.io/badge/Terraform-Infrastructure%20Management-orange)
![AWS](https://img.shields.io/badge/AWS-Deployment-lightgrey)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

This project is a full-stack inventory management dashboard built with **Next.js** (frontend) and **Node.js + Prisma** (backend), with Terraform configuration for AWS infrastructure provisioning.

## Demo Screenshots

![Dashboard Demo](docs/screenshots/dashboard-demo.png)
![Expenses Demo](docs/screenshots/expenses-demo.png)
![Products Demo](docs/screenshots/products-demo.png)

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS, Material UI (Data Grid)
- **State Management**: Redux Toolkit, Redux Toolkit Query
- **Backend**: Node.js, Prisma ORM
- **Infrastructure as Code**: Terraform
- **Cloud Provider**: AWS (Amazon Web Services)

## Features

- Interactive dashboard with charts and summaries.
- Inventory, products, users, and expenses management views.
- Global search across key data tables.
- 
## Local Run Guide

### 1. Start PostgreSQL (Docker)

```powershell
docker run --name inventory-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=inventory_db -p 5432:5432 -d postgres:16
```

### 2. Configure Environment Variables

Create `server/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/inventory_db?schema=public"
PORT=3001
```

Create `client/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### 3. Start Backend

```powershell
cd server
npm install
npx prisma generate
npx prisma migrate deploy
npm run seed
npm run dev
```

### 4. Start Frontend

```powershell
cd client
npm install
npm run dev
```

Open: `http://localhost:3000`

## Deploy (Render, Easiest Full-Stack)


### 1. Create Render Services

- **Backend (Node/Express)**
  - Build Command:
    ```
    cd server
    npm install
    npx prisma generate
    npx prisma migrate deploy
    npm run build
    ```
  - Start Command:
    ```
    cd server
    npm run start
    ```
  - Environment:
    - `DATABASE_URL` = from Render Postgres
    - `PORT` = 3001 (Render injects `PORT` automatically)

- **Frontend (Next.js)**
  - Build Command:
    ```
    cd client
    npm install
    npm run build
    ```
  - Start Command:
    ```
    cd client
    npm run start
    ```
  - Environment:
    - `NEXT_PUBLIC_API_BASE_URL` = your Render backend URL

- **Postgres**
  - Create a Render Postgres database (free tier).
  - Copy its connection string into the backend `DATABASE_URL`.

### 2. Optional Render Blueprint

Use the included `render.yaml` to create everything in one click.