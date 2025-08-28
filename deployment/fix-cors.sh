#!/bin/bash

# Fix CORS Issues for Daidev Multi-App Setup
# This script helps diagnose and fix cross-domain issues

echo "🔧 Daidev CORS Fix Script"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if service is running
check_service() {
    local service_name=$1
    local port=$2
    local url=$3
    
    echo -n "Checking $service_name (port $port)... "
    
    if curl -s --connect-timeout 5 "$url" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Running${NC}"
        return 0
    else
        echo -e "${RED}✗ Not responding${NC}"
        return 1
    fi
}

# Function to test CORS
test_cors() {
    local origin=$1
    local target=$2
    local description=$3
    
    echo -n "Testing CORS from $origin to $target... "
    
    response=$(curl -s -I -H "Origin: $origin" "$target" 2>/dev/null | grep -i "access-control-allow-origin")
    
    if [ ! -z "$response" ]; then
        echo -e "${GREEN}✓ CORS OK${NC}"
        echo "  Response: $response"
    else
        echo -e "${RED}✗ CORS Issue${NC}"
    fi
}

echo ""
echo "📋 Checking Services Status:"
echo "----------------------------"

# Check all services
check_service "API Backend" "3001" "http://localhost:3001/api/v1/health"
check_service "Admin Dashboard" "3002" "http://localhost:3002"
check_service "Web Frontend" "3003" "http://localhost:3003"
check_service "Theme Detail" "3004" "http://localhost:3004"
check_service "Swagger UI" "4001" "http://localhost:4001"
check_service "Documentation" "4002" "http://localhost:4002"

echo ""
echo "🌐 Testing CORS Configuration:"
echo "-----------------------------"

# Test CORS for different scenarios
test_cors "https://daidev.click" "https://api.daidev.click/api/v1/health" "Main domain to API"
test_cors "https://admin.daidev.click" "https://api.daidev.click/api/v1/health" "Admin to API"
test_cors "https://www.daidev.click" "https://api.daidev.click/api/v1/health" "WWW to API"

echo ""
echo "🔧 Fixing CORS Issues:"
echo "---------------------"

# Check if nginx is running
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✓ Nginx is running${NC}"
    
    # Test nginx config
    if nginx -t > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Nginx configuration is valid${NC}"
        
        # Reload nginx
        echo "Reloading Nginx configuration..."
        systemctl reload nginx
        echo -e "${GREEN}✓ Nginx reloaded${NC}"
    else
        echo -e "${RED}✗ Nginx configuration has errors${NC}"
        echo "Run: nginx -t"
    fi
else
    echo -e "${RED}✗ Nginx is not running${NC}"
    echo "Start nginx: sudo systemctl start nginx"
fi

echo ""
echo "📝 Environment Variables Check:"
echo "------------------------------"

# Check if .env file exists and has correct FRONTEND_URLS
if [ -f ".env" ]; then
    if grep -q "FRONTEND_URLS" .env; then
        echo -e "${GREEN}✓ FRONTEND_URLS found in .env${NC}"
        grep "FRONTEND_URLS" .env
    else
        echo -e "${YELLOW}⚠ FRONTEND_URLS not found in .env${NC}"
        echo "Add: FRONTEND_URLS=https://daidev.click,https://www.daidev.click,https://api.daidev.click,https://admin.daidev.click,https://docs.daidev.click,https://theme.daidev.click,https://swagger.daidev.click"
    fi
else
    echo -e "${YELLOW}⚠ .env file not found${NC}"
    echo "Copy from env.example and configure"
fi

echo ""
echo "🚀 Next Steps:"
echo "-------------"
echo "1. Restart API service: docker-compose restart api"
echo "2. Check browser console for CORS errors"
echo "3. Verify SSL certificates are valid"
echo "4. Test API endpoints from different subdomains"

echo ""
echo "✅ CORS Fix Script Completed!" 