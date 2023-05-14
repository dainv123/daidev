import { AchievementModel } from '../models/achievements';

const express = require('express');

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

    const response = await AchievementModel.create({ 
        user: req.user.id,
        icon,
        title,
        description
    });

    console.log("a", response)
});

export const AchievementsRoute = ({ app, authJWT }) => {
    app.use('/achievements', authJWT, router);
}
