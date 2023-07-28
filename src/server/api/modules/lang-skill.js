import { MESSAGES } from '../../constants';
import { LangSkillModel } from '../models/lang-skill';

const express = require('express');

const router = express.Router();

router.post('/create', async (req, res) => {
    const { title, point } = req.body;

    try {
        const langSkill = new LangSkillModel({
            user: req.user.id,
            title,
			point
        });

        const saved = await langSkill.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_LANG_SKILL });
    }
});

router.post('/update', async (req, res) => {
    const {
        id,
        title,
		point
    } = req.body;

    try {
        const langSkill = await LangSkillModel.findById(id);

        if (title !== undefined) {
            langSkill.title = title;
        }

		if (point !== undefined) {
            langSkill.point = point;
        }

        const saved = await langSkill.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_LANG_SKILL });
    }
});

export const LangSkillRoute = ({ app, authJWT }) => {
    app.use('/lang-skill', authJWT, router);
}
