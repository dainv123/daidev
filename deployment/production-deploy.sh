#!/bin/bash

# DaiDev Production Deployment Script
# Usage: ./production-deploy.sh [server_ip] [domain]

set -e

SERVER_IP=${1:-"your-server-ip"}
DOMAIN=${2:-"your-domain.com"}

echo "🚀 Starting DaiDev Production Deployment..."
echo "Server IP: $SERVER_IP"
echo "Domain: $DOMAIN"

# 1. Setup Server
echo "📋 Setting up server..."

# Update system
ssh root@$SERVER_IP "apt update && apt upgrade -y"

# Install Docker & Docker Compose
ssh root@$SERVER_IP "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
ssh root@$SERVER_IP "curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose"

# Install Nginx
ssh root@$SERVER_IP "apt install -y nginx certbot python3-certbot-nginx"

# 2. Setup Firewall
echo "🔥 Configuring firewall..."
ssh root@$SERVER_IP "ufw allow 22"
ssh root@$SERVER_IP "ufw allow 80"
ssh root@$SERVER_IP "ufw allow 443"
ssh root@$SERVER_IP "ufw --force enable"

# 3. Create deployment user
echo "👤 Creating deployment user..."
ssh root@$SERVER_IP "useradd -m -s /bin/bash daidev"
ssh root@$SERVER_IP "usermod -aG docker daidev"
ssh root@$SERVER_IP "mkdir -p /home/daidev/app"

# 4. Copy project files
echo "📁 Copying project files..."
scp -r . daidev@$SERVER_IP:/home/daidev/app/

# 5. Setup environment variables
echo "⚙️ Setting up environment variables..."
ssh daidev@$SERVER_IP "cd /home/daidev/app && cp env.example .env"
echo "⚠️  IMPORTANT: Please edit .env file with your actual values:"
echo "   ssh daidev@$SERVER_IP"
echo "   cd /home/daidev/app"
echo "   nano .env"

# 6. Configure Nginx
echo "🌐 Configuring Nginx..."
cat > nginx-production.conf << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Redirect to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # API Backend
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Admin Dashboard
    location /admin/ {
        proxy_pass http://localhost:3002/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Web Frontend
    location / {
        proxy_pass http://localhost:3003/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Documentation
    location /docs/ {
        proxy_pass http://localhost:4002/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Swagger API Docs
    location /swagger/ {
        proxy_pass http://localhost:4001/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

scp nginx-production.conf root@$SERVER_IP:/etc/nginx/sites-available/daidev
ssh root@$SERVER_IP "ln -sf /etc/nginx/sites-available/daidev /etc/nginx/sites-enabled/"
ssh root@$SERVER_IP "rm -f /etc/nginx/sites-enabled/default"

# 7. Get SSL Certificate
echo "🔒 Getting SSL certificate..."
ssh root@$SERVER_IP "certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN"

# 8. Deploy Application
echo "🐳 Deploying application..."
ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.yml up -d"

# 9. Setup monitoring
echo "📊 Setting up monitoring..."
ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.yml logs"

echo "✅ Deployment completed!"
echo "🌐 Your application is now available at:"
echo "   - Main Site: https://$DOMAIN"
echo "   - Admin: https://$DOMAIN/admin"
echo "   - API: https://$DOMAIN/api"
echo "   - Docs: https://$DOMAIN/docs"
echo "   - Swagger: https://$DOMAIN/swagger" 