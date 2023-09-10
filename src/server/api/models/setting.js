import mongoose from 'mongoose';

const SettingName = 'setting';

const SettingCollection = 'setting';

const SettingSchema = new mongoose.Schema({ 
    user: String,
    aboutMeTitle: String,
    aboutMeSubTitle: String,
    aboutMeLink: String,
    servicesTitle: String,
    servicesSubTitle: String,
    portfolioTitle: String,
    portfolioSubTitle: String,
    blogTitle: String,
    blogSubTitle: String,
    blogGithubLink: String,
    resumeTitle: String,
    resumeSubtitle: String,
    workHistoryTitle: String,
    workHistorySubTitle: String,
    workHistoryDownloadButtonName: String,
    educationTitle: String,
    educationSubTitle: String,
    langSkillTitle: String,
    langSkillSubTitle: String,
    workSkillTitle: String,
    workSkillSubTitle: String,
    contactTitle: String,
    contactSubtitle: String,
    contactInfoTitle: String,
    contactInfoSubtitle: String,
    socialTitle: String,
});

export const SettingModel = mongoose.model(
    SettingName, 
    SettingSchema, 
    SettingCollection
);
