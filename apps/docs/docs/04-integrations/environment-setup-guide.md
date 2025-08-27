# Environment Setup Guide

This comprehensive guide covers environment configuration for the daidev platform, including development, staging, and production environments.

## 🚀 Quick Setup

### 1. Copy Environment Template
```bash
# Copy the environment template
cp env.example .env

# Edit the environment file
nano .env
```

### 2. Validate Environment
```bash
# Validate environment configuration
./deployment/validate-env.sh
```

## 📋 Environment Variables Reference

### Database Configuration

#### MongoDB Local Development
```bash
# MongoDB Root Password
MONGODB_ROOT_PASSWORD=your-secure-mongodb-password

# MongoDB Connection URI (Local)
MONGODB_URI=mongodb://admin:your-secure-mongodb-password@mongodb:27017/daidev?authSource=admin
```

#### MongoDB Atlas (Production)
```bash
# MongoDB Atlas Connection URI
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/daidev?retryWrites=true&w=majority
```

### JWT Configuration
```bash
# JWT Secret Key (Generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# JWT Expiration Time
JWT_EXPIRES_IN=7d
```

### Email Services

#### Resend (Recommended)
```bash
# Resend API Key
RESEND_API_KEY=your-resend-api-key

# Admin Email for Notifications
ADMIN_EMAIL=admin@your-domain.com
```

#### SMTP Configuration (Alternative)
```bash
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
MAIL_FROM=your-email@gmail.com
MAIL_FROM_NAME=Support
```

### Cloud Storage

#### Cloudinary (Recommended)
```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### AWS S3 (Alternative)
```bash
# AWS S3 Configuration
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
S3_BUCKET=your-s3-bucket-name
```

### Google Services
```bash
# Google Maps API Key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Google reCAPTCHA
GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
GOOGLE_RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

### CORS & Frontend URLs
```bash
# Allowed Frontend URLs (comma-separated)
FRONTEND_URLS=https://your-domain.com,https://www.your-domain.com,http://localhost:3002,http://localhost:3003
```

### API Configuration
```bash
# Node Environment
NODE_ENV=production

# API Port
PORT=3001
```

### Frontend Environment Variables

#### Admin Dashboard (Vite/React)
```bash
# API URL for Admin Dashboard
VITE_API_URL=https://your-domain.com/api/v1

# App Configuration
VITE_APP_NAME=Daidev Admin
VITE_APP_VERSION=1.0.0
```

#### Web Frontend (Next.js)
```bash
# API URL for Web Frontend
NEXT_PUBLIC_API_URL=https://your-domain.com/api/v1

# App Configuration
NEXT_PUBLIC_APP_NAME=Daidev Portfolio

# Public Google Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

### Docker Compose Configuration
```bash
# MongoDB Container Configuration
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=your-secure-mongodb-password
MONGO_INITDB_DATABASE=daidev
```

### Deployment Configuration
```bash
# Domain Configuration
DOMAIN=your-domain.com
WWW_DOMAIN=www.your-domain.com

# SSL Configuration
SSL_EMAIL=admin@your-domain.com
```

### Monitoring & Logging
```bash
# Log Level
LOG_LEVEL=info

# Enable Logging
ENABLE_LOGGING=true
```

### Security Configuration
```bash
# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Session Configuration
SESSION_SECRET=your-session-secret-key
SESSION_MAX_AGE=86400000
```

## 🔧 Environment Setup by Type

### Development Environment

#### Local Development Setup
```bash
# Copy environment template
cp env.example .env

# Configure for local development
NODE_ENV=development
MONGODB_URI=mongodb://admin:password@localhost:27017/daidev?authSource=admin
FRONTEND_URLS=http://localhost:3002,http://localhost:3003,http://localhost:3004
VITE_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

#### Development with Docker
```bash
# Use Docker Compose for development
docker-compose up -d

# Environment variables are set in docker-compose.yml
# No additional .env file needed for basic development
```

### Staging Environment

#### Staging Configuration
```bash
# Staging environment variables
NODE_ENV=staging
MONGODB_URI=mongodb+srv://staging-user:password@cluster.mongodb.net/daidev-staging
FRONTEND_URLS=https://staging.your-domain.com
VITE_API_URL=https://staging.your-domain.com/api/v1
NEXT_PUBLIC_API_URL=https://staging.your-domain.com/api/v1
```

### Production Environment

#### Production Configuration
```bash
# Production environment variables
NODE_ENV=production
MONGODB_URI=mongodb+srv://prod-user:password@cluster.mongodb.net/daidev
FRONTEND_URLS=https://your-domain.com,https://www.your-domain.com
VITE_API_URL=https://your-domain.com/api/v1
NEXT_PUBLIC_API_URL=https://your-domain.com/api/v1
```

## 🔐 Security Best Practices

### Generate Secure Secrets

#### JWT Secret
```bash
# Generate a secure JWT secret
openssl rand -base64 64

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

#### MongoDB Password
```bash
# Generate a secure MongoDB password
openssl rand -base64 32

# Or use a password generator
pwgen -s 32 1
```

#### Session Secret
```bash
# Generate a secure session secret
openssl rand -base64 32
```

### Environment File Security
```bash
# Set proper permissions for .env file
chmod 600 .env

