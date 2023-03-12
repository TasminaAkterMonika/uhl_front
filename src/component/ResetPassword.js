import React from 'react';
import {Route} from 'react-router-dom';
import { scAxios } from '../';
import { API_TOKEN_NAME } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../component/frontend/Header.js';
import Footer from '../component/frontend/Footer.js';
import registerLogo from '../images/reviewpro/register_logo.png';
//import Modal from './CustomReviewsListModal';

const ResetPasswordUser = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxios.request('/resetpassword', {
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

const alertStyle = {
  color: 'red',
};



class ResetPassword extends React.Component {

  state = {
        email: '',
        password: '',
        confirm_password: '',
        token: '',
        isResetSuccess: false,
        fields: {},
        errors: {},  
        modal:false,  
  };

handleChange = event => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
            fields
        }, () => this.validateForm());
}
modalOpen() {
  this.setState({ modal: true });
}
modalClose() {
  this.setState({ modal: false });
}
handleSubmit = event => {
  event.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["password"] = "";
          fields["confirm_password"] = "";
          this.setState({ fields: fields });
          const urlParams = new URLSearchParams(this.props.location.search);
          var email = urlParams.get('email');
          const data = {
              password: this.state.fields.password,
              confirm_password: this.state.fields.confirm_password,
              email: email,
          }
          ResetPasswordUser(data)
              .then(res => {
                  if (res.status===true) {
                    toast.success(res.message, {
                      position: toast.POSITION.BOTTOM_RIGHT
                    });
                    window.location = '/login';
                  }
                  else {
                      toast.error(res.errorMsg, {
                          position: toast.POSITION.BOTTOM_RIGHT
                      });
                  }
              })
              .catch(err => {
                  toast.error('Error occured', {
                      position: toast.POSITION.BOTTOM_RIGHT
                  });
              });
      }
      else {
          toast.error('Please fill your details.', {
              position: toast.POSITION.BOTTOM_RIGHT
          });
      }
} 

validateForm() {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Please enter your Password.";
      }

      if (!fields["confirm_password"]) {
          formIsValid = false;
          errors["confirm_password"] = "*Please enter your Confirm Password.";
      }

      if (fields["password"] !== fields["confirm_password"]) {
              formIsValid = false;
              errors["email"] = "Password is not matched";
      }

      this.setState({
          errors: errors
      });
      return formIsValid;

  }
    render(){
        return (
         
      <div>

      <Route component={Header} />

      <div className="container ">
        <div className="row starbuck_row">
          <div className="col-md-6">
            {/*<h1 className="fontweight500 heading_col font_32">Try ReviewProSolutions for 30 days</h1>
            <p className="font_16 heading_col fontweight500 width_435">Create an account to try ReviewProSolutions today. If you’re not completely satisfied with our review platform, cancel anytime no questions asked.</p>
            <ul className="instruction width_435">
              <li> For small to large businesses that understand the value of a good reputation online</li>
              <li>Naturally and effectively grow your online reviews for your business</li>
              <li>Whether you are 4.9 stars or 1.5 stars, ReviewProSolutions is a must have tool to stay competitive in the marketplace.</li>
            </ul>
          <a href="javascript(0);" className="blue_small_btn" onClick={(e) => this.modalOpen()}><i className="fa fa-youtube-play youtube_icon pr-2" aria-hidden="true"></i>Click to Watch Signup Video</a>*/}
          </div>
          {/*<Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
            <div className="custom_reviews_popup">
              <h2 className="text-center">Are you sure you wish to delete this Review ?</h2>
            </div>
          </Modal>*/}
          <div className="col-md-6">
            <img src={registerLogo} alt="" className="mb-4" />
            <h6 className="heading_col font_16">Reset password</h6>
            <p className="txt_col fontweight500 font_12 mb-4">Reset your account password here</p>
    
            <form onSubmit={this.handleSubmit} id="resetpwdform" className="needs-validation" novalidate>
              
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                  <input type="password" className="form-control input_custom_style" name="password" id="password" value={this.state.fields.password} onChange={this.handleChange} placeholder="Password" required="" />
                  <span style={alertStyle}>{this.state.errors.password}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                  <input type="password" className="form-control input_custom_style" name="confirm_password" id="confirm_password" value={this.state.fields.confirm_password} onChange={this.handleChange} placeholder="Confirm Password" required=""  />
                  <span style={alertStyle}>{this.state.errors.confirm_password}</span>
                  </div>
                </div>
              </div>
              <button type="submit" className="blue_btn mt-5"> Reset </button>
            </form>
            <p className="txt_col fontweight500 font_12"> <a href="/login" className="blue_anchor_col">Login</a></p>
          </div>
        </div>
      </div>

      <Route component={Footer} />
    
     <ToastContainer autoClose={5000} /> 
     
  </div>
  
        );
    }

}



export default ResetPassword;