const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:your-mongodb-password@mongodb:27017/daidev?authSource=admin';

async function debugCollections() {
  let client;
  
  try {
    console.log('🔍 Debugging MongoDB collections...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📋 All collections:');
    collections.forEach(col => {
      console.log(`- ${col.name}`);
    });

    // Check specific collections
    const collectionNames = ['users', 'tags', 'themes', 'blogs', 'certificates', 'skills', 'languages', 'experience', 'education', 'sitesettings'];
    
    console.log('\n📊 Collection counts:');
    for (const name of collectionNames) {
      try {
        const count = await db.collection(name).countDocuments();
        console.log(`- ${name}: ${count} documents`);
      } catch (error) {
        console.log(`- ${name}: ERROR - ${error.message}`);
      }
    }

    // Check experience collection specifically
    console.log('\n🔍 Experience collection details:');
    try {
      const experienceDocs = await db.collection('experience').find({}).toArray();
      console.log(`- Found ${experienceDocs.length} experience documents`);
      if (experienceDocs.length > 0) {
        console.log('- First document:', JSON.stringify(experienceDocs[0], null, 2));
      }
    } catch (error) {
      console.log(`- Experience collection error: ${error.message}`);
    }

    // Check education collection specifically
    console.log('\n🔍 Education collection details:');
    try {
      const educationDocs = await db.collection('education').find({}).toArray();
      console.log(`- Found ${educationDocs.length} education documents`);
      if (educationDocs.length > 0) {
        console.log('- First document:', JSON.stringify(educationDocs[0], null, 2));
      }
    } catch (error) {
      console.log(`- Education collection error: ${error.message}`);
    }

  } catch (error) {
    console.error('❌ Error debugging collections:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Disconnected from MongoDB');
    }
  }
}

debugCollections(); 