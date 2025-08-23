#!/bin/bash

# DaiDev MongoDB Migration Script
# Migrate from local MongoDB to MongoDB Atlas

set -e

echo "🔄 Starting MongoDB migration to Atlas..."

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo "❌ Error: .env file not found!"
    exit 1
fi

# Check if MONGODB_URI is set
if [ -z "$MONGODB_URI" ] || [[ "$MONGODB_URI" == *"your-"* ]]; then
    echo "❌ Error: MONGODB_URI not properly configured in .env"
    echo "Please set your MongoDB Atlas connection string"
    exit 1
fi

# Check if local MongoDB is running
if ! docker-compose -f docker-compose.prod.yml ps mongodb | grep -q "Up"; then
    echo "❌ Error: Local MongoDB is not running"
    echo "Please start local MongoDB first:"
    echo "docker-compose -f docker-compose.prod.yml up -d mongodb"
    exit 1
fi

# Create backup directory
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d_%H%M%S)

echo "📊 Creating backup of local MongoDB..."
# Backup local MongoDB
docker-compose -f docker-compose.prod.yml exec -T mongodb mongodump \
  --username admin \
  --password $MONGODB_ROOT_PASSWORD \
  --authenticationDatabase admin \
  --db daidev \
  --archive > $BACKUP_DIR/local_mongodb_$DATE.archive

echo "📤 Migrating data to MongoDB Atlas..."
# Restore to MongoDB Atlas
mongorestore \
  --uri "$MONGODB_URI" \
  --archive=$BACKUP_DIR/local_mongodb_$DATE.archive \
  --drop

echo "✅ Migration completed successfully!"
echo "📂 Backup saved to: $BACKUP_DIR/local_mongodb_$DATE.archive"

echo ""
echo "🔧 Next steps:"
echo "1. Test the new connection:"
echo "   docker-compose -f docker-compose.prod.atlas.yml up -d api"
echo ""
echo "2. If everything works, stop local MongoDB:"
echo "   docker-compose -f docker-compose.prod.yml stop mongodb"
echo ""
echo "3. Use Atlas configuration:"
echo "   docker-compose -f docker-compose.prod.atlas.yml up -d" 