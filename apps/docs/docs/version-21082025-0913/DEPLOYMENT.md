# 🚀 Deployment Guide

This guide covers deployment strategies for all DaiDev applications in production environments.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Database Setup](#database-setup)
- [External Services](#external-services)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Health Checks](#monitoring--health-checks)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Scaling Strategy](#scaling-strategy)

## 🔧 Prerequisites

### Required Accounts

- **Vercel** - Frontend hosting
- **Railway/Render** - Backend hosting
- **MongoDB Atlas** - Database hosting
- **Cloudinary** - Image storage
- **Resend** - Email service
- **Google Cloud** - reCAPTCHA and Maps

### Required Tools

- **Git** - Version control
- **Node.js** 18+ - Runtime environment
- **pnpm** - Package manager
- **Docker** (optional) - Containerization
- **GitHub Actions** - CI/CD

## 🌍 Environment Setup

### Production Environment Variables

#### Backend API (`.env`)
```bash
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/daidev?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-production-jwt-key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Resend)
RESEND_API_KEY=your-resend-api-key

# CORS
FRONTEND_URLS=https://your-domain.com,https://admin.your-domain.com,https://docs.your-domain.com

# Port
PORT=3001

# Environment
NODE_ENV=production
```

#### Web App (`.env.local`)
```bash
# API
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# i18n
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,vi

# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

#### Admin Dashboard (`.env`)
```bash
# API
VITE_API_URL=https://api.your-domain.com/api/v1

# App
VITE_APP_NAME=DaiDev Admin
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=production
```

## 🌐 Frontend Deployment (Vercel)

### Web App Deployment

#### 1. Connect to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to web app
cd apps/web
```

#### 2. Configure Vercel
```json
// vercel.json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "pnpm install",
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.your-domain.com/api/v1",
    "NEXT_PUBLIC_RECAPTCHA_SITE_KEY": "your-recaptcha-site-key",
    "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY": "your-google-maps-api-key"
  }
}
```

#### 3. Deploy
```bash
# Deploy to production
vercel --prod

# Or use GitHub integration
# Connect your GitHub repo to Vercel for automatic deployments
```

### Admin Dashboard Deployment

#### 1. Configure Vite for Production
```typescript
// apps/admin/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  }
})
```

#### 2. Deploy to Vercel
```bash
cd apps/admin
vercel --prod
```

### Theme Detail Deployment

#### 1. Configure Nuxt for Production
```typescript
// apps/theme-detail/nuxt.config.ts
export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'vercel'
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL
    }
  }
})
```

#### 2. Deploy
```bash
cd apps/theme-detail
vercel --prod
```

### Documentation Deployment

#### 1. Configure Docusaurus
```typescript
// apps/docs/docusaurus.config.ts
const config = {
  url: 'https://docs.your-domain.com',
  baseUrl: '/',
  organizationName: 'your-org',
  projectName: 'daidev-docs',
  deploymentBranch: 'main',
  trailingSlash: false,
  // ... other config
}
```

#### 2. Deploy
```bash
cd apps/docs
vercel --prod
```

## 🔧 Backend Deployment (Railway/Render)

### Railway Deployment

#### 1. Connect to Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
cd apps/api
railway init
```

#### 2. Configure Railway
```json
// railway.json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pnpm install && pnpm run build"
  },
  "deploy": {
    "startCommand": "pnpm run start:prod",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

#### 3. Set Environment Variables
```bash
# Set production environment variables
railway variables set DATABASE_URL="mongodb+srv://..."
railway variables set JWT_SECRET="your-production-secret"
railway variables set CLOUDINARY_CLOUD_NAME="your-cloud-name"
railway variables set CLOUDINARY_API_KEY="your-api-key"
railway variables set CLOUDINARY_API_SECRET="your-api-secret"
railway variables set RESEND_API_KEY="your-resend-api-key"
railway variables set FRONTEND_URLS="https://your-domain.com"
railway variables set NODE_ENV="production"
```

#### 4. Deploy
```bash
# Deploy to Railway
railway up

# Or connect GitHub for automatic deployments
```

### Render Deployment

#### 1. Configure Render
```yaml
# render.yaml
services:
  - type: web
    name: daidev-api
    env: node
    buildCommand: pnpm install && pnpm run build
    startCommand: pnpm run start:prod
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        sync: false
```

#### 2. Deploy
```bash
# Connect your GitHub repo to Render
# Render will automatically deploy on push to main branch
```

### Docker Deployment

#### 1. Backend Dockerfile
```dockerfile
# apps/api/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built application
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start application
CMD ["node", "dist/main"]
```

#### 2. Frontend Dockerfile
```dockerfile
# apps/web/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm run build

# Production stage
FROM nginx:alpine AS production

# Copy built application
COPY --from=builder /app/.next /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### 3. Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb
    restart: unless-stopped

  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    ports:
      - "3003:80"
    environment:
      - NEXT_PUBLIC_API_URL=http://api:3001/api/v1
    depends_on:
      - api
    restart: unless-stopped

  admin:
    build:
      context: ./apps/admin
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=http://api:3001/api/v1
    depends_on:
      - api
    restart: unless-stopped

  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

## 🗄️ Database Setup

### MongoDB Atlas Setup

#### 1. Create Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Choose cloud provider and region
4. Select cluster tier (M0 for development, M10+ for production)

#### 2. Configure Network Access
```bash
# Add IP addresses
0.0.0.0/0  # Allow all IPs (for development)
# Or specific IPs for production
```

#### 3. Create Database User
```bash
# Username: daidev_user
# Password: secure_password
# Role: Atlas admin
```

#### 4. Get Connection String
```bash
# Connection string format
mongodb+srv://daidev_user:secure_password@cluster.mongodb.net/daidev?retryWrites=true&w=majority
```

#### 5. Run Database Seeds
```bash
# Connect to database and run seeds
cd apps/api
pnpm run seed
```

## 🔌 External Services

### Cloudinary Setup

#### 1. Create Account
1. Go to [Cloudinary](https://cloudinary.com)
2. Create free account
3. Get credentials from dashboard

#### 2. Configure Environment
```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Resend Setup

#### 1. Create Account
1. Go to [Resend](https://resend.com)
2. Create account
3. Get API key

#### 2. Configure Environment
```bash
RESEND_API_KEY=your-resend-api-key
```

### Google Services Setup

#### 1. Google reCAPTCHA
1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha)
2. Create new site
3. Get site key and secret key

#### 2. Google Maps
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable Maps JavaScript API
3. Create API key

## 🔄 CI/CD Pipeline

### GitHub Actions

#### 1. Backend CI/CD
```yaml
# .github/workflows/backend.yml
name: Backend CI/CD

on:
  push:
    branches: [main]
    paths: ['apps/api/**']
  pull_request:
    branches: [main]
    paths: ['apps/api/**']

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: cd apps/api && pnpm run test
      - run: cd apps/api && pnpm run test:e2e

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: cd apps/api && pnpm run build
      - name: Deploy to Railway
        uses: railway/deploy@v1
        with:
          service: daidev-api
          token: ${{ secrets.RAILWAY_TOKEN }}
```

#### 2. Frontend CI/CD
```yaml
# .github/workflows/frontend.yml
name: Frontend CI/CD

on:
  push:
    branches: [main]
    paths: ['apps/web/**', 'apps/admin/**', 'apps/theme-detail/**']
  pull_request:
    branches: [main]
    paths: ['apps/web/**', 'apps/admin/**', 'apps/theme-detail/**']

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: cd apps/web && pnpm run lint
      - run: cd apps/admin && pnpm run lint

  deploy-web:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./apps/web

  deploy-admin:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_ADMIN_PROJECT_ID }}
          working-directory: ./apps/admin
```

## 📊 Monitoring & Health Checks

### Health Check Endpoints

#### Backend Health Check
```typescript
// apps/api/src/health/health.controller.ts
@Controller('health')
export class HealthController {
  @Get()
  async check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV
    };
  }

  @Get('db')
  async checkDatabase() {
    try {
      await this.connection.db.admin().ping();
      return { status: 'ok', database: 'connected' };
    } catch (error) {
      return { status: 'error', database: 'disconnected' };
    }
  }
}
```

### Monitoring Setup

#### 1. Uptime Monitoring
```bash
# Use services like:
# - UptimeRobot
# - Pingdom
# - StatusCake

# Monitor these endpoints:
# - https://api.your-domain.com/health
# - https://your-domain.com
# - https://admin.your-domain.com
```

#### 2. Error Tracking
```typescript
// apps/api/src/main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

#### 3. Logging
```typescript
// apps/api/src/main.ts
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Environment: ${process.env.NODE_ENV}`);
}
```

## 🔒 Security Considerations

### Environment Variables
```bash
# Never commit sensitive data
# Use environment variables for:
- Database credentials
- API keys
- JWT secrets
- OAuth secrets
```

### CORS Configuration
```typescript
// apps/api/src/main.ts
app.enableCors({
  origin: process.env.FRONTEND_URLS?.split(',') || [],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

### Rate Limiting
```typescript
// apps/api/src/main.ts
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
  ],
})
```

### Security Headers
```typescript
// apps/api/src/main.ts
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
  },
}));
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check Node.js version
node --version  # Should be 18+

