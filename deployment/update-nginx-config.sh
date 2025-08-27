#!/bin/bash

# Update Nginx Configuration for Daidev
# This script updates nginx config files on the server

echo "🔧 Daidev Nginx Configuration Update"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NGINX_MAIN_CONF="/etc/nginx/nginx.conf"
NGINX_CONF_DIR="/etc/nginx/conf.d"
NGINX_SITES_DIR="/etc/nginx/sites-enabled"
BACKUP_DIR="/home/daidev/nginx-backup-$(date +%Y%m%d_%H%M%S)"

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check if running as root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        print_status $RED "❌ This script must be run as root (use sudo)"
        exit 1
    fi
}

# Function to create backup
create_backup() {
    print_status $BLUE "📦 Creating backup..."
    
    mkdir -p "$BACKUP_DIR"
    
    # Backup main nginx config
    if [ -f "$NGINX_MAIN_CONF" ]; then
        cp "$NGINX_MAIN_CONF" "$BACKUP_DIR/nginx.conf.backup"
        print_status $GREEN "✅ Backed up main nginx config"
    fi
    
    # Backup conf.d directory
    if [ -d "$NGINX_CONF_DIR" ]; then
        cp -r "$NGINX_CONF_DIR" "$BACKUP_DIR/conf.d.backup"
        print_status $GREEN "✅ Backed up conf.d directory"
    fi
    
    # Backup sites-enabled directory
    if [ -d "$NGINX_SITES_DIR" ]; then
        cp -r "$NGINX_SITES_DIR" "$BACKUP_DIR/sites-enabled.backup"
        print_status $GREEN "✅ Backed up sites-enabled directory"
    fi
    
    print_status $GREEN "✅ Backup created at: $BACKUP_DIR"
}

# Function to copy new config files
copy_config_files() {
    print_status $BLUE "📁 Copying new configuration files..."
    
    # Get the script directory
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    NGINX_SOURCE_DIR="$SCRIPT_DIR/nginx"
    
    # Copy main nginx config
    if [ -f "$NGINX_SOURCE_DIR/nginx.conf" ]; then
        cp "$NGINX_SOURCE_DIR/nginx.conf" "$NGINX_MAIN_CONF"
        print_status $GREEN "✅ Updated main nginx config"
    else
        print_status $RED "❌ Source nginx.conf not found at $NGINX_SOURCE_DIR/nginx.conf"
        return 1
    fi
    
    # Copy conf.d files
    if [ -d "$NGINX_SOURCE_DIR/conf.d" ]; then
        cp -r "$NGINX_SOURCE_DIR/conf.d"/* "$NGINX_CONF_DIR/"
        print_status $GREEN "✅ Updated conf.d files"
    else
        print_status $RED "❌ Source conf.d directory not found"
        return 1
    fi
    
    # Copy subdomain config if exists
    if [ -f "$NGINX_SOURCE_DIR/nginx-subdomain.conf" ]; then
        cp "$NGINX_SOURCE_DIR/nginx-subdomain.conf" "$NGINX_CONF_DIR/"
        print_status $GREEN "✅ Updated subdomain config"
    fi
    
    return 0
}

# Function to test nginx configuration
test_nginx_config() {
    print_status $BLUE "🔍 Testing nginx configuration..."
    
    if nginx -t > /dev/null 2>&1; then
        print_status $GREEN "✅ Nginx configuration is valid"
        return 0
    else
        print_status $RED "❌ Nginx configuration has errors:"
        nginx -t
        return 1
    fi
}

# Function to reload nginx
reload_nginx() {
    print_status $BLUE "🔄 Reloading nginx..."
    
    if systemctl reload nginx; then
        print_status $GREEN "✅ Nginx reloaded successfully"
        return 0
    else
        print_status $RED "❌ Failed to reload nginx"
        return 1
    fi
}

# Function to check nginx status
check_nginx_status() {
    print_status $BLUE "📋 Checking nginx status..."
    
    if systemctl is-active --quiet nginx; then
        print_status $GREEN "✅ Nginx is running"
        return 0
    else
        print_status $RED "❌ Nginx is not running"
        return 1
    fi
}

# Function to show current config
show_current_config() {
    print_status $BLUE "📋 Current nginx configuration:"
    echo "Main config: $NGINX_MAIN_CONF"
    echo "Conf.d files:"
    ls -la "$NGINX_CONF_DIR" 2>/dev/null || echo "No conf.d directory"
    echo "Sites enabled:"
    ls -la "$NGINX_SITES_DIR" 2>/dev/null || echo "No sites-enabled directory"
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

# Main execution
main() {
    print_status $YELLOW "🚀 Starting nginx configuration update..."
    
    # Check if running as root
    check_root
    
    # Show current config
    show_current_config
    
    # Create backup
    create_backup
    
    # Copy new config files
    if ! copy_config_files; then
        print_status $RED "❌ Failed to copy configuration files"
        exit 1
    fi
    
    # Test nginx configuration
    if ! test_nginx_config; then
        print_status $RED "❌ Nginx configuration test failed"
        print_status $YELLOW "💡 Restoring backup..."
        cp "$BACKUP_DIR/nginx.conf.backup" "$NGINX_MAIN_CONF"
        if [ -d "$BACKUP_DIR/conf.d.backup" ]; then
            rm -rf "$NGINX_CONF_DIR"/*
            cp -r "$BACKUP_DIR/conf.d.backup"/* "$NGINX_CONF_DIR/"
        fi
        exit 1
    fi
    
    # Check nginx status
    if ! check_nginx_status; then
        print_status $YELLOW "⚠️  Nginx is not running, starting it..."
        systemctl start nginx
        sleep 2
        check_nginx_status
    fi
    
    # Reload nginx
    if ! reload_nginx; then
        print_status $RED "❌ Failed to reload nginx"
        exit 1
    fi
    
    # Test subdomains
    test_subdomains
    
    print_status $GREEN "🎉 Nginx configuration update completed successfully!"
    print_status $BLUE "📦 Backup location: $BACKUP_DIR"
    print_status $YELLOW "💡 If you encounter issues, you can restore from backup"
}

# Run main function
main "$@" 