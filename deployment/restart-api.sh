#!/bin/bash

echo "🔄 Restarting API with CORS fix..."
echo "=================================="

# Kill existing API processes
echo "Stopping existing API processes..."
pkill -f "nest start" || true
pkill -f "node.*main.js" || true
sleep 3

# Check if we're in the right directory
if [ ! -f "apps/api/package.json" ]; then
    echo "❌ Error: Not in the right directory. Please run from project root."
    exit 1
fi

# Start API
echo "Starting API..."
cd apps/api

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found, copying from example..."
    cp env.example .env
fi

# Check which package manager is available
if command -v pnpm &> /dev/null; then
    PACKAGE_MANAGER="pnpm"
elif command -v yarn &> /dev/null; then
    PACKAGE_MANAGER="yarn"
elif command -v npm &> /dev/null; then
    PACKAGE_MANAGER="npm"
else
    echo "❌ No package manager found (npm, yarn, or pnpm)"
    exit 1
fi

echo "Using package manager: $PACKAGE_MANAGER"

# Start API in background
echo "🚀 Starting API with new CORS configuration..."
$PACKAGE_MANAGER run start:dev > /tmp/api.log 2>&1 &
API_PID=$!

echo "API started with PID: $API_PID"

# Wait for API to start
echo "⏳ Waiting for API to start..."
for i in {1..30}; do
    if curl -s http://localhost:3001/api/v1/health > /dev/null 2>&1; then
        echo "✅ API is responding!"
        break
    fi
    echo "Waiting... ($i/30)"
    sleep 2
done

# Test CORS
echo ""
echo "🌐 Testing CORS configuration..."
echo "Testing from daidev.click to api.daidev.click..."

response=$(curl -s -I -H "Origin: https://daidev.click" \
    -H "Access-Control-Request-Method: GET" \
    https://api.daidev.click/api/v1/health 2>/dev/null)

if echo "$response" | grep -q "access-control-allow-origin"; then
    echo "✅ CORS headers found!"
    echo "$response" | grep -i "access-control"
else
    echo "❌ CORS headers still missing"
    echo "Response headers:"
    echo "$response"
fi

echo ""
echo "📋 API Logs (last 10 lines):"
echo "----------------------------"
tail -10 /tmp/api.log

echo ""
echo "🎯 Next steps:"
echo "1. Open https://admin.daidev.click in browser"
echo "2. Check browser console for CORS errors"
echo "3. If issues persist, check nginx logs: sudo tail -f /var/log/nginx/error.log"
echo "4. Test with: open deployment/test-cors.html"

echo ""
echo "📝 To stop API: kill $API_PID" 