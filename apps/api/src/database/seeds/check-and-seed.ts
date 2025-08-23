import { connect, disconnect, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

// Import schemas
import { User, UserSchema } from '../../users/users.schema';
import { Theme, ThemeSchema } from '../../themes/themes.schema';
import { Blog, BlogSchema } from '../../blogs/blogs.schema';
import { Certificate, CertificateSchema } from '../../certificates/certificates.schema';
import { Tag, TagSchema } from '../../tags/tags.schema';
import { SiteSettings, SiteSettingsSchema } from '../../site-settings/site-settings.schema';
import { Skill, SkillSchema } from '../../skills/skills.schema';
import { Language, LanguageSchema } from '../../languages/languages.schema';
import { Experience, ExperienceSchema } from '../../experience/experience.schema';
import { Education, EducationSchema } from '../../education/education.schema';
import { allSettingsSeed } from './all-settings.seed';

// Create models
const UserModel = model('User', UserSchema);
const ThemeModel = model('Theme', ThemeSchema);
const BlogModel = model('Blog', BlogSchema);
const CertificateModel = model('Certificate', CertificateSchema);
const TagModel = model('Tag', TagSchema);
const SiteSettingModel = model('SiteSetting', SiteSettingsSchema);
const SkillModel = model('Skill', SkillSchema);
const LanguageModel = model('Language', LanguageSchema);
const ExperienceModel = model('Experience', ExperienceSchema);
const EducationModel = model('Education', EducationSchema);

// Sample data (simplified for check)
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
  }
];

async function checkAndSeedDatabase() {
  try {
    console.log('🌱 Checking database status...');
    await connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if users collection has data
    const userCount = await UserModel.countDocuments();
    
    if (userCount === 0) {
      console.log('📊 Database is empty, running seed data...');
      
      // Run seed data directly
      await seedDatabase();
      
      console.log('✅ Seed data completed successfully!');
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
    await disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await UserModel.deleteMany({});
    await ThemeModel.deleteMany({});
    await BlogModel.deleteMany({});
    await CertificateModel.deleteMany({});
    await TagModel.deleteMany({});
    await SiteSettingModel.deleteMany({});

    // Seed users
    console.log('👥 Seeding users...');
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await UserModel.create({
        ...userData,
        password: hashedPassword
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Sample data created:');
    console.log(`- Users: ${sampleUsers.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Run the check and seed function
checkAndSeedDatabase(); 