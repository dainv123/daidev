#!/bin/bash

echo "🔧 Quick CORS Fix for Daidev"
echo "============================"

# Check if API is running
echo "📋 Checking API status..."
if curl -s http://localhost:3001/api/v1/health > /dev/null 2>&1; then
    echo "✅ API is running on port 3001"
else
    echo "❌ API is not responding on port 3001"
    echo "Starting API..."
    cd apps/api && pnpm run start:dev &
    sleep 5
fi

# Test CORS directly
echo ""
echo "🌐 Testing CORS..."
echo "Testing from daidev.click to api.daidev.click..."

# Test with curl
response=$(curl -s -I -H "Origin: https://daidev.click" \
    -H "Access-Control-Request-Method: GET" \
    https://api.daidev.click/api/v1/health 2>/dev/null)

if echo "$response" | grep -q "access-control-allow-origin"; then
    echo "✅ CORS headers found"
    echo "$response" | grep -i "access-control"
else
    echo "❌ CORS headers missing"
    echo "Response headers:"
    echo "$response"
fi

echo ""
echo "🔧 Restarting API with new CORS config..."
# Kill existing API process
pkill -f "nest start" || true
sleep 2

# Start API
cd apps/api && pnpm run start:dev &
echo "✅ API restarted"

echo ""
echo "📝 Next steps:"
echo "1. Wait 10 seconds for API to fully start"
echo "2. Test in browser: https://admin.daidev.click"
echo "3. Check browser console for CORS errors"
echo "4. If still issues, check nginx logs: sudo tail -f /var/log/nginx/error.log" 