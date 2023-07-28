import mongoose from 'mongoose';

const LangSkillName = 'langSkill';

const LangSkillCollection = 'langSkill';

const LangSkillSchema = new mongoose.Schema({ 
    user: String,
    title: String,
    point: Number
});

export const LangSkillModel = mongoose.model(
    LangSkillName, 
    LangSkillSchema, 
    LangSkillCollection
);
