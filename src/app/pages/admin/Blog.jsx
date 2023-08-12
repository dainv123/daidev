import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionBlog } from '../../components/admin/SectionBlog'
import { SectionSnackbar } from '../../components/admin/SectionSnackbar'
import * as mutations from '../../store/mutations'

function Blog({
    setting,
    getSetting,
    createSetting,
    updateSetting
}) {
    const [settingState, setSettingState] = useState(setting);

    useEffect(() => getSetting(), []);

    useEffect(() => setSettingState(setting), [setting]);

    const showSnackbar = () => {};

    const hideSnackbar = () => {};

    const submitSnackbar = () => {
        const settingCaller = settingState.id 
            ? updateSetting(settingState) 
            : createSetting(settingState);

        Promise.all([settingCaller])
            .then((response) => {
                console.log('Both mutations were successful!', response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateValue = (type, property, value) => {
        setSettingState({ ...settingState, [property]: value });
    };

    return (
        <LayoutAdmin>
            <SectionSnackbar
                show={showSnackbar}
                hide={hideSnackbar}
                submit={submitSnackbar}
            ></SectionSnackbar>
            <SectionBlog
                setting={settingState}
                updateValue={updateValue}
            ></SectionBlog>
        </LayoutAdmin>
    );
}

const mapStateToProps = ({ setting }) => ({ setting });

const mapDispatchToProps = dispatch => ({
    getSetting() {
        dispatch(mutations.getSetting());
    },

    createSetting(payload) {
        dispatch(mutations.createSetting(payload));
    },

    updateSetting(payload) {
        dispatch(mutations.updateSetting(payload));
    }
})

export const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog);