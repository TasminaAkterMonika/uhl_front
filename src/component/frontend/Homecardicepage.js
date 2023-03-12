import React, { Component } from 'react';
//import {API_TOKEN_NAME} from '../../constants';
import {Route} from 'react-router-dom';
//import { scAxios } from '../..';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import Search from "../../component/frontend/commonsections/Search";
//import CenterExcellence from "../../component/frontend/commonsections/CenterExcellence";
import Ceo from "../../component//frontend/commonsections/Ceo";
import NewsEventsSilde from "../../component/frontend/commonsections/NewsEventsSilde";
import PublicationsSilde from "../../component/frontend/commonsections/PublicationsSilde";
import Homecardic from "../../component/frontend/homecrdic/Homcardic";
class Homecardicepage extends Component {
  render() {
    return (
      <div>
        <Route component={Header} />
        <Search/>
        <Homecardic/>
        <Ceo/>
        <NewsEventsSilde/>
        <PublicationsSilde/>
        <Route component={Footer} />
      </div>
    );
  }
}
export default Homecardicepage;