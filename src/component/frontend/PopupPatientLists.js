import React, { Component } from 'react';
import {LOGIN_PHONE_NUMBER} from '../../constants';
import { scAxios, scAxiosAdmin } from '../..';
import { startUserSession } from '../../userSession';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import PopupIndex5 from '../../component/frontend/PopupIndex5';
import $ from 'jquery';

const getPatitentLists = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxios.request('/mmphonenumber', {
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
const PatientLoginUser = (data) => {
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
class PopupPatientLists extends Component {
  state = {
    get_phone_number: '',
    patientLists: [],
    patient_id: '',
    patient_name: '',
    showPaymentPopup:false,
  }
  handleChange = event => {
    var patientName = $("input[name='patient_id']:checked").attr('patient_name');
    this.setState({
        [event.target.name]: event.target.value,
        patient_name: patientName,
    });
    var patient_id = $("input[name='patient_id']:checked").val();
    if(patient_id){
      document.getElementById("Schedule").disabled = false;
      document.getElementById("Schedule").style.background = "#fb6201";
    } else {
      document.getElementById("Schedule").disabled = true;
      document.getElementById("Schedule").style.background = "#41414b";
    }
  }
  refreshGetPatitentLists = (data) => {
    getPatitentLists(data)
    .then(res => {
      if(res){
        var records = res;
        this.setState({ patientLists: records });
      } else {
        this.setState({ patientLists: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        patientid: this.state.patient_id,
    }
    const patient_id = this.state.patient_id; 
    const patientName = this.state.patient_name;
    const login_phone_number = localStorage.getItem(LOGIN_PHONE_NUMBER); 
    const search_selected_doc_id = ''; 
    const schedule_date = ''; 
    const appointment_id = ''; 
    const doctor_name = '';
    const doctor_fees = '';
    const schedule_time = '';
    const search_selected_doc_name = '';
    PatientLoginUser(data)
    .then(res => {
      if (!!res[0].token) {
          startUserSession(res[0].token, patient_id, login_phone_number, search_selected_doc_id, schedule_date, appointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name);
          this.setState({ signin_success: true});
          this.refreshResetOTPData();
          this.props.nextStep();
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
  refreshResetOTPData = (event) => {
    const data ={
      phone_number: localStorage.getItem(LOGIN_PHONE_NUMBER),
    }
    ResetOtpData(data)
    .then(res =>{
      if(res.status === true){
        
      } else {
        
      }
    })
    .catch(err => {
      toast.error('Error occured', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
  }
  closePopup = event => {
    document.getElementById('offcanvasExample').style.visibility = 'hidden';
    document.getElementById('offcanvasExample').classList.remove("show");
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
  }
  componentDidMount(){
    const data = {
      PhoneNumber: localStorage.getItem(LOGIN_PHONE_NUMBER),
    }
    if(localStorage.getItem(LOGIN_PHONE_NUMBER)){
      this.refreshGetPatitentLists(data);
    }
  }
  render() {
    return(
      <div className="offcanvas offcanvas-start show" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel"> </h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={this.closePopup}/>
        </div>
        <div className="offcanvas-body">
          <div className="row text-center" id="logos">
            <div className="col-4">
              <img src={uhlcare_logo} alt="uhlcare-logo"/>
            </div>
            <div className="col-4">
              <img src={uhl_logo} alt="uhl-logo"/>
            </div>
            <div className="col-4">
              <img src={medix_logo} alt="medix-logo"/>
            </div>
          </div>
          <div className="left-offcanvas">
            <div className="offcan-top-mar">
              <h4>Patients Lists</h4>
            </div>
            <form onSubmit={this.handleSubmit} id="patientloginform" className="needs-validation" noValidate>
              <div className="row mt-3">
                {
                  this.state.patientLists.length > 0
                  ?  
                    this.state.patientLists.map(patient_list => {
                      return(
                        <div className="col-6 sp-0-0 mt-3" key={patient_list.PatientID}>
                          <div className="doctor-list">
                            <input type="radio" className="patient_user" name="patient_id" value={patient_list.PatientID} onChange={this.handleChange} patient_name={patient_list.PatientName}/>
                            <div className="row list_content_sec">
                              <div className="col-5">
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="doc"/>
                              </div>
                              <div className="col-7">
                                <h5>{patient_list.PatientName}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  :
                    <div className="col-6 sp-0-0">
                      <div className="doctor-list">
                        <div className="row">
                          <p>No Result found</p>
                        </div>
                      </div>
                    </div>
                }
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <button variant="primary" type="submit" className="btn-links appointment-new" id="Schedule" disabled>Log Me In</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {this.state.showPaymentPopup 
          ? 
            <PopupIndex5 showPopup={this.state.showPaymentPopup}/>
          :
            ''
        }
        <ToastContainer autoClose={5000} />
      </div>
    )
  } 
}
export default PopupPatientLists;