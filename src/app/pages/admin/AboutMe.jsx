import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionAboutMe } from '../../components/admin/SectionAboutMe'
import { SectionSnackbar } from '../../components/admin/SectionSnackbar'
import * as mutations from '../../store/mutations'

function AboutMe({
    setting,
    getSetting,
    createSetting,
    updateSetting,
    service,
    getService,
    createService,
    updateService,
    achievement,
    getAchievement,
    createAchievement,
    updateAchievement,
}) {
    const [serviceState, setServiceState] = useState(service);

    const [settingState, setSettingState] = useState(setting);

    const [achievementState, setAchievementState] = useState(achievement);

    useEffect(() => {
        getSetting();
        getService();
        getAchievement();
    }, []);

    useEffect(() => {
        setSettingState(setting);
        setServiceState(service);
        setAchievementState(achievement);
    }, [setting, service, achievement]);

    const showSnackbar = () => {
        //
    };

    const hideSnackbar = () => {
        //
    };

    const submitSnackbar = () => {
        const settingCaller = settingState.id ? updateSetting(settingState) : createSetting(settingState);

        const serviceCaller = serviceState.id ? updateService(serviceState) : createService(serviceState);

        const achievementCaller = achievementState.id ? updateAchievement(achievementState) : createAchievement(achievementState);

        Promise.all([settingCaller, serviceCaller, achievementCaller])
            .then((response) => {
                console.log('Both mutations were successful!', response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateValue = (type, property, value) => {
        if (type === 'achievement') {
            setAchievementState({ ...achievementState, [property]: value });
        } else if (type === 'service') {
            setServiceState({ ...serviceState, [property]: value });
        } else {
            setSettingState({ ...settingState, [property]: value });
        }
    };

    return (
        <LayoutAdmin>
            <SectionSnackbar
                show={showSnackbar}
                hide={hideSnackbar}
                submit={submitSnackbar}
            ></SectionSnackbar>
            <SectionAboutMe
                setting={settingState}
                service={serviceState}
                achievement={achievementState}
                updateValue={updateValue}
            ></SectionAboutMe>
        </LayoutAdmin>
    );
}

const mapStateToProps = ({
    service,
    setting,
    achievement,
}) => ({
    service,
    setting,
    achievement,
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

    getService() {
        dispatch(mutations.getService());
    },

    createService(payload) {
        dispatch(mutations.createService(payload));
    },

    updateService(payload) {
        dispatch(mutations.updateService(payload));
    },

    getAchievement() {
        dispatch(mutations.getAchievement());
    },

    createAchievement(payload) {
        dispatch(mutations.createAchievement(payload));
    },

    updateAchievement(payload) {
        dispatch(mutations.updateAchievement(payload));
    },
})

export const ConnectedAboutMe = connect(mapStateToProps, mapDispatchToProps)(AboutMe);