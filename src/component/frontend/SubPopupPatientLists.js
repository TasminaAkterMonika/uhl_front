import React, { Component } from 'react';
import {LOGIN_PHONE_NUMBER, SEARCH_SELECTED_DOC_ID, SCHEDULE_DATE, APPOINTMENT_ID, DOCTOR_NAME, DOCTOR_FEES, SCHEDULE_TIME} from '../../constants';
import { scAxios } from '../..';
import { startUserSession } from '../../userSession';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import SubPopupIndex2 from '../../component/frontend/SubPopupIndex2';
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
class SubPopupPatientLists extends Component {
  state = {
    get_phone_number: '',
    patientLists: [],
    patient_id: '',
    patient_name: '',
    showPopup:false,
    showDoctorSearchPopup:false,
    showPaymentPopup: false,
  }
  handleChange = event => {
    var patientName = $("input[name='patient_id']:checked").attr('patient_name');
    this.setState({
        [event.target.name]: event.target.value,
        patient_name: patientName,
    });
    var patient_id = $("input[name='patient_id']:checked").val();
    if(patient_id){
      $(".submit_btn").prop('disabled', false);
      $(".submit_btn").css('background', '#fb6201');
    } else {
      $(".submit_btn").prop('disabled', true);
      $(".submit_btn").css('background', '#41414b');
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
    const search_selected_doc_id = localStorage.getItem(SEARCH_SELECTED_DOC_ID); 
    const schedule_date = localStorage.getItem(SCHEDULE_DATE); 
    const appointment_id = localStorage.getItem(APPOINTMENT_ID); 
    const doctor_name = localStorage.getItem(DOCTOR_NAME);
    const doctor_fees = localStorage.getItem(DOCTOR_FEES);
    const schedule_time = localStorage.getItem(SCHEDULE_TIME);
    const search_selected_doc_name = '';
    const doctor_profile_avability = '';
    PatientLoginUser(data)
    .then(res => {
      if (!!res[0].token) {
          startUserSession(res[0].token, patient_id, login_phone_number, search_selected_doc_id, schedule_date, appointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
          this.setState({ signin_success: true});
          this.onClickPopupShow();
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
  onClickPopupShow = () =>{
    this.setState({
      showPaymentPopup: true,
      showPopup:false
    });
  }
  closePopup = event => {
    $(".patient_list_popup").css("visibility", 'hidden');
    $(".patient_list_popup").removeClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
    this.setState({
      showPopup: false 
    });
  }
  componentDidMount(){
    const data = {
      PhoneNumber: localStorage.getItem(LOGIN_PHONE_NUMBER),
    }
    if(localStorage.getItem(LOGIN_PHONE_NUMBER)){
      this.refreshGetPatitentLists(data);
    }
    this.setState({
      showPopup: this.props.showPopup
    });
  }
  render() {
    return(
      <div>
        <div className={this.state.showPopup ? "offcanvas offcanvas-start show patient_list_popup" : "offcanvas offcanvas-start patient_list_popup"} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
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
                  {/*<div className="col-6">
                    <input type="date" id="formBasicPassword" className="form-control"/> 
                  </div>*/}
                  <div className="col-12">
                    <button variant="primary" type="submit" className="btn-links appointment-new submit_btn" id="Schedule" disabled>Log Me In</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <ToastContainer autoClose={5000} />
        </div>
        {
          this.state.showDoctorSearchPopup
          ?
            <SubPopupIndex2 showPopup={this.state.showDoctorSearchPopup}/>
          :
            null
        }
        {
          this.state.showPaymentPopup
          ?
            <PopupIndex5 showPopup={this.state.showPaymentPopup}/>
          :
            null
        }
    </div>
    )
  } 
}
export default SubPopupPatientLists;