# Clear cache
pnpm store prune
rm -rf node_modules
pnpm install

# Check for TypeScript errors
pnpm run type-check
```

#### 2. Database Connection Issues
```bash
# Check MongoDB connection
mongosh "mongodb+srv://..."

# Check environment variables
echo $DATABASE_URL

# Check network connectivity
ping cluster.mongodb.net
```

#### 3. Environment Variables Not Loading
```bash
# Check if .env files exist
ls -la apps/*/.env*

# Verify environment variables are set
printenv | grep -E "(DATABASE|JWT|CLOUDINARY)"

# Restart application after changing env vars
```

#### 4. CORS Issues
```bash
# Check CORS configuration
# Verify FRONTEND_URLS includes all frontend domains
# Check browser console for CORS errors
```

### Debug Commands

```bash
# Check application status
curl -f http://localhost:3001/health

# Check database connection
curl -f http://localhost:3001/health/db

# Check logs
railway logs  # For Railway
render logs   # For Render
vercel logs   # For Vercel

# Check environment
printenv | grep -E "(NODE_ENV|DATABASE|JWT)"
```

## 📈 Scaling Strategy

### Horizontal Scaling

#### 1. Load Balancer
```yaml
# nginx.conf for load balancing
upstream backend {
    server api1:3001;
    server api2:3001;
    server api3:3001;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

#### 2. Auto-scaling
```yaml
# Railway/Render auto-scaling
# Configure based on:
# - CPU usage
# - Memory usage
# - Request count
# - Response time
```

### Database Scaling

#### 1. MongoDB Atlas Scaling
- Upgrade cluster tier
- Enable read replicas
- Use connection pooling
- Implement caching (Redis)

#### 2. Caching Strategy
```typescript
// Redis caching
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 600, // 10 minutes
    }),
  ],
})
```

### Performance Optimization

#### 1. Frontend Optimization
```typescript
// Next.js optimization
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@headlessui/react', '@heroicons/react'],
  },
}
```

#### 2. Backend Optimization
```typescript
// Database indexing
// apps/api/src/users/users.schema.ts
@Schema({ timestamps: true })
export class User {
  @Prop({ index: true })
  email: string;

  @Prop({ index: true })
  tenantId: string;
}
```

## 🔄 Rollback Strategy

### Version Management
```bash
# Tag releases
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Rollback to previous version
git checkout v0.9.0
git push origin v0.9.0 --force
```

### Database Rollback
```bash
# Backup before deployment
mongodump --uri="mongodb+srv://..." --out=backup/

# Restore if needed
mongorestore --uri="mongodb+srv://..." backup/
```

### Environment Rollback
```bash
# Revert environment variables
railway variables set NODE_ENV=production
railway variables set DATABASE_URL="previous-url"

# Redeploy
railway up
```

---

**Status**: 🟢 **Deployment Guide Complete**

This guide covers all aspects of deploying the DaiDev platform to production. Follow these steps carefully to ensure a successful deployment. 🚀 