import React, { Component } from 'react';
import {API_TOKEN_NAME, WEBSITEPAGE_URL, USER_ID, IMAGE_URL, SITE_URL} from '../../constants';
import { scAxiosAdmin } from '../..';
import $ from 'jquery';
import logo from '../../images/logo2.png';
import icons_rotate from '../../images/icons-rotate.png';
import hotline_phone from '../../images/hotline_phone.svg';
import PopupIndex2 from '../../component/frontend/PopupIndex2';
import PopupIndex3 from '../../component/frontend/PopupIndex3';
import PopupIndex4 from '../../component/frontend/PopupIndex4';
import PopupIndex5 from '../../component/frontend/PopupIndex5';
import PopupPatientLists from '../../component/frontend/PopupPatientLists';
import PopupRegister from '../../component/frontend/PopupRegister';

const GetAllMenu = (data) => {
  return new Promise((resolve, reject) => {
      const req = scAxiosAdmin.request('/menu/getallmenu', {
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
const getSingleHeaderAnnoucementData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/headerannoucement/getsingleheaderannoucement/'+id, {
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
class Header extends Component {
  state = {
    step: 1,
    showthirdpopup:'',
    menu:[],
    search_keywords: '',
    default_doctors: [],
    default_packages: [],
    default_publications: [],
    header_annoucement_text:'',
    header_annoucement_link:'',
    header_phone_no:'',
  }
  nextStep = (e) => {
      this.setState({step: this.state.step + 1,});
  };
  prevStep = (e) => {
    this.setState({
      step: this.state.step - 1,
      showthirdpopup: 'offcanvas offcanvas-start show'
    });
  }
  refreshStaticMenu = (page) => {
    GetAllMenu(page)
    .then(res => {
      if(res.status===true){
        var records = res.data.data;
        this.setState({ menu: records });
      } else {
        this.setState({ menu: '' });
      }
      this.setState({ enableShdo: false, });
    })
    .catch(err => {
        console.log(err);
    });
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
  showSearchResult = () => {
    $(".search-popup").show();
    $("body").click(function () {
      $(".search-popup").hide();
    });
    this.refreshGetDefaultSearchData();
  }
  refreshgetSingleHeaderAnnoucementData = (id) => {
    getSingleHeaderAnnoucementData(id)
    .then(res => {
        if(res.status===true){
            var records = res.data;
            this.setState({
                header_annoucement_text: records.header_annoucement_text,
                header_annoucement_link: records.header_annoucement_link,
                header_phone_no: records.header_phone_no,
            });
        } else {
            this.setState({ 
                header_annoucement_text: '',
                header_annoucement_link: '',
                header_phone_no:'',
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
  }
  componentDidMount(){
    let header_annoucement_id = '1';
    this.refreshgetSingleHeaderAnnoucementData(header_annoucement_id);
    /*if(localStorage.getItem(USER_ID)){
      let login_step_number = this.state.step + 1;
      this.setState({
        step: login_step_number + 1,
        showthirdpopup: 'offcanvas offcanvas-start',
      });
    } else {
      this.setState({
        step: this.state.step,
        showthirdpopup: 'offcanvas offcanvas-start show',
      });
    }*/
    if(localStorage.getItem(USER_ID)){
      let login_step_number = this.state.step+1;
      this.setState({
        step: login_step_number,
        showthirdpopup: 'offcanvas offcanvas-start',
      });
    } else {
      this.setState({
        step: this.state.step,
        showthirdpopup: 'offcanvas offcanvas-start show',
      });
    }
    this.refreshStaticMenu();
  }
  render() {
    let step_html = '';
    let step = this.state.step;
    if(step === 1) {
      step_html = <div className="">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-3 custom-margin 1">
                <PopupIndex4 nextStep={this.nextStep} prevStep={this.prevStep} />
              </div>
            </div>
          </div>
        </div>
    /*} else if (step === 2) {
        step_html = <div className="">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-3 custom-margin 2">
                <PopupPatientLists nextStep={this.nextStep} prevStep={this.prevStep} />
              </div>
            </div>
          </div>
      </div>*/
        
    } else if (step === 2) {
      step_html = <div className="">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 col-sm-3 custom-margin 3">
                          <PopupIndex2 nextStep={this.nextStep} showpopup={this.state.showthirdpopup} />
                        </div>
                      </div>
                    </div>
                  </div>
    } else if (step === 3) {
      step_html = <div className="">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-3 custom-margin 4">
                <PopupIndex3 nextStep={this.nextStep} prevStep={this.prevStep} />
              </div>
            </div>
          </div>
        </div>
    } else if (step === 4) {
      step_html = <div className="">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-3 custom-margin 5">
                <PopupIndex5 />
              </div>
            </div>
          </div>
        </div>
    } else if (step === 5) {
      step_html = <div className="">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-sm-3 custom-margin 5">
                    <PopupRegister />
                  </div>
                </div>
              </div>
            </div>
    } else {
      step_html = <div className="">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-sm-3 custom-margin 5">
                    <PopupRegister />
                  </div>
                </div>
              </div>
            </div>
    }
    return(
      <div>
        {this.state.header_annoucement_text 
          ?
            <header className="top-part">
              <div className="container">
                <p><a href={this.state.header_annoucement_link} target="_blank" style={{"color": "#fff", "textDecoration": "none"}}>{this.state.header_annoucement_text}</a></p> 
              </div>
            </header>
          :
            ''
        }
        <header className="header-part hrad subpages_header" id="doctor-profile">
          {/*<div className="container">*/}
            <nav className="navbar navbar-expand-lg navbar-light"> 
              <div className="row">
                <div className="col-sm-6 col-3">
                  <a className="navbar-brand" href="/"><img src={logo} alt="logo2"/></a>
                </div>
                <div className="col-sm-6 col-7">
                  <input type="text" className="form-control" name="search_keywords" id="header_search_keywords" value={this.state.search_keywords} placeholder="Search..." onChange={this.handleChange} onClick={this.showSearchResult} onKeyUp={this.handleKeyUp} autoComplete="off"/>
                  {/*<span style={{ cursor: "pointer" }} className="input-group-text" value={this.state.search_keywords} onClick={this.showSearchResult} id="basic-addon1"> <svg style={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg></span>*/}
                </div>
              </div>
              <button className="navbar-toggler sub_header_menu_toggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                  <li className="nav-item">
                    <a className="nav-link number" href="tel:10666"><img src={hotline_phone} alt="hotline_phone" /> 10666</a>
                  </li>
                  { this.state.menu.length > 0
                    ?
                      this.state.menu.map(hmenu => {
                          return(
                            <li className="nav-item">
                              {hmenu.title === 'Book Appointment' 
                                ? 
                                  <a className="nav-link active" href="#offcanvasExample" data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample">Book Appointment</a> 
                                : 
                                  <a href={WEBSITEPAGE_URL+hmenu.slug} className="nav-link">{hmenu.title}</a>
                              }
                            </li> 
                          )
                        })
                    :
                      <li></li>
                  } 
                  <li className="nav-item login-white">
                  {
                    localStorage.getItem(USER_ID)
                    ?
                      <p><a href="/logout">Logout</a></p>
                    :
                      <p><a href="/">Login</a>/<a href="/">Signup</a></p>
                  }
                  </li>
                </ul>
              </div> 
            </nav>
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-6">
                <div className="search-popup-main" style={{ "width": "100%" }}>
                  <div className="search-popup" style={{ "display": "none", "overflow-y": "scroll", "height": "424px", "z-index": "99999" }}>
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
                                <a href={SITE_URL + '/consultant/' + new_doctor_name + '~' + default_search_doctor.id} style={{ "textDecoration": "none", "color": "#212529" }}>
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
                                <a href={SITE_URL + '/packages/' + new_package_name} style={{ "textDecoration": "none", "color": "#212529" }}>
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
                              <a href={SITE_URL + '/publications/' + new_publications_title + '~' + default_search_publications.id} style={{ "textDecoration": "none", "color": "#212529" }}>
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
              <div className="col-sm-5"></div>
            </div>
            {step_html}
          {/*</div>*/}
        </header>
      </div>
    )
  }
}
export default Header;