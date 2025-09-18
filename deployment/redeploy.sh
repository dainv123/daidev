#!/bin/bash

# DaiDev Re-deploy Script
# Quick re-deploy for images and restart nginx

set -e

# Auto-detect if running on server
if [ -f "/home/daidev/app/docker-compose.prod.atlas.yml" ] || [ -f "./docker-compose.prod.atlas.yml" ] || [ -f "../docker-compose.prod.atlas.yml" ]; then
    # Running on server directly
    SERVER_IP="localhost"
    DOMAIN=${1:-"daidev.click"}
    FORCE_REBUILD=${2:-"false"}
    echo "🔍 Detected: Running on server directly"
else
    # Running from remote
    SERVER_IP=${1:-"103.90.234.177"}
    DOMAIN=${2:-"daidev.click"}
    FORCE_REBUILD=${3:-"false"}
    echo "🔍 Detected: Running from remote"
fi

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

# Function to run command (local or remote)
run_cmd() {
    local cmd="$1"
    
    if [ "$SERVER_IP" = "localhost" ] || [ "$SERVER_IP" = "127.0.0.1" ]; then
        # Running on server directly
        eval "$cmd"
    else
        # Running from remote
        ssh daidev@$SERVER_IP "$cmd"
    fi
}

# Function to run command as root (local or remote)
run_cmd_root() {
    local cmd="$1"
    
    if [ "$SERVER_IP" = "localhost" ] || [ "$SERVER_IP" = "127.0.0.1" ]; then
        # Running on server directly
        sudo bash -c "$cmd"
    else
        # Running from remote
        ssh root@$SERVER_IP "$cmd"
    fi
}

# Function to get nginx config path
get_nginx_config_path() {
    if [ -f "./nginx/nginx-subdomain.conf" ]; then
        echo "./nginx/nginx-subdomain.conf"
    elif [ -f "../deployment/nginx/nginx-subdomain.conf" ]; then
        echo "../deployment/nginx/nginx-subdomain.conf"
    else
        echo "deployment/nginx/nginx-subdomain.conf"
    fi
}

# Function to check if server is reachable
check_server() {
    print_status $BLUE "🔍 Checking server connectivity..."
    
    # Check if running on server directly
    if [ "$SERVER_IP" = "localhost" ] || [ "$SERVER_IP" = "127.0.0.1" ]; then
        print_status $GREEN "✅ Running on server directly"
        return 0
    fi
    
    # Check SSH connectivity if running from remote
    if ! ssh -o ConnectTimeout=10 -o BatchMode=yes daidev@$SERVER_IP exit 2>/dev/null; then
        print_status $RED "❌ Cannot connect to server $SERVER_IP"
        print_status $YELLOW "Please check:"
        echo "   - Server IP is correct"
        echo "   - SSH key is configured"
        echo "   - Server is running"
        exit 1
    fi
    print_status $GREEN "✅ Server is reachable"
}

# Function to backup current deployment
backup_current() {
    print_status $BLUE "💾 Creating backup..."
    local backup_dir="/home/daidev/backups/$(date +%Y%m%d_%H%M%S)"
    
    if [ "$SERVER_IP" = "localhost" ] || [ "$SERVER_IP" = "127.0.0.1" ]; then
        # Running on server directly
        mkdir -p $backup_dir
        cp -r /home/daidev $backup_dir/ 2>/dev/null || true
    else
        # Running from remote
        run_cmd "mkdir -p $backup_dir"
        run_cmd "cp -r /home/daidev $backup_dir/ 2>/dev/null || true"
    fi
    print_status $GREEN "✅ Backup created at $backup_dir"
}

