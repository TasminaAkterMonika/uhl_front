import React, { Component } from 'react';
import {API_TOKEN_NAME, IMAGE_URL} from '../../constants';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import banner_img from '../../images/banner-profile.jpg';

const getSinglePackage = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/packages/getsinglepackagedata/'+id, {
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
class SinglePackage extends Component {
		state = {
    	package_name:'',
    	package_age:'',
    	package_gender:'',
    	package_pre_condition:'',
    	package_department:'',
    	package_pic:'',
    	package_desc:'',
    	package_banner_image:''
  	}
  	handleChange = event => { 
	    this.setState({
	        [event.target.name]: event.target.value
	    });
  	}
  	refreshgetSinglePackage = () => {
  		let package_name_string = this.props.match.params.name;
	    let new_package_name = package_name_string.replaceAll('-', ' ');
    	getSinglePackage(new_package_name)
    	.then(res => {
    		if(res.status===true){
      		var records = res.data;
      		console.log(records.gender);
	        this.setState({ 
	          package_name: records.name, 
	          package_age: records.age,
	          package_gender: records.gender,
	          package_pre_condition: records.package_pre_condition,
	          package_department: records.department_name,
	          package_desc: records.description,
	          package_pic: records.image,
	          package_banner_image: records.banner_image,
	        });
    		} else {
	        this.setState({ 
	          package_name: '', 
	          package_age:'',
	          package_gender:'',
	          package_pre_condition:'',
	          package_department:'',
	          package_desc: '',
	          package_pic: '',
	          package_banner_image:''
	        });
    		}
    	})
	    .catch(err => {
	        console.log(err);
	    });
  	}
  	componentDidMount(){
    	this.refreshgetSinglePackage();
  	}
  	render(){
  		return(
  			<div>
  				<Route component={Header} />
	        <section className="banner-hero">
	        	<div className="container">
		        	{ this.state.package_banner_image
	              ?
	                <img src={IMAGE_URL+'PackagesBannerimg/'+ this.state.package_banner_image} alt="banner-profile" className="w-100" style={{"max-height": "450px"}}/>
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
		                  <div className="text-profile single_package_details_section"> 
		                  	<div className="row mb-4">
		                  		<div className="col-sm-2"><strong>Age:</strong> {this.state.package_age}</div>
		                  		<div className="col-sm-2"><strong>Gender:</strong> {this.state.package_gender}</div>
		                  		<div className="col-sm-4"><strong>Department:</strong> {this.state.package_department}</div>
		                  		<div className="col-sm-3"><strong>Pre Condition:</strong> {this.state.package_pre_condition}</div>
		                  	</div>
		                    <h2>{this.state.package_name}</h2>
		                    <p className="text-chnage" dangerouslySetInnerHTML={{ __html: this.state.package_desc }}></p>
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
export default SinglePackage;