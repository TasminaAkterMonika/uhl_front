import React, { Component } from 'react';
import {Route} from 'react-router-dom';
//import { Link } from 'react-router-dom'
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
//import * as userActions from '../actions/userActions';
import { scAxios } from '../';
import { API_TOKEN_NAME } from '../constants';
import { validateUserToken } from '../PrivateRoute';
import { startUserSession } from '../userSession';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../component/frontend/Header.js';
import Footer from '../component/frontend/Footer.js';
const userregister = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxios.request('/register', {
            method: 'post',
            params: {
                ...data
            }

        });

        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
}
const getUserRoles = () => {
    return new Promise((resolve, reject) => {
        const req = scAxios.request('/user/role', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
            }
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
}

const alertStyle = {
  color: 'red',
};

/*const textStyle = {
  textTransform: 'capitalize',
};*/


class register extends Component {
  state = {
        fields: {},
        errors: {},
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        confirm_password:'',
        forwarduId: '',
      //termchk:'',
        Loading:false,
        user_active: false,
        signin_success: false,
        signup_success:false,
        user_role: '',
        roles:[],
    }

handleChange = event => {
        this.setState({ errors:''});
        this.setState({
            [event.target.name]: event.target.value
        });
    }

/*handleCheckBoxChange = event => {
    if (event.target.checked) {
       this.setState({ termchk: true});
    } else {
      this.setState({ termchk: ''});
    }
 }*/ 

validateForm() {
      //let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
      
      if (!this.state.firstname) {
        formIsValid = false;
        errors["firstname"] = "*Please enter first name.";
      }

      if (typeof this.state.firstname !== "undefined") {
        if (!this.state.firstname.match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["firstname"] = "*Please enter alphabets characters only.";
        }
      }

      if (!this.state.lastname) {
        formIsValid = false;
        errors["lastname"] = "*Please enter last name.";
      }

      if (typeof this.state.lastname !== "undefined") {
        if (!this.state.lastname.match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["lastname"] = "*Please enter alphabets characters only.";
        }
      }

      if (!this.state.email) {
        formIsValid = false;
        errors["email"] = "*Please enter email address.";
      }

      if (typeof this.state.email !== "undefined") {
        //eslint-disable-next-line
        if (!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
          formIsValid = false;
          errors["email"] = "*Please enter a valid email address";
        }
      }

      if (!this.state.password) {
        formIsValid = false;
        errors["password"] = "*Please enter password.";
      }

      if (typeof this.state.password !== "undefined") {
        if (this.state.password.length < 6) {
          formIsValid = false;
          errors["password"] = "*password must be at least 6 characters long.";
        }
      }

      if (!this.state.confirm_password) {
        formIsValid = false;
        errors["confirm_password"] = "*Please enter confirm password.";
      }

      if(this.state.confirm_password !== this.state.password){
          formIsValid = false;
          errors["confirm_password"] = "*Password and confirm password must be same";
      }

      if (!this.state.user_role) {
        formIsValid = false;
        errors["user_role"] = "*Please select your user role.";
      }

      /*if (!this.state.termchk) {
        formIsValid = false;
        errors["termchk"] = "*Please check terms and condition.";
      }*/

      this.setState({
        errors: errors
      });
      return formIsValid;

    }
  handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()) {
          this.setState({ Loading: true });
          const data = {
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              email: this.state.email,
              role: this.state.user_role,
              password: this.state.password,
          }
          userregister(data)
          .then(res => {
            if (res.status===true) {
              if (!!res.token) {
                startUserSession(res.token, res.data.role, res.data.id, res.data.email, res.data.isapproved, res.data.reg_step_1, res.data.reg_step_2, res.data.reg_step_3, res.data.reg_step_4);
                this.setState({ signin_success: true, user_active: res.data.status === 0 ? false : true });
                this.props.actions.userLoginSuccess(res.data);
              } else {
                toast.error(res.message, {
                  position: toast.POSITION.BOTTOM_RIGHT
                });
              }   
              toast.success(res.message, {
                autoClose:10000,
                position: toast.POSITION.BOTTOM_RIGHT
              });
              this.setState({ firstname:'', lastname:'', email:'', password:'', confirm_password:'' });
              this.setState({ forwarduId: res.data.id,signup_success: true});
            } else {
              toast.error(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT
              });
            }
            this.setState({ Loading: false });
          })
          .catch(err => {
              console.log(err);
          });
        } else {
          toast.error('Please Fill All Mandatory Fields.', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }    
    }
  refreshUserRoles = () => {
    getUserRoles()
    .then(res => {
      if(res.status===true){
        var records = res.data;
        this.setState({ roles: records });
      } else {
        this.setState({ roles: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  componentDidMount() {
    this.refreshUserRoles();
  } 
  render(){
    const {Loading} = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
    if (validateUserToken()) {
      if (!this.state.signin_success)
        return <Redirect to="/login" />
      return <Redirect to={from} />
    }
    return (
      <div>
        <Route component={Header} />
        <div className="container">
          <div className="row starbuck_row">
            <div className="col-md-12">
              <h6 className="heading_col font_16">Register Now</h6>
              <p className="txt_col fontweight500 font_12 mb-4">Create your account and enjoy</p>
              <form onSubmit={this.handleSubmit} id="regform" className="needs-validation" noValidate>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                     <input type="text" className="form-control input_custom_style" name="firstname" id="firstname" value={this.state.firstname} onChange={this.handleChange} placeholder="First name" required="" />
                     <span style={alertStyle}>{this.state.errors.firstname}</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input type="text" className="form-control input_custom_style" name="lastname" id="lastname" value={this.state.lastname} onChange={this.handleChange} placeholder="Last name" required=""  />
                      <span style={alertStyle}>{this.state.errors.lastname}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                    <input type="text" className="form-control input_custom_style" name="email" id="email" value={this.state.email} onChange={this.handleChange}  placeholder="Business email" required="" autoComplete="off"/>
                    <span style={alertStyle}>{this.state.errors.email}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <select className="form-control" id="user_role" value={this.state.user_role} onChange={this.handleChange} name="user_role">
                        <option>Select your role</option>
                        {
                          this.state.roles.length > 0
                          ?  
                            this.state.roles.map(role => {
                              return <option key={role.id} value={role.id}>{role.title}</option>
                            })
                          :
                            <option>No role found</option>
                        } 
                      </select>
                      <span style={alertStyle}>{this.state.errors.user_role}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                    <input type="password" className="form-control input_custom_style" name="password" id="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" required="" autoComplete="off"/>
                    <span style={alertStyle}>{this.state.errors.password}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                    <input type="password" className="form-control input_custom_style" name="confirm_password" id="confirm_password" value={this.state.confirm_password} onChange={this.handleChange} placeholder="Confirm Password" required=""  />
                    <span style={alertStyle}>{this.state.errors.confirm_password}</span>
                    </div>
                  </div>
                </div>
                <button type="submit" className="blue_btn mt-3" disabled={Loading}> {Loading && <i className="fa fa-refresh fa-spin"></i>} Signup Now </button>
              </form>
              <p className="aggre_term_condition_text txt_col fontweight500 font_12 mt-3">By signing up, you agree to our <a href="/terms" className="blue_anchor_col">Terms of Service</a>, <a href="/privacypolicy" className="blue_anchor_col"> Privacy Policy </a> and to receive Untited Hospital emails & updates.</p>
              <p className="signing_link_text txt_col fontweight500 font_12"> <a href="/login" className="blue_anchor_col">Already have an account? Sign In</a></p>
            </div>
          </div>
        </div>
        <Route component={Footer} />
        <ToastContainer autoClose={5000} /> 
      </div>
    );
  }
}
export default register;
