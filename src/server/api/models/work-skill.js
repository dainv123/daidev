import mongoose from 'mongoose';

const WorkSkillName = 'workSkill';

const WorkSkillCollection = 'workSkill';

const WorkSkillSchema = new mongoose.Schema({ 
    user: String,
    title: String,
    percent: Number
});

export const WorkSkillModel = mongoose.model(
    WorkSkillName, 
    WorkSkillSchema, 
    WorkSkillCollection
);
