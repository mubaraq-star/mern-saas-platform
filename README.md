# 🚀 MERN SaaS Platform

> A production-ready Software as a Service (SaaS) application built with the MERN stack, featuring event-driven architecture, microservices support, and enterprise-grade features.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This professional SaaS platform combines React frontend with a **NestJS** backend, designed to showcase enterprise-level development skills with clean architecture patterns, event-driven design, and scalable microservices. The backend leverages NestJS's powerful dependency injection, modular architecture, and TypeScript-first approach to deliver production-ready code. Perfect for demonstrating full-stack capabilities to potential employers or clients.

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

### DevOps & Tools
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline
- **Kubernetes** - Container orchestration (optional)
- **Nginx** - Reverse proxy
- **PM2** - Process management

## 🏛️ Architecture

This project follows **Clean Architecture** principles with NestJS's modular design:

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

### NestJS Modules Architecture
- **Modular Design**: Each feature is encapsulated in its own module
- **Dependency Injection**: Loose coupling and easy testing
- **Guards & Interceptors**: Cross-cutting concerns
- **Event-Driven**: EventEmitter for decoupled communication
- **Microservices Ready**: Easy transition to microservices

## 📁 Project Structure

```
mern-saas-platform/
├── client/                          # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Register.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   └── Analytics.tsx
│   │   │   ├── subscription/
│   │   │   │   ├── PricingPlans.tsx
│   │   │   │   └── SubscriptionStatus.tsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminPanel.tsx
│   │   │   │   ├── UserManagement.tsx
│   │   │   │   └── SystemAnalytics.tsx
│   │   │   └── common/
│   │   │       ├── Header.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── Sidebar.tsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Admin.tsx
│   │   ├── services/                # API communication
│   │   │   ├── api.ts
│   │   │   ├── auth.service.ts
│   │   │   └── subscription.service.ts
│   │   ├── store/                   # Redux store
│   │   │   ├── index.ts
│   │   │   └── slices/
│   │   │       ├── authSlice.ts
│   │   │       └── userSlice.ts
│   │   ├── utils/                   # Helper functions
│   │   │   ├── constants.ts
│   │   │   └── helpers.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── server/                          # NestJS Backend
│   ├── src/
│   │   ├── config/                  # Configuration files
│   │   │   ├── database.config.ts   # MongoDB configuration
│   │   │   └── env.validation.ts    # Environment validation
│   │   ├── common/                  # Shared utilities
│   │   │   ├── controllers/
│   │   │   │   └── health.controller.ts
│   │   │   ├── decorators/          # Custom decorators
│   │   │   │   ├── auth.decorator.ts
│   │   │   │   └── current-user.decorator.ts
│   │   │   ├── dto/                 # Base DTOs
│   │   │   │   └── response.dto.ts
│   │   │   ├── enums/               # Shared enums
│   │   │   │   └── index.ts
│   │   │   ├── filters/             # Exception filters
│   │   │   │   └── http-exception.filter.ts
│   │   │   └── interfaces/          # Shared interfaces
│   │   │       └── auth.interface.ts
│   │   ├── modules/                 # Feature modules
│   │   │   ├── auth/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── auth.controller.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── login.dto.ts
│   │   │   │   │   ├── register.dto.ts
│   │   │   │   │   ├── forgot-password.dto.ts
│   │   │   │   │   └── reset-password.dto.ts
│   │   │   │   ├── guards/
│   │   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   │   ├── jwt-refresh.guard.ts
│   │   │   │   │   └── roles.guard.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── auth.service.ts
│   │   │   │   ├── strategies/
│   │   │   │   │   ├── jwt.strategy.ts
│   │   │   │   │   ├── jwt-refresh.strategy.ts
│   │   │   │   │   └── local.strategy.ts
│   │   │   │   └── auth.module.ts
│   │   │   ├── users/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── users.controller.ts
│   │   │   │   ├── dto/
│   │   │   │   │   └── update-user.dto.ts
│   │   │   │   ├── schemas/
│   │   │   │   │   └── user.schema.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── users.service.ts
│   │   │   │   └── users.module.ts
│   │   │   ├── subscriptions/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── subscriptions.controller.ts
│   │   │   │   ├── schemas/
│   │   │   │   │   └── subscription.schema.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── subscriptions.service.ts
│   │   │   │   └── subscriptions.module.ts
│   │   │   ├── payments/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── payments.controller.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── payments.service.ts
│   │   │   │   └── payments.module.ts
│   │   │   ├── analytics/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── analytics.controller.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── analytics.service.ts
│   │   │   │   └── analytics.module.ts
│   │   │   ├── admin/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── admin.controller.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── admin.service.ts
│   │   │   │   └── admin.module.ts
│   │   │   └── notifications/
│   │   │       ├── services/
│   │   │       │   └── notifications.service.ts
│   │   │       └── notifications.module.ts
│   │   ├── app.module.ts            # Root application module
│   │   └── main.ts                  # Application entry point
│   ├── test/                        # E2E tests
│   ├── logs/                        # Application logs
│   ├── .env.example                 # Environment template
│   ├── .eslintrc.js                 # ESLint configuration
│   ├── .prettierrc                  # Prettier configuration
│   ├── nest-cli.json                # NestJS CLI config
│   ├── package.json
│   └── tsconfig.json
│
├── .github/                         # GitHub Actions
│   └── workflows/
│       └── ci-cd.yml
├── docker-compose.yml               # Docker orchestration
├── .env.example                     # Environment template
├── .gitignore
└── README.md
```

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
git clone https://github.com/yourusername/mern-saas-platform.git
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

### Using Docker

```bash
# Build and run all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Deployment

#### Backend (NestJS)
```bash
cd server
npm run build
npm run start:prod
```

#### Frontend (React)
```bash
cd client
npm run build
# Deploy the 'build' folder to Netlify/Vercel
```

### CI/CD with GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that:
- Runs tests on push/PR
- Builds Docker images
- Deploys to your hosting provider
- Runs security scans

## 🗺️ Development Roadmap

### ✅ Phase 1: Foundation (Weeks 1-2)
- [x] Project setup & architecture
- [x] JWT authentication
- [x] Role-based access control
- [x] Password reset flow

### 🔄 Phase 2: Payments (Week 3)
- [ ] Stripe integration
- [ ] Subscription plans
- [ ] Webhook handling
- [ ] Payment history

### 🔄 Phase 3: Analytics (Week 4)
- [ ] Backend analytics API
- [ ] Frontend visualization
- [ ] Custom reports
- [ ] Data export

### 🔄 Phase 4: Admin Panel (Week 5)
- [ ] User management UI
- [ ] Role assignment
- [ ] System monitoring
- [ ] Audit logs

### 🔄 Phase 5: Deployment (Week 6)
- [ ] Docker configuration
- [ ] CI/CD pipeline
- [ ] Production deployment
- [ ] Performance optimization

### 🚀 Future Enhancements
- [ ] Microservices architecture
- [ ] Kubernetes deployment
- [ ] Real-time notifications (WebSockets)
- [ ] Multi-tenancy support
- [ ] API rate limiting & throttling
- [ ] GraphQL API
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write unit tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

**Developer**: Your Name  
**Email**: your.email@example.com  
**Portfolio**: https://yourportfolio.com  
**LinkedIn**: https://linkedin.com/in/yourprofile

---

<div align="center">
  <p>Built with ❤️ using the MERN Stack</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>