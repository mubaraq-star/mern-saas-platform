# 🚀 NestJS SaaS Platform - Setup Guide

## Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mern-saas-platform
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in your values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/nestjs-saas-platform
   JWT_SECRET=your-secret-key
   JWT_REFRESH_SECRET=your-refresh-secret
   STRIPE_SECRET_KEY=sk_test_...
   # ... etc
   ```

4. **Start the development server**
   ```bash
   npm run start:dev
   ```

5. **Access the application**
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api/docs
   - Health Check: http://localhost:5000/api/health

## Project Structure Explained

### Clean Architecture Layers

#### 1. **Presentation Layer** (`controllers/`)
- Handles HTTP requests and responses
- Uses DTOs for request validation
- Swagger decorators for API documentation
- Delegates business logic to services

#### 2. **Application Layer** (`services/`)
- Contains business logic
- Orchestrates domain operations
- Calls external services
- Implements use cases

#### 3. **Domain Layer** (`schemas/`)
- Defines data models
- Business rules and validations
- Mongoose schemas

#### 4. **Infrastructure Layer**
- Database connections
- External API integrations
- Email services, etc.

### Module Structure

Each module follows this pattern:
```
module-name/
├── controllers/          # HTTP handlers
├── services/            # Business logic
├── dto/                 # Data Transfer Objects
├── schemas/             # Database models
├── guards/              # Authorization (optional)
├── strategies/          # Auth strategies (optional)
└── module-name.module.ts
```

## Key Features Implemented

### ✅ Authentication Module
- **JWT-based authentication** with access and refresh tokens
- **Password hashing** using bcrypt
- **Role-based access control** (User, Premium, Admin)
- **Password reset** functionality
- **Guards and strategies** for route protection

**Endpoints:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh tokens
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/logout` - Logout

### ✅ Users Module
- User profile management
- User listing with pagination (admin)
- Update profile
- Soft delete

**Endpoints:**
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/:id` - Get user by ID (Admin)
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### ✅ Subscriptions Module
- Subscription management
- Multiple plan support (Free, Basic, Premium)
- Status tracking

**Endpoints:**
- `GET /api/subscriptions/status` - Get user subscription

### ✅ Analytics Module
- User statistics
- Admin-only access

**Endpoints:**
- `GET /api/analytics/users` - Get user stats (Admin)

### ✅ Admin Module
- User management
- Role assignment
- Account activation/deactivation

**Endpoints:**
- `PUT /api/admin/users/:id/status` - Toggle user status
- `PUT /api/admin/users/:id/role` - Update user role

## Development Guidelines

### Creating a New Module

1. **Generate module with NestJS CLI**
   ```bash
   nest g module modules/feature-name
   nest g controller modules/feature-name/controllers/feature-name
   nest g service modules/feature-name/services/feature-name
   ```

2. **Create schemas**
   ```typescript
   import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
   
   @Schema({ timestamps: true })
   export class FeatureName {
     @Prop({ required: true })
     name: string;
   }
   
   export const FeatureNameSchema = SchemaFactory.createForClass(FeatureName);
   ```

3. **Create DTOs**
   ```typescript
   import { IsString, IsNotEmpty } from 'class-validator';
   import { ApiProperty } from '@nestjs/swagger';
   
   export class CreateFeatureDto {
     @ApiProperty()
     @IsString()
     @IsNotEmpty()
     name: string;
   }
   ```

4. **Implement service**
   ```typescript
   @Injectable()
   export class FeatureNameService {
     constructor(
       @InjectModel(FeatureName.name) 
       private model: Model<FeatureNameDocument>
     ) {}
     
     async findAll() {
       return this.model.find().exec();
     }
   }
   ```

5. **Implement controller**
   ```typescript
   @ApiTags('Feature Name')
   @Controller('feature-name')
   export class FeatureNameController {
     constructor(private service: FeatureNameService) {}
     
     @Get()
     async findAll() {
       return this.service.findAll();
     }
   }
   ```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Code Quality

```bash
# Lint
npm run lint

# Format
npm run format
```

## Next Steps

### TODO: Stripe Integration
1. Install Stripe SDK (already in package.json)
2. Create payment service
3. Implement webhook handler
4. Add subscription creation endpoint

### TODO: Email Notifications
1. Configure Nodemailer
2. Create email templates
3. Implement email service
4. Add email verification

### TODO: Advanced Features
- [ ] Implement WebSockets for real-time updates
- [ ] Add Redis for caching
- [ ] Implement Bull queues for background jobs
- [ ] Add file upload functionality
- [ ] Implement audit logging
- [ ] Add API rate limiting per user

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or change PORT in .env
```

### Module Import Errors
- Ensure all dependencies are installed
- Check circular dependencies
- Verify imports use correct paths

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Swagger/OpenAPI](https://swagger.io)
- [Stripe API](https://stripe.com/docs/api)

## Support

For issues or questions, please open a GitHub issue or contact the development team.
