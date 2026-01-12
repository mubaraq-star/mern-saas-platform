# 🏗️ NestJS SaaS Platform - Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│          Redux • React Router • Axios • TypeScript               │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST API
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway (NestJS)                          │
│              Guards • Interceptors • Middleware                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Auth       │  │   Users      │  │ Subscription │
│   Module     │  │   Module     │  │   Module     │
└──────────────┘  └──────────────┘  └──────────────┘
        ↓                ↓                ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Payments   │  │  Analytics   │  │   Admin      │
│   Module     │  │   Module     │  │   Module     │
└──────────────┘  └──────────────┘  └──────────────┘
        │                │                │
        └────────────────┼────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                      MongoDB Database                            │
│         Users • Subscriptions • Payments • Analytics             │
└─────────────────────────────────────────────────────────────────┘
```

## NestJS Module Architecture

### Dependency Flow

```
AppModule (Root)
├── ConfigModule (Global)
├── MongooseModule (Global)
├── ThrottlerModule (Rate Limiting)
├── EventEmitterModule (Events)
├── ScheduleModule (Cron Jobs)
│
├── AuthModule
│   ├── UsersModule (Imported)
│   ├── JwtModule
│   └── PassportModule
│
├── UsersModule
│   └── MongooseModule.forFeature(User)
│
├── SubscriptionsModule
│   └── MongooseModule.forFeature(Subscription)
│
├── PaymentsModule
│   └── StripeModule (Future)
│
├── AnalyticsModule
│   └── UsersModule (Imported)
│
├── AdminModule
│   └── UsersModule (Imported)
│
└── NotificationsModule
    └── EmailService
```

## Clean Architecture Layers

### 1. Presentation Layer (Controllers)

**Responsibility:** Handle HTTP requests and responses

```typescript
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
```

**Features:**
- Route handlers
- Request validation (DTOs)
- Response formatting
- Swagger documentation
- Error handling

### 2. Application Layer (Services)

**Responsibility:** Business logic and use cases

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}
  
  async findAll() {
    return this.userModel.find().exec();
  }
}
```

**Features:**
- Business rules
- Data orchestration
- External service calls
- Transaction management

### 3. Domain Layer (Schemas/Entities)

**Responsibility:** Data models and business entities

```typescript
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;
  
  @Prop({ type: String, enum: UserRole })
  role: UserRole;
}
```

**Features:**
- Data structure
- Validation rules
- Virtual properties
- Relationships

### 4. Infrastructure Layer

**Responsibility:** External dependencies

- Database connections
- Third-party APIs (Stripe, email)
- File storage
- Message queues

## Request Flow

```
Client Request
    ↓
[Middleware: CORS, Helmet, Compression]
    ↓
[Guard: JWT Authentication]
    ↓
[Guard: Role Authorization]
    ↓
[Interceptor: Transform Request]
    ↓
[Pipe: Validate DTO]
    ↓
Controller → Service → Repository → Database
    ↓
[Interceptor: Transform Response]
    ↓
[Filter: Exception Handling]
    ↓
Client Response
```

## Authentication Flow

```
1. User Registration
   ├── POST /api/auth/register
   ├── Validate DTO (email, password, name)
   ├── Hash password (bcrypt)
   ├── Create user in DB
   ├── Generate JWT tokens
   └── Return tokens

2. User Login
   ├── POST /api/auth/login
   ├── Validate credentials
   ├── Check user status
   ├── Verify password
   ├── Generate JWT tokens
   └── Return tokens

3. Protected Route Access
   ├── Request with Bearer token
   ├── JwtAuthGuard validates token
   ├── JwtStrategy extracts payload
   ├── RolesGuard checks permissions
   └── Execute route handler
```

## Module Responsibilities

### Auth Module
- User registration
- Login/logout
- JWT token generation
- Password reset
- Session management

### Users Module
- User CRUD operations
- Profile management
- User search and filtering
- Pagination support

### Subscriptions Module
- Plan management
- Subscription creation
- Upgrade/downgrade
- Cancellation
- Status tracking

### Payments Module
- Stripe integration
- Payment intent creation
- Webhook handling
- Invoice generation
- Payment history

### Analytics Module
- User statistics
- Revenue tracking
- Activity monitoring
- Custom reports
- Data aggregation

