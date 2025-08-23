#!/bin/bash

# DaiDev Server Setup Script
# This script sets up the server for production deployment

set -e

echo "🚀 Starting DaiDev Server Setup..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run as root (use sudo)"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
echo "📦 Installing essential packages..."
apt install -y curl wget git nano htop unzip

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
else
    echo "✅ Docker already installed"
fi

# Install Docker Compose
echo "🐳 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
else
    echo "✅ Docker Compose already installed"
fi

# Install Nginx
echo "🌐 Installing Nginx..."
apt install -y nginx certbot python3-certbot-nginx

# Install MongoDB tools
echo "🗄️ Installing MongoDB tools..."
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-mongosh

# Create daidev user
echo "👤 Creating daidev user..."
if ! id "daidev" &>/dev/null; then
    useradd -m -s /bin/bash daidev
    usermod -aG docker daidev
    echo "✅ User daidev created"
else
    echo "✅ User daidev already exists"
fi

# Create app directory
echo "📁 Creating app directory..."
mkdir -p /home/daidev/app
chown -R daidev:daidev /home/daidev/app

# Setup firewall
echo "🔥 Setting up firewall..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

echo "✅ Server setup completed!"
echo ""
echo "🔧 Next steps:"
echo "1. Copy project files: scp -r . daidev@YOUR_SERVER_IP:/home/daidev/app/"
echo "2. SSH to server: ssh daidev@YOUR_SERVER_IP"
echo "3. Configure .env: cd /home/daidev/app && cp env.example .env && nano .env"
echo "4. Deploy: docker-compose -f docker-compose.prod.atlas.yml up -d --build" 