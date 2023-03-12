import React, { Component } from 'react';
import {API_TOKEN_NAME, IMAGE_URL} from '../../constants';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import banner_img from '../../images/banner-profile.jpg';

const getSinglePublication = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/publications/getsinglepublications/'+id, {
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
class SinglePublication extends Component {
		state = {
    	publication_title:'',
    	publication_pic:'',
    	publication_desc:'',
  	}
  	handleChange = event => { 
	    this.setState({
	        [event.target.name]: event.target.value
	    });
  	}
  	refreshgetSinglePublication = () => {
  		let publication_title_string = this.props.match.params.name;
	    //let new_publication_title = publication_title_string.replaceAll('-', ' ');
    	let publication_id = publication_title_string.split("~").pop();
    	getSinglePublication(publication_id)
    	.then(res => {
    		if(res.status===true){
      		var records = res.data;
	        this.setState({ 
	          publication_title: records.publications_title, 
	          publication_desc: records.publications_desc,
	          publication_pic: records.publications_pic,
	        });
    		} else {
	        this.setState({ 
	          publication_title: '', 
	          publication_desc: '',
	          publication_pic: '',
	        });
    		}
    	})
	    .catch(err => {
	        console.log(err);
	    });
  	}
  	componentDidMount(){
    	this.refreshgetSinglePublication();
  	}
  	render(){
  		return(
  			<div>
  				<Route component={Header} />
	        <section className="banner-hero">
	        	<div className="container">
		        	{ this.state.publication_pic
	              ?
	                <img src={IMAGE_URL+'PublicationsImg/'+ this.state.publication_pic} alt="banner-profile" className="w-100" style={{"max-height": "450px"}}/>
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
		                    <h2>{this.state.publication_title}</h2>
		                    <p className="text-chnage" dangerouslySetInnerHTML={{ __html: this.state.publication_desc }}></p>
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
export default SinglePublication;