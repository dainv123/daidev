#!/bin/bash

# DaiDev Production Monitoring Script
# This script monitors the health of all services

set -e

APP_DIR="/home/daidev/app"
LOG_FILE="/home/daidev/logs/monitor.log"

# Create log directory
mkdir -p /home/daidev/logs

echo "$(date): Starting health check..." >> $LOG_FILE

# Check Docker services
echo "🐳 Checking Docker services..."
if docker-compose -f $APP_DIR/docker-compose.prod.yml ps | grep -q "Up"; then
    echo "$(date): All Docker services are running" >> $LOG_FILE
else
    echo "$(date): ERROR: Some Docker services are down" >> $LOG_FILE
    # Send notification (you can add email/Slack notification here)
fi

# Check API health
echo "🔍 Checking API health..."
if curl -f http://localhost:3001/api/v1/health > /dev/null 2>&1; then
    echo "$(date): API is healthy" >> $LOG_FILE
else
    echo "$(date): ERROR: API health check failed" >> $LOG_FILE
fi

# Check MongoDB
echo "🗄️ Checking MongoDB..."
if docker-compose -f $APP_DIR/docker-compose.prod.yml exec -T mongodb mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "$(date): MongoDB is healthy" >> $LOG_FILE
else
    echo "$(date): ERROR: MongoDB health check failed" >> $LOG_FILE
fi

# Check disk space
echo "💾 Checking disk space..."
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "$(date): WARNING: Disk usage is ${DISK_USAGE}%" >> $LOG_FILE
else
    echo "$(date): Disk usage is ${DISK_USAGE}%" >> $LOG_FILE
fi

# Check memory usage
echo "🧠 Checking memory usage..."
MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.2f", $3/$2 * 100.0)}')
if (( $(echo "$MEMORY_USAGE > 80" | bc -l) )); then
    echo "$(date): WARNING: Memory usage is ${MEMORY_USAGE}%" >> $LOG_FILE
else
    echo "$(date): Memory usage is ${MEMORY_USAGE}%" >> $LOG_FILE
fi

echo "$(date): Health check completed" >> $LOG_FILE
echo "----------------------------------------" >> $LOG_FILE 