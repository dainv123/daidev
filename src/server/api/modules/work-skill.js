import { MESSAGES } from '../../constants';

import { WorkSkillModel } from '../models/work-skill';

const ObjectId = require('mongodb').ObjectID

const express = require('express')

const router = express.Router()

router.get('/get', async (req, res) => {
    try {
        res.status(200).json(await WorkSkillModel.find({ user: req.user.id }))
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_WORK_SKILL })
    }
})

router.post('/update', async (req, res) => {
    const workSkills = req.body
    
    try {
        for (const workSkill of workSkills) {
            const { id, title, percent, isNew } = workSkill

            const updatedPortfolio = isNew 
                ?  
                new WorkSkillModel({
                    user: req.user.id,
                    title,
                    percent
                })
                : 
                await WorkSkillModel.findByIdAndUpdate(
                    id,
                    {
                        user: req.user.id,
                        title,
                        percent
                    },
                    {
                        new: true
                    }
                )

            await updatedPortfolio.save()
        }

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_WORK_SKILL })
    }
})

router.post('/delete', async (req, res) => {
    const ids = req.body.ids || []
    
    try {
        await WorkSkillModel.deleteMany({ _id: { $in: ids.map(id => new ObjectId(id)) }})

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_WORK_SKILL })
    }
})

export const WorkSkillRoute = ({ app, authJWT }) => {
    app.use('/work-skill', authJWT, router);
}