#!/bin/bash

# DaiDev Subdomain SSL Setup Script
# Usage: ./setup-subdomain-ssl.sh [domain]

set -e

DOMAIN=${1:-"daidev.click"}

echo "🔒 Setting up SSL certificates for subdomains..."

# Main domain
echo "📋 Getting SSL for main domain..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# API subdomain
echo "📋 Getting SSL for API subdomain..."
certbot --nginx -d api.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Admin subdomain
echo "📋 Getting SSL for Admin subdomain..."
certbot --nginx -d admin.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Docs subdomain
echo "📋 Getting SSL for Docs subdomain..."
certbot --nginx -d docs.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Theme Detail subdomain
echo "📋 Getting SSL for Theme Detail subdomain..."
certbot --nginx -d theme.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Swagger subdomain
echo "📋 Getting SSL for Swagger subdomain..."
certbot --nginx -d swagger.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

echo "✅ SSL certificates setup completed!"
echo ""
echo "🌐 Your subdomains are now available at:"
echo "   - Main Site: https://$DOMAIN"
echo "   - API: https://api.$DOMAIN"
echo "   - Admin: https://admin.$DOMAIN"
echo "   - Docs: https://docs.$DOMAIN"
echo "   - Theme Detail: https://theme.$DOMAIN"
echo "   - Swagger: https://swagger.$DOMAIN" 