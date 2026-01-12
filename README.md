# 🚀 MERN SaaS Platform

> Enterprise-grade SaaS application built with NestJS, React, and MongoDB. Features role-based authentication, subscription management, payment processing, and advanced analytics.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.3-red)](https://nestjs.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

A modern, scalable SaaS platform demonstrating enterprise-level architecture and best practices. Built with **NestJS** for the backend and **React** for the frontend, this application showcases clean architecture, event-driven design, and production-ready patterns suitable for real-world applications.

**Designed for:** Full-stack developers, startups, and teams looking for a robust foundation for subscription-based services.

### Key Features

#### 🔐 **Authentication & Authorization**
- JWT-based authentication (access & refresh tokens)
- Role-based access control (RBAC) - Admin, User, Premium User
- Secure password hashing with bcrypt
- Password reset flow with email verification
- OAuth integration ready (Google, GitHub)
- Session management & logout

#### 💳 **Subscription & Payments**
- Multi-tier subscription plans (Free, Basic, Premium)
- Stripe integration for payment processing
- Webhook handling for real-time subscription updates
- Payment history & invoice generation
- Automated billing & renewal
- Upgrade/downgrade subscription flows

#### 📊 **Analytics & Dashboard**
- User activity tracking & visualization
- Revenue analytics & reporting
- Real-time metrics with Chart.js/Recharts
- Custom date range filtering
- Export data to CSV/PDF
- RESTful analytics API endpoints

#### 🛡️ **Admin Panel**
- User management (activate/deactivate accounts)
- Role assignment & permission management
- Subscription overview & statistics
- System health monitoring
- Audit logs & activity tracking
- Bulk operations support

#### 🏗️ **Architecture & Scalability**
- Clean architecture with separation of concerns
- Event-driven design patterns
- Microservices-ready structure:
  - Auth Service
  - Payment Service
  - Analytics Service
  - Notification Service
- Docker & Kubernetes deployment support
- Horizontal scaling capabilities

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Chart.js / Recharts** - Data visualization
- **Tailwind CSS / Material-UI** - Styling
- **React Hook Form** - Form validation

### Backend
- **NestJS** - Progressive Node.js framework
- **Node.js** - Runtime environment
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Passport & JWT** - Authentication
- **class-validator** - DTO validation
- **class-transformer** - Object transformation
- **Swagger/OpenAPI** - API documentation
- **Stripe SDK** - Payment processing
- **Nodemailer** - Email service
- **Winston** - Logging
- **Helmet** - Security middleware
- **Jest & Supertest** - Testing

### DevOps & Infrastructure
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD automation
- **Kubernetes Ready** - Container orchestration
- **Nginx** - Reverse proxy & load balancing
- **PM2** - Process management
- **Winston** - Application logging

## 🏛️ Architecture

Built on **Clean Architecture** principles with NestJS modular design, ensuring separation of concerns and maintainability.

```
┌─────────────────────────────────────────────────────────┐
│              Presentation Layer (Controllers)            │
│         Route Handlers, DTOs, Swagger Decorators         │
├─────────────────────────────────────────────────────────┤
│              Application Layer (Services)                │
│         Business Logic, Use Cases, Orchestration         │
├─────────────────────────────────────────────────────────┤
│               Domain Layer (Entities)                    │
│            Schemas, Models, Business Rules               │
├─────────────────────────────────────────────────────────┤
│           Infrastructure Layer (Database)                │
│          MongoDB, Mongoose, External Services            │
└─────────────────────────────────────────────────────────┘
```

**Core Principles:**
- **Modular Design** - Each feature encapsulated in dedicated modules
- **Dependency Injection** - Promotes loose coupling and testability
- **Guards & Interceptors** - Cross-cutting concerns (auth, logging, validation)
- **Event-Driven** - Decoupled communication via EventEmitter
- **Microservices Ready** - Easy transition from monolith to distributed services

## 🚦 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** >= 16.0.0
- **npm** or **yarn**
- **MongoDB** >= 5.0 (local or MongoDB Atlas)
- **Docker** (optional, for containerized deployment)
- **Git**

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/mubaraq-star/mern-saas-platform.git
cd mern-saas-platform
```

#### 2️⃣ Backend Setup (NestJS)
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your configuration
# Required variables:
# - MONGODB_URI
# - JWT_SECRET
# - JWT_REFRESH_SECRET
# - STRIPE_SECRET_KEY
# - STRIPE_WEBHOOK_SECRET
# - EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS

# Start development server
npm run start:dev
```

The backend will run on `http://localhost:5000`  
API documentation available at `http://localhost:5000/api/docs`

#### 3️⃣ Frontend Setup
```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with:
# REACT_APP_API_URL=http://localhost:5000/api
# REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

#### 4️⃣ Docker Setup (Optional)
```bash
# From project root
docker-compose up -d

# This will start:
# - MongoDB container
# - Backend server
# - Frontend app
# - Nginx reverse proxy
```

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/mern-saas
MONGODB_TEST_URI=mongodb://localhost:27017/mern-saas-test

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@yoursaas.com

# Frontend URL
CLIENT_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
REACT_APP_ENV=development
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| POST | `/api/auth/refresh` | Refresh access token | Yes |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| POST | `/api/auth/reset-password/:token` | Reset password | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Subscription Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/subscriptions/plans` | Get all plans | No |
| POST | `/api/subscriptions/create` | Create subscription | Yes |
| GET | `/api/subscriptions/status` | Get user subscription | Yes |
| PUT | `/api/subscriptions/upgrade` | Upgrade subscription | Yes |
| DELETE | `/api/subscriptions/cancel` | Cancel subscription | Yes |

### Analytics Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/analytics/users` | User statistics | Admin |
| GET | `/api/analytics/revenue` | Revenue data | Admin |
| GET | `/api/analytics/activity` | User activity | Admin |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/users` | List all users | Admin |
| PUT | `/api/admin/users/:id/role` | Update user role | Admin |
| PUT | `/api/admin/users/:id/status` | Activate/deactivate user | Admin |
| GET | `/api/admin/stats` | System statistics | Admin |


## 🚀 Deployment

### Production Deployment

#### Docker Deployment (Recommended)

```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Manual Deployment

**Backend:**
```bash
cd server
npm install --production
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd client
npm install
npm run build
# Deploy 'build' folder to CDN or static hosting
```

### Hosting Recommendations

- **Backend:** AWS EC2, DigitalOcean, Heroku, Railway
- **Frontend:** Vercel, Netlify, AWS S3 + CloudFront
- **Database:** MongoDB Atlas (managed MongoDB)
- **Container Registry:** Docker Hub, AWS ECR, Google Container Registry

### CI/CD Pipeline

GitHub Actions workflow included for automated:
- Linting and testing
- Docker image building
- Deployment to staging/production
- Security scanning

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

**Development Standards:**
- Write clean, documented TypeScript code
- Follow existing ESLint and Prettier configurations
- Include unit/integration tests for new features
- Update documentation for API changes

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🛡️ Security

For security concerns, please email security@yourdomain.com instead of using the issue tracker.

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Stripe API Reference](https://stripe.com/docs/api)

---

<div align="center">
  <p>Built with modern technologies and best practices</p>
  <p><strong>⭐ Star this repository if you find it useful!</strong></p>
</div>