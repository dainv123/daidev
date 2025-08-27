# Server Scripts Guide - Daidev Portfolio

## 📋 Overview

Tổng hợp các scripts cần thiết để tương tác và quản lý server Daidev Portfolio.

## 🚀 Essential Scripts (Cần thiết nhất)

### **1. Nginx Management**

#### **`deploy-nginx-server.sh`** ⭐ **MOST IMPORTANT**
```bash
# Deploy nginx config khi đang chạy trên server
./deploy-nginx-server.sh
```
**Chức năng:**
- ✅ Backup config hiện tại
- ✅ Copy config files từ local directory
- ✅ Test nginx configuration
- ✅ Reload nginx nếu config OK
- ✅ Rollback tự động nếu có lỗi

#### **`reload-nginx.sh`** ⭐ **QUICK RELOAD**
```bash
# Reload nginx nhanh (khi config đã có)
./reload-nginx.sh
```
**Chức năng:**
- ✅ Test config
- ✅ Reload nginx
- ✅ Check status

#### **`check-nginx.sh`** ⭐ **HEALTH CHECK**
```bash
# Kiểm tra toàn diện nginx
./check-nginx.sh
```
**Chức năng:**
- ✅ Service status
- ✅ Configuration validation
- ✅ Subdomain testing
- ✅ Log analysis

### **2. API Management**

#### **`restart-api.sh`** ⭐ **API RESTART**
```bash
# Restart API service
./restart-api.sh
```
**Chức năng:**
- ✅ Stop API service
- ✅ Start API service
- ✅ Health check
- ✅ Log monitoring

### **3. CORS & Issues**

#### **`fix-cors.sh`** ⭐ **CORS FIX**
```bash
# Fix CORS issues
./fix-cors.sh
```
**Chức năng:**
- ✅ Check services status
- ✅ Test CORS configuration
- ✅ Reload nginx
- ✅ Environment variables check

#### **`quick-cors-fix.sh`** ⭐ **QUICK CORS**
```bash
# Fix CORS nhanh
./quick-cors-fix.sh
```
**Chức năng:**
- ✅ Quick CORS fix
- ✅ Reload nginx
- ✅ Test endpoints

## 🔧 Utility Scripts (Tiện ích)

### **4. Deployment & Setup**

#### **`deploy-nginx.sh`**
```bash
# Deploy từ local machine qua SSH
./deploy-nginx.sh
```
**Chức năng:**
- ✅ Copy config via SCP
- ✅ Test trên server
- ✅ Reload remotely

#### **`copy-nginx-config.sh`**
```bash
# Copy config files lên server
./copy-nginx-config.sh
```
**Chức năng:**
- ✅ Backup trên server
- ✅ Copy files via SCP
- ✅ Test và reload

#### **`nginx-deploy.sh`**
```bash
# Menu tương tác deployment
./nginx-deploy.sh
```
**Chức năng:**
- ✅ Menu-driven interface
- ✅ Multiple options
- ✅ Status checking

### **5. Monitoring & Maintenance**

#### **`monitor.sh`**
```bash
# Monitor server performance
./monitor.sh
```
**Chức năng:**
- ✅ CPU/Memory usage
- ✅ Disk usage
- ✅ Network status
- ✅ Service status

#### **`backup.sh`**
```bash
# Backup important data
./backup.sh
```
**Chức năng:**
- ✅ Database backup
- ✅ Config backup
- ✅ Files backup

### **6. Setup & Configuration**

#### **`setup-server-complete.sh`**
```bash
# Setup server hoàn chỉnh
./setup-server-complete.sh
```
**Chức năng:**
- ✅ Install dependencies
- ✅ Configure services
- ✅ Setup nginx
- ✅ Setup SSL

#### **`validate-env.sh`**
```bash
# Validate environment
./validate-env.sh
```
**Chức năng:**
- ✅ Check environment variables
- ✅ Validate configs
- ✅ Test connections

### **7. Database & Migration**

#### **`test-atlas-connection.sh`**
```bash
# Test MongoDB Atlas connection
./test-atlas-connection.sh
```
**Chức năng:**
- ✅ Test database connection
- ✅ Check credentials
- ✅ Validate connection string

#### **`migrate-to-atlas.sh`**
```bash
# Migrate to MongoDB Atlas
./migrate-to-atlas.sh
```
**Chức năng:**
- ✅ Data migration
- ✅ Connection setup
- ✅ Validation

### **8. Cleanup & Maintenance**

#### **`cleanup-server.sh`**
```bash
# Cleanup server
./cleanup-server.sh
```
**Chức năng:**
- ✅ Remove unused files
- ✅ Clear logs
- ✅ Optimize storage

#### **`safe-cleanup.sh`**
```bash
# Safe cleanup
./safe-cleanup.sh
```
**Chức năng:**
- ✅ Safe file removal
- ✅ Log cleanup
- ✅ Temporary files cleanup

## 📊 Quick Reference

### **Daily Operations**
```bash
# 1. Check nginx status
./check-nginx.sh

# 2. Monitor server
./monitor.sh

# 3. Quick reload if needed
./reload-nginx.sh
```

