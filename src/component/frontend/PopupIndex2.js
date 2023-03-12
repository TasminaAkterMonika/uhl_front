import React, { Component } from 'react';
import {API_TOKEN_NAME, USER_ID, USER_ROLE, USER_EMAIL, LOGIN_PHONE_NUMBER, PATIENT_NAME, SEARCH_SELECTED_DOC_ID, SEARCH_SELECTED_DOC_NAME, SCHEDULE_DATE, IMAGE_URL} from '../../constants';
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
class PopupIndex2 extends Component {
  state = {
    fields: {},
    errors: {},
    search_doctors:[],
    search_keywords:'',
    doctor_id:'',
    schedule_date:'',
    department_id:'',
    limit: 4,
    search_selected_doc_name:'',
  }
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if(localStorage.getItem(SCHEDULE_DATE)){
    } else {
      if (!fields["schedule_date"]) {
          formIsValid = false;
          errors["schedule_date"] = "*Please select your schedule date.";
      }
    }
    if(localStorage.getItem(SEARCH_SELECTED_DOC_NAME)){

    } else {
      if (!fields["search_keywords"]) {
          formIsValid = false;
          errors["search_keywords"] = "*Please search doctor lists.";
      }
    }
    /*if (!fields["doctor_id"]) {
        formIsValid = false;
        errors["doctor_id"] = "*Please select atleast one doctor from doctors lists.";
    }*/
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
    var search_keywords = $("#search_keywords").val();
    var doctor_id = $("input[name='doctor_id']:checked").val();
    var doctor_name = $("input[name='doctor_id']:checked").attr('doctorName');
    this.setState({search_selected_doc_name: doctor_name});
    var schedule_date = $("#schedule_date").val();
    if(search_keywords && doctor_id && schedule_date){
      document.getElementById("Schedule").disabled = false;
      document.getElementById("Schedule").style.background = "#fb6201";
    } else if(search_keywords && doctor_id==='' && schedule_date){
      document.getElementById("Schedule").disabled = false;
      document.getElementById("Schedule").style.background = "#fb6201";
    } else {
      document.getElementById("Schedule").disabled = true;
      document.getElementById("Schedule").style.background = "#41414b";
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
      if(localStorage.getItem(SCHEDULE_DATE)){

      } else {
        fields["schedule_date"] = "";
      }
      if(localStorage.getItem(SEARCH_SELECTED_DOC_NAME)){
      } else {
        fields["search_keywords"] = "";
      }
      //fields["doctor_id"] = "";
      this.setState({ fields: fields });
      /*const data = {
        DoctorID: this.state.doctor_id,
        PreferredDate: this.state.schedule_date,
      }*/
      let doctor_id ='';
      if($("input[name='doctor_id']:checked").val()){
        doctor_id = $("input[name='doctor_id']:checked").val();
      } else {
        //doctor_id = this.state.doctor_id;
        doctor_id = localStorage.getItem(SEARCH_SELECTED_DOC_ID);
      }
      if(localStorage.getItem(API_TOKEN_NAME) !== null){
        const token = localStorage.getItem(API_TOKEN_NAME);
        const user_role = localStorage.getItem(USER_ROLE);
        const user_email = localStorage.getItem(USER_EMAIL);
        const patient_id = localStorage.getItem(USER_ID);
        const login_phone_number = localStorage.getItem(LOGIN_PHONE_NUMBER);
        const search_selected_doc_id = doctor_id;
        //const schedule_date = this.state.schedule_date;
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
        const appointment_id = '';
        const doctor_name = '';
        const doctor_fees = '';
        const patientName = localStorage.getItem(PATIENT_NAME);
        const schedule_time = '';
        const search_selected_doc_name = this.state.search_selected_doc_name;
        startUserSession(token, user_role, user_email, patient_id, login_phone_number, search_selected_doc_id, schedule_date, appointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name);
        this.props.nextStep();
      }
      /*scheduleDoctor(data)
      .then(res => {
          this.props.nextStep();
      })
      .catch(err => {
        toast.error('Error occured', {
          position: toast.POSITION.BOTTOM_RIGHT
           });
      });*/
    } else {
      /*toast.error('Please select all fields!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });*/
    }
  }
  closePopup = event => {
    document.getElementById('offcanvasExample').style.visibility = 'hidden';
    document.getElementById('offcanvasExample').classList.remove("show");
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
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
    if(localStorage.getItem(SEARCH_SELECTED_DOC_NAME) && localStorage.getItem(SEARCH_SELECTED_DOC_ID) && localStorage.getItem(SCHEDULE_DATE)){
      document.getElementById("Schedule").disabled = false;
      document.getElementById("Schedule").style.background = "#fb6201";
    }
    if(localStorage.getItem(SEARCH_SELECTED_DOC_NAME)){
      this.refreshGetSearchDoctors(localStorage.getItem(SEARCH_SELECTED_DOC_NAME));
    }
  }
  render() {
    let current_date = new Date();
    let newcurrentdate = Moment(current_date).format('YYYY-MM-DD');
    //let site_url = location.protocol + '//' + location.host + "/unitedhospital";
    //let site_url = location.protocol + '//' + location.host;
    return(
      <div className={this.props.showpopup} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
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
              <input placeholder="Enter doctor name" type="text" name="search_keywords" id="search_keywords" className="form-control" defaultValue={localStorage.getItem(SEARCH_SELECTED_DOC_NAME)!=='undefined' ? localStorage.getItem(SEARCH_SELECTED_DOC_NAME) : ''} value={this.state.fields.search_keywords} onChange={this.handleChange} onKeyUp={this.handleKeyUp} required autoComplete="off"/>
              <span style={alertStyle}>{this.state.errors.search_keywords}</span>
              <div className="row mt-3">
              {/*<span style={alertStyle}>{this.state.errors.doctor_id}</span>*/}
              {
                this.state.search_doctors.length > 0
                ?
                  this.state.search_doctors.slice(0,this.state.limit).map(search_doctor => {
                    return(
                      <div className="col-12 sp-0-0 mb-3" key={search_doctor.id}>
                        <div className="doctor-list">
                          <input type="radio" className="doctor_id" name="doctor_id" value={search_doctor.uhl_id} onChange={this.handleChange} doctorName={search_doctor.doctor_name} deptid={search_doctor.dept_id}/>
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
                  <input type="date" id="schedule_date" name="schedule_date" className="form-control schedule_date" defaultValue={localStorage.getItem(SCHEDULE_DATE)} value={this.state.fields.schedule_date} onChange={this.handleChange} min={newcurrentdate} required/>
                  <span style={alertStyle}>{this.state.errors.schedule_date}</span>
                </div>
                <div className="col-6">
                  {/*<a href={site_url+'/index3'} className="btn-links" id="Schedule">Check Schedule</a>*/}
                  <button variant="primary" type="submit" id="Schedule" className="btn-links" disabled>Check Schedule</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer autoClose={5000} /> 
      </div>
    )
  } 
}
export default PopupIndex2;