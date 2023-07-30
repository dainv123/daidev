import { MESSAGES } from '../../constants';
import { ProfileModel } from '../models/profile';

const express = require('express');

const router = express.Router();

router.get('/get', async (req, res) => {
    try {
        const profiles = await ProfileModel.find({
            user: req.user.id
        });

        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_PROFILE });
    }
});

router.post('/create', async (req, res) => {
    const {
        question,
        answer,
        avatar,
        name,
        address,
        greeting,
        email,
        phone
    } = req.body;

    try {
        const profile = new ProfileModel({
            user: req.user.id,
            question,
			answer,
			avatar,
			name,
			address,
			greeting,
			email,
			phone
        });

        const saved = await profile.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_PROFILE });
    }
});

router.post('/update', async (req, res) => {
    const {
        id,
        question,
        answer,
        avatar,
        name,
        address,
        greeting,
        email,
        phone
    } = req.body;

    try {
        const profile = await ProfileModel.findById(id);

        if (question !== undefined) {
            profile.question = question;
        }

        if (answer !== undefined) {
            profile.answer = answer;
        }

        if (avatar !== undefined) {
            profile.avatar = avatar;
        }

        if (name !== undefined) {
            profile.name = name;
        }

		if (address !== undefined) {
            profile.address = address;
        }

        if (greeting !== undefined) {
            profile.greeting = greeting;
        }

        if (phone !== undefined) {
            profile.phone = phone;
        }

        if (email !== undefined) {
            profile.email = email;
        }

        const saved = await profile.save();
        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_PROFILE });
    }
});

export const ProfileRoute = ({ app, authJWT }) => {
    app.use('/profile', authJWT, router);
}
