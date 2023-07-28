import mongoose from 'mongoose';

const AchievementName = 'achievement';

const AchievementCollection = 'achievement';

const AchievementSchema = new mongoose.Schema({ 
    user: String,
    title: String,
    icon: String,
    description: String
});

export const AchievementModel = mongoose.model(
    AchievementName, 
    AchievementSchema, 
    AchievementCollection
);
