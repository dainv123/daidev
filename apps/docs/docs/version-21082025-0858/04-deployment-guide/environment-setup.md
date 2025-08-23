# 🛠️ Environment Setup Guide

**Cập nhật**: $(date)  
**Dựa trên**: Codebase analysis và package.json files

## 🎯 Tổng quan

Hướng dẫn setup môi trường development cho dự án daidev - một monorepo với 6 subapps. Tài liệu này được tạo dựa trên phân tích codebase thực tế.

## 📋 Prerequisites

### **System Requirements**
- **Node.js**: 18.0.0 hoặc cao hơn
- **npm**: 9.0.0 hoặc cao hơn
- **pnpm**: 8.0.0 hoặc cao hơn (recommended)
- **Git**: 2.30.0 hoặc cao hơn

### **External Services**
- **MongoDB Atlas**: Database hosting
- **Cloudinary**: Image storage
- **Resend**: Email service
- **Google reCAPTCHA**: Spam protection

## 🚀 Quick Setup

### **1. Clone Repository**
```bash
git clone <repository-url>
cd daidev
```

### **2. Install Dependencies**
```bash
# Install pnpm globally (if not installed)
npm install -g pnpm

# Install all dependencies
pnpm install
```

### **3. Environment Configuration**
```bash
# Copy environment files
cp apps/api/env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env
```

### **4. Configure Environment Variables**

#### **Backend API** (`apps/api/.env`)
```bash
# Database
DATABASE_URL=mongodb://localhost:27017/daidev
# hoặc MongoDB Atlas
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/daidev

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Resend)
RESEND_API_KEY=your-resend-api-key

# CORS
FRONTEND_URLS=http://localhost:3000,http://localhost:3003,http://localhost:3004

# Port
PORT=3001
```

#### **Web App** (`apps/web/.env.local`)
```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# i18n
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,vi
```

#### **Admin Dashboard** (`apps/admin/.env`)
```bash
# API
VITE_API_URL=http://localhost:3001/api/v1

# App
VITE_APP_NAME=DaiDev Admin
VITE_APP_VERSION=1.0.0
```

## 🔧 Development Setup

### **1. Database Setup**

#### **Local MongoDB**
```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Create database
mongosh
use daidev
```

