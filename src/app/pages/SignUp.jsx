import React, { useEffect } from 'react'
import useScript from '../hooks/useScript'
import useStyle from '../hooks/useStyle'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'

function SignUp ({ groups, test }) {
    useStyle('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
    useStyle('/assets_admin/vendor/fontawesome-free/css/all.min.css');
    useStyle('/assets_admin/css/sb-admin-2.min.css');
    useScript('/assets_admin/vendor/jquery/jquery.min.js');
    useScript('/assets_admin/vendor/bootstrap/js/bootstrap.bundle.min.js');
    useScript('/assets_admin/vendor/jquery-easing/jquery.easing.min.js');
    useScript('/assets_admin/js/sb-admin-2.min.js');
    return (
        <div class="bg-gradient-primary">
            <div class="container py-5">
                <div class="card o-hidden border-0 shadow-lg">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div class="col-lg-7">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group row">
                                            <div class="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                                    placeholder="First Name"/>
                                            </div>
                                            <div class="col-sm-6">
                                                <input type="text" class="form-control form-control-user" id="exampleLastName"
                                                    placeholder="Last Name"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                                placeholder="Email Address"/>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-6 mb-3 mb-sm-0">
                                                <input type="password" class="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password"/>
                                            </div>
                                            <div class="col-sm-6">
                                                <input type="password" class="form-control form-control-user"
                                                    id="exampleRepeatPassword" placeholder="Repeat Password"/>
                                            </div>
                                        </div>
                                        <a href="login.html" class="btn btn-primary btn-user btn-block">
                                            Register Account
                                        </a>
                                        <hr/>
                                        <a href="index.html" class="btn btn-google btn-user btn-block">
                                            <i class="fab fa-google fa-fw"></i> Register with Google
                                        </a>
                                        <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                            <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                        </a>
                                    </form>
                                    <hr/>
                                    <div class="text-center">
                                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="login.html">Already have an account? Login!</a>
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

const mapStateToProps = ({groups})=>({groups});

const mapDispatchToProps = dispatch => ({
    test() {
        dispatch(mutations.test())
    }
})

export const ConnectedSignUp = connect(mapStateToProps, mapDispatchToProps)(SignUp);
