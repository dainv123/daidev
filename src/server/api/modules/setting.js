import { MESSAGES } from '../../constants';
import { SettingModel } from '../models/setting';

const express = require('express');

const router = express.Router();

router.post('/create', async (req, res) => {
    const {
        aboutMeTitle,
        aboutMeSubTitle,
        aboutMeLink,
        servicesTitle,
        servicesSubTitle,
        portfolioTitle,
        portfolioSubTitle,
        blogTitle,
        blogSubTitle,
        blogGithubLink,
        resumeTitle,
        resumeSubtitle,
        workHistoryTitle,
        workHistorySubTitle,
        workHistoryDownloadButtonName,
        educationTitle,
        educationSubTitle,
        langSkillsTitle,
        langSkillsSubTitle,
        workSkillsTitle,
        workSkillsSubTitle,
        contactTitle,
        contactSubtitle,
        contactInfoTitle,
        contactInfoSubtitle,
        socialTitle,
    } = req.body;

    try {
        const setting = new SettingModel({
            user: req.user.id,
            aboutMeTitle,
			aboutMeSubTitle,
			aboutMeLink,
			servicesTitle,
			servicesSubTitle,
			portfolioTitle,
			portfolioSubTitle,
			blogTitle,
			blogSubTitle,
			blogGithubLink,
			resumeTitle,
			resumeSubtitle,
			workHistoryTitle,
			workHistorySubTitle,
			workHistoryDownloadButtonName,
			educationTitle,
			educationSubTitle,
			langSkillsTitle,
			langSkillsSubTitle,
			workSkillsTitle,
			workSkillsSubTitle,
			contactTitle,
			contactSubtitle,
			contactInfoTitle,
			contactInfoSubtitle,
			socialTitle,
        });

        const saved = await setting.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_CREATE_SETTING });
    }
});

router.post('/update', async (req, res) => {
    const {
        id,
        aboutMeTitle,
        aboutMeSubTitle,
        aboutMeLink,
        servicesTitle,
        servicesSubTitle,
        portfolioTitle,
        portfolioSubTitle,
        blogTitle,
        blogSubTitle,
        blogGithubLink,
        resumeTitle,
        resumeSubtitle,
        workHistoryTitle,
        workHistorySubTitle,
        workHistoryDownloadButtonName,
        educationTitle,
        educationSubTitle,
        langSkillsTitle,
        langSkillsSubTitle,
        workSkillsTitle,
        workSkillsSubTitle,
        contactTitle,
        contactSubtitle,
        contactInfoTitle,
        contactInfoSubtitle,
        socialTitle,
    } = req.body;

    try {
        const setting = await SettingModel.findById(id);

        if (aboutMeTitle !== undefined) {
            setting.aboutMeTitle = aboutMeTitle;
        }

        if (aboutMeSubTitle !== undefined) {
            setting.aboutMeSubTitle = aboutMeSubTitle;
        }

        if (aboutMeLink !== undefined) {
            setting.aboutMeLink = aboutMeLink;
        }

		if (servicesTitle !== undefined) {
            setting.servicesTitle = servicesTitle;
        }

        if (servicesSubTitle !== undefined) {
            setting.servicesSubTitle = servicesSubTitle;
        }

		if (portfolioTitle !== undefined) {
            setting.portfolioTitle = portfolioTitle;
        }

        if (portfolioSubTitle !== undefined) {
            setting.portfolioSubTitle = portfolioSubTitle;
        }

        if (blogTitle !== undefined) {
            setting.blogTitle = blogTitle;
        }

		if (blogSubTitle !== undefined) {
            setting.blogSubTitle = blogSubTitle;
        }

        if (blogGithubLink !== undefined) {
            setting.blogGithubLink = blogGithubLink;
        }

		if (resumeTitle !== undefined) {
            setting.resumeTitle = resumeTitle;
        }

        if (resumeSubtitle !== undefined) {
            setting.resumeSubtitle = resumeSubtitle;
        }

        if (workHistoryTitle !== undefined) {
            setting.workHistoryTitle = workHistoryTitle;
        }

		if (workHistorySubTitle !== undefined) {
            setting.workHistorySubTitle = workHistorySubTitle;
        }

        if (workHistoryDownloadButtonName !== undefined) {
            setting.workHistoryDownloadButtonName = workHistoryDownloadButtonName;
        }

		if (educationTitle !== undefined) {
            setting.educationTitle = educationTitle;
        }

        if (educationSubTitle !== undefined) {
            setting.educationSubTitle = educationSubTitle;
        }

        if (langSkillsTitle !== undefined) {
            setting.langSkillsTitle = langSkillsTitle;
        }

		if (langSkillsSubTitle !== undefined) {
            setting.langSkillsSubTitle = langSkillsSubTitle;
        }

        if (workSkillsTitle !== undefined) {
            setting.workSkillsTitle = workSkillsTitle;
        }

		if (workSkillsSubTitle !== undefined) {
            setting.workSkillsSubTitle = workSkillsSubTitle;
        }

        if (contactTitle !== undefined) {
            setting.contactTitle = contactTitle;
        }

        if (contactSubtitle !== undefined) {
            setting.contactSubtitle = contactSubtitle;
        }

		if (contactInfoTitle !== undefined) {
            setting.contactInfoTitle = contactInfoTitle;
        }

        if (contactInfoSubtitle !== undefined) {
            setting.contactInfoSubtitle = contactInfoSubtitle;
        }

		if (socialTitle !== undefined) {
            setting.socialTitle = socialTitle;
        }

        const saved = await setting.save();

        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_SETTING });
    }
});

export const SettingRoute = ({ app, authJWT }) => {
    app.use('/setting', authJWT, router);
}
