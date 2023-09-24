import { MESSAGES } from '../../constants';

import { LangSkillModel } from '../models/lang-skill';

const ObjectId = require('mongodb').ObjectID

const express = require('express')

const router = express.Router()

router.get('/get', async (req, res) => {
    try {
        res.status(200).json(await LangSkillModel.find({ user: req.user.id }))
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_LANG_SKILL })
    }
})

router.post('/update', async (req, res) => {
    const langSkills = req.body
    
    try {
        for (const langSkill of langSkills) {
            const { id, title, point, isNew } = langSkill

            const updatedPortfolio = isNew 
                ?  
                new LangSkillModel({
                    user: req.user.id,
                    title,
                    point
                })
                : 
                await LangSkillModel.findByIdAndUpdate(
                    id,
                    {
                        user: req.user.id,
                        title,
                        point
                    },
                    {
                        new: true
                    }
                )

            await updatedPortfolio.save()
        }

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_LANG_SKILL })
    }
})

router.post('/delete', async (req, res) => {
    const ids = req.body.ids || []
    
    try {
        await LangSkillModel.deleteMany({ _id: { $in: ids.map(id => new ObjectId(id)) }})

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_LANG_SKILL })
    }
})

export const LangSkillRoute = ({ app, authJWT }) => {
    app.use('/lang-skill', authJWT, router);
}
