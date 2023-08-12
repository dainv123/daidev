import { combineReducers } from 'redux';
import * as mutations from './mutations'

let defaultState = {
    session: {},
    users: [],
    achievement: {},
    education: {},
    jobRole: {},
    langSkill: {},
    portfolio: [],
    profile: {},
    service: {},
    setting: {},
    social: {},
    workHistory: {},
    workSkill: {},
};

export const reducer = combineReducers({
    session(userSession = defaultState.session, action) {
        let {
            type,
            authenticated,
            session
        } = action;
        switch (type) {
            case mutations.SET_STATE:
                return {
                    ...userSession, id: action.state.session.id
                };
            case mutations.REQUEST_AUTHENTICATE_USER:
                return {
                    ...userSession, authenticated: mutations.AUTHENTICATING
                };
            case mutations.PROCESSING_AUTHENTICATE_USER:
                return {
                    ...userSession, authenticated
                };
            default:
                return userSession;
        }
    },
    users: (users = defaultState.users, action) => {
        switch (action.type) {
            case mutations.SET_STATE:
                return action.state.users;
        }
        return users;
    },
    achievement:(achievement = defaultState.achievement,action)=>{
        switch (action.type) {
            case mutations.SET_ACHIEVEMENT:
                const { id, title, icon, description } = action
                return { id, title, icon, description };
        }
        return achievement;
    },
    education:(education = defaultState.education,action)=>{
        switch (action.type) {
            case mutations.SET_EDUCATION:
                const { id, title, date, image, description } = action
                return { id, title, date, image, description };
        }
        return education;
    },
    jobRole:(jobRole = defaultState.jobRole,action)=>{
        switch (action.type) {
            case mutations.SET_JOB_ROLE:
                const { id, title } = action
                return { id, title };
        }
        return jobRole;
    },
    langSkill:(langSkill = defaultState.langSkill,action)=>{
        switch (action.type) {
            case mutations.SET_LANG_SKILL:
                const { id, title, point } = action
                return { id, title, point };
        }
        return langSkill;
    },
    portfolio:(portfolio = defaultState.portfolio,action)=>{
        switch (action.type) {
            case mutations.SET_PORTFOLIO:
                return [...action.portfolio]
        }
        return portfolio;
    },
    profile:(profile = defaultState.profile,action)=>{
        switch (action.type) {
            case mutations.SET_PROFILE:
                const { id, question, answer, avatar, name, address, greeting, email, phone } = action
                return { id, question, answer, avatar, name, address, greeting, email, phone };
        }
        return profile;
    },
    service:(service = defaultState.service,action)=>{
        switch (action.type) {
            case mutations.SET_SERVICE:
                const { id, icon, title, description } = action
                return { id, icon, title, description };
        }
        return service;
    },
    setting:(setting = defaultState.setting,action)=>{
        switch (action.type) {
            case mutations.SET_SETTING:
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
                } = action
                return { 
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
                };
        }
        return setting;
    },
    social:(social = defaultState.social,action)=>{
        switch (action.type) {
            case mutations.SET_SOCIAL:
                const { id, icon, title, link } = action
                return { id, icon, title, link };
        }
        return social;
    },
    workHistory:(workHistory = defaultState.workHistory,action)=>{
        switch (action.type) {
            case mutations.SET_WORK_HISTORY:
                const { id, date, title, image, description } = action
                return { id, date, title, image, description };
        }
        return workHistory;
    },
    workSkill:(workSkill = defaultState.workSkill,action)=>{
        switch (action.type) {
            case mutations.SET_WORK_SKILL:
                const { id, title, percent } = action
                return { id, title, percent };
        }
        return workSkill;
    },
});