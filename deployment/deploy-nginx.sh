#!/bin/bash

# Simple Nginx Deploy for Daidev
# This script copies nginx config and reloads nginx

echo "🚀 Deploying Nginx Configuration"
echo "================================"

# Configuration
SERVER_USER="daidev"
SERVER_HOST="daidev.click"
LOCAL_NGINX_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/nginx"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}📁 Copying nginx config files to server...${NC}"

# Copy main nginx config
scp "$LOCAL_NGINX_DIR/nginx.conf" "$SERVER_USER@$SERVER_HOST:/tmp/nginx.conf"
ssh "$SERVER_USER@$SERVER_HOST" "sudo cp /tmp/nginx.conf /etc/nginx/nginx.conf && rm /tmp/nginx.conf"
echo -e "${GREEN}✅ Copied nginx.conf${NC}"

# Copy conf.d files
scp -r "$LOCAL_NGINX_DIR/conf.d" "$SERVER_USER@$SERVER_HOST:/tmp/"
ssh "$SERVER_USER@$SERVER_HOST" "sudo cp -r /tmp/conf.d/* /etc/nginx/conf.d/ && rm -rf /tmp/conf.d"
echo -e "${GREEN}✅ Copied conf.d files${NC}"

# Copy subdomain config
scp "$LOCAL_NGINX_DIR/nginx-subdomain.conf" "$SERVER_USER@$SERVER_HOST:/tmp/nginx-subdomain.conf"
ssh "$SERVER_USER@$SERVER_HOST" "sudo cp /tmp/nginx-subdomain.conf /etc/nginx/conf.d/ && rm /tmp/nginx-subdomain.conf"
echo -e "${GREEN}✅ Copied nginx-subdomain.conf${NC}"

echo -e "${YELLOW}🔍 Testing nginx configuration...${NC}"

# Test nginx config
if ssh "$SERVER_USER@$SERVER_HOST" "sudo nginx -t" 2>/dev/null; then
    echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
else
    echo -e "${RED}❌ Nginx configuration has errors${NC}"
    exit 1
fi

echo -e "${YELLOW}🔄 Reloading nginx...${NC}"

# Reload nginx
if ssh "$SERVER_USER@$SERVER_HOST" "sudo systemctl reload nginx"; then
    echo -e "${GREEN}✅ Nginx reloaded successfully${NC}"
else
    echo -e "${RED}❌ Failed to reload nginx${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Nginx deployment completed!${NC}"
echo -e "${YELLOW}💡 Test your subdomains:${NC}"
echo "   - daidev.click"
echo "   - api.daidev.click"
echo "   - admin.daidev.click"
echo "   - theme.daidev.click"
echo "   - docs.daidev.click"
echo "   - swagger.daidev.click" 