const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:your-secure-mongodb-password@mongodb:27017/daidev?authSource=admin';

// Sample user data
const sampleUsers = [
  {
    email: 'admin@daidev.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    tenantId: 'admin-tenant',
    profile: {
      name: 'Admin User',
      bio: { en: 'System Administrator', vi: 'Quản trị viên hệ thống' },
      avatar: '',
      socialLinks: { github: '', linkedin: '', twitter: '' }
    }
  },
  {
    email: 'viewer@default.com',
    password: 'password123',
    name: 'Test User',
    role: 'viewer',
    tenantId: 'default',
    profile: {
      name: 'Test User',
      bio: { en: 'Test user for development', vi: 'Người dùng test cho phát triển' },
      avatar: '',
      socialLinks: { github: '', linkedin: '', twitter: '' }
    }
  },
  {
    email: 'admin@default.com',
    password: 'password123',
    name: 'Test Admin',
    role: 'admin',
    tenantId: 'default',
    profile: {
      name: 'Test Admin',
      bio: { en: 'Test admin for development', vi: 'Admin test cho phát triển' },
      avatar: '',
      socialLinks: { github: '', linkedin: '', twitter: '' }
    }
  }
];

// Sample tags data
const sampleTags = [
  {
    name: 'Design',
    slug: 'design',
    description: { en: 'Web design and UI/UX', vi: 'Thiết kế web và UI/UX' },
    color: '#11d6f0',
    tenantId: 'default'
  },
  {
    name: 'UI/UX',
    slug: 'ui-ux',
    description: { en: 'User Interface and User Experience', vi: 'Giao diện người dùng và trải nghiệm người dùng' },
    color: '#ff6b6b',
    tenantId: 'default'
  },
  {
    name: 'React',
    slug: 'react',
    description: { en: 'React JavaScript library', vi: 'Thư viện JavaScript React' },
    color: '#61dafb',
    tenantId: 'default'
  },
  {
    name: 'CSS',
    slug: 'css',
    description: { en: 'Cascading Style Sheets', vi: 'Cascading Style Sheets' },
    color: '#264de4',
    tenantId: 'default'
  },
  {
    name: 'Frontend',
    slug: 'frontend',
    description: { en: 'Frontend development', vi: 'Phát triển frontend' },
    color: '#f7df1e',
    tenantId: 'default'
  },
  {
    name: 'Backend',
    slug: 'backend',
    description: { en: 'Backend development', vi: 'Phát triển backend' },
    color: '#339933',
    tenantId: 'default'
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    description: { en: 'JavaScript programming language', vi: 'Ngôn ngữ lập trình JavaScript' },
    color: '#f7df1e',
    tenantId: 'default'
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    description: { en: 'Node.js runtime environment', vi: 'Môi trường runtime Node.js' },
    color: '#339933',
    tenantId: 'default'
  },
  {
    name: 'Animation',
    slug: 'animation',
    description: { en: 'Web animations and transitions', vi: 'Animation và chuyển đổi web' },
    color: '#ff6b6b',
    tenantId: 'default'
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    description: { en: 'Fashion and lifestyle', vi: 'Thời trang và lối sống' },
    color: '#ff9ff3',
    tenantId: 'default'
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: { en: 'Lifestyle and culture', vi: 'Lối sống và văn hóa' },
    color: '#54a0ff',
    tenantId: 'default'
  },
  {
    name: 'Storytelling',
    slug: 'storytelling',
    description: { en: 'Storytelling and content creation', vi: 'Kể chuyện và tạo nội dung' },
    color: '#5f27cd',
    tenantId: 'default'
  },
  {
    name: 'Trends',
    slug: 'trends',
    description: { en: 'Latest trends and innovations', vi: 'Xu hướng và đổi mới mới nhất' },
    color: '#00d2d3',
    tenantId: 'default'
  },
  {
    name: 'Content',
    slug: 'content',
    description: { en: 'Content creation and management', vi: 'Tạo và quản lý nội dung' },
    color: '#ff9f43',
    tenantId: 'default'
  },
  {
    name: 'Social Media',
    slug: 'social-media',
    description: { en: 'Social media and networking', vi: 'Mạng xã hội và kết nối' },
    color: '#4834d4',
    tenantId: 'default'
  },
  {
    name: 'Web',
    slug: 'web',
    description: { en: 'Web development and technologies', vi: 'Phát triển web và công nghệ' },
    color: '#6c5ce7',
    tenantId: 'default'
  },
  {
    name: 'Real-time',
    slug: 'real-time',
    description: { en: 'Real-time applications and features', vi: 'Ứng dụng và tính năng real-time' },
    color: '#fd79a8',
    tenantId: 'default'
  },
  {
    name: 'Principles',
    slug: 'principles',
    description: { en: 'Design and development principles', vi: 'Nguyên tắc thiết kế và phát triển' },
    color: '#00b894',
    tenantId: 'default'
  }
];

async function checkAndSeedDatabase() {
  let client;
  
  try {
    console.log('🌱 Checking database status...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const usersCollection = db.collection('users');
    const tagsCollection = db.collection('tags');

    // Check if users collection has data
    const userCount = await usersCollection.countDocuments();
    
    if (userCount === 0) {
      console.log('📊 Database is empty, running seed data...');
      
      // Seed users
      console.log('👥 Seeding users...');
      for (const userData of sampleUsers) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await usersCollection.insertOne({
          ...userData,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      // Seed tags
      console.log('🏷️ Seeding tags...');
      await tagsCollection.insertMany(sampleTags.map(tag => ({
        ...tag,
        createdAt: new Date(),
        updatedAt: new Date()
      })));

      console.log('✅ Seed data completed successfully!');
      console.log('\n📊 Sample data created:');
      console.log(`- Users: ${sampleUsers.length}`);
      console.log(`- Tags: ${sampleTags.length}`);
      console.log('\n🔑 Login credentials:');
      console.log('Admin: admin@daidev.com / admin123');
      console.log('User: viewer@default.com / password123');
      console.log('Admin (default): admin@default.com / password123');
    } else {
      console.log(`ℹ️ Database already has data (${userCount} users found), skipping seed`);
    }

  } catch (error) {
    console.error('❌ Error checking/seeding database:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

// Run the check and seed function
checkAndSeedDatabase(); 