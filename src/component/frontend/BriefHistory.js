import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import banner_img from '../../images/banner-profile.jpg';

class BriefHistory extends Component {
    render() {
        return (
            <div>
                <Route component={Header} />
                <img src={banner_img} alt="banner-profile" className="w-100" />
                <section className="termscondbody mt-5 mb-5">
                    <div className="container">
                        <h2> BRIEF HISTORY</h2>
                        <p>United Hospital Ltd. was born with a vision to provide a comprehensive, one-stop healthcare solution for the people of Bangladesh.
                            Opening its doors in August 2006 and situated besides the picturesque Gulshan Lake, this hospital is one of the largest private sector
                            healthcare facilities in Bangladesh. With a capacity of 500 beds and established across a total area of over 450,000 sft,
                            United  Hospital is committed to meeting the requirement of a diverse group of patients.With state of the art technology,
                            expertise and a broad spectrum of facilities & services,   combined with the support of our friendly staff, we aim to be the
                            top healthcare provider, not only in Bangladesh but within the Asia-Pacific region.</p>


                    </div>
                </section>
                <Route component={Footer} />
            </div>
        )
    }
}
export default BriefHistory;


