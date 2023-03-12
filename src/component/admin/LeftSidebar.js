import React, { Component } from 'react';
import logo from '../../images/logo.png';
class LeftSidebar extends Component {
    render() {
        return(
            <div className="left side-menu">
                <div className="topbar-left">
                    <div className="">
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
                                <a href="/testimonials" className="waves-effect"><i className="dripicons-document-edit"></i><span> Testimonials </span></a>
                            </li>
                            <li>
                                <a href="/newsevents" className="waves-effect"><i className="dripicons-blog"></i><span> News Events </span></a>
                            </li>
                            <li>
                                <a href="/publications" className="waves-effect"><i className="dripicons-blog"></i><span> Publications </span></a>
                            </li>
                            <li>
                                <a href="/packages" className="waves-effect"><i className="dripicons-blog"></i><span> Packages </span></a>
                            </li>
                            <li>
                                <a href="/staticpages" className="waves-effect"><i className="dripicons-blog"></i><span> Static Pages </span></a>
                            </li>
                            <li>
                                <a href="/menu" className="waves-effect"><i className="dripicons-blog"></i><span> Menu </span></a>
                            </li>
                            <li>
                                <a href="/bannerbuttonlink" className="waves-effect"><i className="dripicons-blog"></i><span> Banner Button Link </span></a>
                            </li>
                            <li>
                                <a href="/body-links" className="waves-effect"><i className="dripicons-blog"></i><span> Body Links </span></a>
                            </li>
                            <li className="has_sub">
                                <a href="/adminlogout" className="waves-effect"><i className="dripicons-exit"></i><span> Logout </span></a>
                            </li>
                        </ul>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}
export default LeftSidebar;