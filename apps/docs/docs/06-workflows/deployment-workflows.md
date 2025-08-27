# Deployment Workflows

This guide covers the complete deployment process for the daidev platform, including server setup, Docker deployment, and production configuration.

## 🚀 Quick Deployment

### Prerequisites
- Ubuntu 20.04+ server
- Docker and Docker Compose installed
- Domain name configured
- SSL certificate (Let's Encrypt)

### 1. Server Setup

#### Initial Server Configuration
```bash
# Run the complete server setup script
./deployment/setup-server-complete.sh

# Or run individual setup scripts
./deployment/server-setup.sh
./deployment/setup-docker.sh
./deployment/setup-subdomain-ssl.sh
```

#### Docker Setup
```bash
# Install Docker and Docker Compose
./deployment/setup-docker.sh

# Verify installation
docker --version
docker-compose --version
```

### 2. Environment Configuration

#### Copy Environment Template
```bash
cp env.example .env
```

#### Configure Environment Variables
Edit `.env` file with your production values:

```bash
# Database
MONGODB_ROOT_PASSWORD=your-secure-password
MONGODB_URI=mongodb://admin:your-secure-password@mongodb:27017/daidev?authSource=admin

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

# Frontend URLs
FRONTEND_URLS=https://your-domain.com,https://www.your-domain.com

# Domain Configuration
DOMAIN=your-domain.com
WWW_DOMAIN=www.your-domain.com
```

### 3. Production Deployment

#### Deploy with Docker Compose
```bash
# Production deployment
./deployment/production-deploy.sh

# Or manual deployment
docker-compose -f docker-compose.prod.yml up -d
```

#### Verify Deployment
```bash
# Check all services
docker-compose ps

# Check logs
docker-compose logs -f

# Test API connection
./deployment/test-atlas-connection.sh
```

### 4. Nginx Configuration

#### Deploy Nginx Configuration
```bash
# Deploy nginx configuration
./deployment/deploy-nginx.sh

# Copy nginx config
./deployment/copy-nginx-config.sh

# Reload nginx
./deployment/reload-nginx.sh
```

#### SSL Certificate Setup
```bash
# Setup SSL for subdomain
./deployment/setup-subdomain-ssl.sh

# Verify SSL
./deployment/check-nginx.sh
```

### 5. Monitoring and Maintenance

#### Health Checks
```bash
# Monitor services
./deployment/monitor.sh

# Check nginx status
./deployment/check-nginx.sh

# Validate environment
./deployment/validate-env.sh
```

#### Backup and Recovery
```bash
# Create backup
./deployment/backup.sh

# Cleanup server
./deployment/cleanup-server.sh

# Safe cleanup
./deployment/safe-cleanup.sh
```

## 🔧 Deployment Scripts Reference

### Core Deployment Scripts
- `production-deploy.sh` - Complete production deployment
- `server-setup.sh` - Initial server configuration
- `setup-docker.sh` - Docker installation and setup
- `setup-subdomain-ssl.sh` - SSL certificate configuration

### Nginx Management
- `deploy-nginx.sh` - Deploy nginx configuration
- `copy-nginx-config.sh` - Copy nginx config files
- `reload-nginx.sh` - Reload nginx service
- `check-nginx.sh` - Verify nginx status
- `update-nginx-config.sh` - Update nginx configuration

### CORS and Security
- `fix-cors.sh` - Fix CORS issues
- `quick-cors-fix.sh` - Quick CORS fix
- `restart-api.sh` - Restart API service

### Monitoring and Maintenance
- `monitor.sh` - Service monitoring
- `validate-env.sh` - Environment validation
- `backup.sh` - Data backup
- `cleanup-server.sh` - Server cleanup
- `safe-cleanup.sh` - Safe cleanup operations

### Database Management
- `test-atlas-connection.sh` - Test MongoDB Atlas connection
- `migrate-to-atlas.sh` - Migrate to MongoDB Atlas

## 🐳 Docker Deployment

### Development Environment
```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Environment
```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Production with MongoDB Atlas
docker-compose -f docker-compose.prod.atlas.yml up -d
```

### Service Management
```bash
# Restart specific service
docker-compose restart api

# Update and restart
docker-compose pull
docker-compose up -d

# View service logs
docker-compose logs -f api
docker-compose logs -f web
docker-compose logs -f admin
```

## 🔒 Security Configuration

### SSL/TLS Setup
1. **Automatic SSL with Let's Encrypt**
   ```bash
   ./deployment/setup-subdomain-ssl.sh
   ```

2. **Manual SSL Certificate**
   - Place certificates in `deployment/ssl/`
   - Update nginx configuration
   - Reload nginx service

### CORS Configuration
```bash
# Fix CORS issues
./deployment/fix-cors.sh

# Quick CORS fix
./deployment/quick-cors-fix.sh
```

### Environment Security
- Use strong passwords for MongoDB
- Generate secure JWT secrets
- Keep API keys secure
- Enable rate limiting
- Configure session security

## 📊 Monitoring and Logging

### Service Monitoring
```bash
# Monitor all services
./deployment/monitor.sh

# Check specific service
docker-compose ps api
docker-compose logs api
```

### Log Management
- Application logs: `docker-compose logs -f`
- Nginx logs: `/var/log/nginx/`
- System logs: `journalctl -u docker`

### Health Checks
- API health: `curl https://your-domain.com/api/v1/health`
- Web app: `curl https://your-domain.com`
- Admin dashboard: `curl https://admin.your-domain.com`

## 🚨 Troubleshooting

### Common Issues

#### Service Won't Start
```bash
# Check logs
docker-compose logs service-name

# Check environment
./deployment/validate-env.sh

# Restart service
docker-compose restart service-name
```

#### Nginx Issues
```bash
# Check nginx status
./deployment/check-nginx.sh

# Reload nginx
./deployment/reload-nginx.sh

# Update config
./deployment/update-nginx-config.sh
```

#### Database Connection Issues
```bash
# Test connection
./deployment/test-atlas-connection.sh

# Check MongoDB logs
docker-compose logs mongodb
```

#### CORS Issues
```bash
# Fix CORS
./deployment/fix-cors.sh

# Restart API
./deployment/restart-api.sh
```

### Recovery Procedures

#### Complete System Recovery
```bash
# Stop all services
docker-compose down

# Clean up
./deployment/cleanup-server.sh

# Restore from backup
# (Manual process based on your backup strategy)

# Redeploy
./deployment/production-deploy.sh
```

#### Partial Service Recovery
```bash
# Restart specific service
docker-compose restart service-name

# Rebuild and restart
docker-compose build service-name
docker-compose up -d service-name
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Server prepared with Docker
- [ ] Domain DNS configured
- [ ] Environment variables set
- [ ] SSL certificates ready
- [ ] Database backup created

### Deployment
- [ ] Environment validation passed
- [ ] Docker images built successfully
- [ ] Services started without errors
- [ ] Nginx configuration deployed
- [ ] SSL certificates installed

### Post-Deployment
- [ ] All services responding
- [ ] SSL certificates valid
- [ ] CORS configured correctly
- [ ] Monitoring active
- [ ] Backup system working

### Verification
- [ ] API endpoints accessible
- [ ] Web app loading correctly
- [ ] Admin dashboard functional
- [ ] Email system working
- [ ] Image uploads functional 