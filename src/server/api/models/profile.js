import mongoose from 'mongoose';

const ProfileName = 'profile';

const ProfileCollection = 'profile';

const ProfileSchema = new mongoose.Schema({ 
    user: String,
    question: String,
    answer: String,
    avatar: String,
    name: String,
    address: String,
    greeting: String,
    email: String,
    phone: String,
});

export const ProfileModel = mongoose.model(
    ProfileName, 
    ProfileSchema, 
    ProfileCollection
);
