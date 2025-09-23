import { connect, disconnect, model } from 'mongoose';
import { SiteSettings, SiteSettingsSchema } from '../../site-settings/site-settings.schema';
import { allSettingsSeed } from './all-settings.seed';

const MONGODB_URI = process.env.MONGODB_URI;
const SiteSettingModel = model('SiteSetting', SiteSettingsSchema);

async function updateSiteSettings() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🔄 Updating site settings...');
    
    for (const setting of allSettingsSeed) {
      // Use upsert to update existing or create new
      await SiteSettingModel.findOneAndUpdate(
        { key: setting.key, tenantId: setting.tenantId },
        setting,
        { upsert: true, new: true }
      );
      console.log(`✅ Updated setting: ${setting.key}`);
    }

    console.log('✅ Site settings updated successfully!');
    console.log(`📊 Total settings processed: ${allSettingsSeed.length}`);

  } catch (error) {
    console.error('❌ Error updating site settings:', error);
  } finally {
    await disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the update function
updateSiteSettings();