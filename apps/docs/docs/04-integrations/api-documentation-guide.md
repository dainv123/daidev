# API Documentation Guide

This guide covers API documentation setup, Swagger integration, and API testing for the daidev platform.

## 📚 API Documentation Overview

The daidev platform provides comprehensive API documentation through multiple interfaces:

- **Swagger UI**: Interactive API documentation and testing
- **Swagger Proxy**: Custom API documentation proxy
- **OpenAPI Specification**: Machine-readable API specification
- **Postman Collection**: Pre-configured API testing collection

## 🔧 Swagger Integration

### Swagger Proxy Setup

The daidev platform includes a custom Swagger proxy service (`apps/swagger-proxy/`) that provides:

- Centralized API documentation
- Custom styling and branding
- Enhanced security features
- API key management

#### Swagger Proxy Configuration
```javascript
// apps/swagger-proxy/swagger-proxy.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Daidev API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    url: '/swagger.json',
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    showCommonExtensions: true,
  }
}));

// API proxy
app.use('/api/v1', createProxyMiddleware({
  target: process.env.API_URL || 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/v1': '/api/v1'
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add authentication headers if needed
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Swagger Proxy running on port ${PORT}`);
});
```

### Docker Configuration
```dockerfile
# apps/swagger-proxy/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "swagger-proxy.js"]
```

## 📖 API Endpoints Documentation

### Authentication Endpoints

#### POST /api/v1/auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "admin@example.com",
      "role": "admin",
      "profile": {
        "name": "Admin User",
        "avatar": "https://res.cloudinary.com/.../avatar.jpg"
      }
    }
  }
}
```

