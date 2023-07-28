import { MESSAGES } from '../../constants';
import { WorkSkillModel } from '../models/work-skill';

const express = require('express');

const router = express.Router();

router.post('/create', async (req, res) => {
    const { 
		title,
        date,
        description,
        image,
	} = req.body;

    try {
        const workSkill = new WorkSkillModel({
            user: req.user.id,
            title,
			date,
			description,
			image,
        });

        const saved = await workSkill.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_WORK_SKILL });
    }
});

router.post('/update', async (req, res) => {
    const {
        id,
        title,
		date,
		description,
		image,
    } = req.body;

    try {
        const workSkill = await WorkSkillModel.findById(id);

        if (title !== undefined) {
            workSkill.title = title;
        }

		if (date !== undefined) {
            workSkill.date = date;
        }

		if (description !== undefined) {
            workSkill.description = description;
        }

		if (image !== undefined) {
            workSkill.image = image;
        }

        const saved = await workSkill.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_WORK_SKILL });
    }
});

export const WorkSkillRoute = ({ app, authJWT }) => {
    app.use('/work-skill', authJWT, router);
}