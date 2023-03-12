import React, { Component } from 'react';
import {API_TOKEN_NAME, PATIENT_NAME, USER_ID, IMAGE_URL} from '../../constants';
import {Route} from 'react-router-dom';
import { scAxios, scAxiosAdmin } from '../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/dashboard/leftsidebar';
import dr_photo from '../../images/dr-photo.png';
import lines from '../../images/lines.png';

const GetPatitentAppointment = (data) => {
  return new Promise((resolve, reject) => {
      const req = scAxios.request('/appointment', {
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
const getSingleDoctorData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/doctors/getsingledoctors/'+id, {
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
class PatientReports extends Component {
	state = {
	    patient_ID: '',
	    patient_age: '',
	    patient_gender: '',
	    patient_name: '',
	    patient_phone: '',
	    latest_consultant:[],
	    doctor_name: '',
	    appointment_date:'',
	    department_name: '',
	    doctor_id:'',
	    doctor_profile:'',
	    patient_report_data:[],
	    paitent_report_doctor_name:'',
  	}
  	refreshGetPatitentAppointment = () => {
	    const data = {
	      xpatient: localStorage.getItem(USER_ID) 
	    }
	    GetPatitentAppointment(data)
	    .then(res => {
	      this.refreshGetDoctorData(res[0].doctor[0].id);
	      this.setState({
	        doctor_name: res[0].doctor[0].name,
	        appointment_date: res[0].date,
	        department_name: res[0].doctor[0].dept_name,
	        doctor_id: res[0].doctor[0].id,
	      });
	    })
	    .catch(err => {
	        console.log(err);
	    });
  	}
  	refreshGetDoctorData = (id) => {
	    getSingleDoctorData(id)
	    .then(res => {
	      if(res.status===true){
	        var records = res.data;
	        this.setState({ 
	          doctor_profile: records.doctor_profile,
	        });
	      } else {
	        this.setState({  
	          doctor_profile: '',
	        });
	      }
	    })
	    .catch(err => {
	        console.log(err);
	    });
  	}
  	componentDidMount(){
    	this.refreshGetPatitentAppointment();
  	}
  	render() {
	    return (
	    	<div>
	    		<section className="dashboard-part">
    				<div className="main-center-box">
      					<div className="flex-part">
      						<Route component={LeftSidebar} />
      						<div className="dash-body" id="dark-version-body"> 
					           	<div className="dash-text">
					            	<div className="row">
					              		<div className="col-sm-9">
					                 		<h3>Welcome Shadab!</h3>
					              		</div> 
					              		<div className="col-sm-3">
					                		<p className="Logout-dash log"><a href="#">Logout </a></p>
					              		</div>
					            	</div>
					            </div>
					            <div className="dash-text sspp  mt-4">
					              	<h2 style={{"fontWeight":"700"}}>Blood Test</h2><br/>
					              	<img src={lines} alt="lines"/> <br/><br/>
					              	<div className="bd-example">
						              	<div className="progress">
														  <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
														</div>
														<div className="progress">
														  <div className="progress-bar" role="progressbar" style={{"width": "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
														</div>
														<div className="progress">
														  <div className="progress-bar" role="progressbar" style={{"width": "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
														</div>
														<div className="progress">
														  <div className="progress-bar" role="progressbar" style={{"width": "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
														</div>
														<div className="progress">
														  <div className="progress-bar" role="progressbar" style={{"width": "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
														</div>
													</div>
					              	<div className="row mt-4 mb-4">
					                	<div className="col-sm-2">
					                  		<h3 style={{"fontWeight":"700"}} className="mt-4 Advise">Advise</h3>
					                	</div>
					                	<div className="col-sm-10">
					                  		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make...</p>
					                	</div>
					              	</div>
					            </div>
					            <div className="dash-text sspp upcoming mt-5">
					                <div className="row mt-4">
					                    <div className="col-sm-4"> 
					                        <h3 className="mb-4">Appointments <i className="fa-solid fa-calendar"></i> </h3> 
					                        <div className="row">
					                           	<div className="col-3 img-sp">
					                             	{ this.state.doctor_profile 
				                                  ?
				                                    <img src={IMAGE_URL+'/DoctorProfileImg/'+this.state.doctor_profile} alt={this.state.doctor_profile}/>
				                                  :
				                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt={this.state.doctor_profile}/>
				                                    /*<img src={dr_photo} alt="drphoto"/>*/
				                                }
					                           	</div>
					                           	<div className="col-9 prof sp-l-r">
					                             	<p><b>{this.state.doctor_name}</b></p>
					                             	<p>{this.state.department_name}</p>
					                             	<p className="date-link">Referred By <span>{this.state.doctor_name}</span> on <a href="#">{this.state.appointment_date}</a></p>
					                           	</div>
					                        </div>
					                        <div className="row">
					                           	<div className="col-5 img-sp">
					                             	<p className="mt-3 Date-time">Date <br/><b>{this.state.appointment_date}</b></p> 
					                           	</div>
					                           	<div className="col-7">                      
					                             	<p className="mt-3 Date-time">Time <br/><b>9:30 am - 10:00 am</b></p>
					                           	</div>
					                           	<div className="col-sm-12">                       
					                             	<button className="btn-notes mt-4 w-100">Schedule Followup</button>
					                           	</div>
					                        </div> 
					                    </div>
					                    {/*<div className="col-sm-4 endocrinology-upcoming"> 
					                        <h3 className="mb-4">Appointments <i className="fa-solid fa-calendar"></i> </h3> 
					                        <div className="row">
					                           	<div className="col-3 img-sp">
					                             	<img src={dr_photo} alt="drphoto"/>
					                           	</div>
					                           	<div className="col-9 prof sp-l-r">
					                             	<p><b>PROF. DR. MUHAMMAD HAFIZUR RAHMAN</b></p>
					                             	<p>Endocrinology & Metabolism</p>
					                             	<p className="date-link">Referred By <span>Kazi A. Karim</span> on <a href="#">Jan 10, 2022</a></p>
					                           	</div>
					                        </div>
					                        <div className="row">
					                           	<div className="col-5 img-sp">
					                             	<p className="mt-3 Date-time">Date <br/><b>Jan 22, 2022</b></p> 
					                           	</div>
					                           	<div className="col-7">                      
					                             	<p className="mt-3 Date-time">Time <br/><b>9:30 am - 10:00 am</b></p>
					                           	</div>
					                           	<div className="col-sm-12">                       
					                             	<button className="btn-notes mt-4 w-100">Schedule Followup</button>
					                           	</div>
					                        </div> 
					                    </div>
					                    <div className="col-sm-4"> 
					                        <h3 className="mb-4">Appointments <i className="fa-solid fa-calendar"></i> </h3> 
					                        <div className="row">
					                           	<div className="col-3 img-sp">
					                             	<img src={dr_photo} alt="drphoto"/>
					                           	</div>
					                           	<div className="col-9 prof sp-l-r">
					                             	<p><b>PROF. DR. MUHAMMAD HAFIZUR RAHMAN</b></p>
					                             	<p>Endocrinology & Metabolism</p>
					                             	<p className="date-link">Referred By <span>Kazi A. Karim</span> on <a href="#">Jan 10, 2022</a></p>
					                           	</div>
					                        </div>
					                        <div className="row">
					                           	<div className="col-5 img-sp">
					                             	<p className="mt-3 Date-time">Date <br/><b>Jan 22, 2022</b></p> 
					                           	</div>
					                           	<div className="col-7">                      
					                             	<p className="mt-3 Date-time">Time <br/><b>9:30 am - 10:00 am</b></p>
					                           	</div>
					                           	<div className="col-sm-12">                       
					                             	<button className="btn-notes mt-4 w-100">Schedule Followup</button>
					                           	</div>
					                        </div> 
					                    </div>*/}
                  					</div>
            					</div>
        					</div>
      					</div>
      				</div>
      			</section>
	    	</div>
	    )
	}
}
export default PatientReports;