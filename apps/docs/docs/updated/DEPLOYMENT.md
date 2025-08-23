# Daidev Platform Deployment Guide

## Tổng quan

Hướng dẫn deploy toàn bộ hệ thống Daidev lên cloud server sử dụng Docker Compose và Nginx reverse proxy.

## Kiến trúc Deployment

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web App       │    │  Admin Dashboard│    │  Theme Detail   │
│   (Next.js)     │    │   (React)       │    │   (Nuxt.js)     │
│   Port: 3003    │    │   Port: 3002    │    │   Port: 3004    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      API Backend          │
                    │      (NestJS)             │
                    │      Port: 3001           │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │      MongoDB              │
                    │      Database             │
                    └───────────────────────────┘

┌─────────────────┐    ┌─────────────────┐
│  Documentation  │    │ Swagger Proxy   │
│  (Docusaurus)   │    │   (Express)     │
│  Port: 4002     │    │   Port: 4001    │
└─────────────────┘    └─────────────────┘

                    ┌─────────────────┐
                    │  Nginx Reverse  │
                    │     Proxy       │
                    │  Port: 80/443   │
                    └─────────────────┘
```

## Prerequisites

### System Requirements
- **OS**: Ubuntu 22.04 LTS
- **RAM**: Minimum 4GB (Recommended 8GB)
- **Storage**: Minimum 20GB
- **CPU**: 2 cores minimum
- **Network**: Public IP với domain/subdomain

### Software Requirements
- Docker Engine
- Docker Compose
- Nginx (reverse proxy)
- Git

## Quick Start

### 1. Development Deployment

```bash
# Clone repository
git clone <your-repo-url>
cd daidev

# Copy environment file
cp env.example .env

# Edit environment variables
nano .env

# Run deployment script
./deploy.sh
```

### 2. Production Deployment

```bash
# Clone repository
git clone <your-repo-url>
cd daidev

# Set domain (optional)
export DOMAIN=your-domain.com

# Run production deployment script
sudo ./deployment/production-deploy.sh
```

## Services

### Core Services

| Service | Port | Framework | Description |
|---------|------|-----------|-------------|
| **API Backend** | 3001 | NestJS | REST API cho toàn bộ hệ thống |
| **Admin Dashboard** | 3002 | React + Vite | Giao diện quản trị |
| **Web Frontend** | 3003 | Next.js | Website portfolio chính |
| **Theme Detail** | 3004 | Nuxt.js | Micro frontend cho theme details |
| **Documentation** | 4002 | Docusaurus | Tài liệu kỹ thuật |
| **Swagger Proxy** | 4001 | Express.js | Swagger UI interface |
| **MongoDB** | 27017 | MongoDB | Database |
| **Nginx** | 80/443 | Nginx | Reverse proxy |

### Access URLs

#### Development
- **Main Website**: http://localhost
- **API Backend**: http://localhost/api
- **Admin Dashboard**: http://localhost/admin
- **Theme Detail**: http://localhost/theme
- **Documentation**: http://localhost/docs
- **Swagger UI**: http://localhost/swagger

#### Production (with domain)
- **Main Website**: https://daidev.com
- **API Backend**: https://api.daidev.com
- **Admin Dashboard**: https://admin.daidev.com
- **Documentation**: https://docs.daidev.com

## Environment Variables

### Required Variables

```env
# Database
MONGODB_ROOT_PASSWORD=your-secure-mongodb-password

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# External Services
RESEND_API_KEY=your-resend-api-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
GOOGLE_RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# URLs
FRONTEND_URLS=https://daidev.com,https://admin.daidev.com,https://docs.daidev.com
VITE_API_URL=https://api.daidev.com/api/v1
NEXT_PUBLIC_API_URL=https://api.daidev.com/api/v1
```

## Docker Commands

### Basic Commands

```bash
# Start all services
docker-compose up -d

# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Check status
docker-compose ps
```

### Service-specific Commands

```bash
# View specific service logs
docker-compose logs -f api
docker-compose logs -f web
docker-compose logs -f admin

# Restart specific service
docker-compose restart api
docker-compose restart web

# Execute commands in containers
docker-compose exec api npm run seed
docker-compose exec mongodb mongosh
```

## SSL Configuration

### Development
- Self-signed certificates are generated automatically
- Access via HTTP (port 80)

### Production
- Let's Encrypt certificates are obtained automatically
- Access via HTTPS (port 443)
- Automatic renewal setup

## Monitoring & Maintenance

### Health Checks

```bash
# Check API health
curl http://localhost:3001/api/v1/health

# Check all services
for port in 3001 3002 3003 3004 4001 4002; do
  echo "Port $port: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port || echo "DOWN")"
done
```

### Backup

```bash
# Manual backup
./deployment/backup.sh

# Automatic backup (daily at 2 AM)
# Configured automatically in production
```

### SSL Renewal

```bash
# Manual renewal
./deployment/renew-ssl.sh

# Automatic renewal (daily at 12 PM)
# Configured automatically in production
```

## Troubleshooting

### Common Issues

#### 1. Port Conflicts
```bash
# Check port usage
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# Stop conflicting services
sudo systemctl stop nginx
sudo systemctl disable nginx
```

#### 2. Container Won't Start
```bash
# Check container logs
docker-compose logs api
docker-compose logs web

# Check container status
docker-compose ps

# Restart specific service
docker-compose restart api
```

#### 3. Database Connection Issues
```bash
# Check MongoDB container
docker-compose logs mongodb

# Test database connection
docker-compose exec api npm run test:db
```

#### 4. SSL Certificate Issues
```bash
# Check certificate validity
openssl x509 -in deployment/ssl/daidev.com.crt -text -noout

# Renew certificates manually
sudo certbot renew --force-renewal
```

### Debug Commands

```bash
# Check Docker status
docker info
docker-compose version

# Check system resources
htop
df -h
free -h

# Check network connectivity
ping google.com
curl -I http://localhost:3001
```

## Security Considerations

### Firewall Configuration
```bash
# Allow only necessary ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose pull
docker-compose up -d
```

### Monitoring
```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Set up log monitoring
sudo apt install -y fail2ban
```

## Performance Optimization

### Nginx Caching
```nginx
# Add to nginx config
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Database Optimization
```bash
# Create MongoDB indexes
docker-compose exec mongodb mongosh --username admin --password your-password --authenticationDatabase admin daidev
```

### Container Resource Limits
```yaml
# Add to docker-compose.yml
services:
  api:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
        reservations:
          memory: 512M
          cpus: '0.25'
```

## Scaling

### Horizontal Scaling
```bash
# Scale specific services
docker-compose up -d --scale api=3
docker-compose up -d --scale web=2
```

### Load Balancing
- Nginx automatically load balances between multiple instances
- Configure upstream servers in nginx configuration

## Backup & Recovery

### Backup Strategy
- **Database**: Daily MongoDB dumps
- **Application Data**: SSL certificates, environment files
- **Retention**: 7 days of backups

### Recovery Process
```bash
# Restore database
docker-compose exec -T mongodb mongorestore --username admin --password your-password --authenticationDatabase admin --db daidev < backup_file.archive

# Restore application data
tar -xzf app_data_backup.tar.gz -C /
```

## Support

### Logs Location
- **Application Logs**: `docker-compose logs -f`
- **Nginx Logs**: `/var/log/nginx/`
- **System Logs**: `/var/log/syslog`

### Contact
- **Documentation**: https://docs.daidev.com
- **Issues**: GitHub Issues
- **Support**: Create support ticket

---

**Lưu ý**: Đảm bảo thay thế tất cả placeholder values (API keys, passwords, domain names) bằng giá trị thực tế trước khi deploy. 