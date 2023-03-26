import React, { useEffect } from 'react'
import useScript from '../hooks/useScript'
import useStyle from '../hooks/useStyle'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'

const Login = ({ authenticateUser, authenticated }) => {
    useStyle('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
    useStyle('/assets_admin/vendor/fontawesome-free/css/all.min.css');
    useStyle('/assets_admin/css/sb-admin-2.min.css');
    useScript('/assets_admin/vendor/jquery/jquery.min.js');
    useScript('/assets_admin/vendor/bootstrap/js/bootstrap.bundle.min.js');
    useScript('/assets_admin/vendor/jquery-easing/jquery.easing.min.js');
    useScript('/assets_admin/js/sb-admin-2.min.js');
    return (
        <div class="bg-gradient-primary">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-10 col-lg-12 col-md-9">
                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">
                                <div class="row">
                                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div class="col-lg-6">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form class="user" onSubmit={authenticateUser}>
                                                <div class="form-group">
                                                    <input type="text" class="form-control form-control-user"
                                                        id="username" name="username" aria-describedby="username"
                                                        placeholder="User Name" defaultValue="Dev" />
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" class="form-control form-control-user"
                                                        id="password" name="password" placeholder="Password" defaultValue="TUPLES" />
                                                </div>
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox small">
                                                        <input type="checkbox" class="custom-control-input" id="customCheck" />
                                                        <label class="custom-control-label" for="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                {
                                                    authenticated === mutations.NOT_AUTHENTICATED 
                                                    ? <p class="text-danger">Something went wrong.</p> 
                                                    : null
                                                }
                                                <button type="submit" class="btn btn-primary btn-user btn-block">
                                                    Login
                                                </button>
                                                <hr />
                                                <a href="index.html" class="btn btn-google btn-user btn-block">
                                                    <i class="fab fa-google fa-fw"></i> Login with Google
                                                </a>
                                                <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                                    <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                </a>
                                            </form>
                                            <hr />
                                            <div class="text-center">
                                                <a class="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div class="text-center">
                                                <a class="small" href="register.html">Create an Account!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    authenticated: session.authenticated
});

const mapDispatchToProps = dispatch => ({
    authenticateUser(e) {
        e.preventDefault();
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        dispatch(mutations.requestAuthenticateUser(username, password));
    }
})

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
