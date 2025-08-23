#!/bin/bash

# Test MongoDB Atlas Connection Script

set -e

echo "🔍 Testing MongoDB Atlas connection..."

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo "❌ Error: .env file not found!"
    exit 1
fi

# Check if MONGODB_URI is set
if [ -z "$MONGODB_URI" ]; then
    echo "❌ Error: MONGODB_URI not set in .env"
    exit 1
fi

echo "📡 Testing connection to MongoDB Atlas..."

# Test connection using mongosh
if command -v mongosh &> /dev/null; then
    echo "✅ mongosh found, testing connection..."
    
    # Test basic connection
    if mongosh "$MONGODB_URI" --eval "db.runCommand('ping')" --quiet; then
        echo "✅ Connection successful!"
        
        # Test database operations
        echo "📊 Testing database operations..."
        mongosh "$MONGODB_URI" --eval "
            db = db.getSiblingDB('daidev');
            print('Database: ' + db.getName());
            print('Collections: ' + db.getCollectionNames().join(', '));
        " --quiet
        
        echo "✅ Database operations successful!"
    else
        echo "❌ Connection failed!"
        exit 1
    fi
else
    echo "⚠️  mongosh not found, testing with Node.js..."
    
    # Create temporary test script
    cat > test-connection.js << 'EOF'
const { MongoClient } = require('mongodb');

async function testConnection() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('✅ Connection successful!');
        
        const db = client.db('daidev');
        const collections = await db.listCollections().toArray();
        console.log('📊 Collections:', collections.map(c => c.name).join(', '));
        
        await client.close();
        console.log('✅ Test completed successfully!');
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();
EOF

    # Run test
    node test-connection.js
    
    # Cleanup
    rm test-connection.js
fi

echo ""
echo "🎉 MongoDB Atlas connection test completed!"
echo "🚀 Ready to use Atlas configuration" 