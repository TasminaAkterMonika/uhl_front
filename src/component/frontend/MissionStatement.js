import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import banner_img from '../../images/banner-profile.jpg';

class MissionStatement extends Component {
    render() {
        return (
            <div>
                <Route component={Header} />
                <img src={banner_img} alt="banner-profile" className="w-100" />
                <section className="termscondbody mt-5 mb-5">
                    <div className="container">
                        <h2>MISSION STATEMENT</h2>
                        <p>To provide the community a high quality health care in friendly and compassionate environment. </p>
                        <h2>VISION</h2>
                        To Provide a comprehensive one-stop healthcare solution for the people of Bangladesh & abroad.
                        <h2>OUR VALUES</h2>
                        We are committed to.....
                        <div className='mx-5'>
                            <li >Quality: Operating at the highest standards of safe and ethical practices and demonstrating continuous improvement.</li>
                            <li>Effectiveness: Selecting the most appropriate services to produce desired health outcomes.</li>
                            <li>Integration: Providing clear pathways by ensuring collaboration, consultation, effective communication with health service providers.</li>
                            <li>Caring for the Community: Promoting health and providing care based on a commitment to the wellbeing of patients.</li>
                            <li>Caring for Our Staff: Caring for the welfare of our staff and developing a culture of trust and training for personal growth.</li>
                            <li>Research and Training: Providing an environment that promotes personal development, learning, research.</li>

                        </div>
                    </div>
                </section>
                <Route component={Footer} />
            </div>
        )
    }
}
export default MissionStatement;


