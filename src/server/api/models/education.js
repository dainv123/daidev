import mongoose from 'mongoose';

const EducationName = 'education';

const EducationCollection = 'education';

const EducationSchema = new mongoose.Schema({ 
    user: String,
    title: String,
    date: String,
    description: String,
    image: String
});

export const EducationModel = mongoose.model(
    EducationName, 
    EducationSchema,
    EducationCollection
);
