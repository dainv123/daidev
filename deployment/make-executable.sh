#!/bin/bash

# Make all deployment scripts executable

echo "🔧 Making deployment scripts executable"
echo "======================================="

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Make all .sh files executable
find "$SCRIPT_DIR" -name "*.sh" -type f -exec chmod +x {} \;

echo "✅ All .sh files in deployment directory are now executable"
echo ""
echo "📋 Available scripts:"
echo "===================="
ls -la "$SCRIPT_DIR"/*.sh | awk '{print $9}' | sed 's|.*/||' | while read script; do
    echo "  - $script"
done

echo ""
echo "🚀 Quick start:"
echo "==============="
echo "1. Deploy nginx config: ./deploy-nginx.sh"
echo "2. Quick reload: ./reload-nginx.sh"
echo "3. Check status: ./check-nginx.sh"
echo "4. Interactive menu: ./nginx-deploy.sh" 