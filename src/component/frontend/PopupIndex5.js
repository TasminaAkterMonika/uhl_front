import React, { Component } from 'react';
import {API_TOKEN_NAME, DOCTOR_NAME, DOCTOR_FEES, PATIENT_NAME, SEARCH_SELECTED_DOC_ID, LOGIN_PHONE_NUMBER, USER_ID,} from '../../constants';
import { scAxiosAdmin } from '../..';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import pay_img from '../../images/pay-img.png';
import $ from 'jquery';

const submitPayment = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/payment/pay-via-ajax', {
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
const getUserPaymentDetails = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/payment/getuserpaymentdetails', {
      method: 'get',
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
class PopupIndex5 extends Component {
  state = {
    payment_type:'',
    privacy_policy:'',
    term_conditions:'',
    registration_fees:'',
  }
  handleChange = event =>{
    this.setState({
        [event.target.name]: event.target.value,
    });
    var payment_type_val = $("input[name='payment_type']:checked").val();
    var privacy_policy_val = $("input[name='privacy_policy']:checked").val();
    var term_conditions_val = $("input[name='term_conditions']:checked").val();
    if(payment_type_val && privacy_policy_val && term_conditions_val){
      if(payment_type_val === 'pay_online'){
        $(".pay-now").html('Pay Now and Confirm');
      } else {
        $(".pay-now").html('Book Appointment');
      }
      document.getElementById("sslczPayBtn").disabled = false;
      document.getElementById("sslczPayBtn").style.background = "#fb6201";
    } else {
      document.getElementById("sslczPayBtn").disabled = true;
      document.getElementById("sslczPayBtn").style.background = "#41414b";
      $(".pay-now").html('Pay Now');
    }
  }
  handleSubmit = (event, props) => {
    event.preventDefault();
    window.location.href = '/success';
    /*event.preventDefault();
    let registration_fees = '';
    if(this.state.registration_fees == 0){
      registration_fees = 200;
    } else {
      registration_fees = 0;
    }
    
    let total_price = (parseFloat(localStorage.getItem(DOCTOR_FEES)) + parseFloat(registration_fees));
    let final_total_price = total_price.toFixed(2);
    const data = {
      doctor_id: localStorage.getItem(SEARCH_SELECTED_DOC_ID),
      doctor_name: localStorage.getItem(DOCTOR_NAME),
      doctor_fees: localStorage.getItem(DOCTOR_FEES),
      total_price: final_total_price,
      registration_fees: registration_fees,
      patient_id: localStorage.getItem(USER_ID),
      patient_name: localStorage.getItem(PATIENT_NAME),
      phone_number: localStorage.getItem(LOGIN_PHONE_NUMBER),
    }
    submitPayment(data)
    .then(res => {
      if(res.status === 'success'){
        window.location.href = res.data;
      } else {
        toast.error('Something went wrong.Please try again!', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    })
    .catch(err => {
      toast.error('Something went wrong.Please try again!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });*/
  }
  refreshGetUserPaymentDetails = () => {
    const data = {
      patient_id : localStorage.getItem(USER_ID)
    }
    getUserPaymentDetails(data)
    .then(res => {
      if(res.status === true){
        var records = res.data;
        this.setState({
          registration_fees: records.registration_fees,
        })
      }
    })
    .catch(err => {
      toast.error('Doctor profile data not found', {
        position: toast.POSITION.BOTTOM_RIGHT
         });
    });
  }
  closePopup = event => {
    $(".payment_popup").css('visibility', 'hidden');
    $(".payment_popup").removeClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
  }
  componentDidMount(){
    this.refreshGetUserPaymentDetails();
  }
  render() {
    var doctor_fees = localStorage.getItem(DOCTOR_FEES);
    let registration_fees = '';
    if(this.state.registration_fees == 0){
      registration_fees = 200;
    } else {
      registration_fees = 0;
    }
    let total_price = (parseFloat(doctor_fees) + parseFloat(registration_fees));
    let final_total_price = total_price.toFixed(2);
    return(
      <div className="offcanvas offcanvas-start show payment_popup" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel"> </h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={this.closePopup} />
        </div>
        <div className="offcanvas-body">
          <div className="row text-center" id="logos">
            <div className="col-4">
              <img src={uhlcare_logo} alt="uhlcare-logo" />
            </div>
            <div className="col-4">
              <img src={uhl_logo} alt="uhl-logo" />
            </div>
            <div className="col-4">
              <img src={medix_logo} alt="medix-logo" />
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="left-offcanvas">
              <h4 className="mt-3">Payment</h4>
              <div className="payment mt-5"> 
                <div className="row">
                  <div className="col-8">
                    <p>Consultation Fees with {localStorage.getItem(DOCTOR_NAME)}</p>
                  </div>
                  <div className="col-4">
                    <p>BDT {localStorage.getItem(DOCTOR_FEES)}</p>
                  </div>
                </div>
                { this.state.registration_fees == 0 
                  ? 
                    <div className="row">
                      <div className="col-8">
                        <p>Registration Fees</p>
                      </div>
                      <div className="col-4">
                        <p>BDT 200.00</p>
                      </div>
                    </div>
                  :
                    ''
                }
                <div className="row mt-3">
                  <div className="col-8">
                    <p className="color-drak">Total</p>
                  </div>
                  <div className="col-4">
                    <p className="color-drak">BDT {final_total_price}</p>
                  </div>
                </div>
                <div className="row  mb-3">
                  <div className="col-6">
                    <input type="radio" id="payment_type" name="payment_type" className="radio-btn" value="pay_online" onChange={this.handleChange} />
                    <label htmlFor="html"> Pay Online</label>  
                  </div>
                  <div className="col-6">
                    <input type="radio" id="payment_type" name="payment_type" className="radio-btn" value="pay_uhl" onChange={this.handleChange}  />
                    <label htmlFor="css"> Pay at UHL</label> 
                  </div>
                </div>
              </div>  
              <div className="row mt-3"> 
                <div className="col-12">
                  <label className="label-text"><input type="checkbox" name="privacy_policy" id="privacy_policy" value="privacy_policy" onChange={this.handleChange} /> I agree with the Privacy Policy </label><br /> 
                  <label className="label-text"><input type="checkbox" name="term_conditions" id="term_conditions" value="term_conditions" onChange={this.handleChange} /> I agree with the Terms &amp; Conditions</label>
                  <br /> <br /> 
                  <button className="btn-links pay-now appointment-new" id="sslczPayBtn"
                        token="if you have any token validation"
                        postdata="your javascript arrays or objects which requires in backend"
                        order="If you already have the transaction generated for current order"
                        endpoint={this.handleSubmit} disabled> Pay Now
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <img src={pay_img} alt="pay-img" />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  } 
}
export default PopupIndex5;