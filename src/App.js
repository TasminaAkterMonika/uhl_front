import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as userActions from './actions/userActions';
import './App.css';
import PrivateRoute from './PrivateRoute';
import { LOGIN_PAGE_PATH, API_TOKEN_NAME } from './constants';
import { scAxiosAdmin } from './.';
import Dashboard from './component/dashboard';
import Home from './component/frontend/Home';
import Packages from './component/frontend/Packages';
import DoctorProfile from './component/frontend/DoctorProfile';
//import Homecardic from './component/frontend/homecrdic/Homcardic';
import Homecardicepage from './component/frontend/Homecardicepage';
import register from './component/register';
import Login from './component/Login';
import forgetpassword from './component/forgetpassword';
import ResetPassword from './component/ResetPassword';
import Logout from './component/Logout';
import appointments from './component/dashboard/appointments';
import doctorportal from './component/dashboard/doctorportal';
import emergency from './component/frontend/emergency';
import patientoverview from './component/dashboard/patientoverview';
import patientoverviewtwo from './component/dashboard/patientoverviewtwo';
import patientportal from './component/dashboard/patientportal';
import patientportaltwo from './component/dashboard/patientportaltwo';
import patientreports from './component/dashboard/patientreports';
import patientlists from './component/frontend/PatientLists';
//import admindashboard from './component/admin/admindashboard';
import adminlogin from './component/adminlogin';
import AdminLogout from './component/adminlogout';
import adminregister from './component/adminregister';
import cancel from './component/payment/cancel';
import fail from './component/payment/fail';
import success from './component/payment/success';
import PopupPatientId from './component/frontend/PopupPatientId';
import BriefHistory from './component/frontend/BriefHistory';
import MissionStatement from './component/frontend/MissionStatement';
import BoardMembers from './component/frontend/BoardMembers';
import privacypolicy from './component/frontend/privacypolicy';
import termscondition from './component/frontend/termscondition';
import declaration from './component/frontend/declaration';
import singlenewsevents from './component/frontend/singlenewsevents';
import singlepublication from './component/frontend/singlepublication';
import singlepackage from './component/frontend/singlepackage';
import testimonials from './component/frontend/testimonials';
import DepartmentView from './component/frontend/DepartmentView';
import DepartmentsView from './component/frontend/DepartmentsView';
import StaticPages from './component/frontend/staticpages';

const getStaticPages = () => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/staticpages/getstaticpages', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
class App extends Component {
  state = {
    staticpages: []
  }
  /*refreshGetStaticPages = () => {
    getStaticPages()
      .then(res => {
        if (res.status === true) {
          var records = res.data;
          this.setState({ staticpages: records });
        } else {
          this.setState({ staticpages: '' });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }*/
  componentDidMount() {
    //this.refreshGetStaticPages();
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/logout' component={Logout} />
          <Route path='/adminlogout' component={AdminLogout} />
          <Route path='/resetpassword' component={ResetPassword} />
          <Route path='/forgetpassword' component={forgetpassword} />
          {/*<Route path='/pages/packages' component={Packages} />*/}
          <Route path='/pages/packages' component={Packages} />
          <Route path='/pages/homecardic' component={Homecardicepage} />
          <Route path='/pages/:slug' component={StaticPages} />
          {/*{this.state.staticpages.length > 0
            ?
              this.state.staticpages.map(static_page => {
                return(
                  <Route path={'/pages/'+static_page.slug} component={StaticPages}/>
                )
              })
            :
              ''
          }*/}
          <Route path='/patientlists' component={patientlists} />
          <Route path='/emergency' component={emergency} />
          <Route path='/cancel' component={cancel} />
          <Route path='/fail' component={fail} />
          <Route path='/success' component={success} />
          <Route path='/popuppatientid' component={PopupPatientId} />
          <Route path='/BriefHistory' component={BriefHistory} />
          <Route path='/MissionStatement' component={MissionStatement} />
          <Route path='/BoardMembers' component={BoardMembers} />
          <Route path='/privacy-policy' component={privacypolicy} />
          <Route path='/terms-conditions' component={termscondition} />
          <Route path='/declaration' component={declaration} />
          <Route path='/news/:name' component={singlenewsevents} />
          <Route path='/publications/:name' component={singlepublication} />
          <Route path='/packages/:name' component={singlepackage} />
          <Route path='/alltestimonials' component={testimonials} />
          <Route path={LOGIN_PAGE_PATH} component={Login} />
          <Route path='/signup' component={register} />
          <Route path='/consultant/:name' component={DoctorProfile} />
          <Route path='/departments/:name' component={DepartmentView} />
          <Route path='/department/:name' component={DepartmentView} />
          <Route path='/departments' component={DepartmentsView} />
          <Route path='/doctor/:name' component={DoctorProfile} />
          <Route path="/home" component={Home} />
          <Route path="/dashboard/patient-dashboard" component={patientoverview} />
          <Route path="/dashboard/appoinments" component={appointments} />
          <Route path="/dashboard/doctor-portal" component={doctorportal} />
          <Route path="/dashboard/patient-overview-two" component={patientoverviewtwo} />
          <Route path="/dashboard/patient-portal" component={patientportal} />
          <Route path="/dashboard/patient-portal-two" component={patientportaltwo} />
          <Route path="/dashboard/patient-reports" component={patientreports} />
          {/*<Route path="/admindashboard" component={admindashboard} />*/}
          <Route path="/adminlogin" component={adminlogin} />
          <Route path="/adminregister" component={adminregister} />
          <PrivateRoute path='/' component={Dashboard} user={this.props.user} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);