# Function to check disk space
check_disk_space() {
    print_status $BLUE "💽 Checking disk space..."
    
    if [ "$SERVER_IP" = "localhost" ] || [ "$SERVER_IP" = "127.0.0.1" ]; then
        # Running on server directly
        local disk_usage=$(df -h /home | tail -1 | awk '{print $5}' | sed 's/%//')
    else
        # Running from remote
        local disk_usage=$(ssh daidev@$SERVER_IP "df -h /home | tail -1 | awk '{print \$5}' | sed 's/%//'")
    fi
    
    if [ "$disk_usage" -gt 85 ]; then
        print_status $YELLOW "⚠️  Disk usage is high: ${disk_usage}%"
        print_status $YELLOW "Consider running cleanup: ./deployment/safe-cleanup.sh"
    else
        print_status $GREEN "✅ Disk space OK: ${disk_usage}%"
    fi
}

# Function to show menu
show_menu() {
    echo ""
    print_status $BLUE "📋 Choose deployment option:"
    echo "1) Quick re-deploy (copy files + restart)"
    echo "2) Full re-deploy (rebuild all images)"
    echo "3) Nginx only (update nginx config)"
    echo "4) Containers only (restart containers)"
    echo "5) Check status"
    echo "6) View logs"
    echo "7) Exit"
    echo ""
}

# Function to quick redeploy
quick_redeploy() {
    print_status $YELLOW "🚀 Quick re-deploy starting..."
    
    # Copy project files (only if running from remote)
    if [ "$SERVER_IP" != "localhost" ] && [ "$SERVER_IP" != "127.0.0.1" ]; then
        print_status $BLUE "📁 Copying project files..."
        scp -r . daidev@$SERVER_IP:/home/daidev/app/
    else
        print_status $BLUE "📁 Files already on server, skipping copy..."
    fi
    
    # Update nginx config
    print_status $BLUE "🌐 Updating Nginx configuration..."
    local nginx_config=$(get_nginx_config_path)
    if [ "$SERVER_IP" != "localhost" ] && [ "$SERVER_IP" != "127.0.0.1" ]; then
        scp $nginx_config root@$SERVER_IP:/etc/nginx/sites-available/daidev
    else
        cp $nginx_config /etc/nginx/sites-available/daidev
    fi
    run_cmd_root "nginx -t && systemctl reload nginx"
    
    # Restart containers
    print_status $BLUE "🔄 Restarting containers..."
    run_cmd "cd /home/daidev && docker-compose -f docker-compose.prod.atlas.yml restart"
    
    print_status $GREEN "✅ Quick re-deploy completed!"
}

# Function to full redeploy
full_redeploy() {
    print_status $YELLOW "🚀 Full re-deploy starting..."
    
    # Copy project files (only if running from remote)
    if [ "$SERVER_IP" != "localhost" ] && [ "$SERVER_IP" != "127.0.0.1" ]; then
        print_status $BLUE "📁 Copying project files..."
        scp -r . daidev@$SERVER_IP:/home/daidev/app/
    else
        print_status $BLUE "📁 Files already on server, skipping copy..."
    fi
    
    # Update nginx config
    print_status $BLUE "🌐 Updating Nginx configuration..."
    local nginx_config=$(get_nginx_config_path)
    if [ "$SERVER_IP" != "localhost" ] && [ "$SERVER_IP" != "127.0.0.1" ]; then
        scp $nginx_config root@$SERVER_IP:/etc/nginx/sites-available/daidev
    else
        cp $nginx_config /etc/nginx/sites-available/daidev
    fi
    run_cmd_root "nginx -t && systemctl reload nginx"
    
    # Rebuild and restart containers
    print_status $BLUE "🐳 Rebuilding and restarting containers..."
    run_cmd "cd /home/daidev && docker-compose -f docker-compose.prod.atlas.yml down"
    run_cmd "cd /home/daidev && docker-compose -f docker-compose.prod.atlas.yml up -d --build"
    
    print_status $GREEN "✅ Full re-deploy completed!"
}

