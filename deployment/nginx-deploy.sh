#!/bin/bash

# Nginx Deploy Script for Daidev
# This script provides options to deploy nginx configuration

echo "🚀 Daidev Nginx Deploy Script"
echo "============================="

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

# Function to show menu
show_menu() {
    echo ""
    print_status $BLUE "📋 Choose an option:"
    echo "1) Copy config to server and reload"
    echo "2) Quick reload nginx (if config already on server)"
    echo "3) Check nginx status"
    echo "4) Test subdomains"
    echo "5) View current nginx config"
    echo "6) Exit"
    echo ""
}

# Function to copy and deploy
copy_and_deploy() {
    print_status $YELLOW "📁 Copying config to server..."
    
    # Check if copy script exists
    if [ ! -f "$(dirname "$0")/copy-nginx-config.sh" ]; then
        print_status $RED "❌ copy-nginx-config.sh not found"
        return 1
    fi
    
    # Make script executable and run
    chmod +x "$(dirname "$0")/copy-nginx-config.sh"
    "$(dirname "$0")/copy-nginx-config.sh"
}

# Function to quick reload
quick_reload() {
    print_status $YELLOW "🔄 Quick reloading nginx..."
    
    # Check if reload script exists
    if [ ! -f "$(dirname "$0")/reload-nginx.sh" ]; then
        print_status $RED "❌ reload-nginx.sh not found"
        return 1
    fi
    
    # Make script executable and run
    chmod +x "$(dirname "$0")/reload-nginx.sh"
    "$(dirname "$0")/reload-nginx.sh"
}

# Function to check nginx status
check_nginx_status() {
    print_status $BLUE "📋 Checking nginx status..."
    
    # Check if check script exists
    if [ -f "$(dirname "$0")/check-nginx.sh" ]; then
        chmod +x "$(dirname "$0")/check-nginx.sh"
        "$(dirname "$0")/check-nginx.sh"
    else
        print_status $YELLOW "⚠️  check-nginx.sh not found, using basic check..."
        
        if systemctl is-active --quiet nginx; then
            print_status $GREEN "✅ Nginx is running"
        else
            print_status $RED "❌ Nginx is not running"
        fi
        
        if nginx -t > /dev/null 2>&1; then
            print_status $GREEN "✅ Nginx configuration is valid"
        else
            print_status $RED "❌ Nginx configuration has errors"
            nginx -t
        fi
    fi
}

# Function to test subdomains
test_subdomains() {
    print_status $BLUE "🌐 Testing subdomain responses..."
    
    local domains=("daidev.click" "api.daidev.click" "admin.daidev.click" "theme.daidev.click" "docs.daidev.click" "swagger.daidev.click")
    
    for domain in "${domains[@]}"; do
        echo -n "Testing $domain... "
        response=$(curl -s -I "http://$domain" 2>/dev/null | head -1)
        
        if echo "$response" | grep -q "200\|301\|302"; then
            print_status $GREEN "✅ OK"
        else
            print_status $RED "❌ Failed: $response"
        fi
    done
}

# Function to view current config
view_current_config() {
    print_status $BLUE "📋 Current nginx configuration:"
    echo ""
    echo "Main config: /etc/nginx/nginx.conf"
    echo "Conf.d files:"
    ls -la /etc/nginx/conf.d/ 2>/dev/null || echo "No conf.d directory"
    echo ""
    echo "Sites enabled:"
    ls -la /etc/nginx/sites-enabled/ 2>/dev/null || echo "No sites-enabled directory"
}

# Main menu loop
main() {
    while true; do
        show_menu
        read -p "Enter your choice (1-6): " choice
        
        case $choice in
            1)
                copy_and_deploy
                ;;
            2)
                quick_reload
                ;;
            3)
                check_nginx_status
                ;;
            4)
                test_subdomains
                ;;
            5)
                view_current_config
                ;;
            6)
                print_status $GREEN "👋 Goodbye!"
                exit 0
                ;;
            *)
                print_status $RED "❌ Invalid option. Please choose 1-6."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Check if running with sudo for some operations
if [ "$EUID" -ne 0 ]; then
    print_status $YELLOW "⚠️  Some operations may require sudo privileges"
fi

# Run main function
main "$@" 