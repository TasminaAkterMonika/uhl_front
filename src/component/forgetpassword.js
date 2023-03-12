import React from 'react';
import {Route} from 'react-router-dom';
import { scAxios } from '../';
import { API_TOKEN_NAME } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../component/frontend/Header.js';
import Footer from '../component/frontend/Footer.js';
//import Modal from './CustomReviewsListModal';
//import headervideo from '../images/reviewpro/NewEditReviewsPro.mp4';

const forgetpasswordUser = (data) => {
  return new Promise((resolve, reject) => {
      const req = scAxios.request('/forgetpassword', {
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

class forgetpassword extends React.Component {
  state = {
    email: '',
    enableLoginBtn: false,
    user_active: false,
    fields: {},
    errors: {},
    modal:false,
  };
  modalOpen() {
    this.setState({ modal: true });
    document.getElementById('demoVideo').autoplay = true;
    document.getElementById('demoVideo').load();
  }
  modalClose() {
    this.setState({ modal: false });
    document.getElementById('demoVideo').pause();
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
      fields["email"] = "";
      this.setState({ fields: fields });
      const data = {
        email: this.state.fields.email
      }
      forgetpasswordUser(data)
      .then(res => {
        if (res.status===true) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        } else {
          toast.error(res.message, {
              position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      })
      .catch(err => {
        toast.error('Error occured', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
      });
    } else {
      toast.error('Please provide Email', {
          position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  } 
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }
    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
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
              {/*<h1 className="fontweight500 heading_col font_32">5 Star Reviews Makes It Easy For You To Get More 5 Star Online Reviews</h1>
              <p className="font_16 heading_col fontweight500 width_435">Do you want to increase your sales? Get more 5 star online reviews for your business. More positive online reviews means more customers and increased sales.</p>
              <a href="#" className="blue_small_btn" onClick={(e) => this.modalOpen()}><i className="fa fa-youtube-play youtube_icon pr-2" aria-hidden="true"></i>Click to Watch Signup Video</a>*/}
            </div>  
            {/*<Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
              <div className="custom_reviews_popup">
                <video id="demoVideo" width="100%" controls autoplay="autoplay" className="video_sec">
                  <source src={headervideo} type="video/mp4" />
                </video>
              </div>
            </Modal>*/}
            <div className="col-md-6">
              <h6 className="heading_col font_16">Forgot Password</h6>
              <p className="txt_col fontweight500 font_12 mb-4">Recover your account password here</p>
              <form onSubmit={this.handleSubmit} id="forgotpwdform" className="needs-validation" novalidate>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <input type="text" class="form-control input_custom_style" name="email" id="email" value={this.state.fields.email} onChange={this.handleChange} placeholder="Email" required="" autocomplete="off"/>
                      <span style={alertStyle}>{this.state.errors.email}</span> 
                    </div>
                  </div>
                </div>
                <button type="submit" className="blue_btn mt-3"> Reset </button>
              </form>
              <p className="txt_col fontweight500 font_12 mt-3"> <a href="/login" className="blue_anchor_col">Already have an account? Sign In</a> <a href="/signup" className="blue_anchor_col ml-5">Don't have an account? Sign Up</a></p>
            </div>
          </div>
        </div>
        <Route component={Footer} />
        <ToastContainer autoClose={5000} /> 
      </div>
    );
  }
}

export default forgetpassword;