# Function to update nginx only
nginx_only() {
    print_status $YELLOW "🌐 Updating Nginx only..."
    
    # Update nginx config
    print_status $BLUE "📝 Copying nginx configuration..."
    local nginx_config=$(get_nginx_config_path)
    if [ "$SERVER_IP" != "localhost" ] && [ "$SERVER_IP" != "127.0.0.1" ]; then
        scp $nginx_config root@$SERVER_IP:/etc/nginx/sites-available/daidev
    else
        cp $nginx_config /etc/nginx/sites-available/daidev
    fi
    
    # Test and reload nginx
    print_status $BLUE "🔄 Testing and reloading nginx..."
    run_cmd_root "nginx -t && systemctl reload nginx"
    
    print_status $GREEN "✅ Nginx updated successfully!"
}

# Function to restart containers only
containers_only() {
    print_status $YELLOW "🔄 Restarting containers only..."
    
    run_cmd "cd /home/daidev && docker-compose -f docker-compose.prod.atlas.yml restart"
    
    print_status $GREEN "✅ Containers restarted successfully!"
}

# Function to check status
check_status() {
    print_status $BLUE "📊 Checking application status..."
    
    echo ""
    print_status $YELLOW "🐳 Container Status:"
    run_cmd "cd /home/daidev && docker-compose -f docker-compose.prod.atlas.yml ps"
    
    echo ""
    print_status $YELLOW "🌐 Nginx Status:"
    run_cmd_root "systemctl status nginx --no-pager -l"
    
    echo ""
    print_status $YELLOW "🔗 Service URLs:"
    echo "   - Main Site: https://$DOMAIN"
    echo "   - API: https://api.$DOMAIN"
    echo "   - Admin: https://admin.$DOMAIN"
    echo "   - Docs: https://docs.$DOMAIN"
    echo "   - Theme Detail: https://theme.$DOMAIN"
    echo "   - Swagger: https://swagger.$DOMAIN"
}

# Function to view logs
view_logs() {
    print_status $BLUE "📝 Viewing application logs..."
    
    echo ""
    print_status $YELLOW "Choose log type:"
    echo "1) All services"
    echo "2) API only"
    echo "3) Web only"
    echo "4) Admin only"
    echo "5) Nginx only"
    echo ""
    read -p "Enter choice (1-5): " log_choice
    
    case $log_choice in
        1)
            run_cmd "cd /home/daidev && docker-compose -f docker-compose.prod.atlas.yml logs -f --tail=50"
            ;;
        2)
            run_cmd "cd /home/daidev && docker-compose -f docker-compose.prod.atlas.yml logs -f api --tail=50"
            ;;
        3)
            run_cmd "cd /home/daidev && docker-compose -f docker-compose.prod.atlas.yml logs -f web --tail=50"
            ;;
        4)
            run_cmd "cd /home/daidev && docker-compose -f docker-compose.prod.atlas.yml logs -f admin --tail=50"
            ;;
        5)
            run_cmd_root "journalctl -u nginx -f --no-pager"
            ;;
        *)
            print_status $RED "❌ Invalid choice"
            ;;
    esac
}

# Main function
main() {
    echo "🚀 DaiDev Re-deploy Script"
    echo "=========================="
    echo "Server IP: $SERVER_IP"
    echo "Domain: $DOMAIN"
    
    # Check server connectivity
    check_server
    
    # Check disk space
    check_disk_space
    
    # Create backup
    backup_current
    
    # If force rebuild is specified, skip menu
    if [ "$FORCE_REBUILD" = "true" ]; then
        full_redeploy
        check_status
        exit 0
    fi
    
    # Show menu and handle choice
    while true; do
        show_menu
        read -p "Enter your choice (1-7): " choice
        
        case $choice in
            1)
                quick_redeploy
                check_status
                ;;
            2)
                full_redeploy
                check_status
                ;;
            3)
                nginx_only
                ;;
            4)
                containers_only
                ;;
            5)
                check_status
                ;;
            6)
                view_logs
                ;;
            7)
                print_status $GREEN "👋 Goodbye!"
                exit 0
                ;;
            *)
                print_status $RED "❌ Invalid option. Please choose 1-7."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run main function
main "$@"