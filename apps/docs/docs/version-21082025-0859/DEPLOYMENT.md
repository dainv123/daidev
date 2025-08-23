# 🚀 Deployment Guide

This guide covers deployment strategies for all DaiDev applications in production environments.

## 📋 Overview

DaiDev consists of 6 sub-applications that need to be deployed separately:

- **🌐 Web App** (Next.js) → Vercel
- **🎛️ Admin Dashboard** (React) → Vercel  
- **🔧 Backend API** (NestJS) → Railway/Render
- **📚 Documentation** (Docusaurus) → Vercel
- **🎨 Theme Detail** (Nuxt) → Vercel
- **📖 Swagger Proxy** (Express) → Railway/Render

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Frontend (Vercel)"
        WEB[Web App<br/>Next.js]
        ADMIN[Admin Dashboard<br/>React]
        THEME[Theme Detail<br/>Nuxt]
        DOCS[Documentation<br/>Docusaurus]
    end

    subgraph "Backend (Railway/Render)"
        API[Backend API<br/>NestJS]
        SWAGGER[Swagger Proxy<br/>Express]
    end

    subgraph "External Services"
        DB[(MongoDB Atlas)]
        CLOUDINARY[Cloudinary]
        RESEND[Resend]
        RECAPTCHA[Google reCAPTCHA]
    end

    WEB --> API
    ADMIN --> API
    THEME --> API
    DOCS --> API
    SWAGGER --> API
    
    API --> DB
    API --> CLOUDINARY
    API --> RESEND
    API --> RECAPTCHA
```

## 🔧 Prerequisites

### Required Services
- **MongoDB Atlas** - Database hosting
- **Cloudinary** - Image storage
- **Resend** - Email service
- **Google reCAPTCHA** - Spam protection
- **Vercel** - Frontend hosting
- **Railway/Render** - Backend hosting

### Domain Setup
- Configure custom domain (optional)
- Setup SSL certificates
- Configure DNS records

## 🌐 Frontend Deployment (Vercel)

### 1. Web App (Next.js)

#### Setup
```bash
# Navigate to web app
cd apps/web

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Environment Variables
```bash
# Production environment variables
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,vi
```

#### Build Configuration
```json
// vercel.json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "pnpm install"
}
```

### 2. Admin Dashboard (React)

#### Setup
```bash
# Navigate to admin app
cd apps/admin

# Deploy
vercel --prod
```

#### Environment Variables
```bash
VITE_API_URL=https://your-api-domain.com/api/v1
VITE_APP_NAME=DaiDev Admin
VITE_APP_VERSION=1.0.0
```

#### Build Configuration
```json
// vercel.json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "pnpm install"
}
```

### 3. Theme Detail (Nuxt)

#### Setup
```bash
# Navigate to theme detail app
cd apps/theme-detail

# Deploy
vercel --prod
```

#### Environment Variables
```bash
NUXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
```

#### Build Configuration
```json
// vercel.json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": ".output/public",
  "framework": "nuxt",
  "installCommand": "pnpm install"
}
```

### 4. Documentation (Docusaurus)

#### Setup
```bash
# Navigate to docs app
cd apps/docs

# Deploy
vercel --prod
```

#### Environment Variables
```bash
# Usually no environment variables needed for static docs
```

#### Build Configuration
```json
// vercel.json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "build",
  "framework": "docusaurus",
  "installCommand": "pnpm install"
}
```

## 🔧 Backend Deployment (Railway/Render)

### 1. Backend API (NestJS)

#### Railway Deployment

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository
   - Select the `apps/api` directory

2. **Environment Variables**
   ```bash
   # Database
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/daidev
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Email (Resend)
   RESEND_API_KEY=your-resend-api-key
   
   # CORS
   FRONTEND_URLS=https://your-web-domain.com,https://your-admin-domain.com
   
   # Port
   PORT=3001
   ```

3. **Build Configuration**
   ```json
   // railway.json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "pnpm run start:prod",
       "healthcheckPath": "/api/v1/health",
       "healthcheckTimeout": 300,
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

#### Render Deployment

1. **Create Service**
   - Go to [Render](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository

2. **Build Configuration**
   ```bash
   Build Command: cd apps/api && pnpm install && pnpm run build
   Start Command: cd apps/api && pnpm run start:prod
   ```

3. **Environment Variables**
   ```bash
   # Same as Railway configuration
   DATABASE_URL=mongodb+srv://...
   JWT_SECRET=...
   CLOUDINARY_CLOUD_NAME=...
   # ... other variables
   ```

### 2. Swagger Proxy (Express)

#### Railway Deployment

1. **Create Service**
   - Create new Web Service in Railway
   - Select `apps/swagger-proxy` directory

2. **Environment Variables**
   ```bash
   PORT=4001
   API_URL=https://your-api-domain.com
   ```

3. **Build Configuration**
   ```json
   // railway.json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "node swagger-proxy.js",
       "healthcheckPath": "/",
       "healthcheckTimeout": 300
     }
   }
   ```

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create Cluster

1. **Sign up** at [MongoDB Atlas](https://cloud.mongodb.com)
2. **Create cluster** (M0 Free tier for development)
3. **Configure network access** (allow all IPs for development)
4. **Create database user** with read/write permissions

### 2. Connection String

```bash
# Format
mongodb+srv://username:password@cluster.mongodb.net/daidev

