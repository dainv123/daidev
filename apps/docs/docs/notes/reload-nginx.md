```bash
# Copy file config vào Nginx
sudo cp /home/daidev/deployment/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Kiểm tra file đã copy
cat /etc/nginx/conf.d/default.conf

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Kiểm tra location assets
sudo nginx -T | grep -A 10 "location.*assets"

# Test static files
curl -v http://daidev.click/assets/web/js/init.js
```

**File config chưa được copy vào `/etc/nginx/conf.d/` nên Nginx không load được!** 

Hãy copy file và reload! 🎯