# NestJS SaaS Backend

> Professional NestJS backend with clean architecture, JWT authentication, and microservices-ready design

## 🚀 Quick Start

### Automated Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Manual Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm run start:dev
   ```

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup instructions and troubleshooting
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design patterns

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start production server |
| `npm run start:dev` | Start development server with hot-reload |
| `npm run start:debug` | Start server in debug mode |
| `npm run build` | Build production bundle |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Run tests with coverage |
| `npm run test:e2e` | Run end-to-end tests |

## 📁 Project Structure

```
src/
├── config/                  # Configuration
├── common/                  # Shared utilities
│   ├── controllers/
│   ├── decorators/
│   ├── dto/
│   ├── enums/
│   ├── filters/
│   └── interfaces/
├── modules/                 # Feature modules
│   ├── auth/
│   ├── users/
│   ├── subscriptions/
│   ├── payments/
│   ├── analytics/
│   ├── admin/
│   └── notifications/
├── app.module.ts
└── main.ts
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh tokens
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/profile` - Get profile
- `GET /api/users/:id` - Get user by ID (Admin)
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Subscriptions
- `GET /api/subscriptions/status` - Get subscription status

### Analytics
- `GET /api/analytics/users` - Get user statistics (Admin)

### Admin
- `PUT /api/admin/users/:id/status` - Toggle user status
- `PUT /api/admin/users/:id/role` - Update user role

### Health
- `GET /api/health` - Health check

## 📖 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:5000/api/docs

## 🔧 Environment Variables

Required environment variables:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/nestjs-saas-platform

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-password
EMAIL_FROM=noreply@saas.com
```

## 🏗️ Architecture

This backend follows **Clean Architecture** principles with clear separation of concerns:

- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and use cases
- **Schemas**: Data models and validation
- **Guards**: Authentication and authorization
- **Filters**: Exception handling
- **Interceptors**: Request/response transformation

### Key Features

✅ JWT Authentication with refresh tokens  
✅ Role-based access control (RBAC)  
✅ Input validation with DTOs  
✅ Swagger/OpenAPI documentation  
✅ Exception handling  
✅ Logging with Winston  
✅ Rate limiting  
✅ Event-driven architecture  
✅ MongoDB with Mongoose  
✅ TypeScript strict mode  
✅ ESLint + Prettier  
✅ Unit & E2E testing setup  

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Production Build

```bash
# Build
npm run build

# Start production server
npm run start:prod
```

## 🐳 Docker

```bash
# Build image
docker build -t nestjs-saas-backend .

# Run container
docker run -p 5000:5000 nestjs-saas-backend
```

## 🔒 Security

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate limiting** - Prevent abuse
- **JWT** - Stateless authentication
- **Bcrypt** - Password hashing
- **Input validation** - DTO validation
- **MongoDB injection prevention** - Mongoose sanitization

## 🚀 Deployment

See [deployment guide](../README.md#deployment) in the main README.

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 💡 Tips

- Use `@Public()` decorator to make routes public
- Use `@Roles()` decorator for role-based access
- Use `@CurrentUser()` decorator to get current user
- All routes are protected by default (JWT required)
- API versioning is enabled (`/api/v1/...`)
- Swagger docs auto-generated from decorators

## 🆘 Support

For issues or questions, please:
1. Check [SETUP.md](./SETUP.md) for common issues
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for design details
3. Open a GitHub issue

---

Built with ❤️ using NestJS
