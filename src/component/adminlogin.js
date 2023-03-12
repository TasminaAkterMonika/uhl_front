import React, { Component } from 'react';
import { API_TOKEN_NAME, USER_ID, LOGIN_PAGE_PATH} from '../constants';
import { Redirect } from 'react-router-dom';
import { scAxiosAdmin } from '../';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateUserToken } from '../PrivateRoute';
import { startUserSession } from '../userSession';
import logo from '../images/logo2.png';
const loginUser = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request(LOGIN_PAGE_PATH, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
            },
            params: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
}
const activateaccount = (url) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request(url, {
            method: 'post',
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
}
const alertStyle = {
  color: 'red',
};

class AdminLogin extends Component {
    state = {
        user_email: '',
        user_password: '',
        remember_me: false,
        enableLoginBtn: false,
        signin_success: false,
        user_active: false,
        fields: {},
        errors: {},
    };
    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["user_email"]) {
            formIsValid = false;
            errors["user_email"] = "*Please enter your email.";
        }

        if (!fields["user_password"]) {
            formIsValid = false;
            errors["user_password"] = "*Please enter password";
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    }
    handleChange = event => {
        this.setState({ errors:''});
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
            fields
        }, () => this.validateForm());
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["user_email"] = "";
            fields["user_password"] = "";
            this.setState({ fields: fields });
            const user = {
                email: this.state.fields.user_email,
                password: this.state.fields.user_password,
            }
            loginUser(user)
            .then(res => {
                if (!!res.token) {
                    startUserSession(res.token, res.data.role, res.data.id, res.data.email, res.data.isapproved);
                    this.setState({ signin_success: true, user_active: res.data.status === false ? false : true });
                    this.props.actions.userLoginSuccess(res.data);
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            })
             .catch(err => {
            //     toast.error('Error occured', {
            //         position: toast.POSITION.BOTTOM_RIGHT
            //     });
             });
        } else {
            toast.error('Please provide email and password !', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }
    componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search);
        var active_code = urlParams.get('active_code');
        var CHK_USER_ID = localStorage.getItem(USER_ID);
        if(active_code){
            var url = '/account/activation/'+active_code;
            activateaccount(url, active_code)
            .then(res => {
                if (res.status===true) {
                    toast.success(res.message, {
                      position: toast.POSITION.BOTTOM_RIGHT
                    });
                    if(CHK_USER_ID===null) {
                      window.location.href = '/adminlogin';
                    } else {
                      this.setState({
                        signin_success: true,
                      });
                    }
                } else {
                    toast.error(res.message, {
                      position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/admindashboard" } };
        if (validateUserToken()) {
            if (!this.state.signin_success)
                return <Redirect to="/adminlogin" />
            return <Redirect to={from} />
        }
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
                                            <h4 className="font-size-18 text-muted mt-2 text-center">Welcome Back !</h4>
                                            <p className="text-muted text-center mb-4">Sign in to continue to United Hospital Admin.</p>
                                            <form className="form-horizontal" onSubmit={this.handleSubmit} id="adminloginform" novalidate>
                                                <div className="form-group">
                                                    <label for="user_email">Email</label>
                                                    <input type="text" className="form-control" name="user_email" id="user_email" value={this.state.fields.user_email} onChange={this.handleChange} placeholder="Enter email" required="" autocomplete="off"/>
                                                    <span style={alertStyle}>{this.state.errors.user_email}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label for="user_password">Password</label>
                                                    <input type="password" className="form-control" name="user_password" id="user_password" value={this.state.fields.user_password} onChange={this.handleChange} placeholder="Enter password" required="" autocomplete="off"/>
                                                    <span style={alertStyle}>{this.state.errors.user_password}</span>
                                                </div>
                                                <div className="form-group row mt-4">
                                                    {/*<div className="col-sm-6">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="customControlInline"/>
                                                            <label className="custom-control-label" for="customControlInline">Remember me</label>
                                                        </div>
                                                    </div>*/}
                                                    <div className="col-sm-12 text-right">
                                                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                                                    </div>
                                                </div>
                                                <div className="form-group mb-0 row">
                                                    <div className="col-12 mt-4">
                                                        <a href="pages-recoverpw.html" className="text-muted"><i className="mdi mdi-lock"></i> Forgot your password?</a>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <p>Don't have an account ? <a href="/adminregister" className="font-weight-bold text-primary"> Signup Now </a> </p>
                                    <p>© 2022 United Hospital</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={5000} /> 
            </div>
        );
    }
}
export default AdminLogin;