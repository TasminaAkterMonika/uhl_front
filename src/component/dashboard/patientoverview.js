import React, { Component } from 'react';
import {API_TOKEN_NAME, PATIENT_NAME, USER_ID, IMAGE_URL} from '../../constants';
import {Route} from 'react-router-dom';
import { scAxios, scAxiosAdmin } from '../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/dashboard/leftsidebar';
import graf2 from '../../images/graf2.png';
import graf3 from '../../images/graf3.png';
import round from '../../images/round-.png';
import dr_photo from '../../images/dr-photo.png';
import hospital from '../../images/hospital.png';
import search_icon from '../../images/search-icon.png';

const GetSinglePatientsData = (data) => {
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
const getPatientReportsData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxios.request('/reports', {
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
class PatientOverview extends Component {
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
	refreshSinglePatientsData = () => {
		const data = {
			patient: localStorage.getItem(USER_ID) 
		}
    GetSinglePatientsData(data)
    .then(res => {
    	this.setState({
    		patient_ID: res[0].patient_ID,
	    	patient_age: res[0].patient_age,
	    	patient_gender: res[0].patient_gender,
	    	patient_name: res[0].patient_name,
	    	patient_phone: res[0].patient_phone,
    	});
    	if(res[0].latest_consultant){
    		this.setState({latest_consultant: res[0].latest_consultant});
    	} else {
    		this.setState({latest_consultant: ''});
    	}
    })
    .catch(err => {
        console.log(err);
    });
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
  refreshGetReportDoctorData = (id) => {
    getSingleDoctorData(id)
    .then(res => {
      if(res.status===true){
        var records = res.data;
        this.setState({ 
          paitent_report_doctor_name: records.doctor_name,
        });
      } else {
        this.setState({  
          paitent_report_doctor_name: '',
        });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  refreshGetPatientReportsData = () => {
  	const data = {
			xpatient: localStorage.getItem(USER_ID) 
		}
    getPatientReportsData(data)
    .then(res => {
    	this.refreshGetReportDoctorData(res[0].doctor_id);
      this.setState({patient_report_data: res});
    })
    .catch(err => {
        console.log(err);
    });
  }
	componentDidMount(){
		this.refreshSinglePatientsData();
		this.refreshGetPatitentAppointment();
		this.refreshGetPatientReportsData();
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
		                 	<h3>Welcome {localStorage.getItem(PATIENT_NAME)}!</h3>
		              	</div> 
		              	<div className="col-sm-3">
		                	<p className="Logout-dash log"><a href="/logout">Logout </a></p>
		              	</div>
			            </div>
           			</div>
					      <div className="row mt-4">
		             	<div className="col-sm-6">
	               		<div className="dash-text sspp icon-and-text">                         
	                 		<div className="row">
                   			<div className="col-sm-2 img-sp">
                     			<img src={round} alt="round-"/>
                   			</div>
                   			<div className="col-sm-10">
                      		<h3 className="Your">Reports </h3>
                  				<p>Lorem Ipsum is simply dummy text of the printing and typesetting. </p>
                   			</div>
	                 		</div>
	               		</div>
		             	</div>
			            <div className="col-sm-6">
			               	<div className="dash-text sspp icon-and-text">                         
			                 	<div className="row">
			                   		<div className="col-sm-2 img-sp">
			                     		<img src={round} alt="round-"/>
			                   		</div>
			                   		<div className="col-sm-10">
			                      		<h3 className="Your">Reports </h3>
			                  			<p>Lorem Ipsum is simply dummy text of the printing and typesetting. </p>
			                   		</div>
			                 	</div>
			               	</div>
			            </div> 
						    </div>
       					<div className="dash-text sspp upcoming "> 
           				<div className="row mt-4">
              			<div className="col-sm-4 shadab-boarder"> 
                 			<h3 className="mb-3">Profile </h3>  
           						<p>Name: <b>{localStorage.getItem(PATIENT_NAME)}</b></p>
           						<p>Age:<b> {this.state.patient_age} </b></p>
           						<p>Gender: <b>{this.state.patient_gender}</b></p>
           						<p>Phone No:<b>{this.state.patient_phone} </b></p>
           						<div className="row mt-4 shadab-boarder-top-left">
           							<div className="col-6">
             							<p><b>Known Conditions</b></p>
             							<p>Asthma</p>
           							</div>
           							<div className="col-6">
             							<p><b> Known Allergies </b></p>
             							<p>Peanuts</p>
           							</div>
           						</div>
               			</div>
						        <div className="col-sm-4 shadab-boarder">                          
						          <h3 className="mb-3 Your">Your Appointments</h3>
						          <h3 className="mb-3">Appointments <i className="fa-solid fa-calendar"></i> </h3> 
	                    <div className="row">
                       	<div className="col-3 img-sp">
                       		{ this.state.doctor_profile 
                       			?
                       				<img src={IMAGE_URL+'/DoctorProfileImg/'+this.state.doctor_profile} alt=""/>
                       			:
                       				<img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt=""/>
                         			/*<img src={dr_photo} alt="drphoto"/>*/
                       		}
                       	</div>
                       	<div className="col-9 prof sp-l-r">
                         	<p><b>{this.state.doctor_name}</b></p>
                         	<p>{this.state.department_name}</p>
                         	<p className="date-link">Referred By <span>{this.state.doctor_name}</span></p>
                         	{/*<p className="date-link">Referred By <span>Kazi A. Karim</span> on <a href="#">Jan 10, 2022</a></p>*/}
                       	</div>
	                    </div>
	                    <div className="row">
                       	<div className="col-5 img-sp">
                       		<p className="mt-3 Date-time">Date <br/><b>{this.state.appointment_date}</b></p>
                         	{/*<p className="mt-3 Date-time">Date <br/><b>Jan 22, 2022</b></p>*/} 
                       	</div>
                       	<div className="col-7"> 
                       		<p className="mt-3 Date-time">Time <br/><b>N/A</b></p>
                         	{/*<p className="mt-3 Date-time">Time <br/><b>9:30 am - 10:00 am</b></p>*/}
                       	</div>
                       	<div className="col-sm-12">                       
                         	<button className="btn-notes mt-3 w-100">Schedule Followup</button>
                       	</div>
	                    </div>  
						        </div>
				            <div className="col-sm-4 past-consultations"> 
				              <h3 className="mb-3">Past Consultations</h3>  
			                {  this.state.latest_consultant.length > 0
			                	?
			                		this.state.latest_consultant.map(latest_consultant_data => {
			                			return(
			                				<p>{latest_consultant_data.date} <b>Consultation</b> with <b>{latest_consultant_data.doctor_detail.name}</b></p>
			                			)
			                		})
			                  :
			                  	<p>No Any Latest Consultations</p> 
			                }
				            </div>             
							    </div> 
							  </div> 
				       	<div className="dash-text sspp icon-and-text mt-5 boarder-r">                         
				         	<div className="row">
			           		<div className="col-lg-6 col-sm-12 step-away">
			              	<h2>Expert  Help is  a  step Away</h2>
		              		<div className="input-group navi-input mb-3">
		                		<input type="text" className="form-control" placeholder="Search for physicans &amp; departments" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
		                		<span className="input-group-text" id="basic-addon2"><img src={search_icon} alt="search-icon"/></span>
		              		</div>
			           		</div> 
			           		<div className="col-lg-6 col-sm-12 ">
			             		<img src={hospital} alt="hospital"/>
			           		</div>
				         	</div>
				       	</div>
						    <div className="dash-text sspp icon-and-text">                         
				         	<div className="row">
			           		<div className="col-lg-10 col-sm-7 step-away">
			              	<h3>Your Stats</h3> 
			           		</div> 
			           		<div className="col-lg-2 col-sm-5">
			            		<div className="dropdown">
		              			<button className="btn btn-secondary dropdown-toggle make-btn w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
		                			BPM <i className="fa-solid fa-chevron-down"></i>
		              			</button>
		              			<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
		                			<li><a className="dropdown-item" href="#">As a Doctor (ID Required) </a></li>
		                			<li><a className="dropdown-item" href="#"> As A Friend / Family</a></li> 
		              			</ul>
			            		</div>
			           		</div>
				         	</div>
					        <div className="row">
				           	<div className="col-sm-6">
				             	<img src={graf2} alt="graf2"/>
				           	</div>
				           	<div className="col-sm-6">
				             	<img src={graf3} alt="graf3"/>
				           	</div>
					        </div>
							  </div> 
						    <div className="dash-text sspp"> 
						      <h3>Reports</h3>
				        	<table className="table table-part" id="table-apppin"> 
				          	<tbody>
				          		{this.state.patient_report_data.length > 0 
				          			?
				          				this.state.patient_report_data.map((patient_report) =>{
				          					return(
				          						<tr>
								              	<td>{patient_report.date_of_generated_report}</td>
								              	<td><b>{patient_report.report_type}</b></td>
								              	<td>ordered by </td>
								              	<td><b>{this.state.paitent_report_doctor_name}</b></td>
								              	<td style={{"width":"25%"}}></td>
							             			<td style={{"text-align":"right", "width":"15%"}}>
							              			<button className="btn btn-karim">Download</button>
							            			</td>
										            <td style={{"text-align":"right", "width":"15%"}}>
										              <button className="btn btn-karim">view</button>
										            </td>
				            					</tr>
				          					)
				          				})
				          			:
				          				<tr><td>No any reports found</td></tr>
				          		}
				            	{/*<tr>
				              	<td>August 10, 2020</td>
				              	<td><b>Blood Test </b></td>
				              	<td>ordered by </td>
				              	<td><b>Kazi A Karim</b></td>
				              	<td style={{"width":"25%"}}></td>
			             			<td style={{"text-align":"right", "width":"15%"}}>
			              			<button className="btn btn-karim">Download</button>
			            			</td>
						            <td style={{"text-align":"right", "width":"15%"}}>
						              <button className="btn btn-karim">view</button>
						            </td>
				            	</tr>
					            <tr>
				              	<td>August 10, 2020</td>
				              	<td><b>Blood Test </b></td>
				              	<td>ordered by </td>
				              	<td><b>Kazi A Karim</b></td>
				              	<td style={{"width":"25%"}}></td>
					             	<td style={{"text-align":"right", "width":"15%"}}>
					              	<button className="btn btn-karim">Download</button>
					            	</td>
					            	<td style={{"text-align":"right", "width":"15%"}}>
					              	<button className="btn btn-karim">view</button>
					            	</td>
					            </tr>
					            <tr>
				              	<td>August 10, 2020</td>
				              	<td><b>Blood Test </b></td>
				              	<td>ordered by </td>
				              	<td><b>Kazi A Karim</b></td>
				              	<td style={{"width":"25%"}}></td>
					             	<td style={{"text-align":"right", "width":"15%"}}></td>
						            <td style={{"text-align":"right", "width":"15%"}}>
						              <button className="btn btn-karim pending">Pending </button>
						            </td>
					            </tr>
					            <tr>
				              	<td>August 10, 2020</td>
				              	<td><b>Blood Test </b></td>
				              	<td>ordered by </td>
				              	<td><b>Kazi A Karim</b></td>
				              	<td style={{"width":"25%"}}></td>
					             	<td style={{"text-align":"right", "width":"15%"}}>
					              	<button className="btn btn-karim">Download</button>
					            	</td>
					            	<td style={{"text-align":"right", "width":"15%"}}>
					              	<button className="btn btn-karim">view</button>
					            	</td>
					            </tr>*/}
				          	</tbody>
				        	</table>
						    </div>
						    <div className="dash-text sspp mt-4"> 
						      <h3>Prescriptions </h3>
				        	<table className="date-table">
			          		<tr>
		              		<td style={{"width":"65%"}}><p>August 10, 2020 <b>Prescription</b> ordered by <b>Kazi A Karim</b></p></td>
		               		<td style={{"text-align":"right"}}>
		                		<button className="btn btn-karim">View</button>
		              		</td>
		              		<td style={{"text-align":"right"}}>
		                		<button className="btn btn-karim">Download</button>
		              		</td>
		              		<td style={{"text-align":"right"}}>
		                		<button className="btn btn-karim">Buy Online</button>
		              		</td>
		              		<td><i className="fa-solid fa-angle-down"></i></td>
			            	</tr>
				        	</table>
						      <br/>
						      <br/>
					        <table className="table table-part bold-td" id="table-apppin"> 
				          	<tbody>
				            	<tr>
			              		<th>Name</th>
			              		<th>Morning</th>
			              		<th>Noon</th>
			              		<th>Dinner</th>
			              		<th>Duration</th>
			              		<th>Remarks</th>
			              		<th></th>
			              		<th></th>
				            	</tr>
				            	<tr>
			              		<td>Med object 1 50 mg</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td>30 Dayes</td>
				              	<td>On full stomach only </td> 
				               	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">View</button>
				              	</td>
				              	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">Download</button>
				              	</td>
				              	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">Buy Online</button>
				              	</td>
				              	<td><i className="fa-solid fa-plus"></i></td>
				            	</tr>
					            <tr>
				              	<td>Med object 1 50 mg</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td>30 Dayes</td>
				              	<td>On full stomach only </td> 
				              	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">View</button>
				              	</td>
				              	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">Download</button>
				              	</td>
				              	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">Buy Online</button>
				              	</td>
				              	<td><i className="fa-solid fa-plus"></i></td>
					            </tr>
					            <tr>
				              	<td>Med object 1 50 mg</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td>30 Dayes</td>
				              	<td>On full stomach only </td> 
				               	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">View</button>
				              	</td>
				              	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">Download</button>
				              	</td>
				              	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">Buy Online</button>
				              	</td>
				              	<td><i className="fa-solid fa-plus"></i></td>
					            </tr>
					            <tr>
				              	<td>Med object 1 50 mg</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td style={{"text-align":"center"}}>1</td>
				              	<td>30 Dayes</td>
				              	<td>On full stomach only </td> 
				              	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">View</button>
				              	</td>
				              	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">Download</button>
				              	</td>
				              	<td style={{"text-align":"right"}}>
				                	<button className="btn btn-karim">Buy Online</button>
				              	</td>
				              	<td><i className="fa-solid fa-plus"></i></td>
					            </tr>
				          	</tbody>
					        </table>
					        <br/>  
					        <br/>  
					        <div className="ordered">
				          	<p>August 10, 2020 <b>Blood Test</b> ordered by <b>Kazi A Karim</b></p>
				          	<hr/>
				          	<p>August 10, 2020 <b>Blood Test</b> ordered by <b>Kazi A Karim</b></p>
				          	<hr/>
				          	<p>August 10, 2020 <b>Blood Test</b> ordered by <b>Kazi A Karim</b></p>
					        </div>
       					</div>
					      <div className="row" id="Metabolism">
					        <div className="col-lg-6 col-sm-12">
					          <div className="dash-text sspp mt-4">                          
					            <h3 className="mb-3 Your">Follow Up Appointments </h3>
					            <hr/> 
	                 		<div className="row">
                   			<div className="col-sm-8">
                     			<div className="row">
                     				<div className="col-2 img-sp">
                       				<img src={dr_photo} alt="drphoto"/>
                     				</div>
                     				<div className="col-10 prof sp-l-r">
                       				<p><b>PROF. DR. MUHAMMAD HAFIZUR RAHMAN</b></p>
                       				<p>Endocrinology & Metabolism </p> 
                     				</div>
                     			</div>
                   			</div>
                   			<div className="col-sm-4  text-right">
                     			<p className="mt-2"><i className="fa-solid fa-calendar"></i> Book Now</p> 
                   			</div>
	                 		</div>
							        <hr/> 
			                <div className="row">
		                   	<div className="col-sm-8">
		                     	<div className="row">
	                       		<div className="col-2 img-sp">
	                         		<img src={dr_photo} alt="drphoto"/>
	                       		</div>
	                       		<div className="col-10 prof sp-l-r">
	                         		<p><b>PROF. DR. MUHAMMAD HAFIZUR RAHMAN</b></p>
	                         		<p>Endocrinology & Metabolism </p> 
	                       		</div>
		                     	</div>
		                   	</div>
		                   	<div className="col-sm-4  text-right">
		                     	<p className="mt-2"><i className="fa-solid fa-calendar"></i> Book Now</p> 
		                   	</div>
			                </div>
							      </div>
							    </div> 
			            <div className="col-lg-6 col-sm-12">
			              <div className="dash-text sspp mt-4">                          
			                <h3 className="mb-3 Your">Packages </h3>
			                <hr/> 
		                 	<div className="row">
	                   		<div className="col-sm-8"> 
	                    		<p>Cardiac Packages </p>
	                   		</div>
	                   		<div className="col-sm-4  text-right">
	                     		<p className="mt-2"><i className="fa-solid fa-calendar"></i> Book Now</p> 
	                   		</div>
		                 	</div>
			                <hr/> 
		                	<div className="row">
	                   		<div className="col-sm-8"> 
	                    		<p>Cardiac Packages </p>
	                   		</div>
	                   		<div className="col-sm-4  text-right">
	                     		<p className="mt-2"><i className="fa-solid fa-calendar"></i> Book Now</p> 
	                   		</div>
		                 	</div>
			             	</div> 
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
export default PatientOverview;