import React, { Component } from 'react';
import {Route} from 'react-router-dom';
//import { Link } from 'react-router-dom'
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
//import * as userActions from '../actions/userActions';
import { scAxios } from '../';
import { API_TOKEN_NAME, USER_ID, LOGIN_PAGE_PATH, ADMIN_URL} from '../constants';
import { validateUserToken } from '../PrivateRoute';
import { startUserSession } from '../userSession';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../component/frontend/Header.js';
import Footer from '../component/frontend/Footer.js';

const loginUser = (data) => {
    return new Promise((resolve, reject) => {

        const req = scAxios.request(LOGIN_PAGE_PATH, {
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
        const req = scAxios.request(url, {
            method: 'post',
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
}

const alertStyle = {
  color: 'red',
};

class Login extends Component {
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
                        startUserSession(res.token, res.data.role, res.data.id, res.data.email, res.data.isapproved, res.data.reg_step_1, res.data.reg_step_2, res.data.reg_step_3, res.data.reg_step_4);
                        this.setState({ signin_success: true, user_active: res.data.status === 0 ? false : true });
                        this.props.actions.userLoginSuccess(res.data);
                    /*} else if (res.data=='admin_user') {
                        var modal = document.getElementById("myModal");
                        var span = document.getElementsByClassName("close")[0];
                        modal.style.display = "block";
                        span.onclick = function() {
                            modal.style.display = "none";
                        }
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }*/
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
        }
        else
            toast.error('Please provide email and password !', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
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
                  window.location.href = '/login';
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

    render(){
        
        const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };

        if (validateUserToken()) {
            if (!this.state.signin_success)
                return <Redirect to="/login" />
            return <Redirect to={from} />
        }

  return (
         
      <div>
      
      <Route component={Header} />

      <div className="container ">
        <div className="row starbuck_row">
          <div className="col-md-6">
           
            <h6 className="heading_col font_16">Login</h6>
            <p className="txt_col fontweight500 font_12 mb-4">Login into your account here</p>
    
            <form onSubmit={this.handleSubmit} id="loginform" className="needs-validation" novalidate>

              <div className="row">
                <div className="col-sm-12">
                <div className="form-group">
                <input type="text" className="form-control input_custom_style" name="user_email" id="user_email" value={this.state.fields.user_email} onChange={this.handleChange} placeholder="Email" required="" autocomplete="off"/>
                <span style={alertStyle}>{this.state.errors.user_email}</span> 
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                  <input type="password" className="form-control input_custom_style" name="user_password" value={this.state.fields.user_password} onChange={this.handleChange} placeholder="Password" required="" autocomplete="off"/>
                  <span style={alertStyle}>{this.state.errors.user_password}</span>  
                  </div>
                </div>
              </div>
              <button type="submit" className="blue_btn mt-3"> Login </button>
            </form>

            <p className="txt_col fontweight500 font_12 mt-3 login_signup_text"> <p className="signup_link"><a href="/signup" className="blue_anchor_col">Don't have an account? Sign Up</a></p> <p className="forgot_pass_link"><a href="/forgetpassword" className="blue_anchor_col ml-5 forgot_pass_text">Forgot Password?</a></p></p>

          </div>
           {/*<div className="col-md-6 left-side">
            <h1 className="fontweight500 heading_col font_32">United Hospitals Makes It Easy For You To Get More 5 Star Online Reviews</h1>
            <p className="font_16 heading_col fontweight500 width_435">Do you want to increase your sales? Get more 5 star online reviews for your business. More positive online reviews means more customers and increased sales.</p>
          </div>*/}
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
              <p className="popup_content_sec">This is the credential of Admin user, if you want to login as admin click on below button.</p>
              <div className="admin_btn_link"><a className="admin_btn cookieConsentOK1" href={ADMIN_URL} target="_blank"> Click Here </a></div>
            </div>
          </div> 
        </div>
      </div>

      <Route component={Footer} />
  
     <ToastContainer autoClose={5000} /> 
     
  </div>

        );
    }

}



export default Login;