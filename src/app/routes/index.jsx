import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedTaskDetail } from '../components/TaskDetail'
import { ConnectedHome } from '../pages/Home'
import { ConnectedDashboard } from '../components/Dashboard'
import { ConnectedAdmin } from '../pages/Admin'
import { ConnectedNavigation } from '../components/Navigation'
import { ConnectedNotFound } from '../components/404'
import { ConnectedLogin } from '../pages/Login'
import { ConnectedSignUp } from '../pages/SignUp'
import { store } from '../store';
import { history } from '../store/history';
import { Redirect } from 'react-router';
import cookies from 'js-cookie'
import * as mutations from '../store/mutations';

const mapStateToProps = ({groups})=>({groups});

const mapDispatchToProps = dispatch => ({
    test() {
        dispatch(mutations.test())
    }
})

const RouteGuard = Component => ({match}) => {
    // console.log("sadas", store.getState().session);
    if (store.getState().session.authenticated) {
        return <Component match={match}/>
    }

    const accessToken = cookies.get('accessToken');

    const refreshToken = cookies.get('refreshToken');

    if (accessToken && refreshToken) {
        const responsive = dispatch(mutations.verifyToken(accessToken, refreshToken));    
    }


    // return !store.getState().session.authenticated ?
    //     <Redirect to="/login"/> :
    //     <Component match={match}/>;

    return <Redirect to="/login"/>
}

const ConnectedRouteGuard = connect(mapStateToProps, mapDispatchToProps)(RouteGuard);
    

export const Main = ()=>(
    <Router history={history}>
        <Provider store={store}>
            <div>
                {/* <ConnectedNavigation/> */}
                <Switch>
                    <Route exact path="/" component={ConnectedHome} />
                    <Route exact path="/login" component={ConnectedLogin} />
                    <Route exact path="/signup" component={ConnectedSignUp}/>
                    <Route exact path="/admin" render={ConnectedRouteGuard(ConnectedAdmin)}/>
                    <Route path="*" component={ConnectedNotFound} />
                </Switch>
                

                {/* <Route exact
                       path="/task/:id"
                       render={RouteGuard(ConnectedTaskDetail)} /> */}
            </div>
        </Provider>
    </Router>
);
