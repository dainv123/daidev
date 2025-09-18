#!/bin/bash

echo "🔍 Testing paths on server..."
echo "Current directory: $(pwd)"
echo ""

echo "📁 Checking directory structure:"
echo "ls -la /home/daidev/"
ls -la /home/daidev/
echo ""

echo "📁 Checking if docker-compose files exist:"
echo "ls -la /home/daidev/docker-compose*"
ls -la /home/daidev/docker-compose* 2>/dev/null || echo "No docker-compose files found"
echo ""

echo "📁 Checking if we can access from deployment directory:"
echo "ls -la ../docker-compose*"
ls -la ../docker-compose* 2>/dev/null || echo "No docker-compose files found in parent directory"
echo ""

echo "📁 Checking nginx config:"
echo "ls -la ./nginx/"
ls -la ./nginx/ 2>/dev/null || echo "No nginx directory found"
echo ""

echo "✅ Path verification complete!"