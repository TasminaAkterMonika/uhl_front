import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../../constants';
//import { scAxios } from '../../';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//import { Outlet,Link } from "react-router-dom";
import doctor from '../../images/doctor.jpg';
import logo2 from '../../images/logo2.png';
class WhiteLeftSidebar extends Component {
  render() {
    return(
      <div className="dash-menu">
        <div className="left-dash">
          <div className="text-center">
            <img src={logo2} alt="logo2"/>
          </div>
          <div className="doctor-part-img">
            <img src={doctor} alt="doctor"/>
            <p className="mt-3">Patient ID: 1000411313</p>
            <div className="row">
              <div className="col-5"><p>Age: 45</p></div>
              <div className="col-6"><p>Gender: M</p></div>
            </div>
          </div>
          <ul className="left-menu">
            <li className="active"><a href="/"><i className="fa-solid fa-house"></i> Home</a></li>
            <li><a href="/dashbaord/appoinments">Appointments</a></li>
            <li><a href="#">Lab Reports</a></li>
            <li><a href="#">Prescriptions</a></li>
            <li><a href="#">Packages</a></li>
            <li><a href="#">Care Plans</a></li>
            <li><a href="#">Invoices</a></li>
            <li><a href="#">Library</a></li>
          </ul>
        </div>
      </div>
    )
  }
}
export default WhiteLeftSidebar;