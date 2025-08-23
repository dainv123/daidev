#!/bin/bash

# DaiDev Production Backup Script
# This script backs up MongoDB and application data

set -e

BACKUP_DIR="/home/daidev/backups"
DATE=$(date +%Y%m%d_%H%M%S)
APP_DIR="/home/daidev/app"

echo "🔄 Starting backup process..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Load environment variables
source $APP_DIR/.env

# Backup MongoDB
echo "📊 Backing up MongoDB..."
docker-compose -f $APP_DIR/docker-compose.prod.yml exec -T mongodb mongodump \
  --username admin \
  --password $MONGODB_ROOT_PASSWORD \
  --authenticationDatabase admin \
  --db daidev \
  --archive > $BACKUP_DIR/mongodb_$DATE.archive

# Backup application data
echo "📁 Backing up application data..."
tar -czf $BACKUP_DIR/app_data_$DATE.tar.gz \
  $APP_DIR/.env \
  $APP_DIR/deployment/ssl \
  $APP_DIR/deployment/nginx

# Keep only last 7 days of backups
echo "🧹 Cleaning old backups..."
find $BACKUP_DIR -name "*.archive" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "✅ Backup completed: $DATE"
echo "📂 Backup location: $BACKUP_DIR" 