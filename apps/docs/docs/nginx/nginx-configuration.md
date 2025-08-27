# Nginx Configuration Documentation

## 📋 Overview

Nginx configuration cho hệ thống Daidev Portfolio với kiến trúc microservices và multi-subdomain setup.

## 🏗️ Architecture

### **Production Environment (Subdomain-based)**
- **Main Website**: `daidev.click` → Port 3003 (Web Frontend)
- **API Backend**: `api.daidev.click` → Port 3001 (NestJS API)
- **Admin Dashboard**: `admin.daidev.click` → Port 3002 (Admin Panel)
- **Theme Detail**: `theme.daidev.click` → Port 3004 (Theme App)
- **Documentation**: `docs.daidev.click` → Port 4002 (Docusaurus)
- **Swagger UI**: `swagger.daidev.click` → Port 4001 (API Docs)

### **Development Environment (Path-based)**
- **Main Website**: `/` → Port 3003
- **API Backend**: `/api/` → Port 3001
- **Admin Dashboard**: `/admin/` → Port 3002
- **Theme Detail**: `/theme/` → Port 3004
- **Documentation**: `/docs/` → Port 4002
- **Swagger UI**: `/swagger/` → Port 4001

## 📁 Configuration Files

### 1. **Main Configuration** (`nginx.conf`)

```nginx
user root;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx/access.log main;
    
    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain text/css text/xml text/javascript
        application/json application/javascript
        application/xml+rss application/atom+xml image/svg+xml;
    
    include /etc/nginx/conf.d/*.conf;
}
```

### 2. **Production Configuration** (`nginx-subdomain.conf`)

```nginx
# Main Website
server {
    listen 80;
    server_name daidev.click www.daidev.click;
    
    location / {
        proxy_pass http://localhost:3003/;
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

# API Subdomain
server {
    listen 80;
    server_name api.daidev.click;
    
    location / {
        proxy_pass http://localhost:3001/;
        # ... proxy settings ...
    }
}

# Other subdomains...
```

### 3. **Development Configuration** (`conf.d/default.conf`)

```nginx
server {
    listen 80;
    server_name daidev.click www.daidev.click localhost;
    
    # Static Assets
    location ^~ /assets/ {
        alias /home/daidev/apps/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Access-Control-Allow-Origin *;
        autoindex on;
        try_files $uri $uri/ =404;
    }
    
    # Main Website
    location / {
        proxy_pass http://127.0.0.1:3003;
        # ... proxy settings ...
        # CORS headers
        add_header Access-Control-Allow-Origin * always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization" always;
    }
    
    # API Backend
    location /api/ {
        proxy_pass http://127.0.0.1:3001/;
        # ... proxy settings ...
        # CORS headers
    }
    
    # Other paths...
}
```

## 🔧 Key Features

### **CORS Configuration**
- **Production**: CORS handled by backend (no nginx CORS headers)
- **Development**: CORS headers added in nginx for all locations
- **Cross-subdomain communication**: Enabled for all subdomains

### **Static Assets**
- **Path**: `/assets/` → `/home/daidev/apps/assets/`
- **Caching**: 1 year expiration
- **Auto-index**: Enabled for directory browsing
- **CORS**: Enabled for cross-origin access

### **Proxy Configuration**
- **WebSocket Support**: Upgrade headers for real-time communication
- **Real IP Forwarding**: X-Real-IP and X-Forwarded-For headers
- **Protocol Forwarding**: X-Forwarded-Proto header
- **Host Forwarding**: Preserves original host header

### **Performance Optimizations**
- **Gzip Compression**: Enabled for text-based files
- **Sendfile**: Optimized file serving
- **Keep-alive**: 65 seconds timeout
- **TCP Optimizations**: nopush and nodelay enabled

## 🚀 Deployment Scripts

### **Available Scripts**
- `deploy-nginx-server.sh` - Deploy config when running on server
- `deploy-nginx.sh` - Deploy config from local to server (SSH)
- `reload-nginx.sh` - Quick nginx reload
- `check-nginx.sh` - Check nginx status and config
- `nginx-deploy.sh` - Interactive deployment menu

### **Quick Deploy**
```bash
# On server
./deploy-nginx-server.sh

# From local machine
./deploy-nginx.sh
```

## 🔍 Troubleshooting

### **Common Issues**

1. **CORS Errors**
   - Check if backend CORS is disabled
   - Verify nginx CORS headers are present
   - Clear browser cache

2. **Configuration Errors**
   - Run `nginx -t` to test config
   - Check `/var/log/nginx/error.log`
   - Verify file permissions

3. **Service Not Responding**
   - Check if services are running on correct ports
   - Verify proxy_pass URLs
   - Check firewall settings

### **Useful Commands**
```bash
# Test nginx config
nginx -t

# Check nginx status
systemctl status nginx

# View logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# Test subdomains
curl -I http://daidev.click
curl -I http://api.daidev.click
```

## 📊 Monitoring

### **Health Checks**
- **Main Website**: `http://daidev.click/`
- **API Health**: `http://api.daidev.click/api/v1/health`
- **Admin Panel**: `http://admin.daidev.click/`
- **Documentation**: `http://docs.daidev.click/`
- **Swagger UI**: `http://swagger.daidev.click/`

### **Performance Metrics**
- **Response Time**: Monitor via access logs
- **Error Rate**: Check error logs
- **Traffic**: Monitor access logs for patterns
- **CORS Issues**: Check for CORS-related errors

## 🔐 Security Considerations

### **Current Setup**
- **HTTP Only**: No SSL/TLS (development setup)
- **CORS**: Open for development (*)
- **Headers**: Basic security headers from backend

### **Production Recommendations**
- **SSL/TLS**: Implement HTTPS with Let's Encrypt
- **CORS**: Restrict to specific domains
- **Security Headers**: Add additional security headers
- **Rate Limiting**: Implement rate limiting
- **Firewall**: Configure firewall rules

## 📝 Notes

- **User**: Running as `root` (development setup)
- **Worker Processes**: Auto-detected
- **Connections**: 1024 per worker
- **Logs**: Standard nginx log format
- **Backup**: Automatic backup before deployment
- **Rollback**: Automatic rollback on config errors 