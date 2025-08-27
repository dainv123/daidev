# Nginx Deployment Guide

## 🚀 Quick Start

### **Deploy on Server (Recommended)**
```bash
cd /home/daidev/deployment
./deploy-nginx-server.sh
```

### **Deploy from Local Machine**
```bash
cd deployment
./deploy-nginx.sh
```

## 📋 Available Scripts

### **1. `deploy-nginx-server.sh`** ⭐ (Recommended)
- **Usage**: Run directly on server
- **Features**: 
  - Automatic backup before deployment
  - Copy config files from local directory
  - Test nginx configuration
  - Reload nginx if config is valid
  - Rollback on errors
- **Command**: `./deploy-nginx-server.sh`

### **2. `deploy-nginx.sh`**
- **Usage**: Deploy from local machine to server via SSH
- **Features**:
  - Copy config files via SCP
  - Test configuration on server
  - Reload nginx remotely
- **Command**: `./deploy-nginx.sh`

### **3. `reload-nginx.sh`**
- **Usage**: Quick nginx reload (when config already deployed)
- **Features**:
  - Test configuration
  - Reload nginx
  - Check status
- **Command**: `./reload-nginx.sh`

### **4. `nginx-deploy.sh`**
- **Usage**: Interactive deployment menu
- **Features**:
  - Menu-driven interface
  - Multiple deployment options
  - Status checking
  - Subdomain testing
- **Command**: `./nginx-deploy.sh`

### **5. `check-nginx.sh`**
- **Usage**: Comprehensive nginx status check
- **Features**:
  - Service status
  - Configuration validation
  - SSL certificate check
  - Subdomain testing
  - Log analysis
- **Command**: `./check-nginx.sh`

## 🔧 Configuration Files

### **Production Setup**
- **Main Config**: `nginx.conf` → `/etc/nginx/nginx.conf`
- **Subdomain Config**: `nginx-subdomain.conf` → `/etc/nginx/conf.d/`
- **Development Config**: `conf.d/default.conf` → `/etc/nginx/conf.d/`

### **Current Configuration**
- **User**: `root` (development setup)
- **Worker Processes**: Auto-detected
- **Connections**: 1024 per worker
- **Gzip Compression**: Enabled
- **CORS**: Handled by nginx (development) / backend (production)

## 🌐 Subdomain Configuration

### **Production (Subdomain-based)**
```
daidev.click          → Port 3003 (Web Frontend)
api.daidev.click      → Port 3001 (NestJS API)
admin.daidev.click    → Port 3002 (Admin Dashboard)
theme.daidev.click    → Port 3004 (Theme Detail)
docs.daidev.click     → Port 4002 (Documentation)
swagger.daidev.click  → Port 4001 (Swagger UI)
```

### **Development (Path-based)**
```
/                    → Port 3003 (Web Frontend)
/api/                → Port 3001 (NestJS API)
/admin/              → Port 3002 (Admin Dashboard)
/theme/              → Port 3004 (Theme Detail)
/docs/               → Port 4002 (Documentation)
/swagger/            → Port 4001 (Swagger UI)
```

## 🔍 Troubleshooting

### **Common Issues & Solutions**

#### **1. Configuration Errors**
```bash
# Test configuration
nginx -t

# Check specific error
nginx -t 2>&1 | grep -A5 -B5 "error"
```

#### **2. CORS Issues**
```bash
# Test CORS headers
curl -H "Origin: http://daidev.click" -I http://api.daidev.click/api/v1/site-settings

# Check if backend CORS is disabled
curl -I http://localhost:3001/api/v1/site-settings
```

#### **3. Service Not Responding**
```bash
# Check service status
systemctl status nginx

# Check if services are running
netstat -tlnp | grep -E ":(3001|3002|3003|3004|4001|4002)"

# Check nginx logs
tail -20 /var/log/nginx/error.log
```

