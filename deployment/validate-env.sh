#!/bin/bash

# DaiDev Environment Variables Validation Script
# This script validates that all required environment variables are set

set -e

echo "🔍 Validating environment variables..."

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo "❌ Error: .env file not found!"
    echo "Please copy env.example to .env and configure it:"
    echo "cp env.example .env"
    exit 1
fi

# Function to check if variable is set
check_var() {
    local var_name=$1
    local var_value=${!var_name}
    
    if [ -z "$var_value" ] || [ "$var_value" = "your-*" ]; then
        echo "❌ $var_name is not set or has default value"
        return 1
    else
        echo "✅ $var_name is set"
        return 0
    fi
}

# Track validation results
errors=0

echo ""
echo "📋 Required Variables:"
echo "======================"

# Database
echo ""
echo "🗄️ Database Configuration:"
check_var "MONGODB_ROOT_PASSWORD" || ((errors++))
check_var "MONGODB_URI" || ((errors++))

# JWT
echo ""
echo "🔐 JWT Configuration:"
check_var "JWT_SECRET" || ((errors++))

# Email Services
echo ""
echo "📧 Email Configuration:"
if [ -n "$RESEND_API_KEY" ] && [ "$RESEND_API_KEY" != "your-resend-api-key" ]; then
    echo "✅ Using Resend (RESEND_API_KEY is set)"
elif [ -n "$EMAIL_USER" ] && [ "$EMAIL_USER" != "your-email@gmail.com" ]; then
    echo "✅ Using SMTP (EMAIL_USER is set)"
else
    echo "❌ No email service configured (RESEND_API_KEY or EMAIL_USER)"
    ((errors++))
fi

# Cloud Storage
echo ""
echo "☁️ Cloud Storage Configuration:"
if [ -n "$CLOUDINARY_CLOUD_NAME" ] && [ "$CLOUDINARY_CLOUD_NAME" != "your-cloud-name" ]; then
    echo "✅ Using Cloudinary"
elif [ -n "$AWS_ACCESS_KEY_ID" ] && [ "$AWS_ACCESS_KEY_ID" != "your-aws-access-key" ]; then
    echo "✅ Using AWS S3"
else
    echo "❌ No cloud storage configured (CLOUDINARY_* or AWS_*)"
    ((errors++))
fi

# Google Services
echo ""
echo "🔍 Google Services:"
check_var "GOOGLE_MAPS_API_KEY" || echo "⚠️  GOOGLE_MAPS_API_KEY not set (optional)"
check_var "GOOGLE_RECAPTCHA_SITE_KEY" || echo "⚠️  GOOGLE_RECAPTCHA_SITE_KEY not set (optional)"
check_var "GOOGLE_RECAPTCHA_SECRET_KEY" || echo "⚠️  GOOGLE_RECAPTCHA_SECRET_KEY not set (optional)"

# URLs
echo ""
echo "🌐 URL Configuration:"
check_var "FRONTEND_URLS" || ((errors++))
check_var "VITE_API_URL" || ((errors++))
check_var "NEXT_PUBLIC_API_URL" || ((errors++))

# Domain
echo ""
echo "🏷️ Domain Configuration:"
check_var "DOMAIN" || ((errors++))

echo ""
echo "📊 Validation Summary:"
echo "======================"

if [ $errors -eq 0 ]; then
    echo "✅ All required environment variables are properly configured!"
    echo "🚀 Ready for deployment!"
    exit 0
else
    echo "❌ Found $errors error(s) in environment configuration"
    echo ""
    echo "🔧 Please fix the following issues:"
    echo "1. Edit .env file: nano .env"
    echo "2. Replace 'your-*' values with actual values"
    echo "3. Run this script again: ./deployment/validate-env.sh"
    exit 1
fi 