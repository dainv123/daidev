import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionResume } from '../../components/admin/SectionResume'
import { SectionSnackbar } from '../../components/admin/SectionSnackbar'
import * as mutations from '../../store/mutations'

function Resume({
    setting,
    getSetting,
    createSetting,
    updateSetting,
    education,
    getEducation,
    createEducation,
    updateEducation,
    workHistory,
    getWorkHistory,
    createWorkHistory,
    updateWorkHistory,
    workSkill,
    getWorkSkill,
    createWorkSkill,
    updateWorkSkill,
    langSkill,
    getLangSkill,
    createLangSkill,
    updateLangSkill,
}) {
    const [settingState, setSettingState] = useState(setting);

    const [educationState, setEducationState] = useState(education);

    const [workHistoryState, setWorkHistoryState] = useState(workHistory);

    const [workSkillState, setWorkSkillState] = useState(workSkill);

    const [langSkillState, setLangSkillState] = useState(langSkill);

    useEffect(() => {
        getSetting();
        getEducation();
        getWorkHistory();
        getWorkSkill();
        getLangSkill();
    }, []);

    useEffect(() => {
        setSettingState(setting);
        setEducationState(education);
        setWorkHistoryState(workHistory);
        setWorkSkillState(workSkill);
        setLangSkillState(langSkill);
    }, [setting, education, workHistory, workSkill, langSkill]);

    const showSnackbar = () => {
        //
    };

    const hideSnackbar = () => {
        //
    };

    const submitSnackbar = () => {
        // const settingCaller = settingState.id ? updateSetting(settingState) : createSetting(settingState);

        // const serviceCaller = serviceState.id ? updateService(serviceState) : createService(serviceState);

        // const achievementCaller = achievementState.id ? updateAchievement(achievementState) : createAchievement(achievementState);

        // Promise.all([settingCaller, serviceCaller, achievementCaller])
        //     .then((response) => {
        //         console.log('Both mutations were successful!', response);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    const updateValue = (type, property, value) => {
        // if (type === 'achievement') {
        //     setAchievementState({ ...achievementState, [property]: value });
        // } else if (type === 'service') {
        //     setServiceState({ ...serviceState, [property]: value });
        // } else {
        //     setSettingState({ ...settingState, [property]: value });
        // }
    };

    return (
        <LayoutAdmin>
            <SectionSnackbar
                show={showSnackbar}
                hide={hideSnackbar}
                submit={submitSnackbar}
            ></SectionSnackbar>
            <SectionResume
                setting={settingState}
                education={educationState}
                workHistory={workHistoryState}
                workSkill={workSkillState}
                langSkill={langSkillState}
                updateValue={updateValue}
            ></SectionResume>
        </LayoutAdmin>
    );
}

const mapStateToProps = ({
    setting,
    workHistory,
    education,
    workSkill,
    langSkill,
}) => ({
    setting,
    workHistory,
    education,
    workSkill,
    langSkill,
});

const mapDispatchToProps = dispatch => ({
    getSetting() {
        dispatch(mutations.getSetting());
    },

    createSetting(payload) {
        dispatch(mutations.createSetting(payload));
    },

    updateSetting(payload) {
        dispatch(mutations.updateSetting(payload));
    },

    getWorkHistory() {
        dispatch(mutations.getWorkHistory());
    },

    createWorkHistory(payload) {
        dispatch(mutations.createWorkHistory(payload));
    },

    updateWorkHistory(payload) {
        dispatch(mutations.updateWorkHistory(payload));
    },

    getEducation() {
        dispatch(mutations.getEducation());
    },

    createEducation(payload) {
        dispatch(mutations.createEducation(payload));
    },

    updateEducation(payload) {
        dispatch(mutations.updateEducation(payload));
    },

    getWorkSkill() {
        dispatch(mutations.getWorkSkill());
    },

    createWorkSkill(payload) {
        dispatch(mutations.createWorkSkill(payload));
    },

    updateWorkSkill(payload) {
        dispatch(mutations.updateWorkSkill(payload));
    },

    getLangSkill() {
        dispatch(mutations.getLangSkill());
    },

    createLangSkill(payload) {
        dispatch(mutations.createLangSkill(payload));
    },

    updateLangSkill(payload) {
        dispatch(mutations.updateLangSkill(payload));
    },
})

export const ConnectedResume = connect(mapStateToProps, mapDispatchToProps)(Resume);