# Add .env to .gitignore
echo ".env" >> .gitignore

# Verify .env is not tracked
git status
```

### API Key Management
```bash
# Store API keys securely
# Never commit API keys to version control
# Use environment variables or secrets management

# For production, use secrets management
# Example with Docker secrets
echo "your-api-key" | docker secret create resend_api_key -
```

## 🧪 Environment Validation

### Validation Script
```bash
# Run environment validation
./deployment/validate-env.sh
```

### Manual Validation
```bash
# Check required variables
echo "Checking required environment variables..."

# Database
if [ -z "$MONGODB_URI" ]; then
    echo "❌ MONGODB_URI is not set"
else
    echo "✅ MONGODB_URI is set"
fi

# JWT
if [ -z "$JWT_SECRET" ]; then
    echo "❌ JWT_SECRET is not set"
else
    echo "✅ JWT_SECRET is set"
fi

# Email
if [ -z "$RESEND_API_KEY" ]; then
    echo "❌ RESEND_API_KEY is not set"
else
    echo "✅ RESEND_API_KEY is set"
fi

# Cloudinary
if [ -z "$CLOUDINARY_CLOUD_NAME" ] || [ -z "$CLOUDINARY_API_KEY" ] || [ -z "$CLOUDINARY_API_SECRET" ]; then
    echo "❌ Cloudinary configuration is incomplete"
else
    echo "✅ Cloudinary configuration is complete"
fi

# Google Services
if [ -z "$GOOGLE_MAPS_API_KEY" ]; then
    echo "❌ GOOGLE_MAPS_API_KEY is not set"
else
    echo "✅ GOOGLE_MAPS_API_KEY is set"
fi

if [ -z "$GOOGLE_RECAPTCHA_SITE_KEY" ] || [ -z "$GOOGLE_RECAPTCHA_SECRET_KEY" ]; then
    echo "❌ Google reCAPTCHA configuration is incomplete"
else
    echo "✅ Google reCAPTCHA configuration is complete"
fi
```

## 🔄 Environment Migration

### Development to Staging
```bash
# Copy development environment
cp .env .env.staging

# Update staging-specific variables
sed -i 's/development/staging/g' .env.staging
sed -i 's/localhost:27017/cluster.mongodb.net/g' .env.staging
sed -i 's/localhost:3001/staging.your-domain.com/g' .env.staging
```

### Staging to Production
```bash
# Copy staging environment
cp .env.staging .env.production

# Update production-specific variables
sed -i 's/staging/production/g' .env.production
sed -i 's/staging.your-domain.com/your-domain.com/g' .env.production
```

### Database Migration
```bash
# Test database connection
./deployment/test-atlas-connection.sh

# Migrate to MongoDB Atlas
./deployment/migrate-to-atlas.sh
```

## 🚨 Troubleshooting

### Common Environment Issues

#### Missing Environment Variables
```bash
# Check if .env file exists
ls -la .env

# Check environment variables
env | grep -E "(MONGODB|JWT|RESEND|CLOUDINARY|GOOGLE)"

# Validate environment
./deployment/validate-env.sh
```

#### Database Connection Issues
```bash
# Test MongoDB connection
mongosh "$MONGODB_URI" --eval "db.runCommand('ping')"

# Check MongoDB logs
docker-compose logs mongodb
```

#### API Key Issues
```bash
# Test Resend API key
curl -H "Authorization: Bearer $RESEND_API_KEY" \
     https://api.resend.com/domains

# Test Cloudinary credentials
curl -u "$CLOUDINARY_API_KEY:$CLOUDINARY_API_SECRET" \
     https://api.cloudinary.com/v1_1/$CLOUDINARY_CLOUD_NAME/resources/image
```

#### CORS Issues
```bash
# Check CORS configuration
echo "FRONTEND_URLS: $FRONTEND_URLS"

# Fix CORS issues
./deployment/fix-cors.sh
```

### Environment File Issues

#### File Permissions
```bash
# Fix file permissions
chmod 600 .env

# Check file ownership
ls -la .env
```

#### File Format Issues
```bash
# Check for hidden characters
cat -A .env

# Remove Windows line endings
dos2unix .env

# Validate syntax
source .env && echo "Environment file is valid"
```

## 📋 Environment Checklist

### Pre-Setup
- [ ] Environment template copied
- [ ] Required API keys obtained
- [ ] Database credentials ready
- [ ] Domain configuration prepared

### Development Setup
- [ ] Local MongoDB running
- [ ] Environment variables configured
- [ ] API keys set for development
- [ ] CORS configured for localhost

### Staging Setup
- [ ] Staging database configured
- [ ] Staging domain configured
- [ ] Environment variables validated
- [ ] SSL certificates installed

### Production Setup
- [ ] Production database configured
- [ ] Production domain configured
- [ ] All environment variables set
- [ ] Security measures implemented
- [ ] Monitoring configured

### Post-Setup Verification
- [ ] Environment validation passed
- [ ] Database connection working
- [ ] API endpoints accessible
- [ ] Email service functional
- [ ] Image upload working
- [ ] CORS configuration correct 