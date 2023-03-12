import React, { Component } from 'react';
import {API_TOKEN_NAME} from '../../constants';
//import { scAxios } from '../../';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo2.png';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import hotline_phone from '../../images/hotline_phone.svg';
import SubPopupIndex4 from '../../component/frontend/SubPopupIndex4';
import SubPopupIndex2 from '../../component/frontend/SubPopupIndex2';
class Header extends Component {
  state = {
    showLoginPopup: false,
    showDoctorSearchPopup: false,
  }
  onClickShowPopup = (e) =>{
    this.setState({
      showLoginPopup: true,
      showDoctorSearchPopup: true
    })
  }
  render() {
    //let site_url = location.protocol + '//' + location.host + "/unitedhospital";
    let site_url = location.protocol + '//' + location.host;
    return(
      <div>
        <header className="top-part">
          <div className="container">
            <p>Offer: This is a random offer text Learn More</p> 
          </div>
        </header>
        <header className="header-part hrad" id="doctor-profile">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light"> 
              <Link className="navbar-brand" to="/"><img src={logo} alt="logo2" /></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                  <li className="nav-item">
                    <a className="nav-link number" href="tel:10666"><img src={hotline_phone} alt="hotline_phone" /> 10666</a>
                  </li>
                  <li className="nav-item">
                    {/*<a className="nav-link active" href="#offcanvasExample" data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample">Book Appointment</a>*/} 
                    <button onClick={this.onClickShowPopup} className="nav-link active" role="button" style={{"background": "none", "border": "none", "color": "#da6621", "font-size": "16px", "font-weight": "600"}}>Book Appointment</button>
                  </li>
                  <li className="nav-item">
                    <Link to='packges' className="nav-link">Packges</Link>
                  </li> 
                  <li className="nav-item">
                    <Link className="nav-link" to="Homecardic" tabIndex={-1} aria-disabled="true">Emergency</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="Index5" tabIndex={-1} aria-disabled="true">Patient Info</Link>
                  </li> 
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
            {
              localStorage.getItem(API_TOKEN_NAME)
              ?
                this.state.showDoctorSearchPopup
                ?
                  <SubPopupIndex2 showPopup={this.state.showDoctorSearchPopup}/>
                :
                  null
              :
                this.state.showLoginPopup
                ?
                  <SubPopupIndex4 showPopup={this.state.showLoginPopup}/>
                :
                  null
            }
            {/*<div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel"> </h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <div className="row text-center" id="logos">
                  <div className="col-4">
                    <img src={uhlcare_logo} alt="uhlcare-logo"/>
                  </div>
                  <div className="col-3">
                    <img src={uhl_logo} alt="uhl-logo"/>
                  </div>
                  <div className="col-4">
                    <img src={medix_logo} alt="medix-logo"/>
                  </div>
                </div>
                <div className="left-offcanvas">
                  <div className="offcan-top-mar">
                    <h4>Book Appointment</h4>
                    <p>Enter Doctor's Name or relevant Department</p>
                  </div>
                  <form>
                    <input placeholder="Your Doctor Or Ailment" type="text" id="formBasicPassword" className="form-control"/>
                    <div className="row mt-3">
                      <div className="col-6"> 
                        <input type="date" id="formBasicPassword" className="form-control"/> 
                      </div>
                      <div className="col-6">
                        <a href={site_url+'/index2'} className="btn-links color-check">Check Schedule</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>*/}
          </div>
        </header>
      </div>
    )
  }
}
export default Header;