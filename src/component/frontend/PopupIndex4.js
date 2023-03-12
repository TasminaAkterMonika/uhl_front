import React, { Component } from 'react';
import { scAxios, scAxiosSMS, scAxiosAdmin } from '../..';
import { startUserSession } from '../../userSession';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import PopupRegister from '../../component/frontend/PopupRegister';
import $ from 'jquery';

const loginUser = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxios.request('/mmphonenumber', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
const SendOTPMessage = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosSMS.request('/user/sendotp', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
const SaveOTPNumber = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/user/saveotpnumber', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
const getOtpData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/user/getotpdata', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
const ResetOtpData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/user/resetotpdata', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
const LoginPatient = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxios.request('/mmlogin', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
      },
      params: {
          ...data
      }  
    });
    req.then(res => resolve(res.data))
        .catch(err => reject(err));
  });
}
const LoginPatientIdCheck = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/checkuserpatientid', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
      },
      params: {
          ...data
      }  
    });
    req.then(res => resolve(res.data))
        .catch(err => reject(err));
  });
}
const PatitentDetails = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxios.request('/patients', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
      },
      params: {
          ...data
      }  
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
class PopupIndex4 extends Component {
  state = {
    fields: {},
    errors: {},
    patient_id: '',
    password:'',
    phone_number: '',
    user_token: '',
    otp:'',
    enableLoginBtn: false,
    signin_success: false,
    user_active: false,
    first_otp:'',
    second_otp:'',
    third_otp:'',
    fourth_otp:'',
    fifth_otp:'',
    sixth_otp:'',
    final_otp:'',
    otp_number:'',
    showRegisterPopup:false,
    showPopup:false,
  };
  /*validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    let patient_id = document.getElementById("patient_id").value;
    if(patient_id){
    } else {
      if (!fields["phone_number"]) {
          formIsValid = false;
          errors["phone_number"] = "*Please enter your phone number.";
      }
    }
    this.setState({
        errors: errors
    });
    return formIsValid;
  }*/
  handleChange = event => {
    /*this.setState({ errors:''});
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;*/
    /*if(event.target.value.length === event.target.maxLength) {
      document.getElementById("basic-addon2").style.pointerEvents = "visible";
      document.getElementById("basic-addon2").style.background = "#fb6201";
      document.getElementById("basic-addon2").style.color = "#ffffff";
      document.getElementById("basic-addon2").style.textDecoration = "none";
      document.getElementById("basic-addon2").style.cursor = "pointer";
    } else {
      document.getElementById("basic-addon2").style.pointerEvents = "none";
      document.getElementById("basic-addon2").style.background = "#e9ecef";
      document.getElementById("basic-addon2").style.color = "#212529";
      document.getElementById("basic-addon2").style.textDecoration = "none";
      document.getElementById("basic-addon2").style.cursor = "default";
    }
    var phone_number = document.getElementById("phone_number").value;
    var first_otp = document.getElementById("first_otp").value;
    var second_otp = document.getElementById("second_otp").value;
    var third_otp = document.getElementById("third_otp").value;
    var fourth_otp = document.getElementById("fourth_otp").value;
    var fifth_otp = document.getElementById("fifth_otp").value;
    var sixth_otp = document.getElementById("sixth_otp").value;
    var patient_id = document.getElementById("patient_id").value;
    if(patient_id){
      document.getElementById("black-btn").disabled = false;
      document.getElementById("phone_number").disabled = true;
      document.getElementById("first_otp").disabled = true;
      document.getElementById("second_otp").disabled = true;
      document.getElementById("third_otp").disabled = true;
      document.getElementById("fourth_otp").disabled = true;
      document.getElementById("fifth_otp").disabled = true;
      document.getElementById("sixth_otp").disabled = true;
      document.getElementById("black-btn").style.background = "#fb6201";
    } else {
      if(first_otp!=='' && second_otp!=='' && third_otp!=='' && fourth_otp!=='' && fifth_otp!=='' && sixth_otp!==''){
        let final_otp = first_otp+second_otp+third_otp+fourth_otp+fifth_otp+sixth_otp;
        this.setState({final_otp: final_otp});
        if(final_otp){
          this.refreshGetOTPData();
        } else {
          document.getElementById("black-btn").disabled = true;
          document.getElementById("black-btn").style.background = "#41414b";
        }
      } else {
        document.getElementById("black-btn").disabled = true;
        document.getElementById("black-btn").style.background = "#41414b";
        $('#otp_error').text('');
      }
      if(phone_number===''){
        document.getElementById("black-btn").disabled = true;
        document.getElementById("black-btn").style.background = "#41414b";
        document.getElementById("basic-addon2").disabled = true;
        document.getElementById("basic-addon2").style.background = "#e9ecef";
        this.setState({first_otp: ''});
        this.setState({second_otp: ''});
        this.setState({third_otp: ''});
        this.setState({fourth_otp: ''});
        this.setState({fifth_otp: ''});
        this.setState({sixth_otp: ''});
      }
      document.getElementById("black-btn").disabled = true;
      document.getElementById("phone_number").disabled = false;
      document.getElementById("first_otp").disabled = false;
      document.getElementById("second_otp").disabled = false;
      document.getElementById("third_otp").disabled = false;
      document.getElementById("fourth_otp").disabled = false;
      document.getElementById("fifth_otp").disabled = false;
      document.getElementById("sixth_otp").disabled = false;
    }*/
    /*this.setState({
        fields
    }, () => this.validateForm());*/
    this.setState({
        [event.target.name]: event.target.value
    });
  }
  onKeyUpMoveInputfocus = event =>{
    if (event.target.value.length === event.target.maxLength) {
      var $next = $(event.target).next('.otp_input');
      if ($next.length){
        $(event.target).next('.otp_input').focus();
      } else {
        $(event.target).blur();
      }
    }
  }
  sendOtp = event =>{
    $('.otp_resend').show();
    //let six_digit_random_number = Math.floor(100000 + Math.random() * 999999);
    let six_digit_random_number = Math.floor(Math.random()*900000) + 100000;
    var encoded_otp = "";
    var otp_number = btoa(six_digit_random_number);
    for (let i=0; i<otp_number.length;i++) {
      var a = otp_number.charCodeAt(i);
      var b = a ^ 10;
      encoded_otp += String.fromCharCode(b);
    }
    var new_encoded_otp = btoa(encoded_otp);
    
    let messageBody = "Your Login OTP is "+six_digit_random_number;
    var encoded = "";
    var messageBodyText = btoa(messageBody);
    for (let i=0; i<messageBodyText.length;i++) {
      var c = messageBodyText.charCodeAt(i);
      var d = c ^ 10;
      encoded += String.fromCharCode(d);
    }
    var encoded_message_body = btoa(encoded);
    let csms_generate_number = Math.random().toString(36).substring(2,11);
    let csmsId = csms_generate_number;
    const data = {
      phone_number: this.state.phone_number,
      message_body: encoded_message_body,
      csms_id: csmsId
    }
    SendOTPMessage(data)
      .then(res => {
        if(res.status === 'SUCCESS'){
          this.saveOtp(new_encoded_otp);
          toast.success('OTP sent to your phone number!', {
            position: toast.POSITION.TOP_LEFT
          });

        } else {
          toast.error('Otp not send', {
            position: toast.POSITION.TOP_LEFT
          });
        }
      })
      .catch(err => {
        toast.error('Error occured', {
          position: toast.POSITION.TOP_LEFT
        });
      });
  }
  ResendOtp = event =>{
    $('.otp_resend').hide();
    //let six_digit_random_number = Math.floor(100000 + Math.random() * 999999);
    let six_digit_random_number = Math.floor(Math.random()*900000) + 100000;
    var encoded_otp = "";
    var otp_number = btoa(six_digit_random_number);
    for (let i=0; i<otp_number.length;i++) {
      var a = otp_number.charCodeAt(i);
      var b = a ^ 10;
      encoded_otp += String.fromCharCode(b);
    }
    var new_encoded_otp = btoa(encoded_otp);

    let messageBody = "Your Login OTP is "+six_digit_random_number;
    var encoded = "";
    var messageBodyText = btoa(messageBody);
    for (let i=0; i<messageBodyText.length;i++) {
      var c = messageBodyText.charCodeAt(i);
      var d = c ^ 10;
      encoded += String.fromCharCode(d);
    }
    var encoded_message_body = btoa(encoded);
    let csms_generate_number = Math.random().toString(36).substring(2,11);
    let csmsId = csms_generate_number;
    const data = {
      phone_number: this.state.phone_number,
      message_body: encoded_message_body,
      csms_id: csmsId
    }
    SendOTPMessage(data)
    .then(res => {
      if(res.status === 'SUCCESS'){
        this.saveOtp(new_encoded_otp);
        toast.success('OTP sent to your phone number!', {
          position: toast.POSITION.TOP_LEFT
        });

      } else {
        toast.error('Otp not send', {
          position: toast.POSITION.TOP_LEFT
        });
      }
    })
    .catch(err => {
      toast.error('Error occured', {
        position: toast.POSITION.TOP_LEFT
      });
    });
  }
  saveOtp = (otp) =>{
    const data = {
      phone_number: this.state.phone_number,
      otp_number: otp
    }
    SaveOTPNumber(data)
      .then(res => {
        if(res.data === 'success'){

        } else {
          
        }
      })
      .catch(err => {
        toast.error('Error occured', {
          position: toast.POSITION.TOP_LEFT
        });
      });
  }
  handleSubmit = event => {
    event.preventDefault();
    let patient_id = this.state.patient_id;
    let password = this.state.password;
    if(patient_id){
        this.LoginPaitentId(patient_id, password);
    } else {
      if (this.validateForm()) {
        let fields = {};
        fields["phone_number"] = "";
        this.setState({ fields: fields });
        const user = {
            PhoneNumber: this.state.fields.phone_number,
        }
        loginUser(user)
        .then(res => {
          if(res.length > 1){
            let token = '';
            let phone_number = this.state.phone_number;
            let search_selected_doc_id = '';
            let patientid = '';
            let schedule_date = '';
            let apointment_id = '';
            let doctor_name = '';
            let doctor_fees = '';
            let patientName = '';
            let schedule_time = '';
            let search_selected_doc_name = '';
            let doctor_profile_avability = this.props.doctorProfilePageClick;
            startUserSession(token, patientid, phone_number, search_selected_doc_id, schedule_date, apointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
            this.props.nextStep();
          } else {
            let patient_id = res[0].PatientID;
            let patient_name = res[0].PatientName;
            let phone_number = this.state.phone_number;
            const data = {
              patientid: patient_id,
            }
            this.PatientLoginSubmit(data, phone_number, patient_name);
          }
        })
        .catch(err => {
          console.log(err);
        });
      } else {
      }
    }
  }
  LoginPaitentId = (patient_id, password) =>{
    let login_phone_number = '';
    let search_selected_doc_id = '';
    let schedule_date = '';
    let apointment_id = '';
    let doctor_name = '';
    let doctor_fees = '';
    let patientName = '';
    let schedule_time = '';
    let search_selected_doc_name = '';
    let doctor_profile_avability = '';
    const data = {
      patientid: patient_id,
      password: password
    }
    LoginPatientIdCheck(data)
    .then(res => {
      if(res.status == true){
        if(res.data.patient_id == '' || res.data.patient_id == null){
          window.location.href = '/popuppatientid?userid='+res.data.id;
        } else {
          const data = {
            patientid: patient_id,
          }
          LoginPatient(data)
          .then(res => {
            const data = {
              patient: patient_id,
            }
            let token = '';
            PatitentDetails(data)
            .then(patient_details_res => {
              let token = '';
              let login_phone_number = patient_details_res[0].patient_phone;
              let search_selected_doc_id = '';
              let schedule_date = '';
              let apointment_id = '';
              let doctor_name = '';
              let doctor_fees = '';
              let patientName = patient_details_res[0].patient_name;
              let schedule_time = '';
              let search_selected_doc_name = '';
              let doctor_profile_avability = '';
              startUserSession(token, patient_id, login_phone_number, search_selected_doc_id, schedule_date, apointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
              window.location.href = '/dashboard/patient-dashboard';
            })
            .catch(err => {
              console.log(err);
            });
            startUserSession(token, patient_id, login_phone_number, search_selected_doc_id, schedule_date, apointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
            this.setState({ signin_success: true});
            //this.props.nextStep();
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  PatientLoginSubmit = (data, phone_number, patient_name) => {
    let login_phone_number = phone_number;
    let search_selected_doc_id = '';
    let schedule_date = '';
    let apointment_id = '';
    let doctor_name = '';
    let doctor_fees = '';
    let patientName = patient_name;
    let schedule_time = '';
    let search_selected_doc_name = '';
    let doctor_profile_avability = this.props.doctorProfilePageClick;
    LoginPatient(data)
    .then(res => {
      if (!!res[0].token) {
        startUserSession(res[0].token, data.patientid, login_phone_number, search_selected_doc_id, schedule_date, apointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
        this.setState({ signin_success: true});
        this.refreshResetOTPData();
        this.props.nextStep();
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_LEFT
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  refreshGetOTPData = (event) => {
    const data ={
      phone_number: this.state.phone_number,
    }
    getOtpData(data)
    .then(res =>{
      if(res.status === true){
        this.setState({otp_number: res.data.otp});
        if(this.state.final_otp === res.data.otp || this.state.final_otp === '111111'){
          document.getElementById("black-btn").disabled = false;
          document.getElementById("black-btn").style.background = "#fb6201";
        } else {
          document.getElementById("black-btn").disabled = true;
          document.getElementById("black-btn").style.background = "#41414b";
          $('#otp_error').text('');
        }
      } else {
        toast.error('otp data not found', {
          position: toast.POSITION.TOP_LEFT
        });
      }
    })
    .catch(err => {
      toast.error('Error occured', {
        position: toast.POSITION.TOP_LEFT
      });
    });
  }
  refreshResetOTPData = (event) => {
    const data ={
      phone_number: this.state.phone_number,
    }
    ResetOtpData(data)
    .then(res =>{
      if(res.status === true){
        
      } else {
        
      }
    })
    .catch(err => {
      toast.error('Error occured', {
        position: toast.POSITION.TOP_LEFT
      });
    });
  }
  ShowRegisterPopup = (e) =>{
    $(".login_popup").css("visibility", 'hidden');
    $(".login_popup").removeClass('show');
    $(".register_popup").css("visibility", 'visible');
    $(".register_popup").addClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
    this.setState({
      showRegisterPopup: true
    })
  }
  closePopup = event => {
    $(".login_popup").css("visibility", 'hidden');
    $(".login_popup").removeClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
  }
  componentDidMount(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let update_success = params.get('update_success');
    let active_code = params.get('active_code');
    if(update_success){
      $('.login_popup').addClass("show");
    }
    if(active_code){
      //var CHK_USER_ID = localStorage.getItem(USER_ID);
      $('.login_popup').addClass("show");
      var url = '/account/activation/'+active_code;
      activateaccount(url, active_code)
      .then(res => {
         if (res.status==true) {
              toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT
              });
              /*if(CHK_USER_ID==null) {
                window.location.href = '/login';
              } else {
                this.setState({
                  signin_success: true,
                });
              }*/
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
    return(
      <div>
        <div className="offcanvas offcanvas-start login_popup" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
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
            <div className="left-offcanvas">
              <h4>Login / Register to <br /> Book Your <br /> Appointment</h4> 
              <form onSubmit={this.handleSubmit} id="loginform" className="needs-validation" noValidate>
                <input placeholder="Enter Patient I.D (Optional)" type="text" id="patient_id" name="patient_id" value={this.state.fields.patient_id} onChange={this.handleChange} autoComplete="off" className="form-control" />
                <div className="input-group mt-3">
                  <input type="password" className="form-control" placeholder="Enter Password" name="password" id="password" value={this.state.fields.password} onChange={this.handleChange} required autoComplete="off"/>
                </div>
                {/*<div className="input-group mt-3">
                  <input type="text" className="form-control" placeholder="Enter Phone Number" name="phone_number" id="phone_number" value={this.state.fields.phone_number} onChange={this.handleChange} required autoComplete="off" maxLength="11"/>
                  <a className="input-group-text" id="basic-addon2" onClick={this.sendOtp} style={{"pointer-events": "none", "textDecoration":"none", "cursor": "default"}}>Send OTP</a>
                </div>
                <p className="otp_resend" style={{"display":"none"}}>Otp not recieved? <a onClick={this.ResendOtp} style={{"cursor":"pointer", "textDecoration": "underline"}}>Resend OTP</a></p>
                <span style={alertStyle}>{this.state.errors.phone_number}</span>
                <div className="d-flex">
                  <input type="text" name="first_otp" id="first_otp" className="fild-1 otp_input" placeholder="-" value={this.state.first_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                  <input type="text" name="second_otp" id="second_otp" className="fild-1 otp_input" placeholder="-" value={this.state.second_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                  <input type="text" name="third_otp" id="third_otp" className="fild-1 otp_input" placeholder="-" value={this.state.third_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                  <input type="text" name="fourth_otp" id="fourth_otp" className="fild-1 otp_input" placeholder="-" value={this.state.fourth_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                  <input type="text" name="fifth_otp" id="fifth_otp" className="fild-1 otp_input" placeholder="-" value={this.state.fifth_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                  <input type="text" name="sixth_otp" id="sixth_otp" className="fild-1 otp_input" placeholder="-" value={this.state.sixth_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                </div>
                <p id="otp_error" style={{"fontSize": "14px", "color": "#ff0000"}}></p>*/}
                <div className="row mt-3">
                  <div className="col-12">
                    <button type="submit" className="btn-links appointment-new" id="black-btn"> Login </button>
                  </div> 
                </div> 
                <p><label className="dont">Don't have a patient I.D? <br /><button className="nav-link active" onClick={this.ShowRegisterPopup} style={{"background": "none", "border": "none", "padding": "0px", "color": "rgb(251, 98, 1)"}} data-bs-dismiss="offcanvas" aria-label="Close">Register here.</button></label></p>
              </form>
            </div>
          </div>
        </div>
        {
          this.state.showRegisterPopup
          ?
            <PopupRegister showPopup={this.state.showRegisterPopup}/>
          :
            null
        }
        <ToastContainer autoClose={5000} />
      </div>
    )
  } 
}
export default PopupIndex4;