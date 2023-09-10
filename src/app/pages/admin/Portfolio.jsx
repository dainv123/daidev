import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionPortfolio } from '../../components/admin/SectionPortfolio'
import { SectionSnackbar } from '../../components/admin/SectionSnackbar'
import * as mutations from '../../store/mutations'

function Portfolio({
    setting,
    getSetting,
    createSetting,
    updateSetting,
    portfolio,
    getPortfolio,
    updatePortfolio,
}) {
    let updatingPortfolios = new Object();

    const [settingState, setSettingState] = useState(setting);

    const [portfolioState, setPortfolioState] = useState(portfolio);

    useEffect(() => {
        getSetting();
        getPortfolio();
    }, []);

    useEffect(() => {
        setSettingState(setting);
        setPortfolioState(portfolio);
    }, [setting, portfolio]);

    const showSnackbar = () => {};

    const hideSnackbar = () => {
        updatingPortfolios = new Object();
    };

    const submitSnackbar = () => {
        const settingCaller = settingState.id ? updateSetting(settingState) : createSetting(settingState);

        const portfolioCaller = updatePortfolio(updatingPortfolios);
        
        Promise.all([settingCaller, portfolioCaller])
            .then((response) => {
                console.log('Both mutations were successful!', response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateValue = (type, property, value) => {
        if (type === 'portfolio') {
            updatingPortfolios = value;
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
            <SectionPortfolio
                setting={settingState}
                portfolios={portfolioState}
                updateValue={updateValue}
                onChangePortfolio={data => updateValue('portfolio', null, data)}
            ></SectionPortfolio>
        </LayoutAdmin>
    );
}
const mapStateToProps = ({ portfolio, setting }) => ({ portfolio, setting });

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

    getPortfolio() {
        dispatch(mutations.getPortfolio());
    },

    updatePortfolio(payload) {
        dispatch(mutations.updatePortfolio(payload));
    },
})

export const ConnectedPortfolio = connect(mapStateToProps, mapDispatchToProps)(Portfolio);