import React, { Component } from 'react';
import {API_TOKEN_NAME, WEBSITEPAGE_URL} from '../../constants';
import { scAxiosAdmin } from '../..';
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';
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
class HomeHeader extends Component {
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
            <div className="row">
              <div className="col-sm-4">
                <p>Offer: This is a random offer text Learn More</p> 
              </div>
              <div className="col-sm-8">
                <a href="tel:10666" style={{"color":"#fff", "textDecoration":"none"}}><img src={hotline_phone} alt="hotline_phone" style={{"width": "23px"}}/> 10666</a>
              </div>
            </div>
          </div>
        </header>
        <header className="header-part">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light"> 
              <Link className="navbar-brand" to="/"><img src={logo} alt="logo2" /></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                  {/*<li className="nav-item">
                    <a className="nav-link number" href="tel:10666"><img src={hotline_phone} alt="hotline_phone" style={{"width": "23px"}}/> 10666</a>
                  </li>*/}
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
                      <p><a href="#offcanvasExample" data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample">Login/Signup</a> </p>
                  }
                  </li>
                  <li className="nav-item bangla-part sp-rifht-0"><a className="nav-link" href="#">Bangla</a></li>
                </ul>
              </div> 
            </nav>
            {step_html}
          </div>
        </header>
      </div>
    )
  }
}
export default HomeHeader;