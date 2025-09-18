#!/bin/bash

# DaiDev Re-deploy Script
# Quick re-deploy for images and restart nginx

set -e

SERVER_IP=${1:-"your-server-ip"}
DOMAIN=${2:-"daidev.click"}
FORCE_REBUILD=${3:-"false"}

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

# Function to check if server is reachable
check_server() {
    print_status $BLUE "🔍 Checking server connectivity..."
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
    ssh daidev@$SERVER_IP "mkdir -p $backup_dir"
    ssh daidev@$SERVER_IP "cp -r /home/daidev/app $backup_dir/ 2>/dev/null || true"
    print_status $GREEN "✅ Backup created at $backup_dir"
}

# Function to check disk space
check_disk_space() {
    print_status $BLUE "💽 Checking disk space..."
    local disk_usage=$(ssh daidev@$SERVER_IP "df -h /home | tail -1 | awk '{print \$5}' | sed 's/%//'")
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
    
    # Copy project files
    print_status $BLUE "📁 Copying project files..."
    scp -r . daidev@$SERVER_IP:/home/daidev/app/
    
    # Update nginx config
    print_status $BLUE "🌐 Updating Nginx configuration..."
    scp deployment/nginx/nginx-subdomain.conf root@$SERVER_IP:/etc/nginx/sites-available/daidev
    ssh root@$SERVER_IP "nginx -t && systemctl reload nginx"
    
    # Restart containers
    print_status $BLUE "🔄 Restarting containers..."
    ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.atlas.yml restart"
    
    print_status $GREEN "✅ Quick re-deploy completed!"
}

# Function to full redeploy
full_redeploy() {
    print_status $YELLOW "🚀 Full re-deploy starting..."
    
    # Copy project files
    print_status $BLUE "📁 Copying project files..."
    scp -r . daidev@$SERVER_IP:/home/daidev/app/
    
    # Update nginx config
    print_status $BLUE "🌐 Updating Nginx configuration..."
    scp deployment/nginx/nginx-subdomain.conf root@$SERVER_IP:/etc/nginx/sites-available/daidev
    ssh root@$SERVER_IP "nginx -t && systemctl reload nginx"
    
    # Rebuild and restart containers
    print_status $BLUE "🐳 Rebuilding and restarting containers..."
    ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.atlas.yml down"
    ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.atlas.yml up -d --build"
    
    print_status $GREEN "✅ Full re-deploy completed!"
}

# Function to update nginx only
nginx_only() {
    print_status $YELLOW "🌐 Updating Nginx only..."
    
    # Update nginx config
    print_status $BLUE "📝 Copying nginx configuration..."
    scp deployment/nginx/nginx-subdomain.conf root@$SERVER_IP:/etc/nginx/sites-available/daidev
    
    # Test and reload nginx
    print_status $BLUE "🔄 Testing and reloading nginx..."
    ssh root@$SERVER_IP "nginx -t && systemctl reload nginx"
    
    print_status $GREEN "✅ Nginx updated successfully!"
}

# Function to restart containers only
containers_only() {
    print_status $YELLOW "🔄 Restarting containers only..."
    
    ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.atlas.yml restart"
    
    print_status $GREEN "✅ Containers restarted successfully!"
}

# Function to check status
check_status() {
    print_status $BLUE "📊 Checking application status..."
    
    echo ""
    print_status $YELLOW "🐳 Container Status:"
    ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.atlas.yml ps"
    
    echo ""
    print_status $YELLOW "🌐 Nginx Status:"
    ssh root@$SERVER_IP "systemctl status nginx --no-pager -l"
    
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
            ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.atlas.yml logs -f --tail=50"
            ;;
        2)
            ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.atlas.yml logs -f api --tail=50"
            ;;
        3)
            ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.atlas.yml logs -f web --tail=50"
            ;;
        4)
            ssh daidev@$SERVER_IP "cd /home/daidev/app && docker-compose -f docker-compose.prod.atlas.yml logs -f admin --tail=50"
            ;;
        5)
            ssh root@$SERVER_IP "journalctl -u nginx -f --no-pager"
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