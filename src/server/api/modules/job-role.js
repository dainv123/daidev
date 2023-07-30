import { MESSAGES } from '../../constants';
import { JobRoleModel } from '../models/job-role';

const express = require('express');

const router = express.Router();

router.get('/get', async (req, res) => {
    try {
        const jobRoles = await JobRoleModel.find({
            user: req.user.id
        });

        res.status(200).json(jobRoles);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_JOB_ROLE });
    }
});

router.post('/create', async (req, res) => {
    const { title } = req.body;

    try {
        const jobRole = new JobRoleModel({
            user: req.user.id,
            title
        });

        const saved = await jobRole.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_JOB_ROLE });
    }
});

router.post('/update', async (req, res) => {
    const {
        id,
        title
    } = req.body;

    try {
        const jobRole = await JobRoleModel.findById(id);

        if (title !== undefined) {
            jobRole.title = title;
        }

        const saved = await jobRole.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_JOB_ROLE });
    }
});

export const JobRoleRoute = ({ app, authJWT }) => {
    app.use('/job-role', authJWT, router);
}
