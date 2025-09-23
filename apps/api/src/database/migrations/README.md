# Database Migrations

This folder contains database migration scripts for the DaiDev Portfolio API.

## Migration System

The migration system allows you to:
- ✅ **Apply database changes safely**
- ✅ **Track applied migrations**
- ✅ **Rollback if needed**
- ✅ **Run migrations incrementally**

## Available Commands

```bash
# Run all pending migrations
npm run migrate

# Run specific migration
npm run migrate:001

# Check migration status (in development)
```

## Migration Files

### 001-add-image-assets.ts
- **Description**: Add image assets to site settings
- **Changes**: 
  - Adds `resume_icon_image` setting
  - Adds `contact_mailbox_image` setting
- **Safe**: ✅ Idempotent (can run multiple times)

## How to Create New Migrations

1. **Create new migration file**:
   ```bash
   # Create: 002-your-migration-name.ts
   touch apps/api/src/database/migrations/002-your-migration-name.ts
   ```

2. **Follow the pattern**:
   ```typescript
   import { connect, disconnect, model } from 'mongoose';
   
   const migration_002_your_migration_name = async () => {
     try {
       console.log('🚀 Running migration: 002-your-migration-name');
       // Your migration logic here
       console.log('✅ Migration 002 completed successfully!');
     } catch (error) {
       console.error('❌ Error running migration 002:', error);
       throw error;
     } finally {
       await disconnect();
     }
   };
   
   export { migration_002_your_migration_name };
   ```

3. **Add to migration-runner.ts**:
   ```typescript
   import { migration_002_your_migration_name } from './002-your-migration-name';
   
   const migrations = [
     // ... existing migrations
     {
       name: '002-your-migration-name',
       description: 'Your migration description',
       run: migration_002_your_migration_name
     }
   ];
   ```

4. **Add npm script**:
   ```json
   "migrate:002": "ts-node src/database/migrations/002-your-migration-name.ts"
   ```

## Migration Best Practices

- ✅ **Always check if migration already applied**
- ✅ **Make migrations idempotent**
- ✅ **Use descriptive names and descriptions**
- ✅ **Test migrations on development first**
- ✅ **Backup database before running migrations**

## Migration Tracking

Migrations are tracked in the `migrations` collection:
```javascript
{
  name: '001-add-image-assets',
  appliedAt: '2025-09-23T07:30:00.000Z',
  description: 'Add image assets to site settings'
}
```

## Safety Features

- **Idempotent**: Can run multiple times safely
- **Tracked**: Records applied migrations
- **Atomic**: Each migration runs in isolation
- **Rollback**: Can be manually reversed if needed