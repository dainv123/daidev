import mongoose from 'mongoose';

const WorkHistoryName = 'workHistory';

const WorkHistoryCollection = 'workHistory';

const WorkHistorySchema = new mongoose.Schema({ 
    user: String,
    date: String,
    title: String,
    image: String,
    description: String,
});

export const WorkHistoryModel = mongoose.model(
    WorkHistoryName, 
    WorkHistorySchema, 
    WorkHistoryCollection
);
