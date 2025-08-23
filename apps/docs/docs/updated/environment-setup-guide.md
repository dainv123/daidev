# Environment Setup Guide - Daidev Platform

## Tổng quan

Hướng dẫn setup môi trường development cho toàn bộ hệ thống Daidev với 6 subapps.

## Prerequisites

### System Requirements
- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 hoặc **pnpm**: >= 7.0.0
- **MongoDB**: >= 5.0.0
- **Git**: >= 2.0.0

### Tools cần thiết
- **VS Code** hoặc editor tương tự
- **Postman** hoặc **Insomnia** (API testing)
- **MongoDB Compass** (database management)

## Installation Steps

### 1. Clone Repository
```bash
git clone <repository-url>
cd daidev
```

### 2. Install Dependencies
```bash
# Sử dụng npm
npm install

# Hoặc sử dụng pnpm (recommended)
pnpm install
```

### 3. Setup Environment Variables

#### Root Level (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/daidev

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email (Resend)
RESEND_API_KEY=your-resend-api-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google Services
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
GOOGLE_RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# Frontend URLs (CORS)
FRONTEND_URLS=http://localhost:3002,http://localhost:3003,http://localhost:3004

# API Base URL
API_BASE_URL=http://localhost:3001/api/v1
```

#### API Backend (.env)
```env
# Copy từ root .env và thêm:
PORT=3001
NODE_ENV=development
LOG_LEVEL=debug
```

#### Admin Dashboard (.env)
```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_APP_NAME=Daidev Admin
VITE_APP_VERSION=1.0.0
```

#### Web Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_NAME=Daidev Portfolio
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

### 4. Setup Database

#### MongoDB Local Setup
```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Hoặc chạy trực tiếp
mongod --dbpath /usr/local/var/mongodb
```

#### MongoDB Atlas (Cloud)
1. Tạo account tại [MongoDB Atlas](https://cloud.mongodb.com)
2. Tạo cluster mới
3. Tạo database user
4. Whitelist IP address
5. Copy connection string và update `MONGODB_URI`

### 5. Setup External Services

#### Cloudinary Setup
1. Tạo account tại [Cloudinary](https://cloudinary.com)
2. Lấy credentials từ Dashboard
3. Update environment variables

#### Resend Email Setup
1. Tạo account tại [Resend](https://resend.com)
2. Verify domain
3. Lấy API key và update environment

#### Google Services Setup
1. **Google Maps API**:
   - Tạo project tại [Google Cloud Console](https://console.cloud.google.com)
   - Enable Maps JavaScript API
   - Tạo API key

2. **Google reCAPTCHA**:
   - Tạo site tại [reCAPTCHA](https://www.google.com/recaptcha)
   - Chọn reCAPTCHA v2
   - Lấy site key và secret key

## Development Workflow

### 1. Start All Services

#### Option 1: Manual Start
```bash
# Terminal 1 - API Backend
cd apps/api
npm run dev

# Terminal 2 - Admin Dashboard
cd apps/admin
npm run dev

# Terminal 3 - Web Frontend
cd apps/web
npm run dev

# Terminal 4 - Theme Detail
cd apps/theme-detail
npm run dev

# Terminal 5 - Documentation
cd apps/docs
npm start

# Terminal 6 - Swagger Proxy
cd apps/swagger-proxy
npm start
```

#### Option 2: Using Turbo (Recommended)
```bash
# Start tất cả services
npx turbo dev

# Hoặc start specific services
npx turbo dev --filter=@daidev/api
npx turbo dev --filter=@daidev/admin
npx turbo dev --filter=@daidev/web
```

### 2. Verify Services

#### Health Checks
```bash
# API Health
curl http://localhost:3001/api/v1/health

# Swagger Docs
curl http://localhost:3001/docs-json
```

#### Browser URLs
- **API**: http://localhost:3001
- **Admin**: http://localhost:3002
- **Web**: http://localhost:3003
- **Theme Detail**: http://localhost:3004
- **Docs**: http://localhost:4002
- **Swagger**: http://localhost:4001

### 3. Database Seeding

#### Run Seed Script
```bash
cd apps/api
npm run seed
```

#### Verify Data
```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/daidev

# Check collections
show collections
db.users.find()
db.themes.find()
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check ports
lsof -i :3001
lsof -i :3002
lsof -i :3003
lsof -i :3004
lsof -i :4001

# Kill processes
kill -9 <PID>
```

#### 2. MongoDB Connection Issues
```bash
# Check MongoDB status
brew services list | grep mongodb

# Restart MongoDB
brew services restart mongodb-community
```

#### 3. Node Modules Issues
```bash
# Clear node_modules
rm -rf node_modules
rm -rf apps/*/node_modules

# Reinstall
npm install
```

#### 4. Environment Variables Not Loading
```bash
# Check if .env files exist
ls -la apps/*/.env*

# Verify environment variables
echo $MONGODB_URI
echo $JWT_SECRET
```

### Debug Commands

#### API Backend
```bash
cd apps/api
npm run start:debug
```

#### Admin Dashboard
```bash
cd apps/admin
npm run dev -- --debug
```

#### Web Frontend
```bash
cd apps/web
NODE_OPTIONS='--inspect' npm run dev
```

## Production Setup

### Environment Variables
```env
# Production settings
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=production-secret-key
FRONTEND_URLS=https://admin.daidev.com,https://daidev.com
```

### Build Commands
```bash
# Build all apps
npx turbo build

# Build specific app
npx turbo build --filter=@daidev/api
npx turbo build --filter=@daidev/admin
npx turbo build --filter=@daidev/web
```

### Docker Setup
```bash
# Build images
docker-compose build

# Run services
docker-compose up -d
```

## Monitoring & Logs

### Log Locations
- **API**: Console logs + file logs
- **Admin**: Browser console + Vite dev server
- **Web**: Browser console + Next.js dev server
- **Theme Detail**: Browser console + Nuxt dev server

### Health Monitoring
```bash
# API Health
curl http://localhost:3001/api/v1/health

# Check all services
for port in 3001 3002 3003 3004 4001 4002; do
  echo "Port $port: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port || echo "DOWN")"
done
```

## Next Steps

1. **Setup Authentication**: Tạo admin user đầu tiên
2. **Configure Content**: Upload themes, blogs, certificates
3. **Customize UI**: Update site settings và branding
4. **Testing**: Run tests và verify functionality
5. **Deployment**: Deploy to production environment 