import React, { Component } from 'react';
import {API_TOKEN_NAME, IMAGE_URL} from '../../constants';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import banner_img from '../../images/banner-profile.jpg';

const getSingleStaticPages = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/staticpages/getsinglestaticpageslugdata/'+id, {
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
class StaticPages extends Component {
	state = {
    	static_page_title:'',
    	static_page_pic:'',
    	static_page_desc:'',
  	}
  	handleChange = event => { 
	    this.setState({
	        [event.target.name]: event.target.value
	    });
  	}
  	refreshGetSingleStaticPages = () => {
  		let static_page_title_string = this.props.match.params.slug;
	    //let new_news_event_title = news_event_title_string.replaceAll('-', ' ');
    	getSingleStaticPages(static_page_title_string)
    	.then(res => {
    		if(res.status===true){
      		var records = res.data;
	        this.setState({ 
	          static_page_title: records.title, 
	          static_page_desc: records.description,
	          static_page_pic: records.image,
	        });
    		} else {
	        this.setState({ 
	          static_page_title: '', 
	          static_page_desc: '',
	          static_page_pic: '',
	        });
    		}
    	})
	    .catch(err => {
	        console.log(err);
	    });
  	}
  	componentDidMount(){
    	this.refreshGetSingleStaticPages();
  	}
  	render(){
  		return(
  			<div>
  				<Route component={Header} />
  				<section className="banner-hero">
		        	{ this.state.static_page_pic
	              		?
	                		<img src={IMAGE_URL+'StaticPages/'+ this.state.static_page_pic} alt="banner-profile" className="w-100" style={{"max-height": "375px"}}/>
	              		:
	                		<img src={banner_img} alt="banner-profile" className="w-100" />
	            	}
	        	</section>
	      		<section className="prof-dr">
	      			<div className="container">
	        			<div className="box-of-about mt-4 mb-4">
	          				<div className="row">
				                <div className="col-lg-12 col-md-12">
				                  <div className="text-profile"> 
				                    <h2>{this.state.static_page_title}</h2>
				                    <p className="text-chnage" dangerouslySetInnerHTML={{ __html: this.state.static_page_desc }}></p>
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
export default StaticPages;