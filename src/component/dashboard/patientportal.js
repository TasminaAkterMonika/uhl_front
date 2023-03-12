import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../../constants';
import {Route} from 'react-router-dom';
//import { scAxios } from '../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import WhiteLeftSidebar from '../../component/dashboard/whiteleftsidebar';
import doctor from '../../images/doctor.jpg';
import Baby_Girl from '../../images/Baby-Girl.png';
import Wife from '../../images/Wife.png';
import Mother from '../../images/Mother.png';
import icon2 from '../../images/icon-2.png';
import icon3 from '../../images/icon-3.png';
import icon4 from '../../images/icon-4.png';
import icon5 from '../../images/icon-5.png';
import icon6 from '../../images/icon-6.png';
import cardiac from '../../images/cardiac.svg';
import Bitmap2 from '../../images/Bitmap-2.png';

class PatientPortal extends Component {
  	render() {
	    return (
	    	<div>
	    		<section className="dashboard-part">
          			<div className="main-center-box">
            			<div className="flex-part">
              				<Route component={WhiteLeftSidebar} />
              				<div className="dash-body">
					         	<div className="row">
					            	<div className="col-sm-4">
					              		<div className="dash-text">
					                		<p>Hello Shadab!</p>
					              		</div>
					            	</div>
					            	<div className="col-sm-2"></div>
					            	<div className="col-sm-6">
					              		<div className="input-group search-icon" id="form-search">
					                		<input type="text" className="form-control" placeholder="Search for physicans & departments…"/>
					                		<div className="input-group-prepend">
					                  			<span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-magnifying-glass"></i></span>
					                		</div>
					              		</div>
					            	</div>
					          	</div>
					          	<div className="row mt-3">
					            	<div className="col-lg-4 col-md-12">
					              		<div className="dash-text sspp">
					                 		<h3>Upcoming Appointments</h3>
					                 		<hr/>
					                 		<div className="row">
					                   			<div className="col-2 img-sp">
					                     			<img src={doctor} alt="drphoto"/>
					                   			</div>
					                   			<div className="col-9 prof sp-l-r px-2">
					                     			<p><b>PROF. DR. MUHAMMAD HAFIZUR RAHMAN</b></p>
					                     			<p>Endocrinology & Metabolism</p>
					                   			</div>
					                 		</div>
					                 		<div className="row">
					                   			<div className="col-7 prof img-sp">
					                     			<p className="mt-3">Date <br/><b>Jan 22, 2022</b></p> 
					                     			<p className="mt-2">Time <br/><b>9:30 am - 10:00 am</b></p>
					                   			</div>
					                   			<div className="col-5">
					                     			<button className="btn-notes mt-4">Add Notes</button>
					                   			</div>
					                 		</div>
					              		</div>
					            	</div>
						            <div className="col-lg-8 col-md-12">
						              	<div className="dash-text sspp">
						                 	<h3>Previous Appointments</h3>
						                 	<div className="table-appoin mt-3">
						                   		<div className="dash-text sspp  prof font-table">
						                     		<div className="row scrool">
						                       			<div className="col-2 border-right">
						                          			<p>9 am <br/><b>May 1, 2022</b></p>
						                       			</div>
								                       	<div className="col-4 border-right">
								                         	<p>PROF. DR. MUHAMMAD HAFIZUR RAHMAN <br/><b>Endocrinology & Metabolism</b></p>
								                       	</div>
						                       			<div className="col-3 border-right">
						                        			<div className="row">
						                          				<div className="col-6 img-sp text-center">
						                            				<p>Write Your Review <br/>
						                              					<i className="fa-solid fa-star"></i>
						                              					<i className="fa-solid fa-star"></i>
						                              					<i className="fa-solid fa-star"></i>
						                              					<i className="fa-solid fa-star"></i>
						                              					<i className="fa-solid fa-star"></i>
						                             				</p>
						                          				</div>
						                          				<div className="col-6 sp-l-r  text-center">
						                            				<h5><i className="fa-solid fa-calendar"></i> Follow Up</h5>
						                          				</div>
						                        			</div>
						                       			</div>
						                       			<div className="col-1 sp-l-r text-center border-right">
						                         			<p>Reports</p>
						                       			</div>
						                       			<div className="col-2 sp-l-r text-center">
						                         			<p>Prescriptions</p>
						                       			</div>
						                     		</div>
						                   		</div>
						                   		<div className="dash-text sspp  prof font-table mt-3">
						                     		<div className="row scrool">
							                       		<div className="col-2 border-right">
							                          		<p>9 am <br/><b>May 1, 2022</b></p>
							                       		</div>
								                       	<div className="col-4 border-right">
								                         	<p>PROF. DR. MUHAMMAD HAFIZUR RAHMAN <br/><b>Endocrinology & Metabolism</b></p>
								                       	</div>
								                       	<div className="col-3 border-right">
								                        	<div className="row">
								                          		<div className="col-6 img-sp text-center">
								                            		<p>Write Your Review <br/>
								                              			<i className="fa-solid fa-star"></i>
								                              			<i className="fa-solid fa-star"></i>
								                              			<i className="fa-solid fa-star"></i>
								                              			<i className="fa-solid fa-star"></i>
								                              			<i className="fa-solid fa-star"></i>
								                             		</p>
								                          		</div>
								                          		<div className="col-6 sp-l-r  text-center">
								                            		<h5><i className="fa-solid fa-calendar"></i> Follow Up</h5>
								                          		</div>
								                        	</div>
								                       	</div>
								                       	<div className="col-1 sp-l-r text-center border-right">
								                         	<p>Reports</p>
								                       	</div>
								                       	<div className="col-2 sp-l-r text-center">
								                         	<p>Prescriptions</p>
								                       	</div>
						                     		</div>
						                   		</div>
						                 	</div>
						              	</div>
						            </div>
						        </div>
					          	<div className="dash-text sspp mt-3">
						            <h3>Family Members &nbsp;&nbsp;<button className="btn-notes ">Add Family Members</button> </h3>
						            <div className="row mt-4">
						              	<div className="col-sm-4">
						                	<div className="do-list">
						                    	<div className="doc-text text-center">
						                    		<img src={Baby_Girl} alt="Baby-Girl"/>
						                    		<h4>My Daughter</h4>
						                    		<p><span>Age: 32+ &nbsp;&nbsp; Gender: F</span></p>
						                    	</div>
						                    	<p>Known Ailments/Conditions: N/A</p>
						                    	<p><b>Last Follow-Up </b> &nbsp;&nbsp; 1+ year ago</p>
						                    	<br/>
						                    	<br/> 
						                	</div>
						                	<div className="follow-mm">
						                  		<div className="d-flex">
						                      		<div className="boxs"><a href="#">Reports</a></div>
						                      		<div className="boxs"><a href="#">Prescriptions</a></div>
						                      		<div className="boxs"><a href="#">View Dashboard</a></div>
						                    	</div>
						                	</div>
						              	</div>
							            <div className="col-sm-4">
							                <div className="do-list">
							                    <div className="doc-text text-center">
							                    	<img src={Wife} alt="Wife"/>
							                    	<h4>My Wife</h4>
							                    	<p><span>Age: 32+ &nbsp;&nbsp; Gender: F</span></p>
							                    </div>
							                    <p>Known Ailments/Conditions: N/A</p>
							                    <p><b>Last Follow-Up </b> &nbsp;&nbsp; 1+ year ago</p>
							                    <br/>
							                    <br/> 
							                </div>
							                <div className="follow-mm">
							                  	<div className="d-flex">
							                      	<div className="boxs"><a href="#">Reports</a></div>
							                      	<div className="boxs"><a href="#">Prescriptions</a></div>
							                      	<div className="boxs"><a href="#">View Dashboard</a></div>
							                    </div>
							                </div>
							            </div>
							            <div className="col-sm-4">
							                <div className="do-list">
							                    <div className="doc-text text-center">
							                    	<img src={Mother} alt="Mother"/>
							                    	<h4>My Mother</h4>
							                    	<p><span>Age: 32+ &nbsp;&nbsp; Gender: F</span></p>
							                    </div>
							                    <p>Known Ailments/Conditions: N/A</p>
							                    <p><b>Last Follow-Up </b> &nbsp;&nbsp; 1+ year ago</p>
							                    <br/>
							                    <br/> 
							                </div>
							                <div className="follow-mm">
							                  	<div className="d-flex">
							                      	<div className="boxs"><a href="#">Reports</a></div>
							                      	<div className="boxs"><a href="#">Prescriptions</a></div>
							                      	<div className="boxs"><a href="#">View Dashboard</a></div>
							                    </div>
							                </div>
							             </div>
							        </div>
							    </div>
					          	<div className="reports mt-4">
					            	<div className="follow-mm">
					              		<div className="d-flex">
					                		<div className="boxs rep"><a href="#">Reports</a></div>
					                		<div className="boxs"><a href="#" className="your-stats">Your Stats</a></div>
					                		<div className="boxs"><a href="#">Prescription</a></div>
					              		</div>
					            	</div>
						            <div className="row">
						              	<div className="col-sm-3">
						                	<ul className="blood-report">
						                  		<li><a href="#">Blood Test Report <br/><span>Dec 17, 2021</span></a></li>
						                  		<li><a href="#">Blood Test Report <br/><span>Dec 17, 2021</span></a></li>
						                  		<li><a href="#">Blood Test Report <br/><span>Dec 17, 2021</span></a></li>
						                  		<li><a href="#">Blood Test Report <br/><span>Dec 17, 2021</span></a></li>
						                  		<li className="view-all"> <a href="#">View All Reports eports</a></li>
						                	</ul>
						              	</div>
						              	<div className="col-sm-9">
						                	<div className="dash-text sspp progressbar-part">
						                  		<div className="row">
								                    <div className="col-sm-2 sp-l-r">
								                      	<p>WBC (billion/L) </p>
								                    </div>
						                    		<div className="col-sm-10">
						                      			<div className="progress">
						                         			<p>25%</p>
						                        			<div className="progress-bar" role="progressbar" style={{"width": "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> </div>
						                      			</div>
						                    		</div>
						                  		</div>
					                  			<div className="row mt-2">
								                    <div className="col-sm-2 sp-l-r">
								                      	<p>Neutrophils (%)  </p>
								                    </div>
					                    			<div className="col-sm-10">
								                      	<div className="progress">
								                         	<p>25%</p>
								                        	<div className="progress-bar" role="progressbar" style={{"width": "35%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> </div>
								                      	</div>
					                    			</div>
					                  			</div>
							                  	<div className="row mt-2">
								                    <div className="col-sm-2 sp-l-r">
								                      	<p>Lymphocytes (%) </p>
								                    </div>
							                    	<div className="col-sm-10">
							                      		<div className="progress">
							                         		<p>25%</p>
							                        		<div className="progress-bar" role="progressbar" style={{"width": "45%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> </div>
							                      		</div>
							                    	</div>
							                  	</div>
							                  	<div className="row mt-2">
								                    <div className="col-sm-2 sp-l-r">
								                      	<p>Monocytes (%) </p>
								                    </div>
							                    	<div className="col-sm-10">
							                      		<div className="progress">
							                         		<p>25%</p>
							                        		<div className="progress-bar" role="progressbar" style={{"width": "20%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> </div>
							                      		</div>
							                    	</div>
							                  	</div>
							                  	<div className="row mt-2">
								                    <div className="col-sm-2 sp-l-r">
								                      	<p>WEosinophils (%) </p>
								                    </div>
							                    	<div className="col-sm-10">
							                      		<div className="progress">
							                         		<p>25%</p>
							                        		<div className="progress-bar" role="progressbar" style={{"width": "88%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> </div>
							                      		</div>
							                    	</div>
							                  	</div>
							                  	<div className="row mt-2">
								                    <div className="col-sm-2 sp-l-r">
								                      	<p>Basophils (%)  </p>
								                    </div>
							                    	<div className="col-sm-10">
							                      		<div className="progress">
							                         		<p>25%</p>
							                        		<div className="progress-bar" role="progressbar" style={{"width": "75%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> </div>
							                      		</div>
							                    	</div>
							                  	</div>
							                  	<div className="row mt-2">
								                    <div className="col-sm-2 sp-l-r">
								                      	<p>RBCs (trillion/L)</p>
								                    </div>
							                    	<div className="col-sm-10">
							                      		<div className="progress">
							                         		<p>25%</p>
							                        		<div className="progress-bar" role="progressbar" style={{"width": "29%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> </div>
							                      		</div>
							                    	</div>
							                  	</div>
								                <div className="row mt-2">
								                    <div className="col-sm-2 sp-l-r">
								                      	<p>Hb (g/dL)  </p>
								                    </div>
								                    <div className="col-sm-10">
								                      	<div className="progress">
								                         	<p>25%</p>
								                        	<div className="progress-bar" role="progressbar" style={{"width": "37%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> </div>
								                      	</div>
								                    </div>
								                </div>
							                  	<div className="row mt-2">
								                    <div className="col-sm-2 sp-l-r">
								                      	<p>Hematocrit (%)</p>
								                    </div>
								                    <div className="col-sm-10">
								                      	<div className="progress">
								                         	<p>25%</p>
								                        	<div className="progress-bar" role="progressbar" style={{"width": "46%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> </div>
								                      	</div>
								                    </div>
							                  	</div>
							                  	<div className="row mt-2">
								                    <div className="col-sm-2 sp-l-r">
								                      	<p>Platelets (billion/L)  </p>
								                    </div>
								                    <div className="col-sm-10">
								                      	<div className="progress">
								                         	<p>25%</p>
								                        	<div className="progress-bar" role="progressbar" style={{"width": "88%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> </div>
								                      	</div>
								                    </div>
							                  	</div>
							                </div>
							            </div>
							        </div>
							    </div>
					          	<div className="dash-text sspp mt-3">
					            	<div className="row">
					              		<div className="col-sm-5">
					                		<h3>Recommended Check Ups</h3>
					              		</div>
					              		<div className="col-sm-7 months-text">
					                		<p>Recommended in 4 months. Last one was 1 year ago</p>
					              		</div>
					            	</div>
					            	<hr/>
						            <div className="row">
						                <div className="col-12 icon-7">
						                    <div id="news-slider" className="owl-carousel">
						                        <div className="post-slide">
						                          	<span><img src={icon2} alt="icon-2"/></span>
						                          	<p>General Health</p>
						                        </div>
						                        <div className="post-slide">
						                            <span><img src={cardiac} alt="cardiac"/></span>
						                            <p>Cardiac</p>
						                        </div>
						                        <div className="post-slide">
						                            <span><img src={icon3} alt="icon-3"/></span>
						                            <p>Orthopedics</p>
						                        </div>
						                        <div className="post-slide">
						                            <span><img src={icon4} alt="icon-4"/></span>
						                            <p>Oncology</p>
						                        </div>
						                        <div className="post-slide">
						                            <span><img src={icon5} alt="icon-5"/></span>
						                            <p>Materity</p>
						                        </div>
						                        <div className="post-slide">
						                            <span><img src={icon6} alt="icon-6"/></span>
						                            <p>Hepatology</p>
						                        </div>
						                        <div className="post-slide">
						                            <span><img src={cardiac} alt="cardiac.svg"/></span>
						                            <p>Cardiac</p>
						                        </div>
						                        <div className="post-slide">
						                            <span><img src={icon4} alt="icon-4"/></span>
						                            <p>Oncology</p>
						                        </div>
						                    </div>
						                </div>
						            </div>
						            <div className="row mt-5">
						                <div className="col-sm-4">
						                  	<div className="doctor-list">
						                      	<div className="row">
						                        	<div className="col-5">
						                          		<img src={Bitmap2} alt="Bitmap-2"/>
						                        	</div>
						                        	<div className="col-7">
						                          		<h4>Pregnancy Package 1</h4>
						                           		<p className="mt-3 mb-4">BDT <br/> 9,800.00</p>
						                           		<p><b>More Information</b></p>
						                        	</div>
						                      	</div>
						                  	</div>
						                </div>
						                <div className="col-sm-4">
						                  	<div className="doctor-list">
						                      	<div className="row">
						                        	<div className="col-5">
						                          		<img src={Bitmap2} alt="Bitmap-2"/>
						                        	</div>
						                        	<div className="col-7">
						                          		<h4>Pregnancy Package 1</h4>
						                           		<p className="mt-3 mb-4">BDT <br/> 9,800.00</p>
						                           		<p><b>More Information</b></p>
						                        	</div>
						                      	</div>
						                  	</div>
						                </div>
						                <div className="col-sm-4">
						                  	<div className="doctor-list">
						                      	<div className="row">
						                        	<div className="col-5">
						                          		<img src={Bitmap2} alt="Bitmap-2"/>
						                        	</div>
						                        	<div className="col-7">
						                          		<h4>Pregnancy Package 1</h4>
						                           		<p className="mt-3 mb-4">BDT <br/> 9,800.00</p>
						                           		<p><b>More Information</b></p>
						                        	</div>
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
export default PatientPortal;