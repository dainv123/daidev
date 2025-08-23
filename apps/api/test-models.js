const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:your-mongodb-password@mongodb:27017/daidev?authSource=admin';

async function testModels() {
  let client;
  
  try {
    console.log('🧪 Testing NestJS models...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    
    // Test Experience collection
    console.log('\n🔍 Testing Experience collection:');
    const experienceCollection = db.collection('experiences'); // Mongoose pluralizes by default
    const experienceCount = await experienceCollection.countDocuments();
    console.log(`- experiences collection: ${experienceCount} documents`);
    
    if (experienceCount === 0) {
      // Try singular name
      const experienceCollection2 = db.collection('experience');
      const experienceCount2 = await experienceCollection2.countDocuments();
      console.log(`- experience collection: ${experienceCount2} documents`);
    }

    // Test Education collection
    console.log('\n🔍 Testing Education collection:');
    const educationCollection = db.collection('educations'); // Mongoose pluralizes by default
    const educationCount = await educationCollection.countDocuments();
    console.log(`- educations collection: ${educationCount} documents`);
    
    if (educationCount === 0) {
      // Try singular name
      const educationCollection2 = db.collection('education');
      const educationCount2 = await educationCollection2.countDocuments();
      console.log(`- education collection: ${educationCount2} documents`);
    }

    // List all collections to see what we have
    console.log('\n📋 All collections:');
    const collections = await db.listCollections().toArray();
    collections.forEach(col => {
      console.log(`- ${col.name}`);
    });

  } catch (error) {
    console.error('❌ Error testing models:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Disconnected from MongoDB');
    }
  }
}

testModels(); 