#### **4. Permission Issues**
```bash
# Check file permissions
ls -la /etc/nginx/nginx.conf
ls -la /etc/nginx/conf.d/

# Fix permissions if needed
chown root:root /etc/nginx/nginx.conf
chmod 644 /etc/nginx/nginx.conf
```

### **Useful Commands**

#### **Status & Health Checks**
```bash
# Nginx status
systemctl status nginx

# Test all subdomains
for domain in daidev.click api.daidev.click admin.daidev.click theme.daidev.click docs.daidev.click swagger.daidev.click; do
    echo "Testing $domain..."
    curl -s -I "http://$domain" | head -1
done

# Check nginx processes
ps aux | grep nginx
```

#### **Log Analysis**
```bash
# Real-time error logs
tail -f /var/log/nginx/error.log

# Real-time access logs
tail -f /var/log/nginx/access.log

# Search for specific errors
grep -i "error" /var/log/nginx/error.log
```

#### **Configuration Management**
```bash
# Backup current config
cp -r /etc/nginx/conf.d /home/daidev/nginx-backup-$(date +%Y%m%d_%H%M%S)

# Restore from backup
cp /home/daidev/nginx-backup-*/conf.d/* /etc/nginx/conf.d/

# Compare configs
diff /etc/nginx/nginx.conf /home/daidev/deployment/nginx/nginx.conf
```

## 📊 Monitoring & Maintenance

### **Health Check Endpoints**
- **Main Website**: `http://daidev.click/`
- **API Health**: `http://api.daidev.click/api/v1/health`
- **Admin Panel**: `http://admin.daidev.click/`
- **Documentation**: `http://docs.daidev.click/`
- **Swagger UI**: `http://swagger.daidev.click/`

### **Performance Monitoring**
```bash
# Monitor nginx performance
htop

# Check memory usage
free -h

# Monitor disk usage
df -h

# Check network connections
netstat -tlnp
```

### **Regular Maintenance**
```bash
# Weekly health check
./check-nginx.sh

# Monthly log rotation
logrotate /etc/logrotate.d/nginx

# Quarterly config review
nginx -t && systemctl reload nginx
```

## 🔐 Security Considerations

### **Current Setup (Development)**
- **HTTP Only**: No SSL/TLS
- **CORS**: Open (*) for development
- **User**: root (not recommended for production)

### **Production Recommendations**
- **SSL/TLS**: Implement HTTPS with Let's Encrypt
- **CORS**: Restrict to specific domains
- **User**: Create dedicated nginx user
- **Security Headers**: Add comprehensive security headers
- **Rate Limiting**: Implement rate limiting
- **Firewall**: Configure UFW or iptables

## 📝 Best Practices

### **Deployment**
1. **Always backup** before deployment
2. **Test configuration** before reload
3. **Monitor logs** after deployment
4. **Test all endpoints** after changes
5. **Use version control** for config files

### **Configuration**
1. **Keep configs modular** and organized
2. **Use meaningful comments** in config files
3. **Test changes** in development first
4. **Document changes** and reasons
5. **Monitor performance** impact

### **Maintenance**
1. **Regular health checks** (weekly)
2. **Log monitoring** (daily)
3. **Performance monitoring** (continuous)
4. **Security updates** (monthly)
5. **Backup verification** (monthly)

## 🆘 Emergency Procedures

### **Quick Rollback**
```bash
# Stop nginx
systemctl stop nginx

# Restore from backup
cp /home/daidev/nginx-backup-*/nginx.conf /etc/nginx/
cp -r /home/daidev/nginx-backup-*/conf.d/* /etc/nginx/conf.d/

# Start nginx
systemctl start nginx
```

### **Emergency Contact**
- **Server Access**: SSH to server
- **Logs Location**: `/var/log/nginx/`
- **Config Location**: `/etc/nginx/`
- **Backup Location**: `/home/daidev/nginx-backup-*/`