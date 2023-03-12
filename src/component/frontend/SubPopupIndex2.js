import React, { Component } from 'react';
import {API_TOKEN_NAME, USER_ID, USER_ROLE, USER_EMAIL, LOGIN_PHONE_NUMBER, PATIENT_NAME, IMAGE_URL, SCHEDULE_DATE, SEARCH_SELECTED_DOC_NAME} from '../../constants';
import { scAxiosAdmin } from '../..';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { startUserSession } from '../../userSession';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
//import doc from '../../images/doc.png';
import $ from 'jquery';
import Moment from 'moment';
import SubPopupIndex3 from '../../component/frontend/SubPopupIndex3';

const getSearchDoctors = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/doctors/searchdoctors', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
        },
        params: {
            ...data
        }
    });
    req.then(res => resolve(res.data))
        .catch(err => reject(err));
  });
}
const alertStyle = {
  color: 'red',
};
class SubPopupIndex2 extends Component {
  state = {
    fields: {},
    errors: {},
    search_doctors:[],
    search_keywords:'',
    doctor_id:'',
    schedule_date:'',
    department_id:'',
    limit: 4,
    showPopup:false,
    showSingleDoctorProfilePopup:false,
    selected_day_date:''
  }
  validateForm() {
    let selected_day_date_val = $('.schedule_date').val();
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if(this.props.selecteddoctorname || localStorage.getItem(SCHEDULE_DATE) || selected_day_date_val){
    } else {
      if (!fields["schedule_date"]) {
          formIsValid = false;
          errors["schedule_date"] = "*Please select your schedule date.";
      }
    }
    if(this.props.doctorname || this.props.selecteddoctorname){
    } else {
      if (!fields["search_keywords"]) {
          formIsValid = false;
          errors["search_keywords"] = "*Please search doctor lists.";
      }
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
    this.setState({
        [event.target.name]: event.target.value,
    });
    var search_keywords = $(".search_keywords").val();
    var doctor_id = $("input[name='doctor_id']:checked").val();
    let schedule_date = "";
    if($(".schedule_date").val()){
      schedule_date = $(".schedule_date").val();
    } else {
      schedule_date = localStorage.getItem(SCHEDULE_DATE);
    }
    if(search_keywords!=='' && doctor_id!=='' && schedule_date!==''){
      $(".submit_btn").prop('disabled', false);
      $(".submit_btn").css('background', '#fb6201');
    } else {
      $(".submit_btn").prop('disabled', true);
      $(".submit_btn").css('background', '#41414b');
    }
    if(doctor_id === undefined){
      $(".submit_btn").prop('disabled', true);
      $(".submit_btn").css('background', '#41414b');
    }
  }
  handleKeyUp = event => {
    const data ={
      keywords: this.state.search_keywords
    }
    getSearchDoctors(data)
    .then(res => {
      if(res.status===true){
          var records = res.data;
          this.setState({ search_doctors: records });
      } else {
          this.setState({ search_doctors: '' });
      }
      this.setState({ enableShdo: false, });
    })
    .catch(err => {
        console.log(err);
    });
  }
  handleSubmit = (event, props) => {
    event.preventDefault();
    if (this.validateForm()) {
      let selected_day_date_val = $('.schedule_date').val();
      let fields = {};
      if(this.props.selecteddoctorname || localStorage.getItem(SCHEDULE_DATE) || selected_day_date_val){

      } else {
        fields["schedule_date"] = "";
      }
      if(this.props.doctorname || this.props.selecteddoctorname){

      } else {
        fields["search_keywords"] = "";
      }
      this.setState({ fields: fields });
      let doctor_id ='';
      if($("input[name='doctor_id']:checked").val()){
        doctor_id = $("input[name='doctor_id']:checked").val();
      } else {
        doctor_id = this.state.doctor_id;
      }
      if(localStorage.getItem(API_TOKEN_NAME)){
        const token = localStorage.getItem(API_TOKEN_NAME);
        const user_role = localStorage.getItem(USER_ROLE);
        const user_email = localStorage.getItem(USER_EMAIL);
        const patient_id = localStorage.getItem(USER_ID);
        const login_phone_number = localStorage.getItem(LOGIN_PHONE_NUMBER);
        const search_selected_doc_id = doctor_id;
        let schedule_date = '';
        if(selected_day_date_val !==''){
          schedule_date = selected_day_date_val;
        } else {
          if(this.state.schedule_date === ''){
            if(localStorage.getItem(SCHEDULE_DATE)){
              schedule_date = localStorage.getItem(SCHEDULE_DATE);
            } else {
              schedule_date = this.state.schedule_date;
            }
          } else {
            schedule_date = this.state.schedule_date;
          }
        }
        /*if(this.state.schedule_date === ''){
          if(localStorage.getItem(SCHEDULE_DATE)){
            schedule_date = localStorage.getItem(SCHEDULE_DATE);
          } else {
            schedule_date = this.state.schedule_date;
          }
        } else if(selected_day_date_val !=='') {
          schedule_date = selected_day_date_val;
        } else {
          schedule_date = this.state.schedule_date;
        }*/
        const appointment_id = '';
        const doctor_name = '';
        const doctor_fees = '';
        const patientName = localStorage.getItem(PATIENT_NAME);
        const schedule_time = '';
        const search_selected_doc_name = localStorage.getItem(SEARCH_SELECTED_DOC_NAME);
        const doctor_profile_avability = '';
        startUserSession(token, user_role, user_email, patient_id, login_phone_number, search_selected_doc_id, schedule_date, appointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
      } else {
        const token = '';
        const user_role = '2';
        const user_email = '';
        const patient_id = '';
        const login_phone_number = '';
        const search_selected_doc_id = doctor_id;
        let schedule_date = '';
        if(selected_day_date_val !==''){
          schedule_date = selected_day_date_val;
        } else {
          if(this.state.schedule_date === ''){
            if(localStorage.getItem(SCHEDULE_DATE)){
              schedule_date = localStorage.getItem(SCHEDULE_DATE);
            } else {
              schedule_date = this.state.schedule_date;
            }
          } else {
            schedule_date = this.state.schedule_date;
          }
        }
        /*if(this.state.schedule_date === ''){
          if(localStorage.getItem(SCHEDULE_DATE)){
            schedule_date = localStorage.getItem(SCHEDULE_DATE);
          } else {
            schedule_date = this.state.schedule_date;
          }
        } else {
          schedule_date = this.state.schedule_date;
        }*/
        const appointment_id = '';
        const doctor_name = '';
        const doctor_fees = '';
        const patientName = '';
        const schedule_time = '';
        const search_selected_doc_name = '';
        const doctor_profile_avability = '';
        startUserSession(token, user_role, user_email, patient_id, login_phone_number, search_selected_doc_id, schedule_date, appointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
      }
      this.onClickPopupShow();
    } else {
    }
  }
  onClickPopupShow = () =>{
    if(this.state.showSingleDoctorProfilePopup === true){
      this.setState({
        showSingleDoctorProfilePopup: false,
        showPopup:true
      });
    } else {
      this.setState({
        showSingleDoctorProfilePopup: true,
        showPopup:false
      });
    }
    
  }
  closePopup = event => {
    $(".doctor_search_list_popup").css("visibility", 'hidden');
    $(".doctor_search_list_popup").removeClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
    this.setState({
      showPopup: false 
    });
  }
  refreshGetSearchDoctors = (doctor_name) =>{
    const data ={
      keywords: doctor_name
    }
    getSearchDoctors(data)
    .then(res => {
      if(res.status===true){
          var records = res.data;
          this.setState({ search_doctors: records });
          if(records.length === 1){
            $("input[name='doctor_id']").prop("checked", true);
          }
      } else {
          this.setState({ search_doctors: '' });
      }
      this.setState({ enableShdo: false, });
    })
    .catch(err => {
        console.log(err);
    });
  }
  componentDidMount(){
    this.setState({
      showPopup: this.props.showPopup,
    });
    //console.log(this.props.selected_doctor_avability_day);
    if(this.props.selecteddoctorname){
      $('.search_keywords').val(this.props.selecteddoctorname);
      this.refreshGetSearchDoctors(this.props.selecteddoctorname);
    }
    if(this.props.doctorname){
      $('.search_keywords').val(this.props.doctorname);
      this.refreshGetSearchDoctors(this.props.doctorname);
    }
  }
  render() {
    let current_date = new Date();
    let newcurrentdate = Moment(current_date).format('YYYY-MM-DD');
    let days_name = this.props.selected_doctor_avability_day;
    if(days_name){
      let current_date_day = new Date();
      function dayOfWeekAsString(day) {
        //let final_day_name = day.charAt(0).toUpperCase() + day.slice(1);
        /*const firstLetter = day.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = day.slice(1);
        const final_day_name = firstLetterCap + remainingLetters;*/
        return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].indexOf(day);
      }
      let days_number = dayOfWeekAsString(this.props.selected_doctor_avability_day);
      current_date_day.setDate(current_date_day.getDate() + (days_number + 7 - current_date_day.getDay()) % 7);
      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
      }
   
      let formate_current_date = formatDate(current_date_day);
      if(formate_current_date){
        //this.setState({schedule_date: formate_current_date});
        $('.schedule_date').val(formate_current_date);
        $(".submit_btn").prop('disabled', false);
        $(".submit_btn").css('background', '#fb6201');
      } else {
        //this.setState({schedule_date: ''});
        $('.schedule_date').val('');
        $(".submit_btn").prop('disabled', true);
        $(".submit_btn").css('background', '#41414b');
      }
    } else {
      let go_back_date = $('.schedule_date').val();
      if(go_back_date){
        $('.schedule_date').val('');
        $(".submit_btn").prop('disabled', true);
        $(".submit_btn").css('background', '#41414b');
      }
    }
    return(
      <div>
        <div className={this.state.showPopup ? "offcanvas offcanvas-start show doctor_search_list_popup" : "offcanvas offcanvas-start doctor_search_list_popup"} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel"> </h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={this.closePopup}></button>
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
                <h4>Book Appointment</h4>
                <p>Enter Doctor's Name or relevant Department</p>
              </div>
              <form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
                <input placeholder="Enter doctor name" type="text" name="search_keywords" id="search_keywords" className="form-control search_keywords" value={this.state.fields.search_keywords} onChange={this.handleChange} onKeyUp={this.handleKeyUp} required autoComplete="off"/>
                <span style={alertStyle}>{this.state.errors.search_keywords}</span>
                <div className="row mt-3">
                {
                  this.state.search_doctors.length > 0
                  ?
                    this.state.search_doctors.slice(0,this.state.limit).map(search_doctor => {
                      return(
                        <div className="col-12 sp-0-0 mb-3" key={search_doctor.id}>
                          <div className="doctor-list">
                            <input type="radio" className="doctor_id" name="doctor_id" value={search_doctor.uhl_id} onChange={this.handleChange} deptid={search_doctor.dept_id}/>
                            <div className="row">
                              <div className="col-3" style={{"paddingLeft": "0px"}}>
                                { search_doctor.doctor_profile ?
                                  <img src={IMAGE_URL+'/DoctorProfileImg/'+search_doctor.doctor_profile} alt="doctor profile"/>
                                  :
                                  /*<img src={doc} alt="doc"/>*/
                                  <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="doc" />
                                }
                              </div>
                              <div className="col-9 mt-2">
                                <h5>{search_doctor.doctor_name}</h5>
                                <p>
                                {
                                    search_doctor.degree!==''
                                  ?
                                    search_doctor.degree
                                  :
                                    'Endocrinology & Metabolism) MD (Endocrinology & Metabolism)'
                                }</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  :
                    <div className="col-12 sp-0-0 mb-3"></div>
                }
                </div>
                <div className="row mt-3">
                  <div className="col-6">
                    <input type="date" id="schedule_date" name="schedule_date" className="form-control schedule_date" value={this.state.fields.schedule_date} onChange={this.handleChange} min={newcurrentdate} required/>
                    <span style={alertStyle}>{this.state.errors.schedule_date}</span>
                  </div>
                  <div className="col-6">
                    <button variant="primary" type="submit" id="Schedule" className="btn-links submit_btn" disabled>Check Schedule</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <ToastContainer autoClose={5000} /> 
        </div>
        {
          this.state.showSingleDoctorProfilePopup
          ?
            <SubPopupIndex3 showPopup={this.state.showSingleDoctorProfilePopup} doctorname={this.state.doctor_name} schedule_date={this.state.schedule_date} doctorid={this.state.doctor_id}/>
          :
            null
        }
      </div>
    )
  } 
}
export default SubPopupIndex2;