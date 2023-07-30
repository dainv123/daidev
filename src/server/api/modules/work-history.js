import { MESSAGES } from '../../constants';
import { WorkHistoryModel } from '../models/work-history';

const express = require('express');

const router = express.Router();

router.get('/get', async (req, res) => {
    try {
        const workHistories = await WorkHistoryModel.find({
            user: req.user.id
        });

        res.status(200).json(workHistories);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_WORK_HISTORY });
    }
});

router.post('/create', async (req, res) => {
    const { 
		title,
        date,
        description,
        image,
	} = req.body;

    try {
        const workHistory = new WorkHistoryModel({
            user: req.user.id,
            title,
			date,
			description,
			image,
        });

        const saved = await workHistory.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_WORK_HISTORY });
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
        const workHistory = await WorkHistoryModel.findById(id);

        if (title !== undefined) {
            workHistory.title = title;
        }

		if (date !== undefined) {
            workHistory.date = date;
        }

		if (description !== undefined) {
            workHistory.description = description;
        }

		if (image !== undefined) {
            workHistory.image = image;
        }

        const saved = await workHistory.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_WORK_HISTORY });
    }
});

export const WorkHistoryRoute = ({ app, authJWT }) => {
    app.use('/work-history', authJWT, router);
}
