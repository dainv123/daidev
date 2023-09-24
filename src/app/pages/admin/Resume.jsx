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
    resume,
    getResume,
    updateResume
}) {
    let updatingResume = new Object();

    const [settingState, setSettingState] = useState(setting);

    const [educationState, setEducationState] = useState([]);

    const [workHistoryState, setWorkHistoryState] = useState([]);

    const [workSkillState, setWorkSkillState] = useState([]);

    const [langSkillState, setLangSkillState] = useState([]);

    useEffect(() => {
        getResume();
        getSetting();
    }, []);

    useEffect(() => {
        const {
            education, 
            langSkill,
            workSkill, 
            workHistory, 
        } = resume;

        setSettingState(setting);
        setEducationState(education);
        setWorkSkillState(workSkill);
        setLangSkillState(langSkill);
        setWorkHistoryState(workHistory);
    }, [setting, resume]);

    const showSnackbar = () => {
        //
    };

    const hideSnackbar = () => {
        updatingResume = new Object();
    };

    const submitSnackbar = () => {
        const settingCaller = settingState.id ? updateSetting(settingState) : createSetting(settingState);

        const resumeCaller = updateResume(updatingResume);
        
        Promise.all([settingCaller, resumeCaller])
            .then((response) => {
                console.log('Both mutations were successful!', response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onChangeResume = value => updatingResume = value;

    const updateValue = (type, property, value) => setSettingState({ ...settingState, [property]: value });

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
                onChangeResume={onChangeResume}
            ></SectionResume>
        </LayoutAdmin>
    );
}

const mapStateToProps = ({
    setting,
    resume
}) => ({
    setting,
    resume
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

    getResume() {
        dispatch(mutations.getResume());
    },

    updateResume(payload) {
        dispatch(mutations.updateResume(payload));
    }
})

export const ConnectedResume = connect(mapStateToProps, mapDispatchToProps)(Resume);