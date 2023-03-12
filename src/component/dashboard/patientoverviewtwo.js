import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../../constants';
import {Route} from 'react-router-dom';
//import { scAxios } from '../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/dashboard/leftsidebar';
import graf2 from '../../images/graf2.png';
import graf3 from '../../images/graf3.png';
import round from '../../images/round-.png';
import dr_photo from '../../images/dr-photo.png';
import hospital from '../../images/hospital.png';
import search_icon from '../../images/search-icon.png';
import lines from '../../images/lines.png';

class PatientOverviewTwo extends Component {
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
							                <p>Name: <b>Shadab Khondoker</b></p>
							                <p>Age:<b> 45 </b></p>
							                <p>Gender: <b>Female</b></p>
							                <p>Phone No:<b>01731057667 </b></p>
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
							                        <button className="btn-notes mt-3 w-100">Schedule Followup</button>
							                    </div>
							                </div>  
							            </div>
						              	<div className="col-sm-4 past-consultations"> 
						                 	<h3 className="mb-3">Past Consultations</h3>  
						                 	<p>August 10, 2020 <b>Consultation</b> with <b>Kazi A Karim</b></p>   
						                 	<p>August 10, 2020 <b>Consultation</b> with <b>Kazi A Karim</b></p>   
						                 	<p>August 10, 2020 <b>Consultation</b> with <b>Kazi A Karim</b></p>   
						                 	<p>August 10, 2020 <b>Consultation</b> with <b>Kazi A Karim</b></p>   
						                 	<p>August 10, 2020 <b>Consultation</b> with <b>Kazi A Karim</b></p>   
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
							    <div className="dash-text sspp  mt-4">
							        <h2 style={{"fontWeight":"700"}}>Blood Test</h2><br/>
							        <img src={lines} alt="lines"/> <br/><br/>
							        <div className="row mt-4 mb-4 dummy">
							          	<div className="col-sm-2">
							            	<h2 style={{"fontWeight":"700"}} className="mt-3 Advise">Advise</h2>
							          	</div>
							          	<div className="col-sm-10">
							            	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make...</p>
							          	</div>
							        </div>
							    </div>
						       	<div className="dash-text sspp upcoming "> 
						           	<div className="row mt-4"> 
						              	<div className="col-sm-4 shadab-boarder">                         
						                    <h3 className="mb-3">Appointments <i className="fa-solid fa-calendar"></i> </h3> 
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
						                         	<button className="btn-notes mt-3 w-100">Schedule Followup</button>
						                       	</div>
						                    </div>  
						              	</div>
							            <div className="col-sm-4 shadab-boarder">                 
							                <h3 className="mb-3">Appointments <i className="fa-solid fa-calendar"></i> </h3> 
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
							                        <button className="btn-notes mt-3 w-100">Schedule Followup</button>
							                    </div>
							                </div>  
							            </div>
							            <div className="col-sm-4">                    
							                <h3 className="mb-3">Appointments <i className="fa-solid fa-calendar"></i> </h3> 
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
							                        <button className="btn-notes mt-3 w-100">Schedule Followup</button>
							                    </div>
							                </div>  
							            </div>             
							        </div> 
							    </div> 
						       	<div className="dash-text sspp mt-4"> 
						        	<h3>Reports</h3>
						        	<table className="table table-part" id="table-apppin"> 
						          		<tbody>
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
								            </tr>
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
export default PatientOverviewTwo;