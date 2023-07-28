import mongoose from 'mongoose';

const JobRoleName = 'jobRole';

const JobRoleCollection = 'jobRole';

const JobRoleSchema = new mongoose.Schema({ 
    user: String,
    title: String
});

export const JobRoleModel = mongoose.model(
    JobRoleName, 
    JobRoleSchema, 
    JobRoleCollection
);
