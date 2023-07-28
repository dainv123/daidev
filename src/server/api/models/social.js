import mongoose from 'mongoose';

const SocialName = 'social';

const SocialCollection = 'social';

const SocialSchema = new mongoose.Schema({ 
    user: String,
    title: String,
    icon: String,
    link: String,
});

export const SocialModel = mongoose.model(
    SocialName, 
    SocialSchema, 
    SocialCollection
);
