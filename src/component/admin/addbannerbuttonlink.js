import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';

const saveBannerButtonData = (data, imageData) => {
	let formdata = new FormData();
	formdata.append('banner_button_icon', imageData);
    return new Promise((resolve, reject) => {
	    const req = scAxiosAdmin.post('/bannerbutton/savebannerbtndata', formdata, {
	      method: 'post',
	      headers: {
	          'Accept': 'application/json',
	          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
	          'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
	      },
	      params: {
        	...data
      	  },
	    });
	    req.then(res => resolve(res.data))
	      .catch(err => reject(err));
  	});
}
const GetAllStaticPages = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/staticpages/getallstaticpages', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
            },
            params: {
                ...data
            }
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
}
const alertStyle = {
  color: 'red',
};
class AddBannerButtonLink extends Component {
    state = {
        fields: {},
        errors: {},
        banner_button_icon:'',
        banner_button_text:'',
        banner_button_link:'',
        staticpages:[],
    }
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.banner_button_text) {
            formIsValid = false;
            errors["banner_button_text"] = "*Please enter the banner button text.";
        }
        if (!this.state.banner_button_link) {
            formIsValid = false;
            errors["banner_button_link"] = "*Please select the banner button.";
        }
      
        this.setState({
            errors: errors
        });
        return formIsValid;
    }
    handleChange = event => {
    	this.setState({ errors:''});
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
            fields
        }, () => this.validateForm());
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onFileChange (file) {
        this.setState({ 
            banner_button_icon: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
	        const data = {
		        banner_button_text: this.state.banner_button_text,
		        banner_button_link: this.state.banner_button_link,
	        }
	        saveBannerButtonData(data, this.state.banner_button_icon)
	        .then(res => {
	            toast.success(res.message, {
	                position: toast.POSITION.TOP_RIGHT
	            });
	            setTimeout(function(){ 
	                window.location.href = '/bannerbuttonlink';
	            }, 6000);
	        })
	        .catch(err => {
	            toast.error(err, {
	              position: toast.POSITION.BOTTOM_RIGHT
	            });
	        });
	    } else {
            toast.error('Please provide all required fields!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }
    refreshStaticPages = (page) => {
    	GetAllStaticPages(page)
      	.then(res => {
            if(res.status===true){
                  var records = res.data.data;
                  this.setState({ staticpages: records });
                  
            } else {
                  this.setState({ staticpages: '' });
            }
        	this.setState({ enableShdo: false, });
      	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    componentDidMount(){
    	this.refreshStaticPages();
    }
    render() {
        return (
        	<div className="fixed-left">
                <div id="wrapper">
                    <Route component={LeftSidebar} />
                    <div className="content-page">
                        <div className="content">
                            <Route component={TopHeader} />
                            <div className="page-content-wrapper">
                                <div className="col-lg-12">
                                    <div className="card m-b-20">
                                        <div className="card-body">
                                            <h4 className="mt-0 header-title">Add Banner Button Link</h4>
                                            <form onSubmit={this.handleSubmit} id="addbannerbuttonform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Banner Button Icon</label>
                                                            <input type="file" className="form-control" name="banner_button_icon" id="banner_button_icon" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png" required placeholder="Banner Button Icon"/>
                                                            {/*<span style={alertStyle}>{this.state.errors.banner_button_icon}</span>*/}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Banner Button Text</label>
                                                            <input type="text" className="form-control" name="banner_button_text" id="banner_button_text" value={this.state.fields.banner_button_text} onChange={this.handleChange} required placeholder="Banner Button Text"/>
                                                            <span style={alertStyle}>{this.state.errors.banner_button_text}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Banner Button Link</label>
                                                            <select className="form-control" name="banner_button_link" value={this.state.fields.banner_button_link} onChange={this.handleChange}>
                                                                <option value="">Select Page</option>
                                                                {
                                                                    this.state.staticpages.length > 0
                                                                    ?
                                                                        this.state.staticpages.map((cpage, index) => {
                                                                            return ( 
                                                                                <option value={cpage.id}>{cpage.title}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="">Select Page</option>   
                                                                }
                                                            </select>
                                                            {/*<input type="text" className="form-control" name="banner_button_link" id="banner_button_link" value={this.state.banner_button_link} onChange={this.handleChange} required placeholder="Banner Button Link"/>*/}
                                                            <span style={alertStyle}>{this.state.errors.banner_button_link}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div>
                                                        <button type="submit" className="btn btn-pink waves-effect waves-light">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={5000} /> 
            </div>
        )
    }
}
export default AddBannerButtonLink;