# Example
mongodb+srv://daidev:password123@cluster0.abc123.mongodb.net/daidev
```

### 3. Database Setup

```bash
# Run database seeds
cd apps/api
pnpm run seed
```

## 🔐 External Services Configuration

### 1. Cloudinary

1. **Create account** at [Cloudinary](https://cloudinary.com)
2. **Get credentials**:
   - Cloud Name
   - API Key
   - API Secret
3. **Configure in backend**:
   ```bash
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### 2. Resend

1. **Create account** at [Resend](https://resend.com)
2. **Verify domain** (optional but recommended)
3. **Get API key** and configure:
   ```bash
   RESEND_API_KEY=re_123456789
   ```

### 3. Google reCAPTCHA

1. **Go to** [Google reCAPTCHA](https://www.google.com/recaptcha)
2. **Create site** with reCAPTCHA v2
3. **Get keys** and configure:
   ```bash
   # Frontend
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
   
   # Backend (if needed)
   RECAPTCHA_SECRET_KEY=6Lc...
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: cd apps/api && pnpm run build
      # Deploy to Railway/Render

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: cd apps/web && pnpm run build
      # Deploy to Vercel
```

### Vercel Auto-Deploy

1. **Connect repository** to Vercel
2. **Configure auto-deploy** for main branch
3. **Set up preview deployments** for pull requests

## 🔍 Health Checks

### Backend Health Check

```bash
# Health check endpoint
curl https://your-api-domain.com/api/v1/health

# Expected response
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345
}
```

### Frontend Health Check

```bash
# Check if frontend is accessible
curl -I https://your-web-domain.com

# Expected response
HTTP/2 200
```

## 📊 Monitoring

### Application Monitoring

1. **Vercel Analytics** - Frontend performance
2. **Railway Metrics** - Backend performance
3. **MongoDB Atlas** - Database monitoring
4. **Cloudinary** - Image delivery metrics

### Error Tracking

1. **Sentry** - Error tracking and monitoring
2. **Logs** - Application logs
3. **Alerts** - Set up alerts for critical issues

## 🔒 Security

### Environment Variables

- **Never commit** `.env` files
- **Use strong secrets** for JWT and API keys
- **Rotate secrets** regularly
- **Use different secrets** for each environment

### SSL/TLS

- **Enable HTTPS** for all domains
- **Use HSTS** headers
- **Configure CSP** (Content Security Policy)

### CORS Configuration

```typescript
// Backend CORS configuration
app.enableCors({
  origin: [
    'https://your-web-domain.com',
    'https://your-admin-domain.com',
    'https://your-theme-domain.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
});
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build logs
vercel logs
railway logs

# Common fixes
pnpm install --frozen-lockfile
rm -rf node_modules && pnpm install
```

#### Environment Variables
```bash
# Verify environment variables
echo $DATABASE_URL
echo $JWT_SECRET

# Check in deployment platform
vercel env ls
railway variables
```

#### Database Connection
```bash
# Test database connection
mongosh "your-connection-string"

# Check network access in MongoDB Atlas
```

#### CORS Issues
```bash
# Check CORS configuration
# Verify frontend URLs in backend CORS settings
# Check browser console for CORS errors
```

### Performance Optimization

1. **Enable caching** for static assets
2. **Optimize images** with Cloudinary
3. **Use CDN** for global distribution
4. **Enable compression** for API responses
5. **Monitor database queries** and optimize

## 📈 Scaling

### Horizontal Scaling

1. **Load balancers** for multiple backend instances
2. **Database clustering** for high availability
3. **CDN** for global content delivery
4. **Caching layers** (Redis) for performance

### Vertical Scaling

1. **Upgrade server resources** in Railway/Render
2. **Optimize database** indexes and queries
3. **Enable compression** and minification
4. **Use efficient algorithms** and data structures

## 🔄 Rollback Strategy

### Quick Rollback

1. **Revert to previous deployment** in Vercel/Railway
2. **Database rollback** if schema changes
3. **Environment variable rollback** if needed

### Blue-Green Deployment

1. **Deploy to staging** environment first
2. **Test thoroughly** before production
3. **Switch traffic** gradually
4. **Monitor** for issues

---

## 📋 Deployment Checklist

- [ ] **Environment variables** configured
- [ ] **Database** connected and seeded
- [ ] **External services** configured
- [ ] **SSL certificates** installed
- [ ] **CORS** properly configured
- [ ] **Health checks** passing
- [ ] **Monitoring** set up
- [ ] **Backup strategy** implemented
- [ ] **Documentation** updated
- [ ] **Team access** configured

**Status**: 🟢 **Ready for Production** 