### **Deployment Operations**
```bash
# 1. Deploy nginx config
./deploy-nginx-server.sh

# 2. Restart API if needed
./restart-api.sh

# 3. Fix CORS if issues
./fix-cors.sh
```

### **Troubleshooting**
```bash
# 1. Check nginx logs
tail -f /var/log/nginx/error.log

# 2. Test subdomains
for domain in daidev.click api.daidev.click admin.daidev.click; do
    echo "Testing $domain..."
    curl -s -I "http://$domain" | head -1
done

# 3. Check services
systemctl status nginx
systemctl status api
```

## 🎯 Priority Scripts

### **🔥 CRITICAL (Luôn cần)**
1. `deploy-nginx-server.sh` - Deploy config
2. `reload-nginx.sh` - Quick reload
3. `check-nginx.sh` - Health check
4. `restart-api.sh` - API restart

### **⚡ IMPORTANT (Thường dùng)**
1. `fix-cors.sh` - Fix CORS issues
2. `monitor.sh` - Monitor server
3. `backup.sh` - Backup data
4. `validate-env.sh` - Validate environment

### **🔧 UTILITY (Khi cần)**
1. `cleanup-server.sh` - Cleanup
2. `setup-server-complete.sh` - Setup
3. `migrate-to-atlas.sh` - Database migration
4. `nginx-deploy.sh` - Interactive menu

## 📝 Usage Examples

### **Scenario 1: Deploy New Config**
```bash
# 1. Deploy nginx config
./deploy-nginx-server.sh

# 2. Check if everything works
./check-nginx.sh

# 3. Monitor for issues
./monitor.sh
```

### **Scenario 2: Fix CORS Issues**
```bash
# 1. Check current status
./check-nginx.sh

# 2. Fix CORS
./fix-cors.sh

# 3. Test endpoints
curl -H "Origin: http://daidev.click" -I http://api.daidev.click/api/v1/site-settings
```

### **Scenario 3: API Issues**
```bash
# 1. Restart API
./restart-api.sh

# 2. Check nginx
./check-nginx.sh

# 3. Monitor logs
tail -f /var/log/nginx/error.log
```

### **Scenario 4: Server Maintenance**
```bash
# 1. Backup data
./backup.sh

# 2. Cleanup server
./cleanup-server.sh

# 3. Monitor performance
./monitor.sh
```

## 🔍 Troubleshooting Guide

### **Common Issues & Solutions**

#### **1. Nginx Not Starting**
```bash
# Check config
nginx -t

# Check logs
tail -20 /var/log/nginx/error.log

# Check permissions
ls -la /etc/nginx/nginx.conf
```

#### **2. CORS Still Not Working**
```bash
# Test CORS headers
curl -H "Origin: http://daidev.click" -I http://api.daidev.click/api/v1/site-settings

# Check backend CORS
curl -I http://localhost:3001/api/v1/site-settings

# Fix CORS
./fix-cors.sh
```

#### **3. Services Not Responding**
```bash
# Check service status
systemctl status nginx
systemctl status api

# Check ports
netstat -tlnp | grep -E ":(3001|3002|3003|3004|4001|4002)"

# Restart services
./restart-api.sh
./reload-nginx.sh
```

## 📊 Monitoring Commands

### **Real-time Monitoring**
```bash
# Monitor nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Monitor system
htop
iotop

# Monitor network
iftop
```

### **Health Checks**
```bash
# Check all services
./check-nginx.sh

# Monitor performance
./monitor.sh

# Test all endpoints
for domain in daidev.click api.daidev.click admin.daidev.click theme.daidev.click docs.daidev.click swagger.daidev.click; do
    echo "Testing $domain..."
    curl -s -I "http://$domain" | head -1
done
```

## 🆘 Emergency Procedures

### **Quick Recovery**
```bash
# 1. Stop nginx
systemctl stop nginx

# 2. Restore from backup
cp /home/daidev/nginx-backup-*/nginx.conf /etc/nginx/
cp -r /home/daidev/nginx-backup-*/conf.d/* /etc/nginx/conf.d/

# 3. Start nginx
systemctl start nginx

# 4. Check status
./check-nginx.sh
```

### **Emergency Contacts**
- **Server Access**: SSH to server
- **Logs Location**: `/var/log/nginx/`
- **Config Location**: `/etc/nginx/`
- **Backup Location**: `/home/daidev/nginx-backup-*/`
- **Scripts Location**: `/home/daidev/deployment/`

## 📝 Best Practices

### **Before Making Changes**
1. **Always backup** before changes
2. **Test configuration** before reload
3. **Monitor logs** after changes
4. **Test endpoints** after deployment

### **Regular Maintenance**
1. **Weekly health checks** with `./check-nginx.sh`
2. **Daily monitoring** with `./monitor.sh`
3. **Monthly cleanup** with `./cleanup-server.sh`
4. **Quarterly backup** with `./backup.sh`

### **Documentation**
1. **Document changes** made to config
2. **Update scripts** when needed
3. **Keep logs** for troubleshooting
4. **Version control** config files 