import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../../constants';
import {Route} from 'react-router-dom';
//import { scAxios } from '../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/dashboard/leftsidebar';
import dr_photo from '../../images/dr-photo.png';
import lines from '../../images/lines.png';
class PatientReports extends Component {
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
					                    <div className="col-sm-4 endocrinology-upcoming"> 
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
export default PatientReports;