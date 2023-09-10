import mongoose from 'mongoose';

const PortfolioName = 'portfolio';

const PortfolioCollection = 'portfolio';

const PortfolioSchema = new mongoose.Schema({ 
    user: String,
    title: String,
    link: String,
    images: [String],
    type: Number,
    description: String
});

export const PortfolioModel = mongoose.model(
    PortfolioName, 
    PortfolioSchema, 
    PortfolioCollection
);
