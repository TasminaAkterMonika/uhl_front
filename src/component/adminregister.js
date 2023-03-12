import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../constants';
//import {Route} from 'react-router-dom';
//import { scAxios } from '../';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/logo2.png';
class AdminLogin extends Component {
    render() {
        return (
            <div className="account-bg">
                <div className="account-pages my-5 pt-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="text-center mt-4">
                                            <div className="mb-3">
                                                <a href="index.html"><img src={logo} height={80} alt="logo"/></a>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-size-18 text-muted mt-2 mb-4 text-center">Register</h4>
                                            {/*<p className="text-muted text-center mb-4">Get your free fonik account now.</p>*/}
                                            <form className="form-horizontal" action="index.html">
                                                <div className="form-group">
                                                    <label for="useremail">Email</label>
                                                    <input type="email" className="form-control" id="useremail" placeholder="Enter email"/>
                                                </div>

                                                <div className="form-group">
                                                    <label for="username">Username</label>
                                                    <input type="text" className="form-control" id="username" placeholder="Enter username"/>
                                                </div>

                                                <div className="form-group">
                                                    <label for="userpassword">Password</label>
                                                    <input type="password" className="form-control" id="userpassword" placeholder="Enter password"/>
                                                </div>

                                                <div className="form-group row mt-4">
                                                    <div className="col-12 text-right">
                                                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Register</button>
                                                    </div>
                                                </div>
                                                <div className="form-group mt-4 mb-0 row">
                                                    <div className="col-12">
                                                        <p className="text-muted mb-0">By registering you agree to the Fonik <a href="#">Terms of Use</a></p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <p>Already have an account ? <a href="/adminlogin" className="font-weight-bold text-primary"> Login </a> </p>
                                    <p>© 2022 United Hospital.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AdminLogin;