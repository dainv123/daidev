# Quick Commands Reference - Daidev Server

## 🚀 Essential Commands (Commands cần thiết nhất)

### **Nginx Management**
```bash
# Deploy nginx config
./deploy-nginx-server.sh

# Quick reload nginx
./reload-nginx.sh

# Check nginx status
./check-nginx.sh

# Test nginx config
nginx -t

# Check nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### **API Management**
```bash
# Restart API
./restart-api.sh

# Check API status
systemctl status api

# Check API logs
journalctl -u api -f
```

### **CORS & Issues**
```bash
# Fix CORS issues
./fix-cors.sh

# Quick CORS fix
./quick-cors-fix.sh

# Test CORS
curl -H "Origin: http://daidev.click" -I http://api.daidev.click/api/v1/site-settings
```

## 📊 Monitoring Commands

### **System Monitoring**
```bash
# Monitor server
./monitor.sh

# Check system resources
htop
free -h
df -h

# Check network
netstat -tlnp
ss -tlnp
```

### **Service Status**
```bash
# Check all services
systemctl status nginx
systemctl status api
systemctl status docker

# Check ports
netstat -tlnp | grep -E ":(3001|3002|3003|3004|4001|4002)"
```

### **Health Checks**
```bash
# Test all subdomains
for domain in daidev.click api.daidev.click admin.daidev.click theme.daidev.click docs.daidev.click swagger.daidev.click; do
    echo "Testing $domain..."
    curl -s -I "http://$domain" | head -1
done

# Test API endpoints
curl -I http://api.daidev.click/api/v1/health
curl -I http://localhost:3001/api/v1/health
```

## 🔧 Troubleshooting Commands

### **Configuration Issues**
```bash
# Test nginx config
nginx -t

# Check config files
cat /etc/nginx/nginx.conf | head -10
ls -la /etc/nginx/conf.d/

# Compare configs
diff /etc/nginx/nginx.conf /home/daidev/deployment/nginx/nginx.conf
```

### **Permission Issues**
```bash
# Check file permissions
ls -la /etc/nginx/nginx.conf
ls -la /etc/nginx/conf.d/

# Fix permissions
chown root:root /etc/nginx/nginx.conf
chmod 644 /etc/nginx/nginx.conf
```

### **Service Issues**
```bash
# Check service logs
journalctl -u nginx -f
journalctl -u api -f

# Restart services
systemctl restart nginx
systemctl restart api

# Check service dependencies
systemctl list-dependencies nginx
```

## 📁 File Management

### **Backup & Restore**
```bash
# Create backup
cp -r /etc/nginx/conf.d /home/daidev/nginx-backup-$(date +%Y%m%d_%H%M%S)

# Restore from backup
cp /home/daidev/nginx-backup-*/nginx.conf /etc/nginx/
cp -r /home/daidev/nginx-backup-*/conf.d/* /etc/nginx/conf.d/

# List backups
ls -la /home/daidev/nginx-backup-*
```

### **File Operations**
```bash
# Copy config files
cp /home/daidev/deployment/nginx/nginx.conf /etc/nginx/
cp /home/daidev/deployment/nginx/nginx-subdomain.conf /etc/nginx/conf.d/
cp -r /home/daidev/deployment/nginx/conf.d/* /etc/nginx/conf.d/

# Edit config files
nano /etc/nginx/nginx.conf
nano /etc/nginx/conf.d/nginx-subdomain.conf
```

## 🌐 Network Commands

### **DNS & Connectivity**
```bash
# Test DNS resolution
nslookup daidev.click
dig daidev.click

# Test connectivity
ping daidev.click
curl -I http://daidev.click

# Check SSL (if available)
openssl s_client -connect daidev.click:443
```

### **Port Testing**
```bash
# Test local ports
netstat -tlnp | grep -E ":(3001|3002|3003|3004|4001|4002)"

# Test specific ports
telnet localhost 3001
telnet localhost 3003

# Check listening ports
ss -tlnp
```

## 🔍 Debug Commands

### **Log Analysis**
```bash
# Real-time logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# Search logs
grep -i "error" /var/log/nginx/error.log
grep -i "cors" /var/log/nginx/error.log

# Recent logs
tail -50 /var/log/nginx/error.log
```

### **Process Monitoring**
```bash
# Check nginx processes
ps aux | grep nginx

# Check API processes
ps aux | grep node
ps aux | grep api

# Monitor processes
top -p $(pgrep nginx)
```

## 🛠️ Maintenance Commands

### **Cleanup**
```bash
# Cleanup server
./cleanup-server.sh

# Safe cleanup
./safe-cleanup.sh

# Clear logs
sudo truncate -s 0 /var/log/nginx/access.log
sudo truncate -s 0 /var/log/nginx/error.log
```

### **Updates & Maintenance**
```bash
# Update system
sudo apt update && sudo apt upgrade

# Check disk usage
df -h
du -sh /var/log/nginx/

# Check memory usage
free -h
cat /proc/meminfo
```

## 📈 Performance Commands

### **Performance Monitoring**
```bash
# Monitor CPU
top
htop
iostat

# Monitor memory
free -h
vmstat

# Monitor disk
iostat -x 1
iotop
```

### **Network Performance**
```bash
# Monitor network
iftop
nethogs
netstat -i

# Test bandwidth
speedtest-cli
```

## 🔐 Security Commands

### **Security Checks**
```bash
# Check open ports
nmap localhost
netstat -tlnp

# Check file permissions
find /etc/nginx -type f -exec ls -la {} \;

# Check user permissions
whoami
groups
```

### **Firewall (if enabled)**
```bash
# Check UFW status
ufw status

# Check iptables
iptables -L

# Allow ports
ufw allow 80
ufw allow 443
```

## 📝 Quick Scripts

### **One-liner Commands**
```bash
# Quick health check
echo "=== Nginx Status ===" && systemctl status nginx --no-pager && echo "=== API Status ===" && systemctl status api --no-pager

# Quick subdomain test
for d in daidev.click api.daidev.click admin.daidev.click; do echo "Testing $d:"; curl -s -I "http://$d" | head -1; done

# Quick config test
nginx -t && echo "Config OK" || echo "Config ERROR"

# Quick backup
cp -r /etc/nginx/conf.d /home/daidev/nginx-backup-$(date +%Y%m%d_%H%M%S) && echo "Backup created"
```

### **Custom Functions (add to ~/.bashrc)**
```bash
# Add these to your ~/.bashrc for quick access

# Quick nginx reload
alias nginx-reload='nginx -t && systemctl reload nginx && echo "Nginx reloaded"'

# Quick status check
alias status-check='systemctl status nginx --no-pager && echo "---" && systemctl status api --no-pager'

# Quick subdomain test
alias test-domains='for d in daidev.click api.daidev.click admin.daidev.click theme.daidev.click docs.daidev.click swagger.daidev.click; do echo "Testing $d:"; curl -s -I "http://$d" | head -1; done'

# Quick log check
alias log-check='tail -20 /var/log/nginx/error.log'
```

## 🆘 Emergency Commands

### **Quick Recovery**
```bash
# Stop all services
systemctl stop nginx
systemctl stop api

# Restore from latest backup
cp /home/daidev/nginx-backup-*/nginx.conf /etc/nginx/
cp -r /home/daidev/nginx-backup-*/conf.d/* /etc/nginx/conf.d/

# Start services
systemctl start nginx
systemctl start api

# Check status
systemctl status nginx
systemctl status api
```

### **Emergency Access**
```bash
# Emergency SSH (if needed)
ssh daidev@daidev.click

# Emergency file access
sudo -i
cd /home/daidev/deployment

# Emergency logs
journalctl -xe
dmesg | tail -20
``` 