import React, { Component } from 'react';
import {API_TOKEN_NAME, PATIENT_NAME, USER_ID, IMAGE_URL} from '../../constants';
import {Route} from 'react-router-dom';
import { scAxios, scAxiosAdmin } from '../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/dashboard/leftsidebar';
import dr_photo from '../../images/dr-photo.png';
import round from '../../images/round-.png';
import icon2 from '../../images/icon-2.png';
import icon3 from '../../images/icon-3.png';
import icon4 from '../../images/icon-4.png';
import icon5 from '../../images/icon-5.png';
import icon6 from '../../images/icon-6.png';
import cardiac from '../../images/cardiac.svg';
import Bitmap2 from '../../images/Bitmap-2.png';
import hospital from '../../images/hospital.png';
import search_icon from '../../images/search-icon.png';
import graf2 from '../../images/graf2.png';
import graf3 from '../../images/graf3.png';

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
class Appointments extends Component {
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
  componentDidMount(){
    this.refreshSinglePatientsData();
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
                <div className="row mt-4">
                  <div className="col-sm-4"> 
                    <div className="dash-text sspp">                       
                      <h3 className="mb-3 Your">Your Appointments</h3>
                      <h3 className="mb-3">Appointments <i className="fa-solid fa-calendar"></i> </h3> 
                      {this.state.appointment_date  
                        ?
                          <div>
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
                                <button className="btn-notes mt-3">Schedule Followup</button>
                              </div>
                            </div> 
                          </div>
                        :
                          <p>No appointment data found</p>
                      }
                    </div>
                  </div>
                  <div className="col-sm-5"> 
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
                    <div className="dash-text sspp icon-and-text">                         
                      <div className="row">
                        <div className="col-sm-2 img-sp">
                          <img src={round} alt="round-"/>
                        </div>
                        <div className="col-sm-10">
                          <h3 className="Your">Prescriptions </h3>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting. </p>
                        </div>
                      </div>
                    </div> 
                    <div className="dash-text sspp icon-and-text">                         
                      <div className="row">
                        <div className="col-sm-2 img-sp">
                          <img src={round} alt="round-"/>
                        </div>
                        <div className="col-sm-10">
                          <h3 className="Your">Connect Your Apple Watch </h3>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting. </p>
                        </div>
                      </div>
                    </div> 
                  </div>
                  <div className="col-sm-3"> 
                    <div className="dash-text sspp update-profile Alergies">                          
                      <h3 className="mb-3">Your Profile </h3> 
                      <hr/>
                      <p>Update Profile</p>
                      <p>Conditions & Alergies </p>
                      <p>Upload Reports </p>
                      <p>Gift A Friend or Family </p> 
                    </div>
                    <div className="dash-text sspp family-members mt-4">  
                      <input type="file"/>                        
                      <div className="row">
                        <div className="col-sm-3 img-sp text-center">
                          <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className="col-sm-9">
                          <h3>Add Family Members</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="dash-text sspp">   
                  <h3>Patient Overview </h3>                      
                  <hr className="overview"/>
                  <div className="row">
                    <div className="col-sm-4 shadab-boarder"> 
                      <h3 className="mb-3">Profile </h3>  
                      <p>Name: <b>{this.state.patient_name}</b></p>
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
                    <div className="col-sm-8 pb-3a">
                      <h3 className="Your">Past Consultations</h3>
                      <table className="table table-part" id="table-apppin"> 
                        <tbody>
                          {  this.state.latest_consultant.length > 0
                            ?
                              this.state.latest_consultant.map(latest_consultant_data => {
                                return(
                                  <tr>
                                    <td>{latest_consultant_data.date} <b>Consultation</b> with <b>{latest_consultant_data.doctor_detail.name}</b></td>
                                    <td className="text-right">
                                      <i className="fa-regular fa-star"></i>
                                      <i className="fa-regular fa-star"></i>
                                      <i className="fa-regular fa-star"></i>
                                      <i className="fa-regular fa-star"></i>
                                      <i className="fa-regular fa-star"></i>
                                    </td>
                                    {/*<td className="text-right"> 4 <i className="fa-solid fa-star" style={{ color: '#ffc45b' }}></i> 
                                    <button className="btn btn-secondary">Details</button></td>*/}
                                  </tr>
                                )
                              })
                            :
                              <p>No Any Latest Consultations</p> 
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> 
                <div className="dash-text sspp mt-4">
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
                            <p className="mt-3 mb-4">BDT 9,800.00</p>
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
                            <p className="mt-3 mb-4">BDT 9,800.00</p>
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
                            <p className="mt-3 mb-4">BDT 9,800.00</p>
                            <p><b>More Information</b></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dash-text sspp icon-and-text mt-5 boarder-r">                         
                  <div className="row">
                    <div className="col-lg-6 col-sm-12 step-away">
                      <h2>Expert Help is a step Away</h2>
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
                        <button className="btn btn-secondary dropdown-toggle make-btn w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">BPM <i className="fa-solid fa-chevron-down"></i></button>
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
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Appointments;