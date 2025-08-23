# Cloud Deployment Guide - Daidev Platform

## Tổng quan

Hướng dẫn deploy toàn bộ hệ thống Daidev lên cloud server sử dụng Docker Compose.

## Server Setup

### 1. **Install Docker & Compose**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
sudo reboot
```

### 2. **Clone Project**
```bash
git clone <your-repo-url> /opt/daidev
cd /opt/daidev/deployment
```

## Docker Compose Configuration

### `docker-compose.yml`
```yaml
version: "3.9"

services:
  # MongoDB Database
  mongodb:
    image: mongo:7.0
    container_name: daidev-mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: your-mongodb-password
      MONGO_INITDB_DATABASE: daidev
    volumes:
      - mongodb_data:/data/db
    networks:
      - daidev-network
    ports:
      - "27017:27017"

  # API Backend
  api:
    build:
      context: ../apps/api
      dockerfile: Dockerfile
    container_name: daidev-api
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3001
      - MONGODB_URI=mongodb://admin:your-mongodb-password@mongodb:27017/daidev?authSource=admin
      - JWT_SECRET=your-super-secret-jwt-key-here
      - JWT_EXPIRES_IN=7d
      - RESEND_API_KEY=your-resend-api-key
      - CLOUDINARY_CLOUD_NAME=your-cloud-name
      - CLOUDINARY_API_KEY=your-api-key
      - CLOUDINARY_API_SECRET=your-api-secret
      - GOOGLE_MAPS_API_KEY=your-google-maps-api-key
      - GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
      - GOOGLE_RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
      - FRONTEND_URLS=https://daidev.com,https://admin.daidev.com,https://docs.daidev.com
    depends_on:
      - mongodb
    networks:
      - daidev-network
    ports:
      - "3001:3001"

  # Admin Dashboard
  admin:
    build:
      context: ../apps/admin
      dockerfile: Dockerfile
    container_name: daidev-admin
    restart: unless-stopped
    environment:
      - VITE_API_URL=https://api.daidev.com/api/v1
      - VITE_APP_NAME=Daidev Admin
      - VITE_APP_VERSION=1.0.0
    networks:
      - daidev-network
    ports:
      - "3002:3002"

  # Web Frontend
  web:
    build:
      context: ../apps/web
      dockerfile: Dockerfile
    container_name: daidev-web
    restart: unless-stopped
    environment:
      - NEXT_PUBLIC_API_URL=https://api.daidev.com/api/v1
      - NEXT_PUBLIC_APP_NAME=Daidev Portfolio
      - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
      - NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
    networks:
      - daidev-network
    ports:
      - "3003:3003"

  # Theme Detail
  theme-detail:
    build:
      context: ../apps/theme-detail
      dockerfile: Dockerfile
    container_name: daidev-theme-detail
    restart: unless-stopped
    networks:
      - daidev-network
    ports:
      - "3004:3004"

  # Documentation
  docs:
    build:
      context: ../apps/docs
      dockerfile: Dockerfile
    container_name: daidev-docs
    restart: unless-stopped
    networks:
      - daidev-network
    ports:
      - "4002:4002"

  # Swagger Proxy
  swagger-proxy:
    build:
      context: ../apps/swagger-proxy
      dockerfile: Dockerfile
    container_name: daidev-swagger-proxy
    restart: unless-stopped
    environment:
      - API_URL=http://api:3001
    depends_on:
      - api
    networks:
      - daidev-network
    ports:
      - "4001:4001"

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: daidev-nginx
    restart: unless-stopped
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./ssl:/etc/nginx/ssl
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - api
      - admin
      - web
      - theme-detail
      - docs
      - swagger-proxy
    networks:
      - daidev-network

volumes:
  mongodb_data:

networks:
  daidev-network:
    driver: bridge
```

## Dockerfile Examples

### API Backend (`apps/api/Dockerfile`)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/v1/health || exit 1

CMD ["npm", "run", "start:prod"]
```

### Admin Dashboard (`apps/admin/Dockerfile`)
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3002

CMD ["nginx", "-g", "daemon off;"]
```

### Web Frontend (`apps/web/Dockerfile`)
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY next.config.js ./
COPY tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3003

CMD ["npm", "start"]
```

## Nginx Configuration

### Main Config (`nginx/nginx.conf`)
```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    include /etc/nginx/conf.d/*.conf;
}
```

### Site Configs

