import { MESSAGES } from '../../constants'

import { WorkHistoryModel } from '../models/work-history'

const ObjectId = require('mongodb').ObjectID

const express = require('express')

const router = express.Router()

router.get('/get', async (req, res) => {
    try {
        res.status(200).json(await WorkHistoryModel.find({ user: req.user.id }))
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_WORK_HISTORY })
    }
})

router.post('/update', async (req, res) => {
    const workHistories = req.body
    
    try {
        for (const workHistory of workHistories) {
            const { id, title, date, description, image, isNew } = workHistory

            const updatedWorkHistory = isNew 
                ?  
                new WorkHistoryModel({
                    user: req.user.id,
                    title,
                    date,
                    image,
                    description,
                })
                : 
                await WorkHistoryModel.findByIdAndUpdate(
                    id,
                    {
                        user: req.user.id,
                        title,
                        date,
                        image,
                        description,
                    },
                    {
                        new: true
                    }
                )

            await updatedWorkHistory.save()
        }

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_WORK_HISTORY })
    }
})

router.post('/delete', async (req, res) => {
    const ids = req.body.ids || []
    
    try {
        await WorkHistoryModel.deleteMany({ _id: { $in: ids.map(id => new ObjectId(id)) }})

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_WORK_HISTORY })
    }
})
    

export const WorkHistoryRoute = ({ app, authJWT }) => {
    app.use('/work-history', authJWT, router);
}
