import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../../constants';
import {Route} from 'react-router-dom';
//import { scAxios } from '../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import DoctorProfileSection from "../../component/frontend/doctorprofile/DoctorProfile";
class DoctorProfile extends Component {
  render() {
    return (
      <div>
        <Route component={Header} />
        <DoctorProfileSection currentDocId={this.props.match.params.name}/>
        <Route component={Footer} />
      </div>
    );
  }
}
export default DoctorProfile;