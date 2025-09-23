import { connect, disconnect, model } from 'mongoose';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { migration_001_add_image_assets } from './001-add-image-assets';

const MONGODB_URI = process.env.MONGODB_URI;

// Migration tracking schema
const MigrationSchema = new (require('mongoose').Schema)({
  name: { type: String, required: true, unique: true },
  appliedAt: { type: Date, default: Date.now },
  description: String
});

const MigrationModel = model('Migration', MigrationSchema);

// Function to get all migration files from filesystem
function getAllMigrationFiles() {
  try {
    const migrationsDir = __dirname;
    const files = readdirSync(migrationsDir)
      .filter(file => file.endsWith('.ts') && file.match(/^\d{3}-/))
      .map(file => {
        const filePath = join(migrationsDir, file);
        const stats = statSync(filePath);
        return {
          name: file.replace('.ts', ''),
          path: filePath,
          timestamp: stats.mtime.getTime()
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    
    return files;
  } catch (error) {
    console.error('❌ Error reading migration files:', error);
    return [];
  }
}

// List of all migrations
const migrations = [
  {
    name: '001-add-image-assets',
    description: 'Add image assets to site settings',
    run: migration_001_add_image_assets
  }
  // Add more migrations here as needed
];

async function runMigrations() {
  try {
    console.log('🚀 Starting database migrations...');
    console.log('🌱 Connecting to MongoDB...');
    await connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get list of applied migrations
    const appliedMigrations = await MigrationModel.find({});
    const appliedNames = appliedMigrations.map(m => m.name);

    console.log(`📊 Found ${appliedMigrations.length} applied migrations`);

    // Get all migration files from filesystem
    const migrationFiles = getAllMigrationFiles();
    console.log(`📁 Found ${migrationFiles.length} migration files in filesystem`);

    // Find new migrations (exist in filesystem but not in database)
    const newMigrations = migrationFiles.filter(file => !appliedNames.includes(file.name));
    
    if (newMigrations.length === 0) {
      console.log('ℹ️ No new migrations found - all migrations are up to date!');
      return;
    }

    console.log(`\n🆕 Found ${newMigrations.length} new migrations to run:`);
    newMigrations.forEach(migration => {
      console.log(`  - ${migration.name}`);
    });

    // Run only new migrations
    let appliedCount = 0;
    for (const migrationFile of newMigrations) {
      const migration = migrations.find(m => m.name === migrationFile.name);
      
      if (!migration) {
        console.log(`⚠️ Migration ${migrationFile.name} found in filesystem but not registered in migration-runner.ts`);
        continue;
      }

      console.log(`\n🔄 Running migration: ${migration.name}`);
      console.log(`📝 Description: ${migration.description}`);
      
      try {
        await migration.run();
        
        // Mark migration as applied
        await MigrationModel.create({
          name: migration.name,
          description: migration.description
        });
        
        console.log(`✅ Migration ${migration.name} completed successfully!`);
        appliedCount++;
      } catch (error) {
        console.error(`❌ Migration ${migration.name} failed:`, error);
        throw error;
      }
    }

    console.log(`\n🎉 Successfully applied ${appliedCount} new migrations!`);

  } catch (error) {
    console.error('❌ Error running migrations:', error);
    throw error;
  } finally {
    await disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Export function
export { runMigrations };

// Run migrations if called directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('🎉 All migrations completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration process failed:', error);
      process.exit(1);
    });
}