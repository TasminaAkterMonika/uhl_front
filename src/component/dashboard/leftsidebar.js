import React, { Component } from 'react';
import {API_TOKEN_NAME, SITE_URL} from '../../constants';
//import { scAxios } from '../../';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//import { Outlet,Link } from "react-router-dom";
import doctor2 from '../../images/doctor2.png';
import white_logo from '../../images/white-logo.png';
class LeftSidebar extends Component {
  render() {
    return(
      <div className="dash-menu" id="dark-version">
         <div className="left-dash">
          <div className="text-center mb-4">
           <a href="/"><img src={white_logo} alt="white-logo"/></a>
          </div>
           <div className="doctor-part-img mb-4">
             <img src={doctor2} alt="doctor2"/> 
           </div>
           <ul className="left-menu">
             <li className={window.location.href=== SITE_URL+'/dashboard/patient-dashboard'? 'active':''}><a href="/dashboard/patient-dashboard"><i className="fa-solid fa-house"></i> Home</a></li> 
             <li className={window.location.href=== SITE_URL+'/dashboard/appoinments'? 'active':''}><a href="/dashboard/appoinments"><i className="fa-solid fa-calendar"></i> Appointments</a></li>
             <li className={window.location.href=== SITE_URL+'/dashboard/patient-reports'? 'active':''}><a href="/dashboard/patient-reports"><i class="fa-solid fa-file"></i> Lab Reports</a></li>
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
export default LeftSidebar;