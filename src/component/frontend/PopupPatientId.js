import React, { Component } from 'react';
import {API_TOKEN_NAME, USER_ID, LOGIN_PHONE_NUMBER, PATIENT_NAME, SEARCH_SELECTED_DOC_ID, SCHEDULE_DATE, SCHEDULE_TIME} from '../../constants';
import {Route} from 'react-router-dom';
import { startUserSession } from '../../userSession';
import { scAxiosAdmin, scAxios } from '../..';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeHeader from '../../component/frontend/HomeHeader';
import Footer from '../../component/frontend/Footer';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import HomeSearch from "../../component/frontend/commonsections/HomeSearch";
import CenterExcellence from "../../component/frontend/commonsections/CenterExcellence";
import NewsEventsSilde from "../../component/frontend/commonsections/NewsEventsSilde";
import PublicationsSilde from "../../component/frontend/commonsections/PublicationsSilde";
import Moment from 'moment';
import $ from 'jquery';
import PopupIndex4 from '../../component/frontend/PopupIndex4';

const getPatientdata = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxios.request('/patients', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
const UpdatePatientdata = (data) => {
  return new Promise((resolve, reject) => {
    //const token = Buffer.from(`${API_AUTH_USERNAME}:${API_AUTH_PASSWORD}`, 'utf8').toString('base64');
    const req = scAxiosAdmin.request('/user/updatepatientid', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          //'Authorization': `Basic ${token}`,
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
class PopupPatientId extends Component {
  state = {
    fields: {},
    errors: {},
    patient_id: '',
    user_id:'',
    showLoginPopup: false
  };
  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      patient: this.state.patient_id
    }
    getPatientdata(data)
    .then(res => {
      if(res[0]['patient_ID']){
        const data = {
          userid: this.state.user_id,
          patient_id: this.state.patient_id
        }
        this.updatePatientId(data);
      } else {
        toast.error('Your Patient Id Invalid. Please Enter Valid Patient Id.', {
          position: toast.POSITION.TOP_LEFT
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  updatePatientId = (data) => {
    UpdatePatientdata(data)
    .then(res => {
      if(res.status == true){
        toast.success(res.message, {
          position: toast.POSITION.TOP_LEFT
        });
        setTimeout(() => {
          window.location.href = '/?update_success=success';
          //this.setState({showLoginPopup: true});
        }, 3000);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_LEFT
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  closePopup = event => {
    $(".popup_patient_id").css("visibility", 'hidden');
    $(".popup_patient_id").removeClass('show');
    $(".login_popup").css("visibility", 'visible');
    $(".login_popup").addClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
  }
  componentDidMount(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userid = params.get('userid');
    this.setState({user_id: userid});
  }
  render() {
    return ( 
      <div>
        <section className="banner-part">
          <Route component={HomeHeader} />
          <div className="container">
            <div className="offcanvas offcanvas-start show popup_patient_id" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel"> </h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
              </div>
              <div className="offcanvas-body">
                <div className="row text-center" id="logos">
                  <div className="col-4">
                    <img src={uhlcare_logo} alt="uhlcare-logo" />
                  </div>
                  <div className="col-4">
                    <img src={uhl_logo} alt="uhl-logo" />
                  </div>
                  <div className="col-4">
                    <img src={medix_logo} alt="medix-logo" />
                  </div>
                </div>
                <div className="left-offcanvas">
                  <h4 className="mt-3">Update Patient Id</h4>
                  <div className="payment mt-5">
                    <form onSubmit={this.handleSubmit} id="loginform" className="needs-validation" noValidate>
                      <input placeholder="Enter Patient I.D (Optional)" type="text" id="patient_id" name="patient_id" value={this.state.patient_id} onChange={this.handleChange} autoComplete="off" className="form-control" required />
                      <div className="row mt-3">
                        <div className="col-12">
                          <button type="submit" className="btn-links appointment-new" id="black-btn"> Update Patient Id </button>
                        </div> 
                      </div> 
                    </form>                          
                  </div>
                </div>
              </div>
            </div>
            <HomeSearch/>
          </div>
        </section>
        <CenterExcellence/>
        <NewsEventsSilde/>
        <PublicationsSilde/>
        <Route component={Footer} />
        {
          this.state.showLoginPopup
          ?
            <PopupIndex4 showPopup={this.state.showLoginPopup}/>
          :
            null
        }
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}
 
export default PopupPatientId;