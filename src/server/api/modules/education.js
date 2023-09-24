import { MESSAGES } from '../../constants';

import { EducationModel } from '../models/education';

const ObjectId = require('mongodb').ObjectID

const express = require('express');

const router = express.Router();

router.get('/get', async (req, res) => {
    try {
        const educations = await EducationModel.find({
            user: req.user.id
        });

        res.status(200).json(educations);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_GET_EDUCATION });
    }
});


router.post('/update', async (req, res) => {
    const educations = req.body
    
    try {
        for (const education of educations) {
            const { id, title, date, description, image, isNew } = education

            const updatedEducation = isNew 
                ?  
                new EducationModel({
                    user: req.user.id,
                    title,
                    date,
                    image,
                    description
                })
                : 
                await EducationModel.findByIdAndUpdate(
                    id,
                    {
                        user: req.user.id,
                        title,
                        date,
                        image,
                        description
                    },
                    {
                        new: true
                    }
                )

            await updatedEducation.save()
        }

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_PORTFOLIO })
    }
});

router.post('/delete', async (req, res) => {
    const ids = req.body.ids || []
    
    try {
        await EducationModel.deleteMany({ 
            _id: { 
                $in: ids.map(id => new ObjectId(id)) 
            }
        })

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_EDUCATION })
    }
})
    
export const EducationRoute = ({ app, authJWT }) => {
    app.use('/education', authJWT, router);
}
