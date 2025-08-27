#!/bin/bash

# Copy Nginx Configuration to Server
# This script copies nginx config files to the server

echo "📁 Copy Nginx Config to Server"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SERVER_USER="daidev"
SERVER_HOST="daidev.click"
SERVER_NGINX_DIR="/etc/nginx"
LOCAL_NGINX_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/nginx"

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check if files exist
check_local_files() {
    print_status $BLUE "🔍 Checking local nginx files..."
    
    if [ ! -f "$LOCAL_NGINX_DIR/nginx.conf" ]; then
        print_status $RED "❌ nginx.conf not found at $LOCAL_NGINX_DIR/nginx.conf"
        return 1
    fi
    
    if [ ! -d "$LOCAL_NGINX_DIR/conf.d" ]; then
        print_status $RED "❌ conf.d directory not found at $LOCAL_NGINX_DIR/conf.d"
        return 1
    fi
    
    if [ ! -f "$LOCAL_NGINX_DIR/nginx-subdomain.conf" ]; then
        print_status $RED "❌ nginx-subdomain.conf not found at $LOCAL_NGINX_DIR/nginx-subdomain.conf"
        return 1
    fi
    
    print_status $GREEN "✅ All local nginx files found"
    return 0
}

# Function to create backup on server
create_server_backup() {
    print_status $BLUE "📦 Creating backup on server..."
    
    BACKUP_DIR="/home/$SERVER_USER/nginx-backup-$(date +%Y%m%d_%H%M%S)"
    
    ssh "$SERVER_USER@$SERVER_HOST" << EOF
        mkdir -p "$BACKUP_DIR"
        
        # Backup main nginx config
        if [ -f "$SERVER_NGINX_DIR/nginx.conf" ]; then
            sudo cp "$SERVER_NGINX_DIR/nginx.conf" "$BACKUP_DIR/nginx.conf.backup"
            echo "✅ Backed up main nginx config"
        fi
        
        # Backup conf.d directory
        if [ -d "$SERVER_NGINX_DIR/conf.d" ]; then
            sudo cp -r "$SERVER_NGINX_DIR/conf.d" "$BACKUP_DIR/conf.d.backup"
            echo "✅ Backed up conf.d directory"
        fi
        
        echo "✅ Backup created at: $BACKUP_DIR"
EOF
    
    print_status $GREEN "✅ Server backup created"
}

# Function to copy files to server
copy_files_to_server() {
    print_status $BLUE "📁 Copying files to server..."
    
    # Copy main nginx config
    scp "$LOCAL_NGINX_DIR/nginx.conf" "$SERVER_USER@$SERVER_HOST:/tmp/nginx.conf"
    ssh "$SERVER_USER@$SERVER_HOST" "sudo cp /tmp/nginx.conf $SERVER_NGINX_DIR/nginx.conf && rm /tmp/nginx.conf"
    print_status $GREEN "✅ Copied nginx.conf"
    
    # Copy conf.d files
    scp -r "$LOCAL_NGINX_DIR/conf.d" "$SERVER_USER@$SERVER_HOST:/tmp/"
    ssh "$SERVER_USER@$SERVER_HOST" "sudo cp -r /tmp/conf.d/* $SERVER_NGINX_DIR/conf.d/ && rm -rf /tmp/conf.d"
    print_status $GREEN "✅ Copied conf.d files"
    
    # Copy subdomain config
    scp "$LOCAL_NGINX_DIR/nginx-subdomain.conf" "$SERVER_USER@$SERVER_HOST:/tmp/nginx-subdomain.conf"
    ssh "$SERVER_USER@$SERVER_HOST" "sudo cp /tmp/nginx-subdomain.conf $SERVER_NGINX_DIR/conf.d/ && rm /tmp/nginx-subdomain.conf"
    print_status $GREEN "✅ Copied nginx-subdomain.conf"
}

# Function to test nginx config on server
test_server_nginx() {
    print_status $BLUE "🔍 Testing nginx configuration on server..."
    
    if ssh "$SERVER_USER@$SERVER_HOST" "sudo nginx -t" 2>/dev/null; then
        print_status $GREEN "✅ Server nginx configuration is valid"
        return 0
    else
        print_status $RED "❌ Server nginx configuration has errors"
        return 1
    fi
}

# Function to reload nginx on server
reload_server_nginx() {
    print_status $BLUE "🔄 Reloading nginx on server..."
    
    if ssh "$SERVER_USER@$SERVER_HOST" "sudo systemctl reload nginx"; then
        print_status $GREEN "✅ Server nginx reloaded successfully"
        return 0
    else
        print_status $RED "❌ Failed to reload server nginx"
        return 1
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

# Main execution
main() {
    print_status $YELLOW "🚀 Starting nginx config copy to server..."
    
    # Check local files
    if ! check_local_files; then
        exit 1
    fi
    
    # Create backup on server
    create_server_backup
    
    # Copy files to server
    copy_files_to_server
    
    # Test nginx config on server
    if ! test_server_nginx; then
        print_status $RED "❌ Server nginx configuration test failed"
        exit 1
    fi
    
    # Reload nginx on server
    if ! reload_server_nginx; then
        print_status $RED "❌ Failed to reload server nginx"
        exit 1
    fi
    
    # Test subdomains
    test_subdomains
    
    print_status $GREEN "🎉 Nginx configuration copy completed successfully!"
    print_status $YELLOW "💡 You can now test your subdomains"
}

# Run main function
main "$@" 