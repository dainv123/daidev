const mongoose = require("mongoose");

const schema = new mongoose.Schema({ 
    user: String,
    title: String,
    icon: String,
    description: String
});

export const AchievementModel = mongoose.model('achievements', schema);
