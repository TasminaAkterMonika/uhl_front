import React, { Component } from 'react';
import {API_TOKEN_NAME, IMAGE_URL} from '../../constants';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import banner_img from '../../images/banner-profile.jpg';

const getSingleNewsEvents = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/newsevents/getsinglenewsevents/'+id, {
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
      }
    });
    req.then(res => resolve(res.data))
        .catch(err => reject(err));
  });
}
class SingleNewsEvents extends Component {
	state = {
    	news_events_title:'',
    	news_events_pic:'',
    	news_events_desc:'',
  	}
  	handleChange = event => { 
	    this.setState({
	        [event.target.name]: event.target.value
	    });
  	}
  	refreshgetSingleNewsEvents = () => {
  		let news_event_title_string = this.props.match.params.name;
	    let new_news_event_title = news_event_title_string.replaceAll('-', ' ');
    	getSingleNewsEvents(new_news_event_title)
    	.then(res => {
    		if(res.status===true){
      		var records = res.data;
	        this.setState({ 
	          news_events_title: records.news_events_title, 
	          news_events_desc: records.news_events_desc,
	          news_events_pic: records.news_events_pic,
	        });
    		} else {
	        this.setState({ 
	          news_events_title: '', 
	          news_events_desc: '',
	          news_events_pic: '',
	        });
    		}
    	})
	    .catch(err => {
	        console.log(err);
	    });
  	}
  	componentDidMount(){
    	this.refreshgetSingleNewsEvents();
  	}
  	render(){
  		return(
  			<div>
  				<Route component={Header} />
	        <section className="banner-hero">
	        	<div className="container">
		        	{ this.state.news_events_pic
	              ?
	                <img src={IMAGE_URL+'NewsEventsImg/'+ this.state.news_events_pic} alt="banner-profile" className="w-100" style={{"max-height": "450px"}}/>
	              :
	                <img src={banner_img} alt="banner-profile" className="w-100" />
	            }
	          </div>
	        </section>
      		<section className="prof-dr">
      			<div className="container">
        			<div className="box-of-about mt-4 mb-4">
          				<div className="row">
		                <div className="col-lg-12 col-md-12">
		                  <div className="text-profile"> 
		                    <h2>{this.state.news_events_title}</h2>
		                    <p className="text-chnage" dangerouslySetInnerHTML={{ __html: this.state.news_events_desc }}></p>
		                  </div>
		                </div>
          				</div>
        			</div>
          	</div>
          </section>
          <Route component={Footer} />
        </div>
  		)
  	}
}
export default SingleNewsEvents;