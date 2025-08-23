#!/bin/bash

# DaiDev Complete Server Setup Script
# This script sets up everything needed for production deployment

set -e

SERVER_IP=${1:-"your-server-ip"}
DOMAIN=${2:-"daidev.click"}

echo "🚀 Starting DaiDev Complete Server Setup..."
echo "Server IP: $SERVER_IP"
echo "Domain: $DOMAIN"

# 1. Setup Docker
echo "🐳 Setting up Docker..."
ssh root@$SERVER_IP "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
ssh root@$SERVER_IP "curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose"

# 2. Install Nginx & Certbot
echo "🌐 Installing Nginx and Certbot..."
ssh root@$SERVER_IP "apt update && apt install -y nginx certbot python3-certbot-nginx"

# 3. Setup Firewall
echo "🔥 Configuring firewall..."
ssh root@$SERVER_IP "ufw allow 22"
ssh root@$SERVER_IP "ufw allow 80"
ssh root@$SERVER_IP "ufw allow 443"
ssh root@$SERVER_IP "ufw --force enable"

# 4. Create deployment user
echo "👤 Creating deployment user..."
ssh root@$SERVER_IP "useradd -m -s /bin/bash daidev"
ssh root@$SERVER_IP "usermod -aG docker daidev"
ssh root@$SERVER_IP "mkdir -p /home/daidev/app"

# 5. Copy project files
echo "📁 Copying project files..."
scp -r . daidev@$SERVER_IP:/home/daidev/app/

# 6. Setup environment variables
echo "⚙️ Setting up environment variables..."
ssh daidev@$SERVER_IP "cd /home/daidev/app && cp env.example .env"
echo "⚠️  IMPORTANT: Please edit .env file with your actual values:"
echo "   ssh daidev@$SERVER_IP"
echo "   cd /home/daidev/app"
echo "   nano .env"

# 7. Configure Nginx Subdomain
echo "🌐 Configuring Nginx subdomain..."
scp deployment/nginx-subdomain.conf root@$SERVER_IP:/etc/nginx/sites-available/daidev
ssh root@$SERVER_IP "ln -sf /etc/nginx/sites-available/daidev /etc/nginx/sites-enabled/"
ssh root@$SERVER_IP "rm -f /etc/nginx/sites-enabled/default"
ssh root@$SERVER_IP "nginx -t && systemctl reload nginx"

# 8. Setup SSL Certificates
echo "🔒 Setting up SSL certificates..."
ssh daidev@$SERVER_IP "cd /home/daidev/app && chmod +x deployment/setup-subdomain-ssl.sh"
ssh daidev@$SERVER_IP "cd /home/daidev/app && ./deployment/setup-subdomain-ssl.sh $DOMAIN"

# 9. Deploy Application
echo "🐳 Deploying application..."
ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.atlas.yml up -d --build"

# 10. Setup monitoring
echo "📊 Setting up monitoring..."
ssh daidev@$SERVER_IP "cd /home/daidev/app && chmod +x deployment/monitor.sh"
ssh daidev@$SERVER_IP "echo '*/5 * * * * /home/daidev/app/deployment/monitor.sh' | crontab -"

echo "✅ Complete server setup finished!"
echo ""
echo "🌐 Your application is now available at:"
echo "   - Main Site: https://$DOMAIN"
echo "   - API: https://api.$DOMAIN"
echo "   - Admin: https://admin.$DOMAIN"
echo "   - Docs: https://docs.$DOMAIN"
echo "   - Theme Detail: https://theme.$DOMAIN"
echo "   - Swagger: https://swagger.$DOMAIN"
echo ""
echo "🔧 Next steps:"
echo "1. Edit .env file: ssh daidev@$SERVER_IP && cd /home/daidev/app && nano .env"
echo "2. Run seeder: docker-compose -f docker-compose.prod.atlas.yml --profile seed up seeder"
echo "3. Check logs: docker-compose -f docker-compose.prod.atlas.yml logs -f"
echo "4. Check theme-detail: docker-compose -f docker-compose.prod.atlas.yml logs theme-detail" 