#### Main Site (`nginx/conf.d/daidev.com.conf`)
```nginx
server {
    listen 80;
    server_name daidev.com www.daidev.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name daidev.com www.daidev.com;

    ssl_certificate /etc/nginx/ssl/daidev.com.crt;
    ssl_certificate_key /etc/nginx/ssl/daidev.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://web:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /theme/ {
        proxy_pass http://theme-detail:3004/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### API (`nginx/conf.d/api.daidev.com.conf`)
```nginx
server {
    listen 80;
    server_name api.daidev.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.daidev.com;

    ssl_certificate /etc/nginx/ssl/api.daidev.com.crt;
    ssl_certificate_key /etc/nginx/ssl/api.daidev.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://api:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization";
    }
}
```

#### Admin Dashboard (`nginx/conf.d/admin.daidev.com.conf`)
```nginx
server {
    listen 80;
    server_name admin.daidev.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name admin.daidev.com;

    ssl_certificate /etc/nginx/ssl/admin.daidev.com.crt;
    ssl_certificate_key /etc/nginx/ssl/admin.daidev.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://admin:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Documentation (`nginx/conf.d/docs.daidev.com.conf`)
```nginx
server {
    listen 80;
    server_name docs.daidev.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name docs.daidev.com;

    ssl_certificate /etc/nginx/ssl/docs.daidev.com.crt;
    ssl_certificate_key /etc/nginx/ssl/docs.daidev.com.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://docs:4002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Deployment Steps

### 1. **Setup Environment**
```bash
# Create deployment directory
mkdir -p /opt/daidev/deployment
cd /opt/daidev/deployment

# Create environment file
cat > .env << EOF
MONGODB_ROOT_USERNAME=admin
MONGODB_ROOT_PASSWORD=your-secure-mongodb-password
MONGODB_DATABASE=daidev
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
RESEND_API_KEY=your-resend-api-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
GOOGLE_RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
FRONTEND_URLS=https://daidev.com,https://admin.daidev.com,https://docs.daidev.com
EOF
```

### 2. **Setup SSL Certificates**
```bash
# Install certbot
sudo apt install -y certbot nginx certbot python3-certbot-nginx

# Obtain SSL certificates
sudo certbot --nginx -d daidev.com -d www.daidev.com
sudo certbot --nginx -d api.daidev.com
sudo certbot --nginx -d admin.daidev.com
sudo certbot --nginx -d docs.daidev.com

# Create SSL directory and copy certificates
mkdir -p /opt/daidev/deployment/ssl

sudo cp /etc/letsencrypt/live/daidev.com/fullchain.pem /opt/daidev/deployment/ssl/daidev.com.crt
sudo cp /etc/letsencrypt/live/daidev.com/privkey.pem /opt/daidev/deployment/ssl/daidev.com.key

sudo cp /etc/letsencrypt/live/api.daidev.com/fullchain.pem /opt/daidev/deployment/ssl/api.daidev.com.crt
sudo cp /etc/letsencrypt/live/api.daidev.com/privkey.pem /opt/daidev/deployment/ssl/api.daidev.com.key

sudo cp /etc/letsencrypt/live/admin.daidev.com/fullchain.pem /opt/daidev/deployment/ssl/admin.daidev.com.crt
sudo cp /etc/letsencrypt/live/admin.daidev.com/privkey.pem /opt/daidev/deployment/ssl/admin.daidev.com.key

sudo cp /etc/letsencrypt/live/docs.daidev.com/fullchain.pem /opt/daidev/deployment/ssl/docs.daidev.com.crt
sudo cp /etc/letsencrypt/live/docs.daidev.com/privkey.pem /opt/daidev/deployment/ssl/docs.daidev.com.key

# Set permissions
sudo chown -R $USER:$USER /opt/daidev/deployment/ssl
chmod 600 /opt/daidev/deployment/ssl/*.key
chmod 644 /opt/daidev/deployment/ssl/*.crt
```

### 3. **Deploy Application**
```bash
# Build and start all services
docker-compose up -d --build

# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Run database seed
docker-compose exec api npm run seed
```

### 4. **Health Checks**
```bash
# Check all services
curl -f https://api.daidev.com/api/v1/health
curl -f https://daidev.com
curl -f https://admin.daidev.com
curl -f https://docs.daidev.com

# Check container health
docker-compose ps
```

## Maintenance

### Update Application
```bash
# Pull latest code
cd /opt/daidev
git pull origin main

# Rebuild and restart
cd deployment
docker-compose down
docker-compose up -d --build
```

### Backup Database
```bash
# Create backup
docker-compose exec -T mongodb mongodump --username admin --password your-mongodb-password --authenticationDatabase admin --db daidev --archive > backup_$(date +%Y%m%d_%H%M%S).archive
```

### SSL Certificate Renewal
```bash
# Renew certificates
sudo certbot renew

# Copy renewed certificates and restart nginx
sudo cp /etc/letsencrypt/live/*/fullchain.pem /opt/daidev/deployment/ssl/
sudo cp /etc/letsencrypt/live/*/privkey.pem /opt/daidev/deployment/ssl/
docker-compose restart nginx
```

## Final URLs

Sau khi deploy thành công:

- **Main Website**: https://daidev.com
- **API Backend**: https://api.daidev.com
- **Admin Dashboard**: https://admin.daidev.com
- **Documentation**: https://docs.daidev.com
- **Theme Detail**: https://daidev.com/theme/

## Troubleshooting

### Common Issues
```bash
# Check logs
docker-compose logs -f

# Restart specific service
docker-compose restart api

# Check port conflicts
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# Check SSL certificates
openssl x509 -in /opt/daidev/deployment/ssl/daidev.com.crt -text -noout
```

---

**Lưu ý**: Thay thế tất cả placeholder values (API keys, passwords, domain names) bằng giá trị thực tế trước khi deploy. 