# Server Scripts Documentation - Daidev Portfolio

## 📋 Overview

Thư mục này chứa documentation cho các scripts quản lý server Daidev Portfolio, bao gồm verification status và hướng dẫn sử dụng.

## 📁 Files

### **1. `scripts-verification.md`** ⭐ **VERIFICATION REPORT**
- **Mô tả**: Báo cáo verification tất cả scripts
- **Nội dung**: 
  - Status của từng script
  - Issues cần fix
  - Update recommendations
  - Priority matrix

### **2. `all-scripts-reference.md`** ⭐ **COMPLETE REFERENCE**
- **Mô tả**: Tổng hợp tất cả scripts với status
- **Nội dung**:
  - Complete inventory
  - Functionality description
  - Usage recommendations
  - Emergency procedures

### **3. `server-scripts-guide.md`** ⭐ **MAIN GUIDE**
- **Mô tả**: Hướng dẫn chi tiết tất cả scripts
- **Nội dung**: 
  - Essential scripts
  - Utility scripts
  - Usage examples
  - Troubleshooting guide

### **4. `quick-commands.md`** ⭐ **QUICK REFERENCE**
- **Mô tả**: Quick reference cho commands
- **Nội dung**:
  - Essential commands
  - Monitoring commands
  - Troubleshooting commands
  - Emergency commands

## 🚀 Quick Start

### **✅ WORKING Scripts (Use Now)**
```bash
# 1. Deploy nginx config
./deploy-nginx-server.sh

# 2. Quick reload nginx
./reload-nginx.sh

# 3. Make all scripts executable
./make-executable.sh
```

### **⚠️ NEEDS UPDATE Scripts (Don't Use Yet)**
```bash
# These need updates before use
./check-nginx.sh      # Update for HTTP setup
./fix-cors.sh         # Update for HTTP setup
./restart-api.sh      # Update for current setup
./monitor.sh          # Rewrite completely
```

## 🎯 Scripts Status Summary

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

## 📊 Quick Reference

### **Server Location**
- **Scripts**: `/home/daidev/deployment/`
- **Configs**: `/etc/nginx/`
- **Logs**: `/var/log/nginx/`
- **Backups**: `/home/daidev/nginx-backup-*/`

### **Key Commands**
```bash
# Deploy config
./deploy-nginx-server.sh

# Check status
./check-nginx.sh  # (after update)

# Monitor server
./monitor.sh  # (after rewrite)

# Fix CORS
./fix-cors.sh  # (after update)
```

### **Emergency Commands**
```bash
# Quick recovery
systemctl stop nginx
cp /home/daidev/nginx-backup-*/nginx.conf /etc/nginx/
systemctl start nginx

# Check logs
tail -f /var/log/nginx/error.log
```

## 🔍 Troubleshooting

### **Common Issues**
1. **CORS Errors** → Use `./fix-cors.sh` (after update)
2. **Nginx Not Starting** → Use `nginx -t` to test config
3. **API Not Responding** → Use `./restart-api.sh` (after update)
4. **Config Errors** → Use `./deploy-nginx-server.sh` (auto rollback)

### **Useful Commands**
```bash
# Test nginx config
nginx -t

# Check service status
systemctl status nginx
systemctl status api

# Test subdomains
curl -I http://daidev.click
curl -I http://api.daidev.click
```

## 📝 Best Practices

### **Before Making Changes**
1. **Always backup** before changes
2. **Test configuration** before reload
3. **Monitor logs** after changes
4. **Test endpoints** after deployment

### **Regular Maintenance**
1. **Weekly health checks** with `./check-nginx.sh` (after update)
2. **Daily monitoring** with `./monitor.sh` (after rewrite)
3. **Monthly cleanup** with `./cleanup-server.sh` (after verification)
4. **Quarterly backup** with `./backup.sh` (after verification)

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
./check-nginx.sh  # (after update)
```

### **Emergency Contacts**
- **Server Access**: SSH to server
- **Logs Location**: `/var/log/nginx/`
- **Config Location**: `/etc/nginx/`
- **Backup Location**: `/home/daidev/nginx-backup-*/`
- **Scripts Location**: `/home/daidev/deployment/`

## 📚 Additional Resources

### **Related Documentation**
- [Scripts Verification](scripts-verification.md)
- [All Scripts Reference](all-scripts-reference.md)
- [Server Scripts Guide](server-scripts-guide.md)
- [Quick Commands](quick-commands.md)

### **External Resources**
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Systemd Documentation](https://systemd.io/)
- [Bash Scripting Guide](https://www.gnu.org/software/bash/manual/)

## 🤝 Contributing

### **Adding New Scripts**
1. Create script in `/home/daidev/deployment/`
2. Make it executable: `chmod +x script-name.sh`
3. Test thoroughly
4. Update documentation
5. Add to verification report

### **Updating Documentation**
1. Update relevant markdown files
2. Test all commands
3. Verify accuracy
4. Update version info

## 📄 Version History

### **v1.1.0** (Current)
- ✅ Complete scripts verification
- ✅ Status classification
- ✅ Update recommendations
- ✅ Priority matrix
- ✅ Emergency procedures

### **v1.0.0** (Previous)
- ✅ Complete nginx configuration
- ✅ CORS handling
- ✅ Subdomain routing
- ✅ Health monitoring
- ✅ Backup system

### **Future Plans**
- 🔄 Script updates for HTTP setup
- 🔄 Monitor script rewrite
- 🔄 Utility scripts verification
- 🔄 Automated testing 