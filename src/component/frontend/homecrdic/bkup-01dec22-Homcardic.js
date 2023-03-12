import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../../../constants';
//import {Route} from 'react-router-dom';
//import { scAxios } from '../../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import icon2 from '../../../images/icon-2.png';
import icon3 from '../../../images/icon-3.png';
import icon4 from '../../../images/icon-4.png';
import icon5 from '../../../images/icon-5.png';
import icon6 from '../../../images/icon-6.png';
import cardiac from '../../../images/cardiac.svg';
import hero_body from '../../../images/hero-body.png';
import Bitmap3 from '../../../images/Bitmap-3.png';
import happy_patient from '../../../images/happy_patient.webp';
import SEO from "../../../component/Seo";
class Homecardic extends Component {
  render() {
    return(
      <div>
        <SEO title="Homecardic" description="Homecardic United Hospital" pathSlug="Homecardic" keywords="Homecardic, Cardic" />
        <section className="center-of-excellence" id="excellence-part">
          <div className="container">
            <h2>Center of Excellence</h2>
            <div className="row">
              <div className="col-12">
                <div id="news-slider" className="owl-carousel">
                  <div className="post-slide">
                    <span><img src={icon2} alt="icon-2" /></span>
                    <p>General Health</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={cardiac} alt="cardiac" /></span>
                    <p>Cardiac</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={icon3} alt="icon-3" /></span>
                    <p>Orthopedics</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={icon4} alt="icon-4" /></span>
                    <p>Oncology</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={icon5} alt="icon-5" /></span>
                    <p>Materity</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={icon6} alt="icon-6" /></span>
                    <p>Hepatology</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={cardiac} alt="cardiac.svg" /></span>
                    <p>Cardiac</p>
                  </div>
                  <div className="post-slide">
                    <span><img src={icon4} alt="icon-4" /></span>
                    <p>Oncology</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-and-doctor mt-4">
              <div className="row">
                <div className="col-lg-5 col-sm-12">
                  <img src={hero_body} alt="hero-body" className="hero-body" />
                </div>
                <div className="col-lg-7 col-sm-12">
                  <h4>Cardiac Department</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing</p>
                  <div className="our-consultants pt-4 mt-5">
                    <h3>Our Consultants <span>(See All)</span></h3>
                    <div className="row mt-4">
                      <div className="col-lg-6 col-md-12">
                        <div className="doctor-list">
                          <div className="row">
                            <div className="col-5">
                              <img src={Bitmap3} alt="Bitmap-3" />
                            </div>
                            <div className="col-7">
                              <h6>Dr. Reazur Rahman</h6>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                              <p className="mb-1"><a href="#" className="read-more">Read More</a></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="doctor-list">
                          <div className="row">
                            <div className="col-5">
                              <img src={Bitmap3} alt="Bitmap-3" />
                            </div>
                            <div className="col-7">
                              <h6>Dr. Reazur Rahman</h6>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                              <p className="mb-1"><a href="#" className="read-more">Read More</a></p>
                            </div>
                          </div>
                        </div>
                      </div> 
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-6 col-md-12">
                        <div className="doctor-list">
                          <div className="row">
                            <div className="col-5">
                              <img src={Bitmap3} alt="Bitmap-3" />
                            </div>
                            <div className="col-7">
                              <h6>Dr. Reazur Rahman</h6>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                              <p className="mb-1"><a href="#" className="read-more">Read More</a></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="doctor-list">
                          <div className="row">
                            <div className="col-5">
                              <img src={Bitmap3} alt="Bitmap-3" />
                            </div>
                            <div className="col-7">
                              <h6>Dr. Reazur Rahman</h6>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                              <p className="mb-1"><a href="#" className="read-more">Read More</a></p>
                            </div>
                          </div>
                        </div>
                      </div> 
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-6 col-md-12">
                        <div className="doctor-list">
                          <div className="row">
                            <div className="col-5">
                              <img src={Bitmap3} alt="Bitmap-3" />
                            </div>
                            <div className="col-7">
                              <h6>Dr. Reazur Rahman</h6>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                              <p className="mb-1"><a href="#" className="read-more">Read More</a></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="doctor-list">
                          <div className="row">
                            <div className="col-5">
                              <img src={Bitmap3} alt="Bitmap-3" />
                            </div>
                            <div className="col-7">
                              <h6>Dr. Reazur Rahman</h6>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                              <p className="mb-1"><a href="#" className="read-more">Read More</a></p>
                            </div>
                          </div>
                        </div>
                      </div> 
                    </div>
                  </div>
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
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit</p>
                </div>
              </div>
              <div className="col-sm-3">
                <button className="see-more ">See More Patient Stories</button>
              </div>
            </div>  
          </div>
        </section>
      </div>
    )
  }
}
export default Homecardic;