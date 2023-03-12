import React, { Component } from 'react';
import {API_TOKEN_NAME, WEBSITEPAGE_URL} from '../../constants';
import { scAxiosAdmin } from '../..';
import logo from '../../images/logo2.png';
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
class Header extends Component {
  state = {
    step: 1,
    showthirdpopup:'',
    menu:[],
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
  componentDidMount(){
    if(localStorage.getItem(API_TOKEN_NAME)){
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
    } else if (step === 2) {
        step_html = <div className="">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-3 custom-margin 2">
                <PopupPatientLists nextStep={this.nextStep} prevStep={this.prevStep} />
              </div>
            </div>
          </div>
      </div>
        
    } else if (step === 3) {
      step_html = <div className="">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 col-sm-3 custom-margin 3">
                          <PopupIndex2 nextStep={this.nextStep} showpopup={this.state.showthirdpopup} />
                        </div>
                      </div>
                    </div>
                  </div>
    } else if (step === 4) {
      step_html = <div className="">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-3 custom-margin 4">
                <PopupIndex3 nextStep={this.nextStep} prevStep={this.prevStep} />
              </div>
            </div>
          </div>
        </div>
    } else if (step === 5) {
      step_html = <div className="">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-3 custom-margin 5">
                <PopupIndex5 />
              </div>
            </div>
          </div>
        </div>
    } else if (step === 6) {
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
        <header className="top-part">
          <div className="container">
            <p>Offer: This is a random offer text Learn More</p> 
          </div>
        </header>
        <header className="header-part hrad subpages_header" id="doctor-profile">
          {/*<div className="container">*/}
            <nav className="navbar navbar-expand-lg navbar-light"> 
              <div className="row">
                <div className="col-sm-6">
                  <a className="navbar-brand" href="/"><img src={logo} alt="logo2"/></a>
                </div>
                <div className="col-sm-6">
                  <input type="search" className="form-control" name="header_search_keywords" id="header_search_keywords" value="" placeholder="Search..."/>
                </div>
              </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                    localStorage.getItem(API_TOKEN_NAME)
                    ?
                      <p><a href="/logout">Logout</a></p>
                    :
                      <p><a href="/">Login</a>/<a href="/">Signup</a></p>
                  }
                  </li>
                </ul>
              </div> 
            </nav>
            {step_html}
          {/*</div>*/}
        </header>
      </div>
    )
  }
}
export default Header;