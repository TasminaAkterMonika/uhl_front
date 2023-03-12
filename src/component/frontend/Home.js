import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import HomeSearch from "../../component/frontend/commonsections/HomeSearch";
//import NewCenterExcellence from "../../component/frontend/commonsections/NewCenterExcellence";
import CenterExcellence from "../../component/frontend/commonsections/CenterExcellence";
import NewsEventsSilde from "../../component/frontend/commonsections/NewsEventsSilde";
import PublicationsSilde from "../../component/frontend/commonsections/PublicationsSilde";
import HomeHeader from '../../component/frontend/HomeHeader';
import Footer from '../../component/frontend/Footer';
import SEO from "../../component/Seo";

class Home extends Component {
  render() {
    return (
      <div>
        <SEO title="Home" description="Home United Hospital" pathSlug="/" keywords="Home, HomePage" />
        <section className="banner-part" style={{"position":"relative", "zIndex":"9999999 !important"}}>
          <Route component={HomeHeader} />
          <div className="container">
            <HomeSearch/>
          </div>
        </section>
        <CenterExcellence/>
        <NewsEventsSilde/>
        <PublicationsSilde/>
        <Route component={Footer} />
      </div>
    );
  }
}
export default Home;