#### **MongoDB Atlas**
1. Tạo account tại [MongoDB Atlas](https://cloud.mongodb.com)
2. Tạo cluster mới
3. Tạo database user
4. Whitelist IP address
5. Copy connection string

### **2. External Services Setup**

#### **Cloudinary**
1. Tạo account tại [Cloudinary](https://cloudinary.com)
2. Lấy Cloud Name, API Key, API Secret
3. Cấu hình trong `.env`

#### **Resend**
1. Tạo account tại [Resend](https://resend.com)
2. Verify domain
3. Lấy API key
4. Cấu hình trong `.env`

#### **Google reCAPTCHA**
1. Tạo project tại [Google Cloud Console](https://console.cloud.google.com)
2. Enable reCAPTCHA API
3. Tạo reCAPTCHA keys
4. Cấu hình trong `.env`

## 🏃‍♂️ Running Applications

### **Development Mode**

#### **Option 1: Run All Apps (Recommended)**
```bash
# From root directory
pnpm dev
```

#### **Option 2: Run Individual Apps**
```bash
# Backend API
cd apps/api
pnpm run start:dev

# Web App
cd apps/web
pnpm dev

# Admin Dashboard
cd apps/admin
pnpm dev

# Theme Detail
cd apps/theme-detail
pnpm dev

# Documentation
cd apps/docs
pnpm start

# Swagger Proxy
cd apps/swagger-proxy
pnpm start
```

### **Port Configuration**

| App | Port | URL |
|-----|------|-----|
| **Admin Dashboard** | 3000 | http://localhost:3000 |
| **Backend API** | 3001 | http://localhost:3001 |
| **Web App** | 3003 | http://localhost:3003 |
| **Theme Detail** | 3004 | http://localhost:3004 |
| **Documentation** | 4002 | http://localhost:4002 |
| **Swagger Proxy** | 4001 | http://localhost:4001 |

## 🧪 Testing Setup

### **Backend Testing**
```bash
cd apps/api

# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov

# Test in watch mode
pnpm run test:watch
```

### **Frontend Testing**
```bash
# Admin Dashboard
cd apps/admin
pnpm run lint

# Web App
cd apps/web
pnpm run lint
```

## 📊 Database Seeding

### **Initial Data Setup**
```bash
cd apps/api

# Run database seeds
pnpm run seed

# Hoặc chạy trực tiếp
npx ts-node src/database/seeds/seed.ts
```

### **Seed Data Includes**
- Default admin user
- Sample themes
- Sample blogs
- Sample certificates
- Sample tags
- Site settings

## 🔍 Verification Steps

### **1. Check All Services**
```bash
# Health check
curl http://localhost:3001/api/v1/health

# Swagger docs
curl http://localhost:3001/docs-json

# Web app
curl http://localhost:3003

# Admin dashboard
curl http://localhost:3000
```

### **2. Test Authentication**
```bash
# Login test
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@daidev.com",
    "password": "admin123"
  }'
```

### **3. Test API Endpoints**
```bash
# Get themes (requires auth)
curl -X GET http://localhost:3001/api/v1/themes \
  -H "Authorization: Bearer <your-token>"
```

## 🐛 Troubleshooting

### **Common Issues**

#### **Port Already in Use**
```bash
# Check what's using the port
lsof -i :3001

# Kill process
kill -9 <PID>
```

#### **Database Connection Issues**
```bash
# Check MongoDB status
brew services list | grep mongodb

# Restart MongoDB
brew services restart mongodb-community
```

#### **Environment Variables Not Loading**
```bash
# Check if .env files exist
ls -la apps/*/.env*

# Verify environment variables
echo $DATABASE_URL
```

#### **Dependencies Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
rm -rf apps/*/node_modules
pnpm install
```

### **Logs and Debugging**

#### **Backend Logs**
```bash
cd apps/api
pnpm run start:debug
```

#### **Frontend Logs**
```bash
# Check browser console
# Check network tab
# Check application tab
```

## 🔧 Development Tools

### **Recommended VS Code Extensions**
- **TypeScript**: TypeScript support
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: Tailwind support
- **MongoDB for VS Code**: Database management
- **Thunder Client**: API testing

### **Useful Commands**
```bash
# Format code
pnpm run format

# Lint code
pnpm run lint

# Type check
pnpm run typecheck

# Build all apps
pnpm run build

# Clean builds
pnpm run clean
```

## 📱 Mobile Development

### **Mobile Testing**
```bash
# Use ngrok for mobile testing
npx ngrok http 3003

# Test on mobile device
# Use ngrok URL
```

### **Responsive Design**
- Test trên các kích thước màn hình khác nhau
- Sử dụng Chrome DevTools Device Mode
- Test trên thiết bị thật

## 🔒 Security Considerations

### **Development Security**
```bash
# Use strong JWT secrets
JWT_SECRET=your-very-long-and-random-secret-key

# Use environment variables
# Never commit .env files

# Use HTTPS in production
# Enable CORS properly
```

### **API Security**
- Tất cả endpoints đều có validation
- Rate limiting được enable
- CORS được cấu hình đúng
- JWT tokens có expiration

## 📈 Performance Optimization

### **Development Performance**
```bash
# Use pnpm for faster installs
pnpm install

# Use Turbo for faster builds
pnpm run build

# Enable caching
pnpm run dev --cache
```

### **Production Optimization**
- Enable compression
- Use CDN cho static assets
- Optimize images
- Enable caching

## 🚀 Next Steps

### **After Setup**
1. **Verify all apps are running**
2. **Test authentication flow**
3. **Create sample data**
4. **Test all features**
5. **Setup CI/CD pipeline**

### **Production Deployment**
1. **Setup production environment**
2. **Configure production database**
3. **Setup monitoring**
4. **Configure backups**
5. **Setup SSL certificates**

---

## 📋 Setup Checklist

- [ ] **Prerequisites installed**
- [ ] **Repository cloned**
- [ ] **Dependencies installed**
- [ ] **Environment files created**
- [ ] **Environment variables configured**
- [ ] **Database connected**
- [ ] **External services configured**
- [ ] **All apps running**
- [ ] **Authentication working**
- [ ] **API endpoints accessible**
- [ ] **Frontend apps loading**
- [ ] **Database seeded**
- [ ] **Tests passing**

**Status**: 🟢 **Ready for Development** 