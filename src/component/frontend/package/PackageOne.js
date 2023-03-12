import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../../../constants';
//import {Route} from 'react-router-dom';
//import { scAxios } from '../../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
class PackageOne extends Component {
  render() {
    return(
      <div>
        <section className="banner-hero" id="package">
          <div className="container">
            <h2>Bangladesh’s Hassle Free <br /> Solution to Preventive Care</h2>
            <button className="btn btn-secondary make-btn">Select A Package</button>
            <button className="btn btn-secondary make-btn">Design Your Package</button>
          </div>
        </section>
      </div>
    )
  }
}
export default PackageOne;