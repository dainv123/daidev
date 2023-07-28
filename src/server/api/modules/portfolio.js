import { MESSAGES } from '../../constants';
import { PortfolioModel } from '../models/portfolio';

const express = require('express');

const router = express.Router();

router.post('/create', async (req, res) => {
    const {
        title,
        link,
        image,
        description
    } = req.body;

    try {
        const portfolio = new PortfolioModel({
            user: req.user.id,
            title,
            link,
            image,
            description
        });

        const saved = await portfolio.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_PORTFOLIO });
    }
});

router.post('/update', async (req, res) => {
    const {
        id,
        title,
        link,
        image,
        description
    } = req.body;

    try {
        const portfolio = await PortfolioModel.findById(id);

        if (link !== undefined) {
            portfolio.link = link;
        }

        if (title !== undefined) {
            portfolio.title = title;
        }

        if (image !== undefined) {
            portfolio.image = image;
        }

        if (description !== undefined) {
            portfolio.description = description;
        }

        const saved = await portfolio.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_PORTFOLIO });
    }
});

export const PortfolioRoute = ({ app, authJWT }) => {
    app.use('/portfolio', authJWT, router);
}
