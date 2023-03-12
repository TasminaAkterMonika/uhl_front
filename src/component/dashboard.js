import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom';
import * as userActions from '../actions/userActions';
import { scAxiosAdmin } from '../';
import { API_TOKEN_NAME} from '../constants';
import PrivateRoute from '../PrivateRoute.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import appointments from './dashboard/appointments';
import admindashboard from './admin/admindashboard';
import newsevents from './admin/newsevents';
//import addnewsevents from './admin/addnewsevents';
import doctors from './admin/doctors';
import adddoctor from './admin/adddoctor';
import editdoctor from './admin/editdoctor';
import departments from './admin/departments';
import adddepartment from './admin/adddepartment';
import editdepartment from './admin/editdepartment';
import testimonials from './admin/testimonials';
import edittestimonial from './admin/edittestimonial';
import addtestimonial from './admin/addtestimonial';
import editnewsevent from './admin/editnewsevent';
import addnewsevent from './admin/addnewsevent';
import publications from './admin/publications';
import addpublication from './admin/addpublication';
import editpublication from './admin/editpublication';
import doctorView from './admin/doctorView';
import departmentView from './admin/departmentView';
import testimonialView from './admin/testimonialView';
import newsEventsView from './admin/newsEventsView';
import publicationView from './admin/publicationView';
import packages from './admin/packages';
import addpackage from './admin/addpackage';
import editpackage from './admin/editpackage';
import PackageView from './admin/PackageView';
import staticpages from './admin/staticpages';
import addstaticpage from './admin/addstaticpage';
import editpage from './admin/editpage';
import page from './admin/page';
import menu from './admin/menu';
import addmenu from './admin/addmenu';
import editmenu from './admin/editmenu';
import bannerbuttonlink from './admin/bannerbuttonlink';
import addbannerbuttonlink from './admin/addbannerbuttonlink';
import editbannerbuttonlink from './admin/editbannerbuttonlink';
import addbodylink from './admin/addbodylink';
import BodyLinkDept from './admin/BodyLinkDept';
import EditBodyLink from './admin/EditBodyLink';
//import ViewBodyLink from './admin/ViewBodyLink';
const getUserDeatils = () => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/user/detail/1', {
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
class Dashboard extends React.Component {
    state = {
        //isprofilecomplete: '',
        user_role:'',
    }
    componentDidMount() {
        getUserDeatils()
        .then(res => {
            if(res.status===true){
                var userdata = res.data;
                this.setState({
                    //isprofilecomplete: userdata.isprofilecomplete,
                    user_role: userdata.role,
                });
            } else {
                toast.error(res.message, {
                  position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }
    render() { 
        let user_role = this.state.user_role; 
        let userlink;
        //let isprofilecomplete = this.state.isprofilecomplete; 
        if(user_role === '1'){
            userlink = <div>
                        <Route/>
                        <Switch>
                            <PrivateRoute path='/editbannerbuttonlink/:id' component={editbannerbuttonlink} user={this.props.user} exact />
                            <PrivateRoute path='/addbannerbuttonlink' component={addbannerbuttonlink} user={this.props.user} exact />
                            <PrivateRoute path='/bannerbuttonlink' component={bannerbuttonlink} user={this.props.user} exact />
                            <PrivateRoute path='/staticpages' component={staticpages} user={this.props.user} exact />
                            <PrivateRoute path='/addstaticpage' component={addstaticpage} user={this.props.user} exact />
                            <PrivateRoute path='/editpage/:id' component={editpage} user={this.props.user} exact />
                            <PrivateRoute path='/page/:id' component={page} user={this.props.user} exact />
                            <PrivateRoute path='/menu' component={menu} user={this.props.user} exact />
                            <PrivateRoute path='/addmenu' component={addmenu} user={this.props.user} exact />
                            <PrivateRoute path='/editmenu/:id' component={editmenu} user={this.props.user} exact />
                            <PrivateRoute path='/packages' component={packages} user={this.props.user} exact />
                            <PrivateRoute path='/addpackage' component={addpackage} user={this.props.user} exact />
                            <PrivateRoute path='/editpackage/:id' component={editpackage} user={this.props.user} exact />
                            <PrivateRoute path='/viewpackage/:id' component={PackageView} user={this.props.user} exact />
                            <PrivateRoute path='/body-links' component={BodyLinkDept} user={this.props.user} exact/>
                            <PrivateRoute path='/addbodylink' component={addbodylink} user={this.props.user} exact />
                            <PrivateRoute path='/editbodylink/:id' component={EditBodyLink} user={this.props.user} exact />
                            {/*<PrivateRoute path='/viewbodylink/:id' component={ViewBodyLink} user={this.props.user} exact />*/}
                            <PrivateRoute path='/viewdoctor/:id' component={doctorView} user={this.props.user} exact />
                            <PrivateRoute path='/viewdepartment/:id' component={departmentView} user={this.props.user} exact />
                            <PrivateRoute path='/viewtestimonial/:id' component={testimonialView} user={this.props.user} exact />
                            <PrivateRoute path='/viewnewsevent/:id' component={newsEventsView} user={this.props.user} exact />
                            <PrivateRoute path='/viewpublication/:id' component={publicationView} user={this.props.user} exact />
                            <PrivateRoute path='/edittestimonial/:id' component={edittestimonial} user={this.props.user} exact />
                            <PrivateRoute path='/addtestimonial' component={addtestimonial} user={this.props.user} exact />
                            <PrivateRoute path='/testimonials' component={testimonials} user={this.props.user} exact />
                            <PrivateRoute path='/addpublication' component={addpublication} user={this.props.user} exact />
                            <PrivateRoute path='/editpublication/:id' component={editpublication} user={this.props.user} exact />
                            <PrivateRoute path='/publications' component={publications} user={this.props.user} exact />
                            <PrivateRoute path='/editdepartment/:id' component={editdepartment} user={this.props.user} exact />
                            <PrivateRoute path='/adddepartment' component={adddepartment} user={this.props.user} exact />
                            <PrivateRoute path='/departments' component={departments} user={this.props.user} exact />
                            <PrivateRoute path='/editdoctor/:id' component={editdoctor} user={this.props.user} exact />
                            <PrivateRoute path='/adddoctor' component={adddoctor} user={this.props.user} exact />
                            <PrivateRoute path='/doctors' component={doctors} user={this.props.user} exact />
                            {/*<PrivateRoute path='/addnewsevents' component={addnewsevents} user={this.props.user} exact />*/}
                            <PrivateRoute path='/editnewsevent/:id' component={editnewsevent} user={this.props.user} exact />
                            <PrivateRoute path='/addnewsevent' component={addnewsevent} user={this.props.user} exact />
                            <PrivateRoute path='/newsevents' component={newsevents} user={this.props.user} exact />
                            <PrivateRoute path='/admindashboard' component={admindashboard} user={this.props.user} exact />
                            <Redirect to="/admindashboard" />
                        </Switch>
                    </div>
        }
        if(user_role === '2'){
            userlink = <div>
                        <Route/>
                        <Switch>
                            <PrivateRoute path='/appointments' component={appointments} user={this.props.user} exact />
                            <Redirect to="/appointments" />
                        </Switch>
                    </div>
        }
        return (
          <div>
           {userlink}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);