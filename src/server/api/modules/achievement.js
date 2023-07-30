import { MESSAGES } from '../../constants';
import { AchievementModel } from '../models/achievement';

const express = require('express');

const router = express.Router();

router.get('/get', async (req, res) => {
    try {
        const achievements = await AchievementModel.find({
            user: req.user.id
        });

        res.status(200).json(achievements);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_ACHIEVEMENT });
    }
});

router.post('/create', async (req, res) => {
    const {
        title,
        icon,
        description
    } = req.body;

    try {
        const achievement = new AchievementModel({
            user: req.user.id,
            icon,
            title,
            description
        });

        // AchievementModel.validate(achievement, async (error) => {
        //     if (error) {
        //         res.status(500).json({ error: "The payload is invalid" });
        //     } else {
        //         const saved = await achievement.save();
        //         res.status(201).json(saved);
        //     }
        // });

        const saved = await achievement.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_ACHIEVEMENT });
    }
});

router.post('/update', async (req, res) => {
    const {
        id,
        title,
        icon,
        description
    } = req.body;

    try {
        const achievement = await AchievementModel.findById(id);

        if (icon !== undefined) {
            achievement.icon = icon;
        }

        if (title !== undefined) {
            achievement.title = title;
        }

        if (description !== undefined) {
            achievement.description = description;
        }

        const saved = await achievement.save();

        res.status(200).json(saved);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_ACHIEVEMENT });
    }
});

export const AchievementRoute = ({ app, authJWT }) => {
    app.use('/achievement', authJWT, router);
}
