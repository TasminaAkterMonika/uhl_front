import React, { Component } from 'react';
import {API_TOKEN_NAME} from '../../constants';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import HomeHeader from '../../component/frontend/HomeHeader';
import Footer from '../../component/frontend/Footer';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import Moment from 'moment';
import HomeSearch from "../../component/frontend/commonsections/HomeSearch";
import CenterExcellence from "../../component/frontend/commonsections/CenterExcellence";
import NewsEventsSilde from "../../component/frontend/commonsections/NewsEventsSilde";
import PublicationsSilde from "../../component/frontend/commonsections/PublicationsSilde";

const getPaymentDetails = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/payment/getpaymentdetails', {
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

class Cancel extends Component {
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
    payment_message:'',
  }
  handleChange = event =>{
    this.setState({
        [event.target.name]: event.target.value,
    });
  }
  refreshGetpaymentData = (data) => {
    getPaymentDetails(data)
    .then(res => {
        if(res){
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
        } else {
            this.setState({ 
                transaction_id: '',
                appointment_id: '',
                appointment_date: '',
                appointment_time: '',
                patient_name: '',
                doctor_name: '',
                doctor_fees: '',
                total_amount: '',
                payment_status: '',
                currency: '',
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
  }
  componentDidMount(){
    const query = new URLSearchParams(this.props.location.search);
    var status = query.get('status');
    var trans_id = query.get('trans_id');
    if(status === 'transaction_cancel'){
        this.setState({payment_message: 'Payment Transaction Canceled!'});
    } else if(status === 'already_success'){
        this.setState({payment_message: 'Payment Transaction already success!'});
    } else {
        this.setState({payment_message: 'Payment Transaction Invalid!'});
    }
    const data = {
      transaction_id: trans_id,
    }
    this.refreshGetpaymentData(data);
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
                    <p style={{"text-align":"center"}}><i className="fa fa-times-circle" aria-hidden="true" style={{"color":"#ff0000", "fontSize":"80px"}}></i></p>
                    <h4 className="mt-3" style={{"color":"#ff0000", "text-align":"center"}}>Payment Cancelled!</h4>
                    <div className="payment mt-5">
                        <p>Hii, <strong>{this.state.patient_name}</strong></p> 
                        <p>Your Appointment booked {this.state.payment_message}!</p>  
                        <h3 style={{"font-size":"20px", "font-weight":"600"}}>Payment details:</h3>
                        <ul>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Transaction ID: </strong> {this.state.transaction_id}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment ID:</strong> {this.state.appointment_id}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment Date:</strong> {Moment(this.state.appointment_date).format('dddd, LL')}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment Time:</strong> {Moment(this.state.appointment_time, "HH:mm").format("hh:mm A")}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment Doctor Name: </strong> {this.state.doctor_name}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment Doctor Fees: </strong> {this.state.currency} {this.state.doctor_fees}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Appointment Total Amount: </strong> {this.state.currency} {this.state.total_amount}</li>
                            <li style={{"list-style": "none", "line-height": "40px"}}><strong>Payment Status: </strong>{this.state.payment_status} </li>
                        </ul>                          
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
export default Cancel;