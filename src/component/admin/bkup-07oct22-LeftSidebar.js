import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../../constants';
//import { scAxios } from '../../';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//import { Outlet,Link } from "react-router-dom";
import logo from '../../images/logo.png';
class LeftSidebar extends Component {
    render() {
        return(
            <div className="left side-menu">
                <div className="topbar-left">
                    <div className="">
                        {/*<a href="index.html" className="logo text-center">Fonik</a>*/}
                        <a href="/" className="logo"><img src={logo} height={65} alt="logo"/></a>
                    </div>
                </div>
                <div className="sidebar-inner slimscrollleft">
                    <div id="sidebar-menu">
                        <ul>
                            {/*<li className="menu-title">Main</li>*/}
                            <li>
                                <a href="/admindashboard" className="waves-effect"><i className="dripicons-device-desktop"></i><span> Dashboard </span></a>
                            </li>
                            <li>
                                <a href="/departments" className="waves-effect"><i className="dripicons-briefcase"></i><span> Departments </span></a>
                            </li>
                            <li>
                                <a href="/doctors" className="waves-effect"><i className="dripicons-briefcase"></i><span> Doctors </span></a>
                            </li>
                            <li>
                                <a href="#" className="waves-effect"><i className="dripicons-document-edit"></i><span> Testimonials </span></a>
                            </li>
                            <li>
                                <a href="/newsevents" className="waves-effect"><i className="dripicons-blog"></i><span> News Events </span></a>
                            </li>
                            <li>
                                <a href="#" className="waves-effect"><i className="dripicons-blog"></i><span> Publications </span></a>
                            </li>
                            <li>
                                <a href="#" className="waves-effect"><i className="dripicons-gear"></i><span> Home Page Setting </span></a>
                            </li>
                            <li className="has_sub">
                                <a href="/adminlogout" className="waves-effect"><i className="dripicons-exit"></i><span> Logout </span></a>
                            </li>
                            {/*<li className="has_sub">
                                <a href="#" className="waves-effect"><i className="dripicons-suitcase"></i><span> Departments <span className="float-right"><i className="mdi mdi-chevron-right"></i></span> </span></a>
                                <ul className="list-unstyled">
                                    <li><a href="ui-buttons.html">Buttons</a></li>
                                    <li><a href="ui-cards.html">Cards</a></li>
                                    <li><a href="ui-tabs-accordions.html">Tabs &amp; Accordions</a></li>
                                </ul>
                            </li>*/}
                            {/*<li className="has_sub">
                                <a href="#" className="waves-effect"><i className="dripicons-mail"></i> <span> Testimonials <span className="float-right"><i className="mdi mdi-chevron-right"></i></span> </span> </a>
                                <ul className="list-unstyled">
                                    <li><a href="email-inbox.html">Inbox</a></li>
                                    <li><a href="email-read.html">Email Read</a></li>
                                    <li><a href="email-compose.html">Email Compose</a></li>
                                </ul>
                            </li>*/}
                        </ul>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}
export default LeftSidebar;