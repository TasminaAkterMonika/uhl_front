import React, { Component } from 'react';
import {API_AUTH_USERNAME, API_AUTH_PASSWORD} from '../../constants';
import { scAxios } from '../..';
import { validateUserToken } from '../../PrivateRoute';
import { startUserSession } from '../../userSession';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route} from 'react-router-dom';
import Header from '../../component/frontend/HomeHeader';
import Footer from '../../component/frontend/Footer';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import doc from '../../images/doc.png';
//import pay_img from '../../images/pay-img.png';
import hotline_phone from '../../images/hotline_phone.svg';
import cardiac from '../../images/cardiac.svg';
import male from '../../images/male.svg';
import female from '../../images/female.svg';
import plain_anatomy from '../../images/plain_anatomy.png';
import happy_patient from '../../images/happy_patient.webp';
import news_events_1 from '../../images/news_events_1.png';
import potrait from '../../images/potrait.webp';
import landscape from '../../images/landscape.webp';
import tes from '../../images/tes.jpg';
const getPatitentLists = (data) => {
  return new Promise((resolve, reject) => {
    const token = Buffer.from(`${API_AUTH_USERNAME}:${API_AUTH_PASSWORD}`, 'utf8').toString('base64');
    const req = scAxios.request('/mmphonenumber', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${token}`,
      },
      params: {
          ...data
      }  
    });
    req.then(res => resolve(res.data))
        .catch(err => reject(err));
  });
}
const PatientLoginUser = (data) => {
  return new Promise((resolve, reject) => {
    const token = Buffer.from(`${API_AUTH_USERNAME}:${API_AUTH_PASSWORD}`, 'utf8').toString('base64');
    const req = scAxios.request('/mmlogin', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${token}`,
      },
      params: {
          ...data
      }  
    });
    req.then(res => resolve(res.data))
        .catch(err => reject(err));
  });
}
class PatientLists extends Component {
  state = {
    get_phone_number: '',
    patientLists: [],
    patient_id: '',
  }
  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }
  refreshGetPatitentLists = (data) => {
    getPatitentLists(data)
        .then(res => {
          if(res){
            var records = res;
            //console.log(res);
            this.setState({ patientLists: records });
          } else {
            this.setState({ patientLists: '' });
          }
        })
        .catch(err => {
            console.log(err);
        });
  }
  handleSubmit = event => {
    event.preventDefault();
    const data = {
        patientid: this.state.patient_id,
    }
    PatientLoginUser(data)
    .then(res => {
      console.log(res);
      if (!!res[0].token) {
          startUserSession(res[0].token);
          this.setState({ signin_success: true});
          //this.props.actions.userLoginSuccess(res.data);
      } else {
          toast.error(res.message, {
              position: toast.POSITION.BOTTOM_RIGHT
          });
      }
    })
    .catch(err => {
      toast.error('Error occured', {
        position: toast.POSITION.BOTTOM_RIGHT
         });
    });
  }
  componentDidMount(){
    const query = new URLSearchParams(this.props.location.search);
    var phone_number = query.get('phone_number');
    const data = {
      PhoneNumber: phone_number,
    }
    if(phone_number){
      this.refreshGetPatitentLists(data);
    }
  }
  render() {
    //let site_url = location.protocol + '//' + location.host + "/unitedhospital";
    //let site_url = location.protocol + '//' + location.host;
    const { from } = this.props.location.state || { from: { pathname: '/index2' } };
    if (validateUserToken()) {
      if (!this.state.signin_success)
          return <Redirect to="/patientlists" />
      return <Redirect to={from} />
    }
    return(
      <div>
        <section className="banner-part">
          <Route component={Header} />
          <div className="container">
            <h1 data-aos="fade-up" data-aos-duration={1000}>On a Mission To Keep Families Healthy</h1>
            <div className="row" data-aos="fade-up" data-aos-duration={1000}>
              <div className="col-sm-2"></div>
              <div className="col-sm-8">
                <form className="d-flex">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search for physicans & departments" aria-label="Username" aria-describedby="basic-addon1" />
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-magnifying-glass" /></span>
                  </div>
                </form>
              </div>
            </div>
            <div className="row sp-top">
              <div className="col-sm-2" />
              <div className="col-sm-8">
                <div className="row">
                  <div className="col-sm-3">
                    <div className="excellence-part" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="row">
                        <div className="col-3">
                          <i className="fa-solid fa-circle-right" />
                        </div>
                        <div className="col-9">
                          <p>Center for Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="excellence-part" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="row">
                        <div className="col-3">
                          <i className="fa-solid fa-circle-right" />
                        </div>
                        <div className="col-9">
                          <p>Center for Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="excellence-part" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="row">
                        <div className="col-3">
                          <i className="fa-solid fa-circle-right" />
                        </div>
                        <div className="col-9">
                          <p>Center for Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="excellence-part" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="row">
                        <div className="col-3">
                          <i className="fa-solid fa-circle-right" />
                        </div>
                        <div className="col-9">
                          <p>Center for Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-sm-3">
                    <div className="excellence-part" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="row">
                        <div className="col-3">
                          <i className="fa-solid fa-circle-right" />
                        </div>
                        <div className="col-9">
                          <p>Center for Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="excellence-part" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="row">
                        <div className="col-3">
                          <i className="fa-solid fa-circle-right" />
                        </div>
                        <div className="col-9">
                          <p>Center for Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="excellence-part" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="row">
                        <div className="col-3">
                          <i className="fa-solid fa-circle-right" />
                        </div>
                        <div className="col-9">
                          <p>Center for Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="excellence-part" data-aos="zoom-in" data-aos-duration={1000}>
                      <div className="row">
                        <div className="col-3">
                          <i className="fa-solid fa-circle-right" />
                        </div>
                        <div className="col-9">
                          <p>Center for Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4" />
              <div className="col-sm-4">
                <div className="contact-number">
                  <a href="tel:10666">
                    <div className="row">
                      <div className="col-4 text-center"><img src={hotline_phone} alt="hotline_phone" /></div>
                      <div className="col-8"> 
                        <p> <span>24*7 Hotline</span><br />  10666</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="center-of-excellence">
          <div className="container">
            <h2>Center of Excellence</h2>
            <div className="row">
              <div className="col-11">
                <div id="news-slider" className="owl-carousel">
                  <div className="post-slide">
                    <span><img src={cardiac} alt="cardiac" /></span>
                    <p>Cardiac</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={cardiac} alt="cardiac" /></span>
                    <p>Cardiac</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={cardiac} alt="cardiac" /></span>
                    <p>Cardiac</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={cardiac} alt="cardiac" /></span>
                    <p>Cardiac</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={cardiac} alt="cardiac" /></span>
                    <p>Cardiac</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={cardiac} alt="cardiac" /></span>
                    <p>Cardiac</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={cardiac} alt="cardiac" /></span>
                    <p>Cardiac</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tabs" id="tabs-mm">
              <div id="tab2" className="tab">
                <ul className="nav">
                  <li><a href="#tab1"><img src={male} alt=""/> Male</a></li>
                  <li className="active "><a href="#tab2" className="border-red"><img src={female} alt=""/> Female</a></li> 
                </ul>
                <div className="text-areya">
                  <img src={plain_anatomy.png} alt="plain_anatomy" />
                </div>
              </div>
              <div id="tab1" className="tab">
                <ul className="nav">
                  <li className="active"><a href="#tab1"><img src={male} alt=""/> Male</a></li>
                  <li><a href="#tab2" className="border-red"><img src={female} alt=""/> Female</a></li> 
                </ul>
                <div className="text-areya">
                  <img src={plain_anatomy} alt="plain_anatomy" />
                </div>
              </div>
            </div>
            <div className="row" id="saying">
              <div className="col-sm-12 mb-4">
                <h2>What Patients Are Saying</h2>
              </div>
              <div className="col-sm-3 text-center">
                <img src={happy_patient} alt="happy_patient" />
              </div>
              <div className="col-sm-6">
                <div className="zubaida">
                  <h3>Zubaida Tahman <span>(Cardiac Surgery)</span></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit</p>
                </div>
              </div>
              <div className="col-sm-3">
                <button className="see-more ">See More Patient Stories</button>
              </div>
            </div>   
          </div>
        </section>
        <section className="news-events">
          <div className="container">
            <h2>News &amp; Events</h2>
            <div className="row">
              <div className="col-md-12">
                <div id="news-slider-2" className="owl-carousel">
                  <div className="post-slide">
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-slide">
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-slide">
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-slide">
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-slide">
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-slide">
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-slide">
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="news-part">
                      <img src={news_events_1} alt="news_events_1" />
                      <div className="bg-color-back">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="news-events" id="Publications">
          <div className="container">
            <h2 className="border-bottom">Publications</h2>
            <div className="row">
              <div className="col-md-12">
                <div id="news-slider-3" className="owl-carousel">
                  <div className="post-slide">
                    <div className="img-back-pub">
                      <img src={potrait} alt="potrait" />
                      <div className="areya-contant">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-slide">
                    <div className="img-back-pub">
                      <img src={landscape} alt="landscape" />
                      <div className="areya-contant">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="img-back-pub">
                      <img src={landscape} alt="landscape" />
                      <div className="areya-contant">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-slide">
                    <div className="img-back-pub">
                      <img src={landscape} alt="landscape" />
                      <div className="areya-contant">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="img-back-pub">
                      <img src={landscape} alt="landscape" />
                      <div className="areya-contant">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-slide">
                    <div className="img-back-pub">
                      <img src={landscape} alt="landscape" />
                      <div className="areya-contant">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="img-back-pub">
                      <img src={landscape} alt="landscape" />
                      <div className="areya-contant">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                  <div className="post-slide">
                    <div className="img-back-pub">
                      <img src={landscape} alt="landscape" />
                      <div className="areya-contant">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                    <br />
                    <div className="img-back-pub">
                      <img src={landscape} alt="landscape" />
                      <div className="areya-contant">
                        <p>Screening at doorstep: A smart step for your health</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="test">
          <div className="container">
            <img src={tes} alt="tes" />
          </div>
        </section>
        <div className="offcanvas offcanvas-start show" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel"> </h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
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
                <h4>Patients Lists</h4>
                {/*<p>Enter Doctor's Name or relevant Department</p>*/}
              </div>
              <form onSubmit={this.handleSubmit} id="patientloginform" className="needs-validation" noValidate>
                {/*<input placeholder="E.N.T" type="text" id="formBasicPassword" className="form-control"/>*/}
                <div className="row mt-3">
                  {
                    this.state.patientLists.length > 0
                    ?  
                      this.state.patientLists.map(patient_list => {
                        console.log(patient_list.PatientName);
                        return(
                          <div className="col-6 sp-0-0 mt-3" key={patient_list.PatientID}>
                            <div className="doctor-list">
                              <input type="radio" class="patient_user" name="patient_id" value={patient_list.PatientID} onChange={this.handleChange}/>
                              <div className="row list_content_sec">
                                <div className="col-5">
                                  <img src={doc} alt="doc"/>
                                </div>
                                <div className="col-7">
                                  <h5>{patient_list.PatientName}</h5>
                                  <p>Endocrinology & Metabolism) <br/>MD (Endocrinology & Metabolism)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    :
                      <div className="col-6 sp-0-0">
                        <div className="doctor-list">
                          <div className="row">
                            <p>No Result found</p>
                          </div>
                        </div>
                      </div>
                  }
                </div>
                <div className="row mt-3">
                  {/*<div className="col-6">
                    <input type="date" id="formBasicPassword" className="form-control"/> 
                  </div>*/}
                  <div className="col-12">
                    {/*<a href={site_url+'/index3'} className="btn-links" id="Schedule">Check Schedule</a>*/}
                    <button type="submit" className="btn-links appointment-new" id="Schedule">Check Schedule</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={5000} />
        <Route component={Footer} />
      </div>
    )
  } 
}
export default PatientLists;