import React, { Component } from 'react';
import { API_TOKEN_NAME, IMAGE_URL, SITE_URL } from '../../../constants';
import { scAxiosAdmin } from '../../..';
// import search_icon from '../../../images/search-icon.png';
import { FiSearch } from 'react-icons/fa';
import icons_rotate from '../../../images/icons-rotate.png';
import $ from 'jquery';
import '../slider/sliderApi.css';


const getDefaultSearch = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/homesetting/getdefaultsearchdata', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
const getSearchData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/homesetting/getsearchdata', {
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
const getAllBannerButtonData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/bannerbutton/getallbannerbtndata', {
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

class HomeSearch extends Component {
  state = {
    search_keywords: '',
    default_doctors: [],
    default_packages: [],
    default_publications: [],
    bannerbuttons: [],
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  refreshGetDefaultSearchData = () => {
    getDefaultSearch()
      .then(res => {
        if (res.status === true) {
          this.setState({
            default_doctors: res.doctor_data,
            default_packages: res.package_data,
            default_publications: res.publication_data
          });
        } else {
          this.setState({
            default_doctors: '',
            default_packages: '',
            default_publications: ''
          });
        }
      })
      .catch(err => {

      });
  }
  handleKeyUp = event => {
    const data = {
      keywords: this.state.search_keywords
    }
    getSearchData(data)
      .then(res => {
        if (res.status === true) {
          this.setState({
            default_doctors: res.doctor_data,
            default_packages: res.package_data,
            default_publications: res.publication_data
          });
        } else {
          this.setState({
            default_doctors: '',
            default_packages: '',
            default_publications: ''
          });
        }
        this.setState({ enableShdo: false, });
      })
      .catch(err => {
        console.log(err);
      });
  }
  refreshGetAllBannerButtonData = () => {
    getAllBannerButtonData()
      .then(res => {
        if (res.status === true) {
          this.setState({
            bannerbuttons: res.data,
          });
        } else {
          this.setState({
            bannerbuttons: '',
          });
        }
      })
      .catch(err => {

      });
  }
  showSearchResult = () => {
    $(".search-popup").show();
    $("body").click(function () {
      $(".search-popup").hide();
    });
    this.refreshGetDefaultSearchData();
  }
  componentDidMount() {
    this.refreshGetAllBannerButtonData();
  }
  render() {
    return (
      <div>

        <h1 data-aos="fade-up" data-aos-duration="1000" style={{ "color": "black", "text-align": "center" }}>On a Mission To Keep Families Healthy</h1>
        <div className="center-search mt-4" data-aos="fade-up" data-aos-duration="1000" style={{ "position": "relative", "zIndex": "999" }}>
          <form className="d-flex">
            <div className="input-group mb-3 home_search_input_section">
              <input type="text" name="search_keywords" id="search_keywords" value={this.state.search_keywords} className="form-control physicans" placeholder="Search for physicians & departments" aria-label="Username" onChange={this.handleChange} onClick={this.showSearchResult} onKeyUp={this.handleKeyUp} aria-describedby="basic-addon2" />
              <span style={{ cursor: "pointer" }} className="input-group-text" value={this.state.search_keywords} onClick={this.showSearchResult} id="basic-addon1"> <svg style={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg></span>

              <div className="search-popup-main" style={{ "width": "100%" }}>
                <div className="search-popup" style={{ "display": "none" }}>
                  <h4>Specialists</h4>
                  <hr className="lists-line" />
                  <div className="row mt-4">
                    {this.state.default_doctors.length > 0
                      ?
                      this.state.default_doctors.map(default_search_doctor => {
                        let doctor_name = default_search_doctor.doctor_name;
                        let new_doctor_name = doctor_name.replaceAll(' ', '-');
                        return (
                          <div className="col-lg-4 col-md-12 mt-4">
                            <div className="doctor-list">
                              <a href={SITE_URL + '/doctor/' + new_doctor_name + '~' + default_search_doctor.id} style={{ "textDecoration": "none", "color": "#212529" }}>
                                <div className="row">
                                  <div className="col-5">
                                    {default_search_doctor.doctor_profile
                                      ?
                                      <img src={IMAGE_URL + '/DoctorProfileImg/' + default_search_doctor.doctor_profile} alt="Bitmap-3" style={{ "height": "120px", "width": "100%" }} />
                                      :
                                      <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="Bitmap-3" style={{ "height": "120px", "width": "100%" }} />
                                    }
                                  </div>
                                  <div className="col-7">
                                    <h6 style={{ "fontSize": "14px" }}>{default_search_doctor.doctor_name}</h6>
                                    <p style={{ "fontSize": "12px" }}>{default_search_doctor.degree}</p>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        )
                      })
                      :
                      <div className="col-lg-12 col-md-12">
                        <div className="doctor-list">
                          <div className="row">
                            <p style={{ "fontSize": "12px" }}>no result found</p>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <br />
                  <br />
                  <h5>Packages</h5>
                  <hr className="lists-line" />
                  <div className="row mt-4">
                    {this.state.default_packages.length > 0
                      ?
                      this.state.default_packages.map(default_search_packages => {
                        let package_name = default_search_packages.name;
                        let new_package_name = package_name.replaceAll(' ', '-');
                        return (
                          <div className="col-lg-4 col-sm-12">
                            <div className="Package-part">
                              <a href={SITE_URL + '/singlepackage/' + new_package_name} style={{ "textDecoration": "none", "color": "#212529" }}>
                                <div className="row">
                                  <div className="col-4 sp-0-search">
                                    <img src={icons_rotate} alt="icons-rotate" />
                                  </div>
                                  <div className="col-8 sp-0-search bg-color-gry">
                                    <h6 style={{ "fontSize": "16px" }}>{default_search_packages.name}</h6>
                                    <p title={default_search_packages.description} dangerouslySetInnerHTML={{ __html: default_search_packages.description ? default_search_packages.description.substr(0, 140) : '' }}></p>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        )
                      })
                      :
                      <div className="col-lg-12 col-sm-12">
                        <div className="Package-part">
                          <div className="row">
                            <p>No packages found</p>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <br />
                  <br />
                  <h5>Blog</h5>
                  <hr className="lists-line" />
                  <div className="row">
                    {this.state.default_publications.length > 0
                      ?
                      this.state.default_publications.map(default_search_publications => {
                        let publications_title = default_search_publications.publications_title;
                        let new_publications_title = publications_title.replaceAll(' ', '-');
                        return (
                          <div className="col-sm-6">
                            <a href={SITE_URL + '/singlepublications/' + new_publications_title + '~' + default_search_publications.id} style={{ "textDecoration": "none", "color": "#212529" }}>
                              <h6 className="colo-dark" title={default_search_publications.publications_title}>{default_search_publications.publications_title.substr(0, 40)}</h6>
                            </a>
                            <p style={{ "fontSize": "14px" }} dangerouslySetInnerHTML={{ __html: default_search_publications.publications_desc ? default_search_publications.publications_desc.substr(0, 150) : '' }}></p>
                          </div>
                        )
                      })
                      :
                      <div className="col-sm-12">
                        <p className="pera-search">No any blog found</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="row sp-top" style={{ "position": "relative", "zIndex": "1" }}>
          <div className="col-sm-2"></div>
          <div className="col-sm-8" style={{ "marginBottom": "140px" }}>
            <div className="row">
              {this.state.bannerbuttons.length > 0
                ?
                this.state.bannerbuttons.map(banner_button => {
                  return (
                    <div className="col-sm-3 mt-4">
                      <a href={SITE_URL + '/pages/' + banner_button.slug} style={{ "text-decoration": "none" }}>
                        <div className="excellence-part" data-aos="zoom-in" data-aos-duration="1000">
                          <div className="row">
                            <div className="col-3">
                              {
                                banner_button.banner_btn_icon
                                  ?
                                  <img src={IMAGE_URL + 'BannerButtonImg/' + banner_button.banner_btn_icon} alt="avtars" style={{ "max-width": "30px", "height": "30px", "border-radius": "30px" }} />
                                  :
                                  <i className="fa-solid fa-circle-right"></i>
                              }

                            </div>
                            <div className="col-9">
                              <p>{banner_button.banner_btn_text}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  )
                })
                :
                ''
              }
            </div>
          </div>
        </div>
        {/*<div className="row">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4 btn-banner">
                    <div className="contact-number">
                      <a href="tel:10666">
                        <div className="row">
                          <div className="col-4 text-center"><img src={hotline_phone} alt="hotline_phone"/></div>
                          <div className="col-8"> 
                            <p> <span>24*7 Hotline</span><br/>  10666</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>*/}
      </div>
    )
  }
}
export default HomeSearch;