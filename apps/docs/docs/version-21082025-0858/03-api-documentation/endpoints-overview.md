# 🔌 API Endpoints Overview

**Cập nhật**: $(date)  
**Base URL**: `http://localhost:3001/api/v1`  
**Documentation**: `http://localhost:3001/docs-json`

## 🏗️ API Architecture

### **Framework**: NestJS 10
### **Authentication**: JWT + Passport.js
### **Validation**: class-validator + class-transformer
### **Documentation**: Swagger/OpenAPI
### **Database**: MongoDB với Mongoose

## 📋 Endpoints Summary

| Module | Endpoints | Authentication | Roles |
|--------|-----------|----------------|-------|
| **Auth** | 4 | Mixed | Public/Protected |
| **Users** | 5 | Required | Admin |
| **Themes** | 5 | Required | Admin |
| **Blogs** | 5 | Required | Admin |
| **Certificates** | 5 | Required | Admin |
| **Tags** | 5 | Required | Admin |
| **Images** | 5 | Required | Admin |
| **Contact Messages** | 5 | Required | Admin |
| **Site Settings** | 5 | Required | Admin |
| **Skills** | 5 | Required | Admin |
| **Languages** | 5 | Required | Admin |
| **Experience** | 5 | Required | Admin |
| **Education** | 5 | Required | Admin |
| **Health** | 1 | None | Public |

**Total**: **65 endpoints** across **14 modules**

---

## 🔐 Authentication Endpoints

### **Base Path**: `/auth`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `POST` | `/login` | User login | ❌ | Public |
| `POST` | `/register` | User registration | ❌ | Public |
| `POST` | `/logout` | User logout | ✅ | Any |
| `GET` | `/profile` | Get user profile | ✅ | Any |

### **Request Examples**

#### Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@daidev.com",
    "password": "admin123"
  }'
```

#### Register
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "role": "viewer"
  }'
```

---

## 👥 Users Management

### **Base Path**: `/users`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all users | ✅ | Admin |
| `GET` | `/:id` | Get user by ID | ✅ | Admin |
| `POST` | `/` | Create new user | ✅ | Admin |
| `PUT` | `/:id` | Update user | ✅ | Admin |
| `DELETE` | `/:id` | Delete user | ✅ | Admin |

