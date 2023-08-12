import { MESSAGES } from '../../constants'

import { PortfolioModel } from '../models/portfolio'

import { getImagesInformation } from './file'

const express = require('express')

const router = express.Router()

router.get('/get', async (req, res) => {
    try {
        let portfolios = await PortfolioModel.find({ user: req.user.id })

        const imageIds = portfolios.reduce((acc, item) => {
            return acc.concat(item.images || [])
        }, [])

        const imageInformation = await getImagesInformation(imageIds) || []

        portfolios = (portfolios || []).map((portfolio) => {
            const medium = JSON.parse(JSON.stringify(portfolio))

            const images = JSON.parse(JSON.stringify(medium.images || [])).map(image => ({
                ...(imageInformation.find(info => info.id == image) || {}),
                id: image
            }))

            medium.images = images
            
            return medium
        })

        res.status(200).json(portfolios)
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_PORTFOLIO })
    }
})

router.post('/create', async (req, res) => {
    const portfolios = req.body
    
    try {
        for (const portfolio of portfolios) {
            const { title, link, description, images } = portfolio
            
            const newPortfolio = new PortfolioModel({
                user: req.user.id,
                title,
                link,
                images,
                description
            })
    
            await newPortfolio.save()
        }

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_PORTFOLIO })
    }
})


router.post('/update', async (req, res) => {
    const portfolios = req.body
    
    try {
        for (const portfolio of portfolios) {
            const { id, title, link, description, images } = portfolio
            
            const updatedPortfolio = await PortfolioModel.findByIdAndUpdate(
                id,
                {
                    user: req.user.id,
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
        await PortfolioModel
            .find({ _id: { $in: ids.map(id => new ObjectId(id)) }})
            .remove()
            .exec()

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_PORTFOLIO })
    }
})
    
export const PortfolioRoute = ({ app, authJWT }) => {
    app.use('/portfolio', authJWT, router)
}
