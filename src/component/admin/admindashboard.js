import React, { Component } from 'react';
//import {API_TOKEN_NAME, USER_ID} from '../../constants';
import {Route} from 'react-router-dom';
//import { scAxios } from '../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Footer from '../../component/admin/Footer';
import '../../assets/scss/app.scss';
class AdminDashboard extends Component {
  	render() {
    	return (
    		<div className="fixed-left">
	    		<div id="wrapper">
	    			<Route component={LeftSidebar} />
	    			<div className="content-page">
                		<div className="content">
	    					<Route component={TopHeader} />
	    					<div className="page-content-wrapper">
		                        <div className="header-bg"> 
		                            <div className="container-fluid">
		                                <div className="row">
		                                    <div className="col-12 mb-4 pt-5">
		                                        {/*<div id="morris-bar-example" className="dash-chart"></div>*/}
		                                        <div className="mt-4 text-center">
		                                            <button type="button" className="btn btn-outline-primary ml-1 waves-effect waves-light">Year 2017</button>
		                                            <button type="button" className="btn btn-outline-info ml-1 waves-effect waves-light">Year 2018</button>
		                                            <button type="button" className="btn btn-outline-primary ml-1 waves-effect waves-light">Year 2019</button>
		                                        </div>
		                                    </div>
		                                </div>
		                            </div>
		                        </div>
		                        <div className="container-fluid">
	                            	<div className="row">
		                                <div className="col-md-6 col-xl-3">
		                                    <div className="card text-center m-b-30">
		                                        <div className="mb-2 card-body text-muted">
		                                            <h3 className="text-info">15,852</h3>
		                                            Monthly Statistics
		                                        </div>
		                                    </div>
		                                </div>
		                                <div className="col-md-6 col-xl-3">
		                                    <div className="card text-center m-b-30">
		                                        <div className="mb-2 card-body text-muted">
		                                            <h3 className="text-purple">9,514</h3>
		                                            New Orders
		                                        </div>
		                                    </div>
		                                </div>
		                                <div className="col-md-6 col-xl-3">
		                                    <div className="card text-center m-b-30">
		                                        <div className="mb-2 card-body text-muted">
		                                            <h3 className="text-primary">289</h3>
		                                            New Users
		                                        </div>
		                                    </div>
		                                </div>
		                                <div className="col-md-6 col-xl-3">
		                                    <div className="card text-center m-b-30">
		                                        <div className="mb-2 card-body text-muted">
		                                            <h3 className="text-danger">5,220</h3>
		                                            Unique Visitors
		                                        </div>
		                                    </div>
		                                </div>
	                            	</div>
	                            	<div className="row">
		                                <div className="col-xl-4">
		                                    <div className="card m-b-30">
		                                        <div className="card-body">
		                                            <h4 className="mt-0 header-title">Monthly Earnings</h4>
		                                            <div className="row text-center m-t-20">
		                                                <div className="col-6">
		                                                    <h5 className="">56241</h5>
		                                                    <p className="text-muted font-14">Marketplace</p>
		                                                </div>
		                                                <div className="col-6">
		                                                    <h5 className="">23651</h5>
		                                                    <p className="text-muted font-14">Total Income</p>
		                                                </div>
		                                            </div>
		                                            <div id="morris-donut-example" className="dash-chart"></div>
		                                        </div>
		                                    </div>
		                                </div>
		                                <div className="col-xl-8">
		                                    <div className="card m-b-30">
		                                        <div className="card-body">
		                                            <h4 className="mt-0 header-title">Email Sent</h4>
		                                            <div className="row text-center m-t-20">
		                                                <div className="col-4">
		                                                    <h5 className="">56241</h5>
		                                                    <p className="text-muted font-14">Marketplace</p>
		                                                </div>
		                                                <div className="col-4">
		                                                    <h5 className="">23651</h5>
		                                                    <p className="text-muted font-14">Total Income</p>
		                                                </div>
		                                                <div className="col-4">
		                                                    <h5 className="">23651</h5>
		                                                    <p className="text-muted font-14">Last Month</p>
		                                                </div>
		                                            </div>
		                                            <div id="morris-area-example" className="dash-chart"></div>
		                                        </div>
		                                    </div>
		                                </div>
                            		</div>
                            		<div className="row">
		                                <div className="col-xl-8">
		                                    <div className="card m-b-30">
		                                        <div className="card-body">
		                                            <h4 className="mt-0 m-b-30 header-title">Latest Transactions</h4>
		                                            <div className="table-responsive">
		                                                <table className="table m-t-20 mb-0 table-vertical">
		                                                    <tbody>
			                                                    <tr>
			                                                        <td>
			                                                            <img src="assets/images/users/avatar-2.jpg" alt="userimage" className="thumb-sm rounded-circle mr-2"/>
			                                                            Herbert C. Patton
			                                                        </td>
			                                                        <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
			                                                        <td>
			                                                            $14,584
			                                                            <p className="m-0 text-muted font-14">Amount</p>
			                                                        </td>
			                                                        <td>
			                                                            5/12/2016
			                                                            <p className="m-0 text-muted font-14">Date</p>
			                                                        </td>
			                                                        <td>
			                                                            <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
			                                                        </td>
			                                                    </tr>
			                                                    <tr>
			                                                        <td>
			                                                            <img src="assets/images/users/avatar-3.jpg" alt="userimage" className="thumb-sm rounded-circle mr-2"/>
			                                                            Mathias N. Klausen
			                                                        </td>
			                                                        <td><i className="mdi mdi-checkbox-blank-circle text-warning"></i> Waiting payment</td>
			                                                        <td>
			                                                            $8,541
			                                                            <p className="m-0 text-muted font-14">Amount</p>
			                                                        </td>
			                                                        <td>
			                                                            10/11/2016
			                                                            <p className="m-0 text-muted font-14">Date</p>
			                                                        </td>
			                                                        <td>
			                                                            <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
			                                                        </td>
			                                                    </tr>
			                                                    <tr>
			                                                        <td>
			                                                            <img src="assets/images/users/avatar-4.jpg" alt="userimage" className="thumb-sm rounded-circle mr-2"/>
			                                                            Nikolaj S. Henriksen
			                                                        </td>
			                                                        <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
			                                                        <td>
			                                                            $954
			                                                            <p className="m-0 text-muted font-14">Amount</p>
			                                                        </td>
			                                                        <td>
			                                                            8/11/2016
			                                                            <p className="m-0 text-muted font-14">Date</p>
			                                                        </td>
			                                                        <td>
			                                                            <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
			                                                        </td>
			                                                    </tr>
			                                                    <tr>
			                                                        <td>
			                                                            <img src="assets/images/users/avatar-5.jpg" alt="userimage" className="thumb-sm rounded-circle mr-2"/>
			                                                            Lasse C. Overgaard
			                                                        </td>
			                                                        <td><i className="mdi mdi-checkbox-blank-circle text-danger"></i> Payment expired</td>
			                                                        <td>
			                                                            $44,584
			                                                            <p className="m-0 text-muted font-14">Amount</p>
			                                                        </td>
			                                                        <td>
			                                                            7/11/2016
			                                                            <p className="m-0 text-muted font-14">Date</p>
			                                                        </td>
			                                                        <td>
			                                                            <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
			                                                        </td>
			                                                    </tr>
			                                                    <tr>
			                                                        <td>
			                                                            <img src="assets/images/users/avatar-6.jpg" alt="userimage" className="thumb-sm rounded-circle mr-2"/>
			                                                            Kasper S. Jessen
			                                                        </td>
			                                                        <td><i className="mdi mdi-checkbox-blank-circle text-success"></i> Confirm</td>
			                                                        <td>
			                                                            $8,844
			                                                            <p className="m-0 text-muted font-14">Amount</p>
			                                                        </td>
			                                                        <td>
			                                                            1/11/2016
			                                                            <p className="m-0 text-muted font-14">Date</p>
			                                                        </td>
			                                                        <td>
			                                                            <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
			                                                        </td>
			                                                    </tr>
		                                                    </tbody>
		                                                </table>
		                                            </div>
		                                        </div>
		                                    </div>
		                                </div>
		                                <div className="col-xl-4">
		                                    <div className="card m-b-30">
		                                        <div className="card-body">
		                                            <h4 className="mt-0 m-b-15 header-title">Recent Activity Feed</h4>
		                                            <ol className="activity-feed mb-0">
		                                                <li className="feed-item">
		                                                    <span className="date">Sep 25</span>
		                                                    <span className="activity-text">Responded to need “Volunteer Activities”</span>
		                                                </li>
		            
		                                                <li className="feed-item">
		                                                    <span className="date">Sep 24</span>
		                                                    <span className="activity-text">Added an interest “Volunteer Activities”</span>
		                                                </li>
		                                                <li className="feed-item">
		                                                    <span className="date">Sep 23</span>
		                                                    <span className="activity-text">Joined the group “Boardsmanship Forum”</span>
		                                                </li>
		                                                <li className="feed-item">
		                                                    <span className="date">Sep 21</span>
		                                                    <span className="activity-text">Responded to need “In-Kind Opportunity”</span>
		                                                </li>
		                                                <li className="feed-item">
		                                                    <span className="date">Sep 18</span>
		                                                    <span className="activity-text">Created need “Volunteer Activities”</span>
		                                                </li>
		                                                <li className="feed-item">
		                                                    <span className="date">Sep 17</span>
		                                                    <span className="activity-text">Attending the event “Some New Event”. Responded to needed.</span>
		                                                </li>
		                                                <li className="feed-item pb-1">
		                                                    <span className="activity-text">
		                                                        <a href="" className="text-primary">More Activities</a>
		                                                    </span>
		                                                </li>
		                                            </ol>
		                                        </div>
		                                    </div>
		                                </div>
                            		</div>
	                            </div>
		                    </div>
		    			</div>
		    			<Route component={Footer} />
		    		</div>
		        </div>
		    </div>
    	);
    }
}
export default AdminDashboard;