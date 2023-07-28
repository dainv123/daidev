import mongoose from 'mongoose';

const ServiceName = 'service';

const ServiceCollection = 'service';

const ServiceSchema = new mongoose.Schema({ 
    user: String,
    title: String,
    icon: String,
    description: String,
});

export const ServiceModel = mongoose.model(
    ServiceName, 
    ServiceSchema, 
    ServiceCollection
);
