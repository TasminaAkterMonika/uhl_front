import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import PackageOne from "../../component/frontend/package/PackageOne";
import PackageTwo from "../../component/frontend/package/PackageTwo";
import SEO from "../../component/Seo";
class Packages extends Component {
  render() {
    return (
      <div>
        <SEO title="Packages" description="Packages United Hospital" pathSlug="packges" keywords="Packages, Package" />
        <Route component={Header} />
        <PackageOne/>
        <PackageTwo/>
        <Route component={Footer} />
      </div>
    );
  }
}
export default Packages;