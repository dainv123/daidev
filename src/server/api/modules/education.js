import { MESSAGES } from '../../constants';
import { EducationModel } from '../models/education';

const express = require('express');

const router = express.Router();

router.get('/get', async (req, res) => {
    try {
        const educations = await EducationModel.find({
            user: req.user.id
        });

        res.status(200).json(educations);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_EDUCATION });
    }
});

router.post('/create', async (req, res) => {
    const {
        title,
        date,
        image,
        description
    } = req.body;

    try {
        const education = new EducationModel({
            user: req.user.id,
            title,
            date,
            image,
            description
        });

        const saved = await education.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_EDUCATION });
    }
});

router.post('/update', async (req, res) => {
    const {
        id,
        title,
        date,
        image,
        description
    } = req.body;

    try {
        const education = await EducationModel.findById(id);

        if (date !== undefined) {
            education.date = date;
        }

        if (title !== undefined) {
            education.title = title;
        }

        if (image !== undefined) {
            education.image = image;
        }

        if (description !== undefined) {
            education.description = description;
        }

        const saved = await education.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_EDUCATION });
    }
});

export const EducationRoute = ({ app, authJWT }) => {
    app.use('/education', authJWT, router);
}
