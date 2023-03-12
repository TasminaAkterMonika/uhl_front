import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import banner_img from '../../images/banner-profile.jpg';

class BoardMembers extends Component {
    render() {
        return (
            <div>
                <Route component={Header} />
                <img src={banner_img} alt="banner-profile" className="w-100" />
                <section className="termscondbody mt-5 mb-5">
                    <div className="container">
                        <h2> Board Members</h2>



                    </div>
                </section>
                <Route component={Footer} />
            </div>
        )
    }
}
export default BoardMembers;


