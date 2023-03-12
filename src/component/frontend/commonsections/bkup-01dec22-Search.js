import React, { Component } from 'react';
import search_icon from '../../../images/search-icon.png';
import Bitmap3 from '../../../images/Bitmap-3.png';
import icons_rotate from '../../../images/icons-rotate.png';
import hospital from '../../../images/hospital.png';

class Search extends Component {
  render() {
    return(
        <div>
        <section className="banner-cardic">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-5">
                <div className="cardic-box">
                  <h1>On a Mission To Keep Families Healthy</h1>
                  <div className="input-group navi-input">
                    <input type="text" className="form-control physicans" placeholder="Search for physicians & departments" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <span className="input-group-text" id="basic-addon2"><img src={search_icon} alt="search-icon" /></span>
                  </div>
                  <div className="search-popup-main">
                    <div className="search-popup">
                      <h4>Specialists</h4>
                      <hr className="lists-line" />
                      <div className="row mt-4">
                        <div className="col-lg-4 col-md-12">
                          <div className="doctor-list">
                            <div className="row">
                              <div className="col-5">
                                <img src={Bitmap3} alt="Bitmap-3" />
                              </div>
                              <div className="col-7">
                                <h6>Dr. Reazur Rahman</h6>
                                <p>Associate Consultant</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <div className="doctor-list">
                            <div className="row">
                              <div className="col-5">
                                <img src={Bitmap3} alt="Bitmap-3" />
                              </div>
                              <div className="col-7">
                                <h6>Dr. Reazur Rahman</h6>
                                <p>Associate Consultant</p> 
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <div className="doctor-list">
                            <div className="row">
                              <div className="col-5">
                                <img src={Bitmap3} alt="Bitmap-3" />
                              </div>
                              <div className="col-7">
                                <h6>Dr. Reazur Rahman</h6>
                                <p>Associate Consultant</p> 
                              </div>
                            </div>
                          </div>
                        </div> 
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-4 col-md-12">
                          <div className="doctor-list">
                            <div className="row">
                              <div className="col-5">
                                <img src={Bitmap3} alt="Bitmap-3" />
                              </div>
                              <div className="col-7">
                                <h6>Dr. Reazur Rahman</h6>
                                <p>Associate Consultant</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <div className="doctor-list">
                            <div className="row">
                              <div className="col-5">
                                <img src={Bitmap3} alt="Bitmap-3" />
                              </div>
                              <div className="col-7">
                                <h6>Dr. Reazur Rahman</h6>
                                <p>Associate Consultant</p> 
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                          <div className="doctor-list">
                            <div className="row">
                              <div className="col-5">
                                <img src={Bitmap3} alt="Bitmap-3" />
                              </div>
                              <div className="col-7">
                                <h6>Dr. Reazur Rahman</h6>
                                <p>Associate Consultant</p> 
                              </div>
                            </div>
                          </div>
                        </div> 
                      </div>
                      <br />
                      <br />
                      <h5>Packages</h5>
                      <hr className="lists-line" />
                      <div className="row mt-4">
                        <div className="col-lg-4 col-sm-12">
                          <div className="Package-part">
                            <div className="row">
                              <div className="col-4 sp-0-search">
                                <img src={icons_rotate} alt="icons-rotate" />
                              </div>
                              <div className="col-8 sp-0-search bg-color-gry">
                                <p>Cardiac Screening Package</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                          <div className="Package-part">
                            <div className="row">
                              <div className="col-4 sp-0-search">
                                <img src={icons_rotate} alt="icons-rotate" />
                              </div>
                              <div className="col-8 sp-0-search bg-color-gry">
                                <p>Cardiac Screening Package</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                          <div className="Package-part">
                            <div className="row">
                              <div className="col-4 sp-0-search">
                                <img src={icons_rotate} alt="icons-rotate" />
                              </div>
                              <div className="col-8 sp-0-search bg-color-gry">
                                <p>Cardiac Screening Package</p>
                              </div>
                            </div>
                          </div>
                        </div> 
                      </div>
                      <br />
                      <br />
                      <h5>Blog</h5>
                      <hr className="lists-line" />
                      <h5 className="colo-dark">Interesting &amp; Relevant Headline 1</h5>
                      <p className="pera-search">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                      <h5 className="colo-dark">Interesting &amp; Relevant Headline 2</h5>
                      <p className="pera-search">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    </div>
                  </div>
                  <div className="row mt-4">           
                    <div className="col-sm-4 hide-mobile-view">
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
                    <div className="col-sm-4 hide-mobile-view">
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
                    <div className="col-sm-4 hide-mobile-view">
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
                    <div className="col-sm-4  hide-mobile-view">
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
                    <div className="col-sm-4 hide-mobile-view">
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
                    <div className="col-sm-4 hide-mobile-view">
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
              <div className="col-lg-7 hos-right">
                <img src={hospital} alt="hospital" />
              </div>
            </div>
          </div>
        </section>
        </div>
    )
  }
}
export default Search;