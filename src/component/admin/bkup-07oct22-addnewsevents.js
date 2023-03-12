import React, { Component } from 'react';
import {Route} from 'react-router-dom';
//import { scAxiosAdmin } from '../..';
//import { LOGIN_PAGE_PATH, API_TOKEN_NAME, USER_ROLE, USER_ID, IMAGE_URL, IS_ACTIVE, PROFILE_URL } from '../../constants';
//import { startUserSession } from '../../userSession';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
//import Footer from '../../component/admin/Footer';

class AddNewsEvents extends Component {
    render() {
        return (
            <div className="fixed-left">
                <div id="wrapper">
                    <Route component={LeftSidebar} />
                    <div className="content-page">
                        <div className="content">
                            <Route component={TopHeader} />
                            <div className="page-content-wrapper">
                                <div className="col-lg-12">
                                    <div className="card m-b-20">
                                        <div className="card-body">
                                            <h4 className="mt-0 header-title">Add News & Events</h4>
                                            {/*<p className="text-muted m-b-30 font-14">Parsley is a javascript form validation
                                                library. It helps you provide your users with feedback on their form
                                                submission before sending it to your server.</p>*/}
                                            <form className="" action="#" noValidate="">
                                                <div className="form-group">
                                                    <label>News & Events Title</label>
                                                    <input type="text" className="form-control" name="news_events_title" id="news_events_title" required placeholder="News Events Title"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Equal To</label>
                                                    <div>
                                                        <input type="password" id="pass2" className="form-control" required="" placeholder="Password"/>
                                                    </div>
                                                    <div className="m-t-10">
                                                        <input type="password" className="form-control" required="" data-parsley-equalto="#pass2" placeholder="Re-Type Password"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>E-Mail</label>
                                                    <div>
                                                        <input type="email" className="form-control" required="" parsley-type="email" placeholder="Enter a valid e-mail"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>URL</label>
                                                    <div>
                                                        <input parsley-type="url" type="url" className="form-control" required="" placeholder="URL"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Digits</label>
                                                    <div>
                                                        <input data-parsley-type="digits" type="text" className="form-control" required="" placeholder="Enter only digits"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Number</label>
                                                    <div>
                                                        <input data-parsley-type="number" type="text" className="form-control" required="" placeholder="Enter only numbers"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Alphanumeric</label>
                                                    <div>
                                                        <input data-parsley-type="alphanum" type="text" className="form-control" required="" placeholder="Enter alphanumeric value"/>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Textarea</label>
                                                    <div>
                                                        <textarea required="" className="form-control" rows="5"></textarea>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div>
                                                        <button type="submit" className="btn btn-pink waves-effect waves-light">
                                                            Submit
                                                        </button>
                                                        <button type="reset" className="btn btn-secondary waves-effect m-l-5">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddNewsEvents;