import { MESSAGES } from '../../constants';
import { SocialModel } from '../models/social';

const express = require('express');

const router = express.Router();

router.post('/create', async (req, res) => {
    const {
        title,
        icon,
        link
    } = req.body;

    try {
        const social = new SocialModel({
            user: req.user.id,
            title,
            icon,
            link
        });

        const saved = await social.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_SOCIAL });
    }
});

router.post('/update', async (req, res) => {
    const {
        id,
        title,
        icon,
        link
    } = req.body;

    try {
        const social = await SocialModel.findById(id);

        if (title !== undefined) {
            social.title = title;
        }

        if (icon !== undefined) {
            social.icon = icon;
        }

        if (link !== undefined) {
            social.link = link;
        }

        const saved = await social.save();
        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_SOCIAL });
    }
});

export const SocialRoute = ({ app, authJWT }) => {
    app.use('/service', authJWT, router);
}