### Admin Module
- User management
- Role assignment
- System monitoring
- Audit logs
- Bulk operations

### Notifications Module
- Email service
- Event-based notifications
- Template management
- Queue processing

## Event-Driven Architecture

```typescript
// Event Emitter Example
@Injectable()
export class AuthService {
  constructor(private eventEmitter: EventEmitter2) {}
  
  async register(dto: RegisterDto) {
    const user = await this.createUser(dto);
    
    // Emit event
    this.eventEmitter.emit('user.registered', user);
    
    return user;
  }
}

// Event Listener
@Injectable()
export class NotificationsService {
  @OnEvent('user.registered')
  async handleUserRegistered(user: User) {
    await this.sendWelcomeEmail(user.email);
  }
}
```

## Security Layers

```
1. Network Level
   ├── CORS configuration
   ├── Helmet (security headers)
   └── Rate limiting

2. Application Level
   ├── JWT authentication
   ├── Role-based access control
   ├── Input validation (DTOs)
   └── SQL injection prevention (Mongoose)

3. Data Level
   ├── Password hashing (bcrypt)
   ├── Sensitive data exclusion
   └── Encryption at rest (MongoDB)
```

## Database Schema Design

```
Users Collection
├── _id: ObjectId
├── email: String (unique, indexed)
├── password: String (hashed, select: false)
├── firstName: String
├── lastName: String
├── role: Enum [user, premium, admin]
├── isActive: Boolean
├── lastLogin: Date
├── createdAt: Date
└── updatedAt: Date

Subscriptions Collection
├── _id: ObjectId
├── userId: ObjectId (ref: 'User', indexed)
├── plan: Enum [free, basic, premium]
├── status: Enum [active, inactive, cancelled]
├── stripeSubscriptionId: String (indexed)
├── currentPeriodStart: Date
├── currentPeriodEnd: Date
├── amount: Number
└── timestamps

Payments Collection (Future)
├── _id: ObjectId
├── userId: ObjectId (ref: 'User')
├── subscriptionId: ObjectId (ref: 'Subscription')
├── amount: Number
├── currency: String
├── status: Enum [pending, succeeded, failed]
├── stripePaymentId: String
└── timestamps
```

## Scalability Strategy

### Horizontal Scaling
- Stateless application design
- JWT tokens (no server sessions)
- MongoDB replica sets
- Load balancer ready

### Microservices Migration Path
```
Monolith (Current)
    ↓
Feature Modules (Current State)
    ↓
Standalone Microservices (Future)
    ├── Auth Service
    ├── User Service
    ├── Payment Service
    ├── Analytics Service
    └── Notification Service
```

### Performance Optimizations
- Database indexing
- Query optimization
- Caching strategy (Redis - Future)
- Response compression
- API pagination
- Connection pooling

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│         Load Balancer (Nginx)            │
└────────────┬────────────────────────────┘
             │
      ┌──────┴──────┐
      ↓             ↓
┌──────────┐  ┌──────────┐
│ NestJS   │  │ NestJS   │  (PM2/Docker)
│ Instance │  │ Instance │
└────┬─────┘  └────┬─────┘
     │             │
     └──────┬──────┘
            ↓
    ┌──────────────┐
    │   MongoDB    │  (Replica Set)
    │   Cluster    │
    └──────────────┘
```

## Best Practices Implemented

✅ **Separation of Concerns** - Each layer has clear responsibility  
✅ **Dependency Injection** - Loose coupling, easy testing  
✅ **DTO Validation** - Type-safe request/response  
✅ **Error Handling** - Centralized exception filters  
✅ **API Documentation** - Swagger/OpenAPI  
✅ **Security** - JWT, RBAC, input validation  
✅ **Logging** - Winston logger integration  
✅ **Testing** - Unit and E2E test structure  
✅ **Code Quality** - ESLint, Prettier  
✅ **Environment Config** - Validated configuration  

## Future Enhancements

- [ ] Redis caching layer
- [ ] Bull queue for background jobs
- [ ] WebSocket integration
- [ ] GraphQL API option
- [ ] OpenTelemetry observability
- [ ] Kubernetes deployment
- [ ] API versioning
- [ ] Multi-tenancy support
