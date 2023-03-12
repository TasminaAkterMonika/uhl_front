import React, { Component } from 'react';
import {API_TOKEN_NAME, IMAGE_URL} from '../../constants';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import banner_img from '../../images/banner-profile.jpg';
import Pagination from "react-js-pagination";

const getAllTestimonialData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/testimonials/getalltestimonials', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
      },
      params:{
      	...data
      }
    });
    req.then(res => resolve(res.data))
        .catch(err => reject(err));
  });
}
class Testimonials extends Component {
	state = {
    	testimonials:[],
    	total: '',
      currentPage: '',
      LastPage:'',
      PerPage: '',
      FirstPageUrl:'',
      NextPageUrl:'',
      PrevPageUrl:'',
      LastPageUrl:'',
      TotalPages:'',
      activePage: 1,
			doctor_id:'',
  	}
  	handleChange = event => { 
	    this.setState({
	        [event.target.name]: event.target.value
	    });
  	}
  	handlePageChange(pageNumber) {
    	this.setState({ activePage: pageNumber });
    	this.refreshgetAllTestimonials(pageNumber);
  	}
  	refreshgetAllTestimonials = (page) => {
  		const data = {
  			page:page,
  		}
    	getAllTestimonialData(data)
    	.then(res => {
    		if(res.status===true){
      		var records = res.data.data;
	        this.setState({ testimonials:records});
	        this.setState({ total: res.data.total });
      		this.setState({ currentPage: res.data.current_page });
      		this.setState({ PerPage: res.data.per_page });
      		this.setState({ FirstPageUrl: res.data.first_page_url });
      		this.setState({ NextPageUrl: res.data.next_page_url });
      		this.setState({ PrevPageUrl: res.data.prev_page_url });
      		this.setState({ LastPageUrl: res.data.last_page_url });
      		this.setState({ LastPage: res.data.last_page });
      		this.setState({ TotalPages: Math.ceil(this.state.total / this.state.PerPage) });
    		} else {
	        this.setState({ 
	        	testimonials:'',
	        });
    		}
    	})
	    .catch(err => {
	        console.log(err);
	    });
  	}
  	componentDidMount(){
  		this.refreshgetAllTestimonials();
  	}
  	render(){
  		const pageNumbers = [];
			for (let i = 1; i <= this.state.TotalPages; i++) {
			    pageNumbers.push(i);
			}
  		return(
  			<div>
  				<Route component={Header} />
	        <section className="banner-hero">
            <img src={banner_img} alt="banner-profile" className="w-100" />
	        </section>
      		<section className="prof-dr">
      			<div className="container">
        			<div className="box-of-about mt-4 mb-4">
        				<div className="row">
        				  {this.state.testimonials.length > 0
        				  	?
        				  		this.state.testimonials.map(testimonial =>{
        				  			return(
	        				  			<div className="col-lg-4 col-md-12">
					                  <div className="text-profile testimonial_block_sec"> 
					                  	<div className="row">
					                  		<div className="col-sm-3">
					                  			{ testimonial.doctor_profile
	                              		?
	                                		<img src={IMAGE_URL+'/DoctorProfileImg/'+ testimonial.doctor_profile} alt="doc" style={{"width":"50px", "border-radius": "110px"}}/>
	                              		:
	                                		<img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="doc" style={{"border-radius": "110px"}}/> 
                            			}
					                  		</div>
					                  		<div className="col-sm-9">
					                    		<p style={{"fontSize":"20px", "marginBottom":"0px"}}><b>{testimonial.testimonial_name}</b></p>
					                    		<p style={{"fontSize":"14px"}}><b>{testimonial.author_name}</b></p>
					                    		<p style={{"fontSize":"12px"}} className="testimonial_desc_string text-chnage" dangerouslySetInnerHTML={{ __html: testimonial.testimonial_desc ? testimonial.testimonial_desc.substr(0,140)+'...' : '' }}></p>
					                  		</div>
					                  	</div>
					                  </div>
		                			</div>
		                		)
        				  		})
        				  	:
        				  		''
        				  }
        				</div>
        				{ 
			            pageNumbers.length > 1 
			            ?
			              <Pagination
			                activePage={this.state.activePage}
			                totalItemsCount={this.state.total}
			                pageRangeDisplayed={5}
			                onChange={this.handlePageChange.bind(this)}
			              />
			            : ''
								}
        			</div>
          	</div>
          </section>
          <Route component={Footer} />
        </div>
  		)
  	}
}
export default Testimonials;