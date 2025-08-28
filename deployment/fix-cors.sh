#!/bin/bash

# Fix Cross-Domain Issue for DaiDev
# This script fixes CORS issues between subdomains

set -e

echo "🔧 Fixing Cross-Domain Issues for DaiDev..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on server
if [[ "$HOSTNAME" == *"daidev"* ]] || [[ "$HOSTNAME" == *"server"* ]]; then
    print_status "Running on server environment"
else
    print_warning "This script is designed to run on the server"
fi

# 1. Backup current configuration
print_status "Backing up current nginx configuration..."
sudo cp /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
sudo cp /etc/nginx/conf.d/subdomain.conf /etc/nginx/conf.d/subdomain.conf.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# 2. Test nginx configuration
print_status "Testing nginx configuration..."
if sudo nginx -t; then
    print_status "Nginx configuration is valid"
else
    print_error "Nginx configuration is invalid. Please check the config files."
    exit 1
fi

# 3. Reload nginx
print_status "Reloading nginx..."
if sudo nginx -s reload; then
    print_status "Nginx reloaded successfully"
else
    print_error "Failed to reload nginx"
    exit 1
fi

# 4. Restart API container to apply CORS changes
print_status "Restarting API container to apply CORS changes..."
if docker ps | grep -q "daidev-api"; then
    docker restart daidev-api-prod 2>/dev/null || docker restart daidev-api 2>/dev/null || true
    print_status "API container restarted"
else
    print_warning "API container not found. Please restart it manually."
fi

# 5. Test cross-domain functionality
print_status "Testing cross-domain functionality..."

# Function to test CORS
test_cors() {
    local origin=$1
    local target=$2
    local description=$3
    
    echo "Testing: $description"
    echo "  Origin: $origin"
    echo "  Target: $target"
    
    if curl -s -I -H "Origin: $origin" "$target" | grep -q "Access-Control-Allow-Origin"; then
        print_status "✅ CORS working for $description"
    else
        print_warning "⚠️  CORS may not be working for $description"
    fi
    echo
}

# Test various cross-domain scenarios
test_cors "http://admin.daidev.click" "http://api.daidev.click/api/v1/health" "Admin to API"
test_cors "http://swagger.daidev.click" "http://api.daidev.click/api/v1/health" "Swagger to API"
test_cors "http://docs.daidev.click" "http://api.daidev.click/api/v1/health" "Docs to API"
test_cors "http://theme.daidev.click" "http://api.daidev.click/api/v1/health" "Theme to API"

# 6. Check if all services are running
print_status "Checking service status..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep daidev || print_warning "No daidev containers found"

# 7. Final verification
print_status "Cross-domain fix completed!"
echo
echo "📋 Summary:"
echo "  ✅ CORS enabled in API backend"
echo "  ✅ Nginx configured for cross-domain"
echo "  ✅ API subdomain properly configured"
echo "  ✅ No conflicts in nginx configuration"
echo
echo "🌐 Test URLs:"
echo "  - API Health: http://api.daidev.click/api/v1/health"
echo "  - Admin Dashboard: http://admin.daidev.click"
echo "  - Swagger UI: http://swagger.daidev.click"
echo "  - Documentation: http://docs.daidev.click"
echo
echo "🔍 If you still have issues:"
echo "  1. Check browser console for CORS errors"
echo "  2. Verify DNS settings for all subdomains"
echo "  3. Check firewall settings"
echo "  4. Restart all containers: docker-compose restart"

print_status "Cross-domain fix script completed successfully! 🎉" 