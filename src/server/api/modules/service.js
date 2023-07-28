import { MESSAGES } from '../../constants';
import { ServiceModel } from '../models/service';

const express = require('express');

const router = express.Router();

router.post('/create', async (req, res) => {
    const {
        title,
        icon,
        description
    } = req.body;

    try {
        const service = new ServiceModel({
            user: req.user.id,
            title,
            icon,
            description
        });

        const saved = await service.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_SERVICE });
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
        const service = await ServiceModel.findById(id);

        if (title !== undefined) {
            service.title = title;
        }

        if (icon !== undefined) {
            service.icon = icon;
        }

        if (description !== undefined) {
            service.description = description;
        }

        const saved = await service.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_SERVICE });
    }
});

export const ServiceRoute = ({ app, authJWT }) => {
    app.use('/service', authJWT, router);
}
