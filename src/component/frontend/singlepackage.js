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
    	package_pic:'',
    	package_desc:'',
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
	        this.setState({ 
	          package_name: records.name, 
	          package_desc: records.description,
	          package_pic: records.image,
	        });
    		} else {
	        this.setState({ 
	          package_name: '', 
	          package_desc: '',
	          package_pic: '',
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
		        	{ this.state.publication_pic
	              ?
	                <img src={IMAGE_URL+'Packagesimg/'+ this.state.publication_pic} alt="banner-profile" className="w-100" style={{"max-height": "450px"}}/>
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