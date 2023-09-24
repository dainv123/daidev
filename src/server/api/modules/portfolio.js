import { MESSAGES } from '../../constants'

import { PortfolioModel } from '../models/portfolio'

const ObjectId = require('mongodb').ObjectID

const express = require('express')

const router = express.Router()

router.get('/get', async (req, res) => {
    try {
        res.status(200).json(await PortfolioModel.find({ user: req.user.id }))
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_PORTFOLIO })
    }
})

router.post('/update', async (req, res) => {
    const portfolios = req.body
    
    try {
        for (const portfolio of portfolios) {
            const { id, title, link, description, images, type, isNew } = portfolio

            const updatedPortfolio = isNew 
                ?  
                new PortfolioModel({
                    user: req.user.id,
                    type,
                    title,
                    link,
                    images,
                    description
                })
                : 
                await PortfolioModel.findByIdAndUpdate(
                    id,
                    {
                        user: req.user.id,
                        type,
                        title,
                        link,
                        images,
                        description
                    },
                    {
                        new: true
                    }
                )

            await updatedPortfolio.save()
        }

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_PORTFOLIO })
    }
})

router.post('/delete', async (req, res) => {
    const ids = req.body.ids || []
    
    try {
        await PortfolioModel.deleteMany({ _id: { $in: ids.map(id => new ObjectId(id)) }})

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_PORTFOLIO })
    }
})
    
export const PortfolioRoute = ({ app, authJWT }) => {
    app.use('/portfolio', authJWT, router)
}
