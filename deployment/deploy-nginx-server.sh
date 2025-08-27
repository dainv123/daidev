#!/bin/bash

# Server Nginx Deploy for Daidev (run on server)
# This script updates nginx config when running directly on the server

echo "🚀 Deploying Nginx Configuration (Server)"
echo "========================================"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
NGINX_MAIN_CONF="/etc/nginx/nginx.conf"
NGINX_CONF_DIR="/etc/nginx/conf.d"
LOCAL_NGINX_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/nginx"
BACKUP_DIR="/home/daidev/nginx-backup-$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}📦 Creating backup...${NC}"
mkdir -p "$BACKUP_DIR"

# Backup current config
if [ -f "$NGINX_MAIN_CONF" ]; then
    cp "$NGINX_MAIN_CONF" "$BACKUP_DIR/nginx.conf.backup"
    echo -e "${GREEN}✅ Backed up main nginx config${NC}"
fi

if [ -d "$NGINX_CONF_DIR" ]; then
    cp -r "$NGINX_CONF_DIR" "$BACKUP_DIR/conf.d.backup"
    echo -e "${GREEN}✅ Backed up conf.d directory${NC}"
fi

echo -e "${YELLOW}📁 Copying nginx config files...${NC}"

# Copy main nginx config
if [ -f "$LOCAL_NGINX_DIR/nginx.conf" ]; then
    cp "$LOCAL_NGINX_DIR/nginx.conf" "$NGINX_MAIN_CONF"
    echo -e "${GREEN}✅ Copied nginx.conf${NC}"
else
    echo -e "${RED}❌ nginx.conf not found at $LOCAL_NGINX_DIR/nginx.conf${NC}"
    exit 1
fi

# Copy conf.d files
if [ -d "$LOCAL_NGINX_DIR/conf.d" ]; then
    cp -r "$LOCAL_NGINX_DIR/conf.d"/* "$NGINX_CONF_DIR/"
    echo -e "${GREEN}✅ Copied conf.d files${NC}"
else
    echo -e "${RED}❌ conf.d directory not found${NC}"
    exit 1
fi

# Copy subdomain config
if [ -f "$LOCAL_NGINX_DIR/nginx-subdomain.conf" ]; then
    cp "$LOCAL_NGINX_DIR/nginx-subdomain.conf" "$NGINX_CONF_DIR/"
    echo -e "${GREEN}✅ Copied nginx-subdomain.conf${NC}"
else
    echo -e "${RED}❌ nginx-subdomain.conf not found${NC}"
    exit 1
fi

echo -e "${YELLOW}🔍 Testing nginx configuration...${NC}"

# Test nginx config
if nginx -t > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
else
    echo -e "${RED}❌ Nginx configuration has errors:${NC}"
    nginx -t
    echo -e "${YELLOW}💡 Restoring backup...${NC}"
    cp "$BACKUP_DIR/nginx.conf.backup" "$NGINX_MAIN_CONF"
    if [ -d "$BACKUP_DIR/conf.d.backup" ]; then
        rm -rf "$NGINX_CONF_DIR"/*
        cp -r "$BACKUP_DIR/conf.d.backup"/* "$NGINX_CONF_DIR/"
    fi
    exit 1
fi

echo -e "${YELLOW}🔄 Reloading nginx...${NC}"

# Check if nginx is running
if ! systemctl is-active --quiet nginx; then
    echo -e "${YELLOW}⚠️  Nginx is not running, starting it...${NC}"
    systemctl start nginx
    sleep 2
fi

# Reload nginx
if systemctl reload nginx; then
    echo -e "${GREEN}✅ Nginx reloaded successfully${NC}"
else
    echo -e "${RED}❌ Failed to reload nginx${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Nginx deployment completed!${NC}"
echo -e "${BLUE}📦 Backup location: $BACKUP_DIR${NC}"
echo -e "${YELLOW}💡 Test your subdomains:${NC}"
echo "   - daidev.click"
echo "   - api.daidev.click"
echo "   - admin.daidev.click"
echo "   - theme.daidev.click"
echo "   - docs.daidev.click"
echo "   - swagger.daidev.click" 