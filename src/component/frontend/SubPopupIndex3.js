import React, { Component } from 'react';
import {API_TOKEN_NAME, USER_ROLE, USER_EMAIL, SEARCH_SELECTED_DOC_ID, SCHEDULE_DATE, USER_ID, LOGIN_PHONE_NUMBER, PATIENT_NAME, IMAGE_URL, SEARCH_SELECTED_DOC_NAME} from '../../constants';
import { scAxios, scAxiosAdmin } from '../..';
import { startUserSession } from '../../userSession';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import {Route} from 'react-router-dom';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
//import doc from '../../images/doc.png';
import Loading from '../../images/Loading_icon.gif';
import Moment from 'moment';
import $ from 'jquery';
import SubPopupIndex2 from '../../component/frontend/SubPopupIndex2';
import SubPopupIndex5 from '../../component/frontend/SubPopupIndex5';
import SubPopupIndex4 from '../../component/frontend/SubPopupIndex4';

const getSingleDoctorScheduleData = (data) => {
  return new Promise((resolve, reject) => {
    //const token = Buffer.from(`${API_AUTH_USERNAME}:${API_AUTH_PASSWORD}`, 'utf8').toString('base64');
    const req = scAxios.request('/AppointmentSchedule', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          //'Authorization': `Basic ${token}`,
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
const getSingleDoctorData = () => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/doctors/getsingledoctors/'+localStorage.getItem(SEARCH_SELECTED_DOC_ID), {
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
class SubPopupIndex3 extends Component {
  state = {
    fields: {},
    errors: {},
    doctor_id: '',
    doctor_name:'',
    doctor_degree:'',
    doctor_scheduler_dates:[],
    doctor_scheduler_time:[],
    doctor_fees:'',
    schedule_date_time:'',
    change_schedule_date:'',
    doctor_profile:'',
    error_res_msg:'',
    showPopup:false,
    showDoctorSearchPopup:false,
    showPaymentPopup: false,
    showLoginPopup:false,
    showLoading:false,
  }
  handleChange = event => {
    this.setState({ errors:''});
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
        fields
    }, () => this.validateForm());
    this.setState({
        [event.target.name]: event.target.value,
    });
    var schedule_date_time = $("input[name='schedule_date_time']:checked").val();
    console.log(schedule_date_time);
    if(schedule_date_time){
      $(".submit_btn").prop('disabled', false);
      $(".submit_btn").css('background', '#fb6201');
    } else {
      $(".submit_btn").prop('disabled', true);
      $(".submit_btn").css('background', '#41414b');
    }
  }
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["schedule_date_time"]) {
        formIsValid = false;
        errors["schedule_date_time"] = "*Please select atleast one schedule time slot.";
    }
    this.setState({
        errors: errors
    });
    return formIsValid;
  }
  changeScheduleDate = event => {
    this.setState({ errors:''});
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
        fields
    }, () => this.validateForm());
    /*this.setState({
        [event.target.name]: event.target.value,
    });*/
    if(localStorage.getItem(API_TOKEN_NAME)){
      let change_schedule_date_val = document.getElementById('change_schedule_date').value;
      const token = localStorage.getItem(API_TOKEN_NAME);
      const user_role = localStorage.getItem(USER_ROLE);
      const user_email = localStorage.getItem(USER_EMAIL);
      const patient_id = localStorage.getItem(USER_ID);
      const login_phone_number = localStorage.getItem(LOGIN_PHONE_NUMBER);
      const search_selected_doc_id = localStorage.getItem(SEARCH_SELECTED_DOC_ID);
      const schedule_date = change_schedule_date_val;
      const apointment_id = '';
      const doctor_name = this.state.doctor_name;
      const doctor_fees = this.state.doctor_fees;
      const patientName = localStorage.getItem(PATIENT_NAME);
      const schedule_time = '';
      const search_selected_doc_name = localStorage.getItem(SEARCH_SELECTED_DOC_NAME);
      const doctor_profile_avability = '';
      startUserSession(token, user_role, user_email, patient_id, login_phone_number, search_selected_doc_id, schedule_date, apointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
      const data = {
        DoctorID: localStorage.getItem(SEARCH_SELECTED_DOC_ID),
        PreferredDate: change_schedule_date_val,
      }
      this.refreshGetSingleDoctorScheduleData(data);
    } else {
      let change_schedule_date_val = document.getElementById('change_schedule_date').value;
      const token = '';
      const user_role = '2';
      const user_email = '';
      const patient_id = '';
      const login_phone_number = '';
      const search_selected_doc_id = localStorage.getItem(SEARCH_SELECTED_DOC_ID);
      const schedule_date = change_schedule_date_val;
      const apointment_id = '';
      const doctor_name = this.state.doctor_name;
      const doctor_fees = this.state.doctor_fees;
      const patientName = '';
      const schedule_time = '';
      const search_selected_doc_name = '';
      const doctor_profile_avability = '';
      startUserSession(token, user_role, user_email, patient_id, login_phone_number, search_selected_doc_id, schedule_date, apointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
      const data = {
        DoctorID: localStorage.getItem(SEARCH_SELECTED_DOC_ID),
        PreferredDate: change_schedule_date_val,
      }
      this.refreshGetSingleDoctorScheduleData(data);
    }
  }
  handleSubmit = (event, props) => {
    event.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["schedule_date_time"] = "";
      this.setState({ fields: fields });
      if(localStorage.getItem(API_TOKEN_NAME)){
          let token = localStorage.getItem(API_TOKEN_NAME);
          let user_role = localStorage.getItem(USER_ROLE);
          let user_email = localStorage.getItem(USER_EMAIL);
          let phone_number = localStorage.getItem(LOGIN_PHONE_NUMBER);
          let search_selected_doc_id = localStorage.getItem(SEARCH_SELECTED_DOC_ID);
          let patientid = localStorage.getItem(USER_ID);
          let schedule_date = localStorage.getItem(SCHEDULE_DATE);
          //let apointment_id = res[0].AppointmentID;
          let apointment_id = '';
          let doctor_name = this.state.doctor_name;
          let doctor_fees = this.state.doctor_fees;
          let patientName = localStorage.getItem(PATIENT_NAME);
          let schedule_time = this.state.schedule_date_time;
          let search_selected_doc_name = '';
          let doctor_profile_avability = '';
          startUserSession(token, user_role, user_email, patientid, phone_number, search_selected_doc_id, schedule_date, apointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
          this.setState({
            showPaymentPopup: true,
          });
      } else {
        let token = '';
        let user_role = '2';
        let user_email = '';
        let phone_number = '';
        let search_selected_doc_id = localStorage.getItem(SEARCH_SELECTED_DOC_ID);
        let patientid = '';
        let schedule_date = localStorage.getItem(SCHEDULE_DATE);
        let apointment_id = '';
        let doctor_name = this.state.doctor_name;
        let doctor_fees = this.state.doctor_fees;
        let patientName = '';
        let schedule_time = this.state.schedule_date_time;
        let search_selected_doc_name = '';
        let doctor_profile_avability = '';
        startUserSession(token, user_role, user_email, patientid, phone_number, search_selected_doc_id, schedule_date, apointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
        this.setState({
          showLoginPopup: true,
          showPopup: false
        });
      }
    } else {
      toast.error('Please select schedule time!', {
        position: toast.POSITION.TOP_LEFT
      });
    }
  }
  refreshGetSingleDoctorScheduleData = (data) => {
    getSingleDoctorScheduleData(data)
    .then(res => {
      if(res){
        this.setState({showLoading: true});
        if(res[0].DoctorID){
          this.setState({
            doctor_scheduler_dates: res[0].DoctorSchedule.Date[1], 
            doctor_scheduler_time: res[0].DoctorSchedule.Time[0], 
            doctor_fees: res[0].Fees,
          });
        } else {
          this.setState({
            error_res_msg: 'No slot available.',
          });
        }
      } else {
        this.setState({showLoading: false});
      }
    })
    .catch(err => {
      toast.error('There is error finding doctor slots ! Please check another availability date.', {
        position: toast.POSITION.TOP_LEFT
         });
    });
  }
  refreshGetSingleDoctorData = () => {
    getSingleDoctorData()
    .then(res => {
      if(res.status === true){
        var records = res.data;
        this.setState({
          doctor_name: records.doctor_name,
          doctor_degree: records.degree,
          doctor_profile: records.doctor_profile,
        })
      }
    })
    .catch(err => {
      toast.error('There is error finding doctor data ! Please reselect doctor again.', {
        position: toast.POSITION.TOP_LEFT
         });
    });
  }
  onClickPrevStep = (props) => {
    this.setState({
      showDoctorSearchPopup: true,
      showPopup: false
    })
    //this.props.prevStep();
  }
  closePopup = event => {
    $(".doctor_single_profile_popup").css("visibility", 'hidden');
    $(".doctor_single_profile_popup").removeClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
    this.setState({
      showPopup: false 
    });
  }
  componentDidMount(){
    const data = {
      DoctorID: localStorage.getItem(SEARCH_SELECTED_DOC_ID),
      PreferredDate: localStorage.getItem(SCHEDULE_DATE),
    }
    this.refreshGetSingleDoctorScheduleData(data);
    this.refreshGetSingleDoctorData();
    this.setState({
      showPopup: this.props.showPopup
    });
  }
  render() {
    let current_date = new Date();
    let newcurrentdate = Moment(current_date).format('YYYY-MM-DD');
    let schedule_data = Moment(localStorage.getItem(SCHEDULE_DATE)).format('dddd, LL');
    return(
      <div>
        <div className={this.state.showPopup ? "offcanvas offcanvas-start show doctor_single_profile_popup" : "offcanvas offcanvas-start doctor_single_profile_popup"} tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
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
              <h4>Book  Appointment</h4>
              <p className="goback"><button variant="primary" onClick={this.onClickPrevStep} style={{"background": "none", "border": "none"}}><i className="fa-solid fa-circle-left" /> Go Back &amp; Reselect your Doctor</button></p>
              <div className="sd-container"><h6 className="timer">{schedule_data} &nbsp;&nbsp; <input type="date" className="change_schedule_date" name="change_schedule_date" id="change_schedule_date" value={localStorage.getItem(SCHEDULE_DATE)} onChange={this.changeScheduleDate} min={newcurrentdate}/><i className="moz-cover-clear"></i><span className="open-button"><button type="button" style={{"padding":"0px"}}>📅</button></span></h6></div>
              <form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
                <div className="row mt-4">
                  <div className="col-12 sp-0-0">
                    <div className="doctor-list Dr-Reazur">
                      <div className="row">
                        <div className="col-4 sp-0-1 left-0">
                          { this.state.doctor_profile ?
                            <img src={IMAGE_URL+'/DoctorProfileImg/'+this.state.doctor_profile} alt="doctor profile"/>
                            :
                            /*<img src={doc} alt="doc"/>*/
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="doc" />
                          }
                        </div>
                        <div className="col-8" id="dr">
                          <h5>{this.state.doctor_name}</h5>
                          <p>
                          {
                            this.state.doctor_degree!==''
                            ?
                              this.state.doctor_degree
                            :
                              ''
                          }
                          </p>
                          <p className="mt-2">
                          {
                            this.state.doctor_fees!==''
                            ?
                              <strong style={{"color": "#fb6201"}}>BDT {this.state.doctor_fees}</strong>
                            :
                              <strong></strong>
                          }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> 
                </div> 
                <div className="row mt-4" id="time-date">
                  <div className="col-12">
                  {this.state.showLoading === true 
                    ?
                        this.state.doctor_scheduler_time.length > 0
                        ?
                          this.state.doctor_scheduler_time.split(',').map(schedule_time => {
                            return(
                              <div className="doctor_schedule_section" key={schedule_time}>
                                <input type="radio" className="schedule_time" id="schedule_date_time" name="schedule_date_time" defaultValue={schedule_time} value={this.state.fields.schedule_date_time} onChange={this.handleChange}/>
                                <div className="btn-links color-check text-center">
                                  {schedule_time} {Moment(localStorage.getItem(SCHEDULE_DATE)).format('LL')}
                                </div>
                              </div>
                            )
                          })
                        :
                          <p>{this.state.error_res_msg}</p>
                    :
                      <img src={Loading} alt="Loading"/>
                  }
                  <span style={alertStyle}>{this.state.errors.schedule_time}</span>
                  </div>
                </div>
                <div className="row mt-3"> 
                  <div className="col-12">
                    <button variant="primary" type="submit" className="btn-links appointment-new submit_btn" id="Schedule" disabled>Schedule Appointment</button>
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
            <SubPopupIndex2 showPopup={this.state.showDoctorSearchPopup} selecteddoctorname={this.state.doctor_name} />
          :
            null
        }
        {
          localStorage.getItem(API_TOKEN_NAME)
          ?
            this.state.showPaymentPopup
            ?
              <SubPopupIndex5 showPopup={this.state.showPaymentPopup}/>
            :
              null
          :
            this.state.showLoginPopup
            ?
              <SubPopupIndex4 showPopup={this.state.showLoginPopup} doctorProfilePageClick="doctor_profile_click"/>
            :
              null
        }
      </div>
    )
  } 
}
export default SubPopupIndex3;