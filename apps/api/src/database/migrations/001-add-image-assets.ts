import { connect, disconnect, model } from 'mongoose';
import { SiteSettings, SiteSettingsSchema } from '../../site-settings/site-settings.schema';

const MONGODB_URI = process.env.MONGODB_URI;
const SiteSettingModel = model('SiteSetting', SiteSettingsSchema);

// Migration: Add image assets to site settings
const migration_001_add_image_assets = async () => {
  try {
    console.log('🚀 Running migration: 001-add-image-assets');
    console.log('🌱 Connecting to MongoDB...');
    await connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if migration already ran
    const existingResumeIcon = await SiteSettingModel.findOne({ 
      key: 'resume_icon_image', 
      tenantId: 'default' 
    });
    const existingContactMailbox = await SiteSettingModel.findOne({ 
      key: 'contact_mailbox_image', 
      tenantId: 'default' 
    });

    if (existingResumeIcon && existingContactMailbox) {
      console.log('ℹ️ Migration already applied, skipping...');
      return;
    }

    console.log('🔄 Adding image assets to site settings...');

    // Add resume icon image setting
    if (!existingResumeIcon) {
      await SiteSettingModel.create({
        key: 'resume_icon_image',
        value: '/assets/images/resume/1.png',
        tenantId: 'default'
      });
      console.log('✅ Added resume_icon_image setting');
    }

    // Add contact mailbox image setting
    if (!existingContactMailbox) {
      await SiteSettingModel.create({
        key: 'contact_mailbox_image',
        value: '/assets/images/mailbox.png',
        tenantId: 'default'
      });
      console.log('✅ Added contact_mailbox_image setting');
    }

    console.log('✅ Migration 001 completed successfully!');

  } catch (error) {
    console.error('❌ Error running migration 001:', error);
    throw error;
  } finally {
    await disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Export migration function
export { migration_001_add_image_assets };

// Run migration if called directly
if (require.main === module) {
  migration_001_add_image_assets()
    .then(() => {
      console.log('🎉 Migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration failed:', error);
      process.exit(1);
    });
}