#### POST /api/v1/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439012",
      "email": "user@example.com",
      "role": "viewer",
      "profile": {
        "name": "John Doe"
      }
    }
  }
}
```

### Themes Endpoints

#### GET /api/v1/themes
Get all themes with pagination and filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `tags` (string): Comma-separated tags to filter by
- `search` (string): Search term for title/description

**Response:**
```json
{
  "success": true,
  "data": {
    "themes": [
      {
        "id": "507f1f77bcf86cd799439013",
        "title": "Modern Portfolio Theme",
        "description": "A modern portfolio theme with dark mode",
        "tags": ["portfolio", "modern", "dark"],
        "previewImage": "https://res.cloudinary.com/.../preview.jpg",
        "demoUrl": "https://demo.example.com",
        "downloadUrl": "https://download.example.com",
        "price": 29.99,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

#### POST /api/v1/themes
Create a new theme (Admin only).

**Request Body:**
```json
{
  "title": "New Theme",
  "description": "Theme description",
  "tags": ["portfolio", "modern"],
  "demoUrl": "https://demo.example.com",
  "downloadUrl": "https://download.example.com",
  "price": 29.99
}
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

#### PUT /api/v1/themes/:id
Update an existing theme (Admin only).

**Request Body:**
```json
{
  "title": "Updated Theme Title",
  "description": "Updated description",
  "tags": ["portfolio", "modern", "responsive"]
}
```

#### DELETE /api/v1/themes/:id
Delete a theme (Admin only).

### Blogs Endpoints

#### GET /api/v1/blogs
Get all blog posts with pagination and filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `tags` (string): Comma-separated tags to filter by
- `search` (string): Search term for title/content

**Response:**
```json
{
  "success": true,
  "data": {
    "blogs": [
      {
        "id": "507f1f77bcf86cd799439014",
        "title": "Getting Started with Next.js",
        "content": "Next.js is a React framework...",
        "excerpt": "Learn how to get started with Next.js...",
        "tags": ["nextjs", "react", "tutorial"],
        "previewImage": "https://res.cloudinary.com/.../blog.jpg",
        "author": "John Doe",
        "publishedAt": "2023-01-01T00:00:00.000Z",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "pages": 2
    }
  }
}
```

#### GET /api/v1/blogs/:id
Get a specific blog post by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "blog": {
      "id": "507f1f77bcf86cd799439014",
      "title": "Getting Started with Next.js",
      "content": "Next.js is a React framework...",
      "tags": ["nextjs", "react", "tutorial"],
      "previewImage": "https://res.cloudinary.com/.../blog.jpg",
      "author": "John Doe",
      "publishedAt": "2023-01-01T00:00:00.000Z",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

### Certificates Endpoints

#### GET /api/v1/certificates
Get all certificates.

**Response:**
```json
{
  "success": true,
  "data": {
    "certificates": [
      {
        "id": "507f1f77bcf86cd799439015",
        "title": "AWS Certified Solutions Architect",
        "issuer": "Amazon Web Services",
        "issueDate": "2023-01-01T00:00:00.000Z",
        "certificateUrl": "https://aws.amazon.com/certificate/...",
        "image": "https://res.cloudinary.com/.../certificate.jpg",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### Contact Endpoints

#### POST /api/v1/contact
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to discuss a project.",
  "recaptchaToken": "03AFcWeA..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### Image Upload Endpoints

#### POST /api/v1/images/upload
Upload an image to Cloudinary (Admin only).

**Request:**
```
Content-Type: multipart/form-data
Authorization: Bearer <jwt-token>
```

**Form Data:**
- `image` (file): Image file to upload
- `type` (string): Image type (theme, blog, certificate, avatar)

**Response:**
```json
{
  "success": true,
  "data": {
    "image": {
      "id": "507f1f77bcf86cd799439016",
      "cloudinaryId": "daidev/image_123",
      "url": "https://res.cloudinary.com/.../image.jpg",
      "type": "theme",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

### Site Settings Endpoints

#### GET /api/v1/site-settings
Get site configuration.

**Response:**
```json
{
  "success": true,
  "data": {
    "siteSettings": {
      "header": {
        "title": "Daidev Portfolio",
        "subtitle": "Full Stack Developer",
        "logo": "https://res.cloudinary.com/.../logo.png"
      },
      "menu": [
        {
          "label": "Home",
          "url": "/",
          "icon": "home"
        },
        {
          "label": "About",
          "url": "/about",
          "icon": "user"
        }
      ],
      "footer": {
        "copyright": "© 2023 Daidev. All rights reserved.",
        "socialLinks": [
          {
            "platform": "github",
            "url": "https://github.com/daidev"
          }
        ]
      }
    }
  }
}
```

## 🔐 Authentication & Authorization

### JWT Token Structure
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "role": "admin",
    "iat": 1640995200,
    "exp": 1641600000
  }
}
```

### Role-Based Access Control

#### Admin Role
- Full CRUD access to all resources
- Image upload capabilities
- Site settings management
- User management

#### Viewer Role
- Read-only access to public resources
- No modification capabilities
- Limited API access

### Authentication Headers
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

## 🧪 API Testing

### Using Swagger UI
1. Access Swagger UI: `http://localhost:3006/api-docs`
2. Click "Authorize" to add JWT token
3. Test endpoints directly from the interface
4. View request/response examples

### Using Postman
1. Import the Postman collection
2. Set environment variables
3. Use the pre-configured requests
4. Test different scenarios

### Using cURL
```bash
# Login and get token
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Use token for authenticated requests
curl -X GET http://localhost:3001/api/v1/themes \
  -H "Authorization: Bearer <jwt-token>"
```

### Using JavaScript/Fetch
```javascript
// Login
const loginResponse = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'password123'
  })
});

const { data: { token } } = await loginResponse.json();

// Use token for authenticated requests
const themesResponse = await fetch('/api/v1/themes', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 🚨 Error Handling

### Common Error Codes
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Invalid/missing token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource not found)
- `429` - Too Many Requests (Rate limiting)
- `500` - Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required",
        "value": null
      }
    ],
    "timestamp": "2023-01-01T00:00:00.000Z",
    "path": "/api/v1/auth/login"
  }
}
```

## 📈 Rate Limiting

### Rate Limit Configuration
- **Window**: 15 minutes (900,000 ms)
- **Max Requests**: 100 requests per window
- **Headers**: Include rate limit information in response headers

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## 🔍 API Monitoring

### Health Check Endpoint
```bash
GET /api/v1/health
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2023-01-01T00:00:00.000Z",
    "uptime": 3600,
    "version": "1.0.0",
    "database": "connected",
    "services": {
      "cloudinary": "connected",
      "resend": "connected"
    }
  }
}
```

### Metrics Endpoint
```bash
GET /api/v1/metrics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "requests": {
      "total": 1000,
      "successful": 950,
      "failed": 50
    },
    "responseTime": {
      "average": 150,
      "min": 50,
      "max": 500
    },
    "endpoints": {
      "/api/v1/themes": 200,
      "/api/v1/blogs": 150,
      "/api/v1/auth/login": 100
    }
  }
}
```

## 📋 API Documentation Checklist

### Setup
- [ ] Swagger UI configured
- [ ] OpenAPI specification generated
- [ ] API endpoints documented
- [ ] Authentication documented
- [ ] Error responses documented

### Testing
- [ ] Postman collection created
- [ ] Test cases written
- [ ] Authentication flow tested
- [ ] Error scenarios tested
- [ ] Rate limiting tested

### Deployment
- [ ] Swagger proxy deployed
- [ ] API documentation accessible
- [ ] CORS configured
- [ ] SSL certificates installed
- [ ] Monitoring configured 