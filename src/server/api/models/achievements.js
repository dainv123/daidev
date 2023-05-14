import mongoose from 'mongoose';

import { ConnectMongoose } from "../../helper/connect-db";

export const AchievementModel = ConnectMongoose.model('achievements', new mongoose.Schema({ 
    user: String,
    title: String,
    icon: String,
    description: String
}));