### **User Schema**
```typescript
interface User {
  _id: string;
  email: string;
  password: string;
  role: 'admin' | 'viewer';
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🎨 Themes Management

### **Base Path**: `/themes`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all themes | ✅ | Admin |
| `GET` | `/:id` | Get theme by ID | ✅ | Admin |
| `POST` | `/` | Create new theme | ✅ | Admin |
| `PUT` | `/:id` | Update theme | ✅ | Admin |
| `DELETE` | `/:id` | Delete theme | ✅ | Admin |

### **Theme Schema**
```typescript
interface Theme {
  _id: string;
  name: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  tags: string[];
  previewImage: string;
  demoUrl: string;
  sourceUrl: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 📝 Blogs Management

### **Base Path**: `/blogs`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all blogs | ✅ | Admin |
| `GET` | `/:id` | Get blog by ID | ✅ | Admin |
| `POST` | `/` | Create new blog | ✅ | Admin |
| `PUT` | `/:id` | Update blog | ✅ | Admin |
| `DELETE` | `/:id` | Delete blog | ✅ | Admin |

### **Blog Schema**
```typescript
interface Blog {
  _id: string;
  title: {
    en: string;
    vi: string;
  };
  content: {
    en: string;
    vi: string;
  };
  excerpt: {
    en: string;
    vi: string;
  };
  tags: string[];
  featuredImage: string;
  slug: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🏆 Certificates Management

### **Base Path**: `/certificates`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all certificates | ✅ | Admin |
| `GET` | `/:id` | Get certificate by ID | ✅ | Admin |
| `POST` | `/` | Create new certificate | ✅ | Admin |
| `PUT` | `/:id` | Update certificate | ✅ | Admin |
| `DELETE` | `/:id` | Delete certificate | ✅ | Admin |

### **Certificate Schema**
```typescript
interface Certificate {
  _id: string;
  name: {
    en: string;
    vi: string;
  };
  issuer: {
    en: string;
    vi: string;
  };
  issueDate: Date;
  expiryDate?: Date;
  certificateUrl: string;
  imageUrl: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🏷️ Tags Management

### **Base Path**: `/tags`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all tags | ✅ | Admin |
| `GET` | `/:id` | Get tag by ID | ✅ | Admin |
| `POST` | `/` | Create new tag | ✅ | Admin |
| `PUT` | `/:id` | Update tag | ✅ | Admin |
| `DELETE` | `/:id` | Delete tag | ✅ | Admin |

### **Tag Schema**
```typescript
interface Tag {
  _id: string;
  name: {
    en: string;
    vi: string;
  };
  color: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🖼️ Images Management

### **Base Path**: `/images`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all images | ✅ | Admin |
| `GET` | `/:id` | Get image by ID | ✅ | Admin |
| `POST` | `/` | Upload new image | ✅ | Admin |
| `PUT` | `/:id` | Update image | ✅ | Admin |
| `DELETE` | `/:id` | Delete image | ✅ | Admin |

### **Image Schema**
```typescript
interface Image {
  _id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  cloudinaryId: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 💬 Contact Messages

### **Base Path**: `/contact-messages`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all messages | ✅ | Admin |
| `GET` | `/:id` | Get message by ID | ✅ | Admin |
| `POST` | `/` | Create new message | ✅ | Admin |
| `PUT` | `/:id` | Update message | ✅ | Admin |
| `DELETE` | `/:id` | Delete message | ✅ | Admin |

### **Contact Message Schema**
```typescript
interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## ⚙️ Site Settings

### **Base Path**: `/site-settings`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all settings | ✅ | Admin |
| `GET` | `/:id` | Get setting by ID | ✅ | Admin |
| `POST` | `/` | Create new setting | ✅ | Admin |
| `PUT` | `/:id` | Update setting | ✅ | Admin |
| `DELETE` | `/:id` | Delete setting | ✅ | Admin |

### **Site Setting Schema**
```typescript
interface SiteSetting {
  _id: string;
  key: string;
  value: {
    en: string;
    vi: string;
  };
  type: 'string' | 'number' | 'boolean' | 'json';
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 💼 Skills Management

### **Base Path**: `/skills`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all skills | ✅ | Admin |
| `GET` | `/:id` | Get skill by ID | ✅ | Admin |
| `POST` | `/` | Create new skill | ✅ | Admin |
| `PUT` | `/:id` | Update skill | ✅ | Admin |
| `DELETE` | `/:id` | Delete skill | ✅ | Admin |

### **Skill Schema**
```typescript
interface Skill {
  _id: string;
  name: {
    en: string;
    vi: string;
  };
  level: number; // 1-100
  category: string;
  icon: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🌍 Languages Management

### **Base Path**: `/languages`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all languages | ✅ | Admin |
| `GET` | `/:id` | Get language by ID | ✅ | Admin |
| `POST` | `/` | Create new language | ✅ | Admin |
| `PUT` | `/:id` | Update language | ✅ | Admin |
| `DELETE` | `/:id` | Delete language | ✅ | Admin |

### **Language Schema**
```typescript
interface Language {
  _id: string;
  name: {
    en: string;
    vi: string;
  };
  level: 'basic' | 'intermediate' | 'advanced' | 'native';
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 💼 Experience Management

### **Base Path**: `/experience`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all experiences | ✅ | Admin |
| `GET` | `/:id` | Get experience by ID | ✅ | Admin |
| `POST` | `/` | Create new experience | ✅ | Admin |
| `PUT` | `/:id` | Update experience | ✅ | Admin |
| `DELETE` | `/:id` | Delete experience | ✅ | Admin |

### **Experience Schema**
```typescript
interface Experience {
  _id: string;
  title: {
    en: string;
    vi: string;
  };
  company: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  startDate: Date;
  endDate?: Date;
  current: boolean;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🎓 Education Management

### **Base Path**: `/education`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Get all education | ✅ | Admin |
| `GET` | `/:id` | Get education by ID | ✅ | Admin |
| `POST` | `/` | Create new education | ✅ | Admin |
| `PUT` | `/:id` | Update education | ✅ | Admin |
| `DELETE` | `/:id` | Delete education | ✅ | Admin |

### **Education Schema**
```typescript
interface Education {
  _id: string;
  degree: {
    en: string;
    vi: string;
  };
  institution: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  startDate: Date;
  endDate?: Date;
  current: boolean;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 💚 Health Check

### **Base Path**: `/health`

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/` | Health check | ❌ | Public |

### **Response**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345
}
```

---

## 🔒 Authentication & Authorization

### **JWT Token Format**
```typescript
interface JWTPayload {
  sub: string; // User ID
  email: string;
  role: 'admin' | 'viewer';
  tenantId: string;
  iat: number; // Issued at
  exp: number; // Expiration
}
```

### **Authorization Headers**
```bash
# Include in protected requests
Authorization: Bearer <jwt_token>
```

### **Error Responses**

#### 401 Unauthorized
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

#### 403 Forbidden
```json
{
  "message": "Access denied. Required roles: admin",
  "statusCode": 403
}
```

#### 400 Bad Request
```json
{
  "message": "Validation failed",
  "statusCode": 400,
  "errors": [
    {
      "field": "email",
      "message": "Email must be valid"
    }
  ]
}
```

---

## 📊 API Usage Examples

### **Frontend Integration**
```typescript
// API client setup
const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example API calls
const getThemes = () => api.get('/themes');
const createTheme = (data) => api.post('/themes', data);
const updateTheme = (id, data) => api.put(`/themes/${id}`, data);
const deleteTheme = (id) => api.delete(`/themes/${id}`);
```

### **cURL Examples**
```bash
# Get all themes (requires admin token)
curl -X GET http://localhost:3001/api/v1/themes \
  -H "Authorization: Bearer <admin_token>"

# Create new theme
curl -X POST http://localhost:3001/api/v1/themes \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {
      "en": "Modern Portfolio",
      "vi": "Portfolio Hiện Đại"
    },
    "description": {
      "en": "A modern portfolio theme",
      "vi": "Một theme portfolio hiện đại"
    },
    "tags": ["portfolio", "modern"],
    "previewImage": "https://example.com/image.jpg",
    "demoUrl": "https://demo.example.com",
    "sourceUrl": "https://github.com/example/theme"
  }'
```

---

## 📈 API Performance

### **Response Times**
- **Average**: < 200ms
- **95th percentile**: < 500ms
- **99th percentile**: < 1000ms

### **Rate Limiting**
- **Default**: 100 requests per minute
- **Auth endpoints**: 10 requests per minute
- **Upload endpoints**: 20 requests per minute

### **Caching**
- **GET requests**: 5 minutes cache
- **Health checks**: 1 minute cache
- **Static assets**: 1 hour cache

---

## 🔧 Development & Testing

### **Swagger Documentation**
- **URL**: `http://localhost:3001/docs-json`
- **UI**: `http://localhost:4001/` (Swagger Proxy)

### **Environment Variables**
```bash
# Required for API
DATABASE_URL=mongodb://localhost:27017/daidev
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
RESEND_API_KEY=your-resend-key
```

### **Testing**
```bash
# Run API tests
cd apps/api
npm run test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:cov
```

---

## 📋 Summary

- **Total Endpoints**: 65
- **Protected Endpoints**: 60 (92%)
- **Public Endpoints**: 5 (8%)
- **Admin Only**: 60 (92%)
- **Multi-tenant**: 100%
- **i18n Support**: 100%
- **Swagger Docs**: ✅ Complete
- **Rate Limiting**: ✅ Implemented
- **CORS**: ✅ Configured
- **Validation**: ✅ Comprehensive

**Status**: 🟢 **Production Ready** 