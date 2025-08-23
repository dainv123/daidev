#!/bin/bash

echo "🧹 Starting server cleanup..."

# Check disk usage
echo "📊 Current disk usage:"
df -h

# Clean Docker
echo "🐳 Cleaning Docker..."
docker container prune -f
docker image prune -a -f
docker volume prune -f
docker network prune -f
docker system prune -a -f

# Clean npm cache
echo "📦 Cleaning npm cache..."
npm cache clean --force

# Clean old logs
echo "📝 Cleaning old logs..."
sudo find /var/log -name "*.log" -mtime +7 -delete 2>/dev/null || true
sudo find /var/log -name "*.gz" -mtime +7 -delete 2>/dev/null || true

# Clean temp files
echo "🗑️ Cleaning temp files..."
sudo rm -rf /tmp/* 2>/dev/null || true
sudo rm -rf /var/tmp/* 2>/dev/null || true

# Clean old package files
echo "📦 Cleaning old package files..."
find /home -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
find /home -name "*.log" -type f -delete 2>/dev/null || true

# Check disk usage after cleanup
echo "📊 Disk usage after cleanup:"
df -h

echo "✅ Cleanup completed!" 