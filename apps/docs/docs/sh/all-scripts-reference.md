# All Scripts Reference - Daidev Portfolio

## 📋 Complete Scripts Inventory

Tổng hợp tất cả scripts trong thư mục `deployment/` với status và hướng dẫn sử dụng.

## 🚀 Essential Scripts (Cần thiết nhất)

### **1. Nginx Management**

#### **`deploy-nginx-server.sh`** ⭐ **WORKING**
```bash
# Deploy nginx config khi đang chạy trên server
./deploy-nginx-server.sh
```
**Status**: ✅ Up-to-date  
**Functionality**: 
- Backup current config
- Copy new config files
- Test nginx configuration
- Reload nginx
- Auto rollback on errors

#### **`reload-nginx.sh`** ⭐ **WORKING**
```bash
# Quick reload nginx
./reload-nginx.sh
```
**Status**: ✅ Up-to-date  
**Functionality**: 
- Test config
- Reload nginx
- Check status

#### **`check-nginx.sh`** ⚠️ **NEEDS UPDATE**
```bash
# Check nginx status
./check-nginx.sh
```
**Status**: ⚠️ Partially outdated  
**Issues**: Tests HTTPS URLs (should be HTTP)  
**Functionality**: 
- Service status
- Configuration validation
- Subdomain testing
- Log analysis

#### **`deploy-nginx.sh`** ⚠️ **NEEDS TESTING**
```bash
# Deploy từ local machine qua SSH
./deploy-nginx.sh
```
**Status**: ⚠️ Needs testing  
**Functionality**: 
- Copy config via SCP
- Test trên server
- Reload remotely

### **2. CORS & Issues**

#### **`fix-cors.sh`** ⚠️ **NEEDS UPDATE**
```bash
# Fix CORS issues
./fix-cors.sh
```
**Status**: ⚠️ Partially outdated  
**Issues**: Tests HTTPS URLs (should be HTTP)  
**Functionality**: 
- Check services status
- Test CORS configuration
- Reload nginx
- Environment variables check

#### **`quick-cors-fix.sh`** ⚠️ **NEEDS TESTING**
```bash
# Quick CORS fix
./quick-cors-fix.sh
```
**Status**: ⚠️ Needs testing  
**Functionality**: 
- Quick CORS fix
- Reload nginx
- Test endpoints

### **3. API Management**

#### **`restart-api.sh`** ⚠️ **NEEDS UPDATE**
```bash
# Restart API service
./restart-api.sh
```
**Status**: ⚠️ Partially outdated  
**Issues**: Tests HTTPS URLs, assumes specific directory structure  
**Functionality**: 
- Stop API service
- Start API service
- Health check
- Log monitoring

### **4. Monitoring**

#### **`monitor.sh`** ❌ **NEEDS REWRITE**
```bash
# Monitor server performance
./monitor.sh
```
**Status**: ❌ Outdated  
**Issues**: Uses Docker Compose (current setup doesn't use Docker)  
**Functionality**: 
- CPU/Memory usage
- Disk usage
- Network status
- Service status

## 🔧 Utility Scripts (Tiện ích)

### **5. Deployment & Setup**

#### **`copy-nginx-config.sh`** ⚠️ **NEEDS TESTING**
```bash
# Copy config files lên server
./copy-nginx-config.sh
```
**Status**: ⚠️ Needs testing  
**Functionality**: 
- Backup trên server
- Copy files via SCP
- Test và reload

#### **`nginx-deploy.sh`** ⚠️ **NEEDS TESTING**
```bash
# Menu tương tác deployment
./nginx-deploy.sh
```
**Status**: ⚠️ Needs testing  
**Functionality**: 
- Menu-driven interface
- Multiple options
- Status checking

#### **`update-nginx-config.sh`** ⚠️ **NEEDS TESTING**
```bash
# Update nginx config trên server
./update-nginx-config.sh
```
**Status**: ⚠️ Needs testing  
**Functionality**: 
- Update config files
- Test configuration
- Reload nginx

### **6. Maintenance & Cleanup**

#### **`backup.sh`** ⚠️ **NEEDS VERIFICATION**
```bash
# Backup important data
./backup.sh
```
**Status**: ⚠️ Needs verification  
**Functionality**: 
- Database backup
- Config backup
- Files backup

#### **`cleanup-server.sh`** ⚠️ **NEEDS VERIFICATION**
```bash
# Cleanup server
./cleanup-server.sh
```
**Status**: ⚠️ Needs verification  
**Functionality**: 
- Remove unused files
- Clear logs
- Optimize storage

#### **`safe-cleanup.sh`** ⚠️ **NEEDS VERIFICATION**
```bash
# Safe cleanup
./safe-cleanup.sh
```
**Status**: ⚠️ Needs verification  
**Functionality**: 
- Safe file removal
- Log cleanup
- Temporary files cleanup

### **7. Setup & Configuration**

#### **`setup-server-complete.sh`** ⚠️ **NEEDS VERIFICATION**
```bash
# Setup server hoàn chỉnh
./setup-server-complete.sh
```
**Status**: ⚠️ Needs verification  
**Functionality**: 
- Install dependencies
- Configure services
- Setup nginx
- Setup SSL

#### **`validate-env.sh`** ⚠️ **NEEDS VERIFICATION**
```bash
# Validate environment
./validate-env.sh
```
**Status**: ⚠️ Needs verification  
**Functionality**: 
- Check environment variables
- Validate configs
- Test connections

### **8. Database & Migration**

#### **`test-atlas-connection.sh`** ⚠️ **NEEDS VERIFICATION**
```bash
# Test MongoDB Atlas connection
./test-atlas-connection.sh
```
**Status**: ⚠️ Needs verification  
**Functionality**: 
- Test database connection
- Check credentials
- Validate connection string

#### **`migrate-to-atlas.sh`** ⚠️ **NEEDS VERIFICATION**
```bash
# Migrate to MongoDB Atlas
./migrate-to-atlas.sh
```
**Status**: ⚠️ Needs verification  
**Functionality**: 
- Data migration
- Connection setup
- Validation

### **9. Production & Advanced**

#### **`production-deploy.sh`** ⚠️ **MAY BE OUTDATED**
```bash
# Production deployment
./production-deploy.sh
```
**Status**: ⚠️ May be outdated  
**Functionality**: 
- Production deployment
- Environment setup
- Service configuration

#### **`setup-docker.sh`** ❌ **NOT NEEDED**
```bash
# Setup Docker
./setup-docker.sh
```
**Status**: ❌ Not needed (no Docker)  
**Functionality**: 
- Docker installation
- Docker configuration

#### **`setup-subdomain-ssl.sh`** ❌ **NOT NEEDED**
```bash
# Setup SSL for subdomains
./setup-subdomain-ssl.sh
```
**Status**: ❌ Not needed (no SSL)  
**Functionality**: 
- SSL certificate setup
- Subdomain SSL configuration

## 📊 Scripts Status Summary

### **✅ WORKING (2 scripts)**
1. `deploy-nginx-server.sh` - Ready to use
2. `reload-nginx.sh` - Ready to use

### **⚠️ NEEDS UPDATE (4 scripts)**
1. `check-nginx.sh` - Update for HTTP setup
2. `fix-cors.sh` - Update for HTTP setup
3. `restart-api.sh` - Update for current setup
4. `monitor.sh` - Rewrite completely

### **⚠️ NEEDS TESTING (6 scripts)**
1. `deploy-nginx.sh` - Test SSH deployment
2. `quick-cors-fix.sh` - Test functionality
3. `copy-nginx-config.sh` - Test SCP
4. `nginx-deploy.sh` - Test menu
5. `update-nginx-config.sh` - Test update
6. `production-deploy.sh` - Test production

### **⚠️ NEEDS VERIFICATION (8 scripts)**
1. `backup.sh` - Verify backup functionality
2. `cleanup-server.sh` - Verify cleanup
3. `safe-cleanup.sh` - Verify safe cleanup
4. `setup-server-complete.sh` - Verify setup
5. `validate-env.sh` - Verify validation
6. `test-atlas-connection.sh` - Verify DB connection
7. `migrate-to-atlas.sh` - Verify migration
8. `make-executable.sh` - Verify permissions

### **❌ NOT NEEDED (2 scripts)**
1. `setup-docker.sh` - No Docker setup
2. `setup-subdomain-ssl.sh` - No SSL setup

## 🎯 Usage Recommendations

### **Daily Operations (Use These)**
```bash
# 1. Deploy config
./deploy-nginx-server.sh

# 2. Check status
./check-nginx.sh  # (after update)

# 3. Quick reload
./reload-nginx.sh

# 4. Monitor server
./monitor.sh  # (after rewrite)
```

### **Troubleshooting (Use These)**
```bash
# 1. Fix CORS
./fix-cors.sh  # (after update)

# 2. Restart API
./restart-api.sh  # (after update)

# 3. Quick CORS fix
./quick-cors-fix.sh  # (after testing)
```

### **Maintenance (Verify First)**
```bash
# 1. Backup
./backup.sh  # (after verification)

# 2. Cleanup
./cleanup-server.sh  # (after verification)

# 3. Validate environment
./validate-env.sh  # (after verification)
```

## 🔧 Update Priority

### **High Priority (Week 1)**
1. Update `check-nginx.sh` for HTTP setup
2. Update `fix-cors.sh` for HTTP setup
3. Rewrite `monitor.sh` for current architecture

### **Medium Priority (Week 2)**
1. Test `deploy-nginx.sh` on server
2. Update `restart-api.sh` for current setup
3. Test `quick-cors-fix.sh`

### **Low Priority (Week 3)**
1. Verify utility scripts
2. Test database scripts
3. Clean up outdated scripts

## 📝 Quick Commands Reference

### **Working Scripts (Use Now)**
```bash
# Deploy nginx config
./deploy-nginx-server.sh

# Quick reload
./reload-nginx.sh

# Make all scripts executable
./make-executable.sh
```

### **Scripts to Update (Don't Use Yet)**
```bash
# These need updates before use
./check-nginx.sh      # Update for HTTP
./fix-cors.sh         # Update for HTTP
./restart-api.sh      # Update for current setup
./monitor.sh          # Rewrite completely
```

### **Scripts to Test (Test First)**
```bash
# Test these before using
./deploy-nginx.sh
./quick-cors-fix.sh
./copy-nginx-config.sh
./nginx-deploy.sh
```

## 🆘 Emergency Procedures

### **If Scripts Don't Work**
```bash
# 1. Check script permissions
chmod +x *.sh

# 2. Test nginx manually
nginx -t
systemctl status nginx

# 3. Check logs
tail -f /var/log/nginx/error.log

# 4. Manual deployment
cp nginx/nginx.conf /etc/nginx/
cp nginx/nginx-subdomain.conf /etc/nginx/conf.d/
nginx -t && systemctl reload nginx
```

### **Fallback Commands**
```bash
# Manual nginx reload
nginx -t && systemctl reload nginx

# Manual service check
systemctl status nginx
systemctl status api

# Manual CORS test
curl -H "Origin: http://daidev.click" -I http://api.daidev.click/api/v1/site-settings
``` 