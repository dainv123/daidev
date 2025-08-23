## 🚀 **Tất cả steps deploy với MongoDB Atlas qua SSH:**

### **�� Prerequisites:**
- Server cloud (Ubuntu 20.04+)
- Domain `daidev.click` đã setup DNS
- MongoDB Atlas cluster
- SSH access vào server

---

## **Step 1: 🖥️ Setup Server (từ máy local)**

```bash
# Chạy script setup server
./deployment/production-deploy.sh YOUR_SERVER_IP daidev.click
```

**Script này sẽ:**
- ✅ Install Docker & Docker Compose
- ✅ Install Nginx & Certbot
- ✅ Setup firewall
- ✅ Create user `daidev`
- ✅ Copy project files lên server

---

## **Step 2: 🌐 Setup DNS trên Route53**

Trong AWS Console → Route53 → Hosted Zones → `daidev.click`:

| **Type** | **Name** | **Value** |
|----------|----------|-----------|
| A | `daidev.click` | `YOUR_SERVER_IP` |
| A | `www.daidev.click` | `YOUR_SERVER_IP` |
| A | `api.daidev.click` | `YOUR_SERVER_IP` |
| A | `admin.daidev.click` | `YOUR_SERVER_IP` |
| A | `docs.daidev.click` | `YOUR_SERVER_IP` |
| A | `swagger.daidev.click` | `YOUR_SERVER_IP` |

---

## **Step 3: �� SSH vào Server**

```bash
ssh daidev@YOUR_SERVER_IP
```

---

## **Step 4: ⚙️ Setup Environment Variables**

```bash
# Vào thư mục app
cd /home/daidev/app

# Copy environment template
cp env.example .env

# Edit file .env
nano .env
```

**Cấu hình file `.env`:**
```env
# ========================================
# DATABASE CONFIGURATION (MongoDB Atlas)
# ========================================
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/daidev?retryWrites=true&w=majority

# ========================================
# JWT CONFIGURATION
# ========================================
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# ========================================
# EMAIL SERVICES
# ========================================
RESEND_API_KEY=your-resend-api-key

# ========================================
# CLOUD STORAGE
# ========================================
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# ========================================
# GOOGLE SERVICES
# ========================================
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
GOOGLE_RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# ========================================
# CORS & FRONTEND URLS
# ========================================
FRONTEND_URLS=https://daidev.click,https://www.daidev.click,https://admin.daidev.click

# ========================================
# API CONFIGURATION
# ========================================
NODE_ENV=production
PORT=3001

# ========================================
# FRONTEND ENVIRONMENT VARIABLES
# ========================================
VITE_API_URL=https://api.daidev.click
NEXT_PUBLIC_API_URL=https://api.daidev.click
NEXT_PUBLIC_APP_NAME=Daidev Portfolio
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key

# ========================================
# DOMAIN CONFIGURATION
# ========================================
DOMAIN=daidev.click
WWW_DOMAIN=www.daidev.click
API_DOMAIN=api.daidev.click
ADMIN_DOMAIN=admin.daidev.click
DOCS_DOMAIN=docs.daidev.click
SWAGGER_DOMAIN=swagger.daidev.click
```

---

## **Step 5: 🔍 Validate Environment**

```bash
# Kiểm tra cấu hình
./deployment/validate-env.sh
```

---

## **Step 6: 🌐 Setup Nginx Subdomain**

```bash
# Copy subdomain config
sudo cp nginx-subdomain.conf /etc/nginx/sites-available/daidev

# Enable site
sudo ln -sf /etc/nginx/sites-available/daidev /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

---

## **Step 7: 🔒 Setup SSL Certificates**

```bash
# Make script executable
chmod +x deployment/setup-subdomain-ssl.sh

# Setup SSL cho tất cả subdomains
./deployment/setup-subdomain-ssl.sh daidev.click
```

---

## **Step 8: �� Deploy Application**

```bash
# Deploy với MongoDB Atlas
docker-compose -f docker-compose.prod.atlas.yml up -d --build

# Kiểm tra services
docker-compose -f docker-compose.prod.atlas.yml ps
```

---

## **Step 9: �� Seed Database (nếu cần)**

```bash
# Chạy seeder để tạo sample data
docker-compose -f docker-compose.prod.atlas.yml --profile seed up seeder
```

---

## **Step 10: 📊 Monitoring & Verification**

```bash
# Kiểm tra logs
docker-compose -f docker-compose.prod.atlas.yml logs -f

# Health check
./deployment/monitor.sh

# Test API
curl https://api.daidev.click/api/v1/health
```

---

## **Step 11: 🔧 Setup Auto Monitoring (Optional)**

```bash
# Setup cron job cho monitoring
echo "*/5 * * * * /home/daidev/app/deployment/monitor.sh" | crontab -

# Setup auto SSL renewal (đã tự động với certbot)
sudo crontab -l | grep certbot
```

---

## **✅ Kết quả cuối cùng:**

| **Service** | **URL** |
|-------------|---------|
| **Main Website** | `https://daidev.click` |
| **API Backend** | `https://api.daidev.click` |
| **Admin Dashboard** | `https://admin.daidev.click` |
| **Documentation** | `https://docs.daidev.click` |
| **Swagger UI** | `https://swagger.daidev.click` |

---

## **🔧 Troubleshooting:**

```bash
# Kiểm tra services
docker-compose -f docker-compose.prod.atlas.yml ps

# Restart services
docker-compose -f docker-compose.prod.atlas.yml restart

# Check logs
docker-compose -f docker-compose.prod.atlas.yml logs [service-name]

# Check nginx
sudo systemctl status nginx
sudo nginx -t
```