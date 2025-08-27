#!/bin/bash

# Quick Nginx Reload Script for Daidev
# This script quickly reloads nginx configuration

echo "🔄 Quick Nginx Reload"
echo "===================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Check if nginx is running
if ! systemctl is-active --quiet nginx; then
    print_status $RED "❌ Nginx is not running"
    print_status $YELLOW "Starting nginx..."
    sudo systemctl start nginx
    sleep 2
fi

# Test nginx configuration
print_status $BLUE "🔍 Testing nginx configuration..."
if nginx -t > /dev/null 2>&1; then
    print_status $GREEN "✅ Nginx configuration is valid"
else
    print_status $RED "❌ Nginx configuration has errors:"
    nginx -t
    exit 1
fi

# Reload nginx
print_status $BLUE "🔄 Reloading nginx..."
if sudo systemctl reload nginx; then
    print_status $GREEN "✅ Nginx reloaded successfully"
else
    print_status $RED "❌ Failed to reload nginx"
    exit 1
fi

# Check nginx status
if systemctl is-active --quiet nginx; then
    print_status $GREEN "✅ Nginx is running"
else
    print_status $RED "❌ Nginx is not running"
    exit 1
fi

print_status $GREEN "🎉 Nginx reload completed successfully!" 