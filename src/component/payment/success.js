import React, { Component } from 'react';
import {API_TOKEN_NAME, USER_ID, LOGIN_PHONE_NUMBER, PATIENT_NAME, SEARCH_SELECTED_DOC_ID, SCHEDULE_DATE, SCHEDULE_TIME} from '../../constants';
import {Route} from 'react-router-dom';
import { startUserSession } from '../../userSession';
import { scAxiosAdmin, scAxios } from '../..';
import { toast } from 'react-toastify';
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

const bookingAppoinments = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxios.request('/AppointmentBooking', {
      method: 'post',
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
const UpdateAppoinmentData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/payment/updateappointemntdetails', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
class Success extends Component {
  state = {
    transaction_id:'',
    appointment_id:'',
    appointment_date:'',
    appointment_time:'',
    patient_name:'',
    doctor_name:'',
    doctor_fees:'',
    total_amount:'',
    payment_status:'',
    currency:'',
  }
  handleChange = event =>{
    this.setState({
        [event.target.name]: event.target.value,
    });
  }
  refreshUpdateAppoinmentData = (data) => {
    UpdateAppoinmentData(data)
    .then(res => {
      if(res){
        let token = localStorage.getItem(API_TOKEN_NAME);
        let phone_number = localStorage.getItem(LOGIN_PHONE_NUMBER);
        let search_selected_doc_id = '';
        let patientid = localStorage.getItem(USER_ID);
        let schedule_date = '';
        //let apointment_id = res[0].AppointmentID;
        let apointment_id = '';
        let doctor_name = '';
        let doctor_fees = '';
        let patientName = localStorage.getItem(PATIENT_NAME);
        let schedule_time = '';
        let search_selected_doc_name = '';
        let doctor_profile_avability = '';
        startUserSession(token, patientid, phone_number, search_selected_doc_id, schedule_date, apointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability);
        var records = res.data;
        this.setState({ 
            transaction_id: records.transaction_id,
            appointment_id: records.appointment_id,
            appointment_date: records.appointment_date,
            appointment_time: records.appointment_time,
            patient_name: records.patient_name,
            doctor_name: records.doctor_name,
            doctor_fees: records.doctor_fees,
            total_amount: records.amount,
            payment_status: records.status,
            currency: records.currency,
        });
        //this.setState({ patientLists: records });
      } else {
          //this.setState({ patientLists: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  componentDidMount(){
    /*const query = new URLSearchParams(this.props.location.search);
    var trans_id = query.get('trans_id');
    if(trans_id){
      const data = {
        PatientID: localStorage.getItem(USER_ID),
        DoctorID: localStorage.getItem(SEARCH_SELECTED_DOC_ID),
        Scheduledate: localStorage.getItem(SCHEDULE_DATE),
        Scheduletime: localStorage.getItem(SCHEDULE_TIME),
      }
      bookingAppoinments(data)
      .then(res => {
        console.log(res);
        const data = {
          transaction_id: trans_id,
          appointment_id: res[0].AppointmentID,
          appointment_date: localStorage.getItem(SCHEDULE_DATE),
          appointment_time: localStorage.getItem(SCHEDULE_TIME),
        }
        this.refreshUpdateAppoinmentData(data);
      })
      .catch(err => {
        toast.error('Appointment not booked successful!', {
          position: toast.POSITION.TOP_LEFT
           });
      });
    }*/
  }
  render() {
    return ( 
      <div>
        <section className="banner-part">
          <Route component={HomeHeader} />
          <div className="container">
            <div className="offcanvas offcanvas-start show" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
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
                    <p style={{"text-align":"center"}}><i className="fa fa-check-circle" aria-hidden="true" style={{"color":"#39e75f", "font-size":"80px"}}></i></p>
                    <h4 className="mt-3" style={{"color":"#39e75f", "text-align":"center", "fontSize": "22px"}}>Payment Successful!</h4>
                    <div className="payment mt-5">
                        <p>Hi, <strong>{this.state.patient_name}</strong></p> 
                        <p>Your Appointment booked payment successfully!! Please Contact to Hospital.</p>  
                        {/*<h3 style={{"font-size":"20px", "font-weight":"600"}}>Payment details:</h3>
                        <ul>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Transaction ID: </strong> {this.state.transaction_id}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment ID:</strong> {this.state.appointment_id}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment Date:</strong> {Moment(this.state.appointment_date).format('dddd, LL')}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment Time:</strong> {Moment(this.state.appointment_time, "HH:mm").format("hh:mm A")}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment Doctor Name: </strong> {this.state.doctor_name}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment Doctor Fees: </strong> {this.state.currency} {this.state.doctor_fees}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment Total Amount: </strong> {this.state.currency} {this.state.total_amount}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Payment Status: </strong>{this.state.payment_status} </li>
                        </ul>*/}                          
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
      </div>
    );
  }
}
 
export default Success;