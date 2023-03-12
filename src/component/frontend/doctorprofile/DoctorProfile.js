import React, { Component } from 'react';
import {API_TOKEN_NAME, IMAGE_URL} from '../../../constants';
import { scAxios,scAxiosAdmin } from '../../..';
import 'react-toastify/dist/ReactToastify.css';
import banner_img from '../../../images/banner-profile.jpg';
import Bitmap from '../../../images/Bitmap.png';
//import happy_patient from '../../../images/happy-patient.png';
import testimonials_img from '../../../images/testimonials-img.jpg';
import SubPopupIndex2 from '../../../component/frontend/SubPopupIndex2';
import call_icon from '../../../images/call-icon.jpg';
import Slider from "react-slick";
import $ from 'jquery';

const getSingleDoctorData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/doctors/getsingledoctorprofiledata/'+id, {
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
const getDoctorPublicationsData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/publications/getdoctorpublications/'+id, {
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
const getDoctorTestimonials = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/testimonials/getdoctortestimonials', {
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
const getSingleDoctorScheduleData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxios.request('/doctors', {
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
class DoctorProfile extends Component {
  state = {
    doctor_name:'',
    doctor_desc:'',
    doctor_profile:'',
    doctor_degree:'',
    doctor_fees:'',
    doctor_publications:[],
    doctor_edu: '',
    doctor_exp: '',
    showDoctorSearchPopup:false,
    testimonials: [],
    doctor_schedules_time:[],
  }
  handleChange = event => { 
    this.setState({
        [event.target.name]: event.target.value
    });
    var doctor_avability_time = $("input[name='doctor_avability_time']:checked").val();
    if(doctor_avability_time){
      $(".doctor_search_list_popup").css("visibility", 'visible');
      $(".doctor_search_list_popup").addClass('show');
      this.setState({
        showDoctorSearchPopup:true
      });
    }
  }
  bookAppointmentPopup = () => {
    $(".doctor_search_list_popup").css("visibility", 'visible');
    $(".doctor_search_list_popup").addClass('show');
    this.setState({
      showDoctorSearchPopup:true
    });
  }
  refreshGetDoctorData = (id) => {
    getSingleDoctorData(id)
    .then(res => {
      if(res.status===true){
        var records = res.data;
        this.setState({ 
          doctor_name: records.doctor_name, 
          doctor_desc: records.doctor_desc,
          doctor_profile: records.doctor_profile,
          doctor_degree: records.degree,
          doctor_fees: records.doctor_fees,
          doctor_edu: records.doctor_edu,
          doctor_exp: records.doctor_exp
        });
        this.refreshGetSingleDoctorScheduleData(records.uhl_id);
      } else {
        this.setState({ 
          doctor_name: '', 
          doctor_desc: '',
          doctor_profile: '',
          doctor_degree: '',
          doctor_fees: '',
          doctor_edu: '',
          doctor_exp:''
        });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  refreshGetDoctorTestimonials = (doctor_id) => {
    const data = {
      doctor_id: doctor_id,
    }
    getDoctorTestimonials(data)
    .then(res => {
      if(res.status===true){
          var records = res.data;
          this.setState({ testimonials: records });
      } else {
          this.setState({ testimonials: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  refreshGetDoctorPublicationsData = (id) => {
    getDoctorPublicationsData(id)
    .then(res => {
      if(res.status===true){
        var records = res.data;
        this.setState({ 
          doctor_publications: records, 
        });
      } else {
        this.setState({ 
          doctor_publications: '', 
        });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  refreshGetSingleDoctorScheduleData = (doctorId) => {
    const data = {
      doctor: doctorId
    }
    getSingleDoctorScheduleData(data)
    .then(res => {
      this.setState({doctor_schedules_time: res[0].Doctor_Schedule[0]});
    })
    .catch(err => {
      console.log(err);
    });
  }
  componentDidMount(){
    let doctor_name_string = this.props.currentDocId;
    let doctor_id = doctor_name_string.split("~").pop();
    //let doctor_name = doctor_name_string.split("~")[0];
    //let new_doctor_name = doctor_name.replaceAll('-', ' ');
    this.refreshGetDoctorData(doctor_id);
    this.refreshGetDoctorPublicationsData(doctor_id);
    this.refreshGetDoctorTestimonials(doctor_id);
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    };
    var doctor_avability_day = $("input[name='doctor_avability_time']:checked").attr('avabilityDay');
    return(
      <div>
        <section className="banner-hero">
          <img src={banner_img} alt="banner-profile" className="w-100" />
        </section>
        <section className="prof-dr">
          <div className="container">
            <div className="box-of-about border-part">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="text-profile"> 
                    { this.state.doctor_profile
                      ?
                        <img src={IMAGE_URL+'/DoctorProfileImg/'+ this.state.doctor_profile} alt="doc" className="img-doc" />
                      :
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="doc" className="img-doc" /> 
                    }
                    <h2>{this.state.doctor_name}</h2>
                    <p>{this.state.doctor_degree}</p>
                    <h3 className="mt-4">About</h3>
                    <p className="text-chnage" dangerouslySetInnerHTML={{ __html: this.state.doctor_desc }}></p>
                    {/*<p>He Completed DEM (Diploma in Endocrinology and Metabolism) from BIRDEM in 1990</p>*/}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="text-profile" id="mobile-part">
                    <h3>Availability {this.state.doctor_schedules_time.length}</h3>
                    <div className="row" id="tab-mob" style={{"justify-content": "left"}}>
                      {this.state.doctor_schedules_time.length > 0
                        ?
                          this.state.doctor_schedules_time.map((doctor_schedules_data, index) =>{
                            console.log(doctor_schedules_data);
                            return(
                              <div className="doctor_schedule_section col-3 p-1">
                                <input type="radio" className="avability_time" id="doctor_avability_time_1" name="doctor_avability_time" value="10am-6pm" avabilityDay="sunday" onChange={this.handleChange}/>
                                <div className="table table-sst">
                                  <ul>
                                    <li>{index}</li>
                                    <li>{doctor_schedules_data}</li>
                                  </ul>
                                </div>
                              </div>
                            )
                          })
                        :
                          ''
                      }
                      <div className="doctor_schedule_section col-3 p-1">
                        <input type="radio" className="avability_time" id="doctor_avability_time_1" name="doctor_avability_time" value="10am-6pm" avabilityDay="sunday" onChange={this.handleChange}/>
                        <div className="table table-sst">
                          <ul>
                            <li>Sun</li>
                            <li>10am-6pm</li>
                          </ul>
                        </div>
                      </div>

                      <div className="doctor_schedule_section col-3 p-1">
                        <input type="radio" className="avability_time" id="doctor_avability_time_3" name="doctor_avability_time" value="12pm-8pm" avabilityDay="monday" onChange={this.handleChange}/>
                        <div className="table table-sst">
                          <ul>
                            <li>Mon</li>
                            <li>12pm-8pm</li>
                          </ul>
                        </div>
                      </div>
                      <div className="doctor_schedule_section col-3 p-1">
                        <input type="radio" className="avability_time" id="doctor_avability_time_7" name="doctor_avability_time" value="16pm-12am" avabilityDay="tuesday" onChange={this.handleChange}/>
                        <div className="table table-sst">
                          <ul>
                            <li>Tue</li>
                            <li>16pm-12am</li>
                          </ul>
                        </div>
                      </div>
                      <div className="doctor_schedule_section col-3 p-1">
                        <input type="radio" className="avability_time" id="doctor_avability_time_2" name="doctor_avability_time" value="11am-7pm" avabilityDay="wednesday" onChange={this.handleChange}/>
                        <div className="table table-sst">
                          <ul>
                            <li>Wed</li>
                            <li>11am-7pm</li>
                          </ul>
                        </div>
                      </div>
                      <div className="doctor_schedule_section col-3 p-1">
                        <input type="radio" className="avability_time" id="doctor_avability_time_6" name="doctor_avability_time" value="15pm-11pm" avabilityDay="thursday" onChange={this.handleChange}/>
                        <div className="table table-sst">
                          <ul>
                            <li>Thurs</li>
                            <li>15pm-11pm</li>
                          </ul>
                        </div>
                      </div>
                      <div className="doctor_schedule_section col-3 p-1">
                        <input type="radio" className="avability_time" id="doctor_avability_time_5" name="doctor_avability_time" value="14pm-10pm" avabilityDay="friday" onChange={this.handleChange}/>
                        <div className="table table-sst">
                          <ul>
                            <li>Fri</li>
                            <li>14pm-10pm</li>
                          </ul>
                        </div>
                      </div>
                      <div className="doctor_schedule_section col-3 p-1">
                        <input type="radio" className="avability_time" id="doctor_avability_time_4" name="doctor_avability_time" value="13pm-9pm" avabilityDay="saturday" onChange={this.handleChange}/>
                        <div className="table table-sst">
                          <ul>
                            <li>Sat</li>
                            <li>13pm-9pm</li>
                          </ul>
                        </div>
                      </div>
                      {/*<div className="col-2">
                        <table className="table table-sst">
                          <tbody><tr>
                              <th>Mon </th>
                            </tr>
                            <tr>
                              <td>9am-5p.m.</td>
                            </tr>
                          </tbody></table>
                      </div>
                      <div className="col-2 p-0">
                        <table className="table table-sst">
                          <tbody><tr>
                              <th>Tue </th>
                            </tr>
                            <tr>
                              <td>9am-5p.m.</td>
                            </tr>
                          </tbody></table>
                      </div>
                      <div className="col-2">
                        <table className="table table-sst">
                          <tbody><tr>
                              <th>Web </th>
                            </tr>
                            <tr>
                              <td>9am-5p.m.</td>
                            </tr>
                          </tbody></table>
                      </div>
                      <div className="col-2 p-0">
                        <table className="table table-sst">
                          <tbody><tr>
                              <th>Thurs </th>
                            </tr>
                            <tr>
                              <td>9am-5p.m.</td>
                            </tr>
                          </tbody></table>
                      </div>
                      <div className="col-2">
                        <table className="table table-sst">
                          <tbody><tr>
                              <th>Sat </th>
                            </tr>
                            <tr>
                              <td>9am-5p.m.</td>
                            </tr>
                          </tbody></table>
                      </div>*/}
                    </div>
                    <div className="number-profile" id="tell">
                      <a href="tel:10666">
                        <div className="row">
                          <div className="col-3" />
                          <div className="col-2 text-center"><img src={call_icon} alt="call-icon" /></div>
                          <div className="col-5"> 
                            <p><span>24*7 Hotline</span><br />  10666</p>
                          </div>
                          <div className="col-2" />
                        </div>
                      </a>
                    </div>
                    <div className="row">
                      <div className="col-sm-12"> 
                        <button type="button" className="btn btn-secondary make-btn" onClick={this.bookAppointmentPopup}>Make Appointment Online</button>
                      </div>
                      {/*<div className="col-sm-6"> 
                        <div className="dropdown">
                          <button className="btn btn-secondary dropdown-toggle make-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Refer <i className="fa-solid fa-chevron-down" />
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">As a Doctor (ID Required) </a></li>
                            <li><a className="dropdown-item" href="#"> As A Friend / Family</a></li> 
                          </ul>
                        </div>
                      </div>*/}
                    </div>
                    <br />
                    {/*<h3>Offers</h3>
                    <label className="label-text"><input type="checkbox"/> 10% Discount on Online Payments</label><br />
                    <label className="label-text"><input type="checkbox" /> FREE online patient registration for new patients.</label>*/}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-12">
                { this.state.doctor_publications.length > 0
                  ?
                    <div className="border-part mt-4">
                      <div className="text-profile"> 
                        <h3>Publications</h3>
                        <div className="row">
                          <div className="col-md-12">
                            {/*<div id="news-slider-4" className="owl-carousel">*/}
                            <div className="row">
                              { this.state.doctor_publications.map(doctor_publication =>{
                                  return(
                                    <div className="post-slide col-sm-4">
                                      <a href={'/singlepublications/'+doctor_publication.id} style={{"text-decoration": "none"}}>
                                        <div className="profile-slider">
                                          {doctor_publication.publications_pic 
                                            ?
                                              <img src={IMAGE_URL+'PublicationsImg/'+doctor_publication.publications_pic} alt="Bitmap" />
                                            :
                                              <img src={Bitmap} alt="Bitmap" />
                                          }
                                          <div className="post-slider-contant">
                                            <h4>{doctor_publication.publications_title}</h4>
                                            {/*<p className="dis-date">6 months ago</p>*/}
                                          </div>
                                        </div> 
                                      </a>                           
                                    </div>
                                  )
                                })
                              }
                              {/*<div className="post-slide">
                                <div className="profile-slider">
                                  <img src={Bitmap} alt="Bitmap" />
                                  <div className="post-slider-contant">
                                    <h4>Demo Publication Title</h4>
                                    <p className="dis-date">6 months ago</p>
                                  </div>
                                </div>                            
                              </div>
                              <div className="post-slide">
                                <div className="profile-slider">
                                  <img src={Bitmap1} alt="Bitmap" />
                                  <div className="post-slider-contant">
                                    <h4>Demo Publication Title</h4>
                                    <p className="dis-date">6 months ago</p>
                                  </div>
                                </div>                             
                              </div>
                              <div className="post-slide">
                                <div className="profile-slider">
                                  <img src={Bitmap} alt="Bitmap" />
                                  <div className="post-slider-contant">
                                    <h4>Demo Publication Title</h4>
                                    <p className="dis-date">6 months ago</p>
                                  </div>
                                </div>                             
                              </div>
                              <div className="post-slide">
                                <div className="profile-slider">
                                  <img src={Bitmap1} alt="Bitmap" />
                                  <div className="post-slider-contant">
                                    <h4>Demo Publication Title</h4>
                                    <p className="dis-date">6 months ago</p>
                                  </div>
                                </div>                             
                              </div>*/}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  :
                    ''
                }
                { this.state.doctor_edu
                  ?
                    <div className="border-part mt-4">
                      <div className="text-profile"> 
                        <h3 className="mb-4"><b>Education</b></h3> 
                        <p dangerouslySetInnerHTML={{ __html: this.state.doctor_edu }}></p>
                      </div>
                    </div>
                  :
                    ''
                }
                { this.state.doctor_exp
                  ?
                    <div className="border-part mt-4 mb-5">
                      <div className="text-profile"> 
                        <h3 className="mb-4">Experience</h3>
                        <p dangerouslySetInnerHTML={{ __html: this.state.doctor_exp }}></p>
                      </div>
                    </div>
                  :
                    ''
                }
              </div>
              { this.state.testimonials.length > 0
                ?
                  <div className="col-lg-5 col-md-12">
                    <div className="border-part mt-4 mb-5">
                      <div className="text-profile"> 
                        <h3>Testimonials</h3>
                        <div className="row mt-2">
                          <div className="col-md-12">
                            {/*<div id="news-slider-5" className="owl-carousel">*/}
                            <div className="row testimonial_section">
                              <Slider {...settings}>
                                { this.state.testimonials.map(testimonial =>{
                                    return(
                                      <div className="post-slide testimonials-part">
                                        <div className="profile-slider">
                                          <div className="row mt-3">
                                            <div className="col-sm-4">
                                              { testimonial.doctor_profile
                                                ?
                                                  <img src={IMAGE_URL+'/DoctorProfileImg/'+ testimonial.doctor_profile} alt="doc" style={{"border-radius": "65px"}}/>
                                                :
                                                  <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="doc" style={{"border-radius": "65px"}}/> 
                                              }
                                            </div>
                                            <div className="col-sm-8">
                                              <p className="text-chnage" dangerouslySetInnerHTML={{ __html: testimonial.testimonial_desc ? testimonial.testimonial_desc.substr(0, 150) : '' }}></p>
                                            </div>
                                          </div><br /><br />
                                          <img src={testimonials_img} alt="testimonials-img" />
                                        </div>                            
                                      </div>
                                    )
                                  })
                                }
                              </Slider>
                            </div>
                            {/*</div>*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                :
                  ''
              }
            </div>
          </div>
        </section>
        {
          this.state.showDoctorSearchPopup
          ?
            <SubPopupIndex2 showPopup={this.state.showDoctorSearchPopup} doctorname={this.state.doctor_name} selected_doctor_avability_day={doctor_avability_day}/>
          :
            null
        }
      </div>
    )
  }
}
export default DoctorProfile;