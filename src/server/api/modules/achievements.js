// import { AchievementModel } from '../models/achievements';

const express = require('express');

const mongoose = require("mongoose");

const router = express.Router();

router.get('/', (req, res) => {
    res.send('successfully')
});

router.post('/create', async (req, res) => {
    const {
        title,
        icon,
        description
    } = req.body;

    const schema = new mongoose.Schema({
        user: String,
        title: String,
        icon: String,
        description: String
    });

    const User = mongoose.model("User", schema);

    const response = new User({
        user: req.user.id,
        icon,
        title,
        description
    });

    // const response = await AchievementModel.create({ 
    //     user: req.user.id,
    //     icon,
    //     title,
    //     description
    // });

    console.log("a", response)
});

export const AchievementsRoute = ({ app, authJWT }) => {
    app.use('/achievements', authJWT, router);
}
