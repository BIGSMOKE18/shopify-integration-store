# Shopify Integration Project

A full-stack Shopify integration project built using FastAPI and Next.js.

## Features

### Backend (FastAPI)

* Shopify Admin API Integration
* Product CRUD Operations
* Customer APIs
* Order APIs
* REST Endpoints
* Interactive Swagger Documentation

### Frontend (Next.js)

* Product Listing
* Product Details Page
* Shopping Cart
* Quantity Management
* Checkout Page
* Responsive UI

## Tech Stack

### Backend

* Python
* FastAPI
* Shopify Admin API
* Shopify Storefront GraphQL API

### Frontend

* Next.js
* React
* Tailwind CSS
* Axios

---

# Project Structure

```text
shopify-integration-store/
│
├── backend/
│   ├── app/
│   ├── .env
│   ├── requirements.txt
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── next.config.js
│
├── screenshots/
├── README.md
└── .gitignore
```

---

# Environment Variables

Create a file named:

```text
backend/.env
```

Add the following variables:

```env
SHOPIFY_STORE_URL=integration-demo-0lxp1vqv.myshopify.com
SHOPIFY_API_VERSION=2025-01
SHOPIFY_ADMIN_TOKEN=your_admin_api_token
SHOPIFY_STOREFRONT_TOKEN=your_storefront_token
```

This Contains the Store URL of the store i created  

### How to Get These Values

#### SHOPIFY_STORE_URL

Example:

```text
your-store.myshopify.com
```

#### SHOPIFY_ADMIN_TOKEN

1. Open Shopify Admin
2. Apps
3. Develop Apps
4. Select your app
5. API Credentials
6. Generate Admin API Access Token

#### SHOPIFY_STOREFRONT_TOKEN

1. Open Shopify Admin
2. Apps
3. Develop Apps
4. Select your app
5. Storefront API Access Token

#### SHOPIFY_API_VERSION

Example:

```text
2025-01
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python3 -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI server:

```bash
uvicorn main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:3000
```

---

# Running the Complete Project

### Terminal 1

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

### Terminal 2

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
Frontend: http://localhost:3000
Backend:  http://127.0.0.1:8000
Docs:     http://127.0.0.1:8000/docs
```

---

# Usage

### Add Products

1. Open Shopify Admin["https://admin.shopify.com/store/integration-demo-0lxp1vqv/products"]
2. Products
3. Add Product
4. Enter product information
5. Save

Products will automatically appear in the frontend application.

### Delete Products

1. Open Shopify Admin
2. Products
3. Delete Product
4. Enter product information
5. Save

Products will automatically disappear in the frontend application.

---

# API Endpoints

## Products

```http
GET /products
POST /products
PUT /products/{id}
DELETE /products/{id}
```

## Orders

```http
GET /orders
```

## Customers

```http
GET /customers
```

## Storefront

```http
GET /storefront/products
GET /storefront/products/{id}
```

---

