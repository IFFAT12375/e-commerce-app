# E-Commerce App

A learning-focused Node.js REST API for managing users, products, and orders.

[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](./Backend/package.json)

[Report Bug](https://github.com/IFFAT12375/e-commerce-app/issues/new) | [Request Feature](https://github.com/IFFAT12375/e-commerce-app/issues/new)

## The Problem and the Solution

Building a complete commerce backend requires connecting authentication, catalog management, order processing, and inventory rules without losing track of users or permissions. This project provides a single Express API that demonstrates those responsibilities and exposes role-protected operations for customers and administrators.

The API uses MongoDB models for users, products, and orders, JWT cookies for authentication, password hashing, role checks, password reset tokens, and centralized error handling.

**Motivation:** Iffat Sattar built this project to learn the backend of a full e-commerce flow and understand architecture and model design, API creation, and engineering practices.

## Key Features

- Register, log in, and log out users with cookie-based JWT authentication.
- Hash passwords with bcrypt and validate email addresses.
- Generate password reset tokens with a 15-minute expiration.
- Restrict administrative product and order operations by user role.
- Create, retrieve, update, and delete products through protected admin routes.
- Place orders and retrieve an authenticated user's order history.
- Calculate order totals and update product stock when an order is shipped.
- Return centralized JSON errors for validation, authentication, and database failures.
- Filter, search, and paginate product queries through the API feature utility.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens, bcryptjs, cookies |
| Validation | validator |
| Configuration | dotenv |
| Development | Nodemon |

## Requirements

### Functional Requirements

- FR-1: Users can register and log in with an email and password.
- FR-2: Users can log out and reset a forgotten password.
- FR-3: Authenticated users can create orders and view their own order history.
- FR-4: Authenticated users can retrieve a specific order.
- FR-5: Administrators can create, update, and delete products.
- FR-6: Administrators can retrieve all orders and update or delete individual orders.
- FR-7: Shipping an order reduces the stock of each ordered product.
- FR-8: API routes return JSON success and error responses.

### Non-Functional Requirements

- NFR-1: Passwords must be hashed before storage.
- NFR-2: Protected routes must verify JWT cookies.
- NFR-3: Administrative routes must enforce role-based authorization.
- NFR-4: Database IDs, duplicate values, JWT failures, and invalid reset tokens must produce structured API errors.
- NFR-5: Input validation must enforce required fields and password or name constraints defined in Mongoose schemas.
- NFR-6: Automated test coverage is not yet implemented (planned).
- NFR-7: Docker deployment configuration is not yet implemented (planned).
- NFR-8: Production performance and horizontal scalability have not yet been documented or implemented (planned).

## Architecture / Project Structure

The server loads environment variables, connects to MongoDB, and starts an Express application. Route modules map HTTP requests to controllers; controllers coordinate Mongoose models and authentication middleware; centralized middleware converts application and database errors into JSON responses.

```text
Backend/
├── config/             # Database connection and environment configuration
├── controllers/        # Request handlers for users and orders
├── middleware/         # Authentication, async error handling, and error responses
├── models/             # Mongoose schemas for users, products, and orders
├── routes/             # Express API route definitions
├── utils/              # JWT, email, error, and query feature helpers
├── app.js              # Express middleware and route registration
├── server.js           # Environment loading, database connection, and startup
└── package.json        # Scripts and dependencies
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

The project does not declare a required Node.js or MongoDB version.

### Clone and Install

```bash
git clone https://github.com/IFFAT12375/e-commerce-app.git
cd e-commerce-app/Backend
npm install
```

### Configuration

Create `Backend/config/config.env` with the following variable names:

| Variable | Purpose |
| --- | --- |
| `DB_URI` | MongoDB connection string |
| `PORT` | HTTP port; defaults to `5000` |
| `JWT_SECRET` | Secret used to sign JWT values |
| `JWT_EXPIRE` | JWT lifetime used by the token method |
| `COOKIE_EXPIRE` | Cookie lifetime in days |

The password reset mailer also references `SMPT_HOST`, `SMPT_PORT`, `SMPT_SERVICE`, `SMPT_MAIL`, and `SMPT_PASSWORD`, but that implementation is currently commented out.

### Run

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The server is available at `http://localhost:5000` when `PORT` is `5000`.

## Usage

All routes are mounted below `/api`.

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/register` | Public | Register a user |
| `POST` | `/api/login` | Public | Log in |
| `GET` | `/api/logout` | Public | Clear the authentication cookie |
| `POST` | `/api/password/forgot` | Public | Request a password reset |
| `PUT` | `/api/password/reset/:token` | Public | Reset a password |
| `GET` | `/api/products` | Public | List products |
| `GET` | `/api/product/:id` | Public | Retrieve a product |
| `POST` | `/api/admin/product/new` | Admin | Create a product |
| `PUT` | `/api/admin/product/:id` | Admin | Update a product |
| `DELETE` | `/api/admin/product/:id` | Admin | Delete a product |
| `POST` | `/api/order/new` | Authenticated | Create an order |
| `GET` | `/api/order/:id` | Authenticated | Retrieve an order |
| `GET` | `/api/orders/me` | Authenticated | Retrieve the user's orders |
| `GET` | `/api/admin/orders` | Admin | Retrieve all orders |
| `PUT` | `/api/admin/order/:id` | Admin | Update order status |
| `DELETE` | `/api/admin/order/:id` | Admin | Delete an order |

Example login request:

```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"your-password"}'
```

Successful authenticated responses set an HTTP-only `token` cookie.

## Roadmap

- [x] Build the Express API foundation.
- [x] Add user, product, and order Mongoose models.
- [x] Add JWT and role-based authentication middleware.
- [x] Add password hashing and reset-token support.
- [ ] Add and run automated tests.
- [ ] Complete product controller implementation.
- [ ] Complete and configure Cloudinary avatar and image uploads.
- [ ] Restore working password recovery email delivery.
- [ ] Add payment integration.
- [ ] Add Docker support.
- [ ] Add API documentation or an interactive API UI.

## Author

Iffat Sattar

- [GitHub](https://github.com/IFFAT12375)
- [LinkedIn](https://www.linkedin.com/in/iffat-sattar-134b62182/)
