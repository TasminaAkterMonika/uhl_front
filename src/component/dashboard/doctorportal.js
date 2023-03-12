import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../../constants';
import {Route} from 'react-router-dom';
//import { scAxios } from '../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/dashboard/leftsidebar';
import calender_icon from '../../images/calender-icon.png';
import line from '../../images/line.png';
import line2 from '../../images/line2.png';


class DoctorPortal extends Component {
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
              							<div className="col-sm-7">
                 							<h3>Welcome Shadab!</h3>
              							</div>
              							<div className="col-sm-3">
                							<div className="my-calendar"><img src={calender_icon} alt="calender-icon"/> My Calendar</div>
              							</div>
              							<div className="col-sm-2">
                							<p className="Logout-dash"><a href="#">Logout </a></p>
              							</div>
            						</div>
            					</div>
            					<div className="dash-text sspp mt-4">
                 					<h3>Annoucements </h3>
                 					<hr/> 
                 					<div className="row">
                   						<div className="col-sm-7 text-pera-body">
                     						<p>1. New Seminar Schedule </p><br/>
                     						<p>2. Leave Approved for Dr. Qazi </p>
                   						</div>
                   						<div className="col-sm-3  text-pera-body">
                     						<p className="color-feed">August 15, 2021 </p><br/>
                     						<p className="color-feed">August 15, 2021 </p> 
                   						</div>
                   						<div className="col-sm-2">
                     						<p className="Logout-dash"><a href="#">View </a></p><br/>
                     						<p className="Logout-dash"><a href="#">View </a></p>
                   						</div>
                 					</div>
              					</div>
              					<div className="row">
                					<div className="col-sm-4">
                  						<div className="dash-text sspp mt-4">
                     						<h3>My Activities <i className="fa-solid fa-plus plus-icon"></i> </h3>
                     						<hr/> 
                      						<div className="row">
						                        <div className="col-4">
						                          	<p>9:00 a.m.</p>   
						                        </div>
						                        <div className="col-2">
						                          	<img src={line} alt="line"/>
						                        </div>
						                        <div className="col-6">
						                          	<p>New Seminar Accounced for Dec 27th at 5pm</p>
						                        </div>
                      						</div>
					                      	<div className="row">
						                        <div className="col-4">
						                          	<p>9:00 a.m.</p>   
						                        </div>
						                        <div className="col-2">
						                          	<img src={line} alt="line"/>
						                        </div>
						                        <div className="col-6">
						                          	<p>Call Dr. Zubaida </p>
						                        </div>
					                    	</div>
	                      					<div className="row">
						                        <div className="col-4">
						                          	<p>9:00 a.m.</p>   
						                        </div>
						                        <div className="col-2">
						                          	<img src={line} alt="line"/>
						                        </div>
						                        <div className="col-6">
						                          	<p>Work on new publication </p>
						                        </div>
	                      					</div>
					                      	<div className="row">
						                        <div className="col-4">
						                          	<p>9:00 a.m.</p>   
						                        </div>
						                        <div className="col-2">
						                          	<img src={line} alt="line"/>
						                        </div>
						                        <div className="col-6">
						                          	<p>Meetign with Shamsul Bhai </p>
						                        </div>
					                      	</div>
					                      	<div className="row">
						                        <div className="col-4">
						                          <p>9:00 a.m.</p>   
						                        </div>
						                        <div className="col-2">
						                          <img src={line2} alt="line2"/>
						                        </div>
						                        <div className="col-6">
						                          <p>Online HR Meeting </p>
						                        </div>
					                      	</div> 
                  						</div>
                					</div>
					                <div className="col-sm-8">
					                  	<div className="dash-text sspp mt-4">
					                    	<div className="row">
					                      		<div className="col-sm-8"><h3>My Appointments </h3></div>
					                      		<div className="col-sm-4 text-right"><h3 className="orange">Today <i className="fa-solid fa-calendar"></i> </h3></div>
					                    	</div>
					                     	<hr/> 
					                       	<table className="table table-part">
					                        	<thead>
					                          		<tr>
					                            		<th style={{"width":"25%"}}>SL Name</th>
					                            		<th className="text-center" style={{"width":"50%"}}>Actions</th>
					                            		<th className="text-right" style={{"width":"25%"}}>Time</th>
					                          		</tr>
					                        	</thead>
					                        	<tbody>
		                          					<tr>
		                            					<td>2. Patient A</td>
		                            					<td></td>
		                            					<td className="text-right">10.30 AM</td>
		                          					</tr>
		                          					<tr>
		                            					<td>3. Patient A</td>
		                            					<td></td>
		                            					<td className="text-right">11.30 AM</td>
		                          					</tr>
		                          					<tr>
		                            					<td>4. Patient A</td>
		                            					<td>
		                              						<div className="follow-up">
		                                						<ul>
		                                  							<li>Follow Up</li>
		                                  							<li>View Report</li>
		                                  							<li>View Prescription</li>
		                                  							<li>Refer</li>
		                                						</ul>
		                              						</div>
		                            					</td>
		                            					<td className="text-right">12.30 AM</td>
		                          					</tr>
		                          					<tr>
		                            					<td>5. Patient A</td>
		                            					<td></td>
		                            					<td className="text-right">12.30 AM</td>
		                          					</tr>
		                          					<tr>
		                            					<td>6. Patient A</td>
		                            					<td></td>
		                            					<td className="text-right">12.30 AM</td>
		                          					</tr>
		                          					<tr>
		                            					<td>7. Patient A</td>
		                           						<td></td>
		                            					<td className="text-right">12.30 AM</td>
		                          					</tr>
		                          					<tr>
		                            					<td>8. Patient A</td>
		                            					<td></td>
		                            					<td className="text-right">12.30 AM</td>
		                          					</tr>
		                          					<tr>
		                            					<td>9. Patient A</td>
		                            					<td></td>
		                            					<td className="text-right">12.30 AM</td>
		                          					</tr>
		                          					<tr>
		                            					<td>10. Patient A</td>
		                            					<td></td>
		                            					<td className="text-right">12.30 AM</td>
		                          					</tr>
	                        					</tbody>
	                      					</table>
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
export default DoctorPortal;
