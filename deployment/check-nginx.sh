#!/bin/bash

echo "🔍 Nginx Configuration Check"
echo "============================"

# Check nginx status
echo "📋 Nginx Status:"
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx is running"
else
    echo "❌ Nginx is not running"
    echo "Start with: sudo systemctl start nginx"
    exit 1
fi

# Test nginx config
echo ""
echo "🔧 Testing nginx configuration..."
if nginx -t > /dev/null 2>&1; then
    echo "✅ Nginx configuration is valid"
else
    echo "❌ Nginx configuration has errors:"
    nginx -t
    exit 1
fi

# Check which config file is being used
echo ""
echo "📁 Active nginx configuration:"
echo "Main config: /etc/nginx/nginx.conf"
echo "Sites enabled:"
ls -la /etc/nginx/sites-enabled/ 2>/dev/null || echo "No sites-enabled directory"
echo "Conf.d files:"
ls -la /etc/nginx/conf.d/ 2>/dev/null || echo "No conf.d directory"

# Check if our config is active
echo ""
echo "🔍 Checking for daidev configuration..."
if [ -f "/etc/nginx/sites-enabled/daidev" ]; then
    echo "✅ Found daidev config in sites-enabled"
elif [ -f "/etc/nginx/conf.d/default.conf" ]; then
    echo "✅ Found default.conf in conf.d"
else
    echo "❌ No daidev configuration found"
    echo "Copy your config to /etc/nginx/sites-enabled/ or /etc/nginx/conf.d/"
fi

# Check SSL certificates
echo ""
echo "🔐 SSL Certificate Check:"
domains=("daidev.click" "api.daidev.click" "admin.daidev.click" "docs.daidev.click" "theme.daidev.click" "swagger.daidev.click")

for domain in "${domains[@]}"; do
    cert_path="/etc/letsencrypt/live/$domain/fullchain.pem"
    if [ -f "$cert_path" ]; then
        echo "✅ $domain: SSL certificate exists"
        # Check expiry
        expiry=$(openssl x509 -enddate -noout -in "$cert_path" | cut -d= -f2)
        echo "   Expires: $expiry"
    else
        echo "❌ $domain: SSL certificate missing"
    fi
done

# Check nginx logs
echo ""
echo "📋 Recent nginx error logs:"
echo "---------------------------"
sudo tail -20 /var/log/nginx/error.log 2>/dev/null || echo "No error logs found"

echo ""
echo "📋 Recent nginx access logs:"
echo "----------------------------"
sudo tail -10 /var/log/nginx/access.log 2>/dev/null || echo "No access logs found"

# Test subdomain responses
echo ""
echo "🌐 Testing subdomain responses:"
echo "------------------------------"

test_domain() {
    local domain=$1
    local expected_port=$2
    
    echo -n "Testing $domain... "
    response=$(curl -s -I "https://$domain" 2>/dev/null | head -1)
    
    if echo "$response" | grep -q "200\|301\|302"; then
        echo "✅ OK"
    else
        echo "❌ Failed: $response"
    fi
}

test_domain "daidev.click" "3003"
test_domain "api.daidev.click" "3001"
test_domain "admin.daidev.click" "3002"
test_domain "docs.daidev.click" "4002"
test_domain "theme.daidev.click" "3004"
test_domain "swagger.daidev.click" "4001"

echo ""
echo "🎯 Recommendations:"
echo "1. If SSL certificates are missing, run: sudo certbot --nginx -d domain.com"
echo "2. If config is not active, copy to /etc/nginx/sites-enabled/"
echo "3. Reload nginx: sudo systemctl reload nginx"
echo "4. Check firewall: sudo ufw status" 