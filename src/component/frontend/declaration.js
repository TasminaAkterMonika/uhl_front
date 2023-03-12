import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';

class Declaration extends Component {
    render(){
        return(
            <div>
                <Route component={Header} />
                <section className="termscondbody mt-5 mb-5">
                    <div className="container">
                        <h2>Declaration</h2>   
                        <p>All the information displayed, transmitted or carried by United Hospital and its related websites including, but not limited to, directories, guides, news articles, opinions, reviews, text, photographs, images, illustrations, profiles, audio clips, video clips, trademarks, service marks and the like, collectively the “Content”, are protected by the copyright and other intellectual property laws and be informed that the content of the same is not intended to be a substitute for professional medical advice and not for solicitation of business. The Content is owned by United Hospital, its affiliates or third party licensors. You may not modify, publish, transmit, transfer, sell, reproduce, create derivative work from, distribute, repost, perform, display or in any way commercially exploit any of the Content. You agree to abide by all copyright notices and restrictions attached to any Content accessed through the United Hospital website and not to alter the content in any way</p>
                        <p>Permitted Use: You may take a single copy of the Content displayed on the United Hospital website for personal, non-commercial use only, provided that you do not remove any trademarks, copyright and any other notice contained in such Content. You shall not archive or retain any Content in any form without written permission. The information provided in this site is for the sole purpose of</p>
                    </div>
                </section>
                <Route component={Footer} />
            </div>
        )
    }
}
export default Declaration;