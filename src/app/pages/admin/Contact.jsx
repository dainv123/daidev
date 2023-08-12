import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionContact } from '../../components/admin/SectionContact'
import { SectionSnackbar } from '../../components/admin/SectionSnackbar'
import * as mutations from '../../store/mutations'

function Contact ({
    setting,
    getSetting,
    createSetting,
    updateSetting,
    social,
    getSocial,
    createSocial,
    updateSocial,
}) {
    const [socialState, setSocialState] = useState(social);

    const [settingState, setSettingState] = useState(setting);

    useEffect(() => {
        getSocial();
        getSetting();
    }, []);

    useEffect(() => {
        setSocialState(social);
        setSettingState(setting);
    }, [setting, social]);

    const showSnackbar = () => {
        //
    };

    const hideSnackbar = () => {
        //
    };

    const submitSnackbar = () => {
        const socialCaller = socialState.id ? updateSocial(socialState) : createSocial(socialState);

        const settingCaller = settingState.id ? updateSetting(settingState) : createSetting(settingState);        

        Promise.all([settingCaller, socialCaller])
            .then((response) => {
                console.log('Both mutations were successful!', response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateValue = (type, property, value) => {
        if (type === 'social') {
            setSocialState({ ...socialState, [property]: value });
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
            <SectionContact
                social={socialState}
                setting={settingState}
                updateValue={updateValue}
            ></SectionContact>
        </LayoutAdmin>
    );
}

const mapStateToProps = ({
    service,
    setting,
}) => ({
    service,
    setting,
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

    getSocial() {
        dispatch(mutations.getSocial());
    },

    createSocial(payload) {
        dispatch(mutations.createSocial(payload));
    },

    updateSocial(payload) {
        dispatch(mutations.updateSocial(payload));
    },
})

export const ConnectedContact = connect(mapStateToProps, mapDispatchToProps)(Contact);