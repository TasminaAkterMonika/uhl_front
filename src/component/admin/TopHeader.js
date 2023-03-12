import React, { Component } from 'react';
class TopHeader extends Component {
    render() {
        return(
            <div className="topbar">
                <nav className="navbar-custom">
                    <div className="search-wrap" id="search-wrap">
                        <div className="search-bar">
                            <input className="search-input" type="search" placeholder="Search" />
                            <a href="#" className="close-search toggle-search" data-target="#search-wrap">
                                <i className="mdi mdi-close-circle"></i>
                            </a>
                        </div>
                    </div>
                    <ul className="list-inline float-right mb-0" style={{"float": "right"}}>
                        <li className="list-inline-item dropdown notification-list">
                            <a className="nav-link waves-effect toggle-search" href="#"  data-target="#search-wrap">
                                <i className="mdi mdi-magnify noti-icon"></i>
                            </a>
                        </li>
                        <li className="list-inline-item dropdown notification-list hidden-xs-down">
                            <a className="nav-link waves-effect" href="#" id="btn-fullscreen">
                                <i className="mdi mdi-fullscreen noti-icon"></i>
                            </a>
                        </li>
                        <li className="list-inline-item dropdown notification-list">
                            <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button"
                               aria-haspopup="false" aria-expanded="false">
                                <i className="ion-ios7-bell noti-icon"></i>
                                <span className="badge badge-danger noti-icon-badge">3</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                                <div className="dropdown-item noti-title">
                                    <h5>Notification (3)</h5>
                                </div>
                                <a href="#" className="dropdown-item notify-item active">
                                    <div className="notify-icon bg-success"><i className="mdi mdi-cart-outline"></i></div>
                                    <p className="notify-details"><b>Your order is placed</b><small className="text-muted">Dummy text of the printing and typesetting industry.</small></p>
                                </a>
                                <a href="#" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-warning"><i className="mdi mdi-message"></i></div>
                                    <p className="notify-details"><b>New Message received</b><small className="text-muted">You have 87 unread messages</small></p>
                                </a>
                                <a href="#" className="dropdown-item notify-item">
                                    <div className="notify-icon bg-info"><i className="mdi mdi-martini"></i></div>
                                    <p className="notify-details"><b>Your item is shipped</b><small className="text-muted">It is a long established fact that a reader will</small></p>
                                </a>
                                <a href="#" className="dropdown-item notify-item">
                                    View All
                                </a>
                            </div>
                        </li>
                        <li className="list-inline-item dropdown notification-list">
                            <a className="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#" role="button"
                               aria-haspopup="false" aria-expanded="false">
                                <img src="assets/images/users/avatar-1.jpg" alt="user" className="rounded-circle"/>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                <a className="dropdown-item" href="#"><i className="dripicons-user text-muted"></i> Profile</a>
                                <a className="dropdown-item" href="#"><i className="dripicons-wallet text-muted"></i> My Wallet</a>
                                <a className="dropdown-item" href="#"><span className="badge badge-success float-right m-t-5">5</span><i className="dripicons-gear text-muted"></i> Settings</a>
                                <a className="dropdown-item" href="#"><i className="dripicons-lock text-muted"></i> Lock screen</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/adminlogout"><i className="dripicons-exit text-muted"></i> Logout</a>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-inline menu-left mb-0">
                        <li className="list-inline-item">
                            <button type="button" className="button-menu-mobile open-left waves-effect">
                                <i className="ion-navicon"></i>
                            </button>
                        </li>
                        <li className="hide-phone list-inline-item app-search">
                            <h3 className="page-title">{document.title}</h3>
                        </li>
                    </ul>
                    <div className="clearfix"></div>
                </nav>
            </div>
        );
    }
}
export default TopHeader;