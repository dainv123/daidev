import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import { ConnectedTaskDetail } from "../components/TaskDetail";
import { ConnectedHome } from "../pages/Home";
// import { ConnectedDashboard } from "../components/Dashboard";
import { ConnectedAdmin } from "../pages/admin/Admin";
import { ConnectedPortfolio } from "../pages/admin/Portfolio";
import { ConnectedResume } from "../pages/admin/Resume";
import { ConnectedBlog } from "../pages/admin/Blog";
// import { SectionPortfolio } from "../components/admin/SectionPortfolio";
// import { SectionBlog } from "../components/admin/SectionBlog";
// import { SectionResume } from "../components/admin/SectionResume";
// import { ConnectedNavigation } from "../components/Navigation";
import { ConnectedNotFound } from "../components/404";
import { ConnectedLogin } from "../pages/Login";
import { ConnectedSignUp } from "../pages/SignUp";
import { store } from "../store";
import { history } from "../store/history";
import { Redirect } from "react-router";
import cookies from "js-cookie";
import { ConnectedAboutMe } from "../pages/admin/AboutMe";
import { ConnectedContact } from "../pages/admin/Contact";

const RouteGuard =
    (Component) =>
        ({ match }) => {
            if (store.getState().session.authenticated) {
                return <Component match={match} />;
            }

            const accessToken = cookies.get("accessToken");

            const refreshToken = cookies.get("refreshToken");

            if (accessToken && refreshToken) {
                return <Component match={match} />;
            }

            return <Redirect to="/login" />;
        };

// const ConnectedRouteGuard = connect(mapStateToProps, mapDispatchToProps)(RouteGuard);

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <Switch>
                    <Route exact path="/" component={ConnectedHome} />

                    <Route exact path="/login" component={ConnectedLogin} />

                    <Route exact path="/signup" component={ConnectedSignUp} />

                    <Route
                        path="/admin"
                        render={({ match: { url } }) => (
                            <>
                                <Route path={`${url}/`} render={RouteGuard(ConnectedAdmin)} exact />

                                <Route path={`${url}/profile`} component={ConnectedAdmin} />

                                <Route path={`${url}/portfolio`} component={ConnectedPortfolio} />

                                <Route path={`${url}/blog`} component={ConnectedBlog} />

                                <Route path={`${url}/resume`} component={ConnectedResume} />

                                <Route path={`${url}/about-me`} component={ConnectedAboutMe} />

                                <Route path={`${url}/contact`} component={ConnectedContact} />

                                <Route path="*" component={ConnectedNotFound} />
                            </>
                        )}
                    />

                    <Route path="*" component={ConnectedNotFound} />
                </Switch>
            </div>
        </Provider>
    </Router>
);
