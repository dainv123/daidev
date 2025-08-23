# API Modules Analysis - Daidev Backend

## Tổng quan

Phân tích chi tiết về các modules trong API backend của hệ thống Daidev, dựa trên việc verify codebase hiện tại.

## Core Modules

### 1. **AuthModule** (`apps/api/src/auth/`)
**Chức năng**: Xử lý authentication và authorization

**Components**:
- `auth.controller.ts` - Auth endpoints
- `auth.service.ts` - Auth business logic
- `auth.module.ts` - Module configuration
- `strategies/` - Passport strategies
  - `jwt.strategy.ts` - JWT authentication
  - `local.strategy.ts` - Local authentication
- `guards/` - Route guards
  - `jwt-auth.guard.ts` - JWT route protection
  - `roles.guard.ts` - Role-based access control
- `decorators/` - Custom decorators
  - `roles.decorator.ts` - Role decorator
- `dto/` - Data transfer objects
  - `auth.dto.ts` - Auth request/response DTOs

**Endpoints**:
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile
- `POST /auth/refresh` - Refresh JWT token

### 2. **UsersModule** (`apps/api/src/users/`)
**Chức năng**: Quản lý người dùng

**Components**:
- `users.controller.ts` - User CRUD endpoints
- `users.service.ts` - User business logic
- `users.schema.ts` - User MongoDB schema
- `users.module.ts` - Module configuration

**Schema Fields**:
```typescript
{
  username: String,
  email: String,
  password: String,
  role: String, // 'admin', 'user'
  tenantId: String,
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 3. **ThemesModule** (`apps/api/src/themes/`)
**Chức năng**: Quản lý portfolio themes

**Components**:
- `themes.controller.ts` - Theme CRUD endpoints
- `themes.service.ts` - Theme business logic
- `themes.schema.ts` - Theme MongoDB schema
- `themes.module.ts` - Module configuration

**Schema Fields**:
```typescript
{
  name: String,
  description: String,
  previewImage: String,
  demoUrl: String,
  sourceUrl: String,
  tags: [String],
  category: String,
  price: Number,
  isActive: Boolean,
  tenantId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. **BlogsModule** (`apps/api/src/blogs/`)
**Chức năng**: Quản lý blog posts

**Components**:
- `blogs.controller.ts` - Blog CRUD endpoints
- `blogs.service.ts` - Blog business logic
- `blogs.schema.ts` - Blog MongoDB schema
- `blogs.module.ts` - Module configuration

**Schema Fields**:
```typescript
{
  title: String,
  content: String,
  excerpt: String,
  featuredImage: String,
  tags: [String],
  author: String,
  isPublished: Boolean,
  publishedAt: Date,
  tenantId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. **CertificatesModule** (`apps/api/src/certificates/`)
**Chức năng**: Quản lý chứng chỉ

**Components**:
- `certificates.controller.ts` - Certificate CRUD endpoints
- `certificates.service.ts` - Certificate business logic
- `certificates.schema.ts` - Certificate MongoDB schema
- `certificates.module.ts` - Module configuration

**Schema Fields**:
```typescript
{
  name: String,
  issuer: String,
  issueDate: Date,
  expiryDate: Date,
  certificateUrl: String,
  credentialId: String,
  tenantId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. **TagsModule** (`apps/api/src/tags/`)
**Chức năng**: Quản lý tags cho themes và blogs

**Components**:
- `tags.controller.ts` - Tag CRUD endpoints
- `tags.service.ts` - Tag business logic
- `tags.schema.ts` - Tag MongoDB schema
- `tags.module.ts` - Module configuration

**Schema Fields**:
```typescript
{
  name: String,
  description: String,
  color: String,
  category: String, // 'theme', 'blog'
  tenantId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. **ImagesModule** (`apps/api/src/images/`)
**Chức năng**: Quản lý hình ảnh và Cloudinary integration

**Components**:
- `images.controller.ts` - Image upload/management endpoints
- `images.service.ts` - Image business logic
- `images.schema.ts` - Image metadata schema
- `images.module.ts` - Module configuration

**Schema Fields**:
```typescript
{
  publicId: String, // Cloudinary public ID
  url: String,
  secureUrl: String,
  format: String,
  width: Number,
  height: Number,
  bytes: Number,
  resourceType: String, // 'image', 'video'
  folder: String,
  tenantId: String,
  createdAt: Date
}
```

### 8. **ContactMessagesModule** (`apps/api/src/contact-messages/`)
**Chức năng**: Quản lý tin nhắn liên hệ

**Components**:
- `contact-messages.controller.ts` - Contact message endpoints
- `contact-messages.service.ts` - Contact message business logic
- `contact-messages.schema.ts` - Contact message schema
- `contact-messages.module.ts` - Module configuration

**Schema Fields**:
```typescript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  isRead: Boolean,
  tenantId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 9. **SiteSettingsModule** (`apps/api/src/site-settings/`)
**Chức năng**: Quản lý cài đặt website

**Components**:
- `site-settings.controller.ts` - Site settings endpoints
- `site-settings.service.ts` - Site settings business logic
- `site-settings.schema.ts` - Site settings schema
- `site-settings.module.ts` - Module configuration

**Schema Fields**:
```typescript
{
  siteName: String,
  siteDescription: String,
  logo: String,
  favicon: String,
  header: {
    title: String,
    subtitle: String,
    backgroundImage: String
  },
  footer: {
    copyright: String,
    socialLinks: [{
      platform: String,
      url: String,
      icon: String
    }]
  },
  tenantId: String,
  createdAt: Date,
  updatedAt: Date
}
```

## New Modules (Added Recently)

### 10. **SkillsModule** (`apps/api/src/skills/`)
**Chức năng**: Quản lý kỹ năng

**Schema Fields**:
```typescript
{
  name: String,
  category: String, // 'programming', 'design', 'soft-skills'
  proficiency: Number, // 1-5 scale
  icon: String,
  color: String,
  tenantId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 11. **LanguagesModule** (`apps/api/src/languages/`)
**Chức năng**: Quản lý ngôn ngữ

**Schema Fields**:
```typescript
{
  name: String,
  code: String, // 'en', 'vi', 'fr'
  proficiency: String, // 'native', 'fluent', 'intermediate', 'basic'
  isActive: Boolean,
  tenantId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 12. **ExperienceModule** (`apps/api/src/experience/`)
**Chức năng**: Quản lý kinh nghiệm làm việc

**Schema Fields**:
```typescript
{
  title: String,
  company: String,
  location: String,
  startDate: Date,
  endDate: Date,
  isCurrent: Boolean,
  description: String,
  technologies: [String],
  achievements: [String],
  tenantId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 13. **EducationModule** (`apps/api/src/education/`)
**Chức năng**: Quản lý học vấn

**Schema Fields**:
```typescript
{
  degree: String,
  institution: String,
  field: String,
  startDate: Date,
  endDate: Date,
  isCurrent: Boolean,
  description: String,
  gpa: Number,
  certificate: String,
  tenantId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 14. **HealthModule** (`apps/api/src/health/`)
**Chức năng**: Health check endpoints

**Components**:
- `health.controller.ts` - Health check endpoints
- `health.module.ts` - Module configuration

**Endpoints**:
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed health check

## Utility Modules

### 15. **DemoModule** (`apps/api/src/demo/`)
**Chức năng**: Demo endpoints cho testing

### 16. **Middleware** (`apps/api/src/middleware/`)
**Chức năng**: Custom middleware
- `tenant.middleware.ts` - Multi-tenancy middleware

## Database Seeding

### Seed Scripts (`apps/api/src/database/seeds/`)
- `seed.ts` - Main seed script
- `all-settings.seed.ts` - Site settings seeding
- `fix-tags.ts` - Tag data fixes

## API Endpoints Summary

### Authentication
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `GET /api/v1/auth/profile`
- `POST /api/v1/auth/refresh`

### Users
- `GET /api/v1/users`
- `POST /api/v1/users`
- `GET /api/v1/users/:id`
- `PUT /api/v1/users/:id`
- `DELETE /api/v1/users/:id`

### Themes
- `GET /api/v1/themes`
- `POST /api/v1/themes`
- `GET /api/v1/themes/:id`
- `PUT /api/v1/themes/:id`
- `DELETE /api/v1/themes/:id`

### Blogs
- `GET /api/v1/blogs`
- `POST /api/v1/blogs`
- `GET /api/v1/blogs/:id`
- `PUT /api/v1/blogs/:id`
- `DELETE /api/v1/blogs/:id`

### Certificates
- `GET /api/v1/certificates`
- `POST /api/v1/certificates`
- `GET /api/v1/certificates/:id`
- `PUT /api/v1/certificates/:id`
- `DELETE /api/v1/certificates/:id`

### Tags
- `GET /api/v1/tags`
- `POST /api/v1/tags`
- `GET /api/v1/tags/:id`
- `PUT /api/v1/tags/:id`
- `DELETE /api/v1/tags/:id`

### Images
- `POST /api/v1/images/upload`
- `GET /api/v1/images`
- `DELETE /api/v1/images/:id`

### Contact Messages
- `POST /api/v1/contact-messages`
- `GET /api/v1/contact-messages`
- `PUT /api/v1/contact-messages/:id`

### Site Settings
- `GET /api/v1/site-settings`
- `PUT /api/v1/site-settings`

### Skills
- `GET /api/v1/skills`
- `POST /api/v1/skills`
- `GET /api/v1/skills/:id`
- `PUT /api/v1/skills/:id`
- `DELETE /api/v1/skills/:id`

### Languages
- `GET /api/v1/languages`
- `POST /api/v1/languages`
- `GET /api/v1/languages/:id`
- `PUT /api/v1/languages/:id`
- `DELETE /api/v1/languages/:id`

### Experience
- `GET /api/v1/experience`
- `POST /api/v1/experience`
- `GET /api/v1/experience/:id`
- `PUT /api/v1/experience/:id`
- `DELETE /api/v1/experience/:id`

### Education
- `GET /api/v1/education`
- `POST /api/v1/education`
- `GET /api/v1/education/:id`
- `PUT /api/v1/education/:id`
- `DELETE /api/v1/education/:id`

### Health
- `GET /api/v1/health`
- `GET /api/v1/health/detailed`

## Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Route guards for protected endpoints
- Password hashing với bcryptjs

### Rate Limiting
- Throttler module với 100 requests/minute
- Configurable rate limits

### CORS Configuration
- Configurable allowed origins
- Credentials support

### Input Validation
- Class-validator decorators
- DTO validation
- Whitelist validation

## Multi-tenancy Support

### Tenant Isolation
- `tenantId` field trong tất cả collections
- Tenant middleware (temporarily disabled)
- Data isolation per tenant

### Tenant Management
- Tenant-specific data queries
- Tenant-aware CRUD operations
- Tenant validation

## External Integrations

### Cloudinary
- Image upload và management
- Image transformations
- Cloudinary SDK integration

### Resend Email
- Contact form email sending
- Email templates
- Email delivery tracking

### AWS S3 (Configured)
- File storage backup
- S3 presigned URLs
- S3 client configuration

## Monitoring & Logging

### Health Checks
- Basic health endpoint
- Detailed health checks
- Database connectivity checks

### Logging
- Structured logging
- Error tracking
- Performance monitoring

## Recommendations

1. **Enable Tenant Middleware**: Re-enable tenant middleware for proper multi-tenancy
2. **Add API Versioning**: Implement proper API versioning strategy
3. **Enhanced Validation**: Add more comprehensive input validation
4. **Caching**: Implement Redis caching for frequently accessed data
5. **API Documentation**: Enhance Swagger documentation
6. **Testing**: Add comprehensive unit và integration tests
7. **Monitoring**: Add application performance monitoring (APM)
8. **Security**: Implement API key authentication for external integrations 