import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';

const UpdateBannerButtonData = (id, data, imageData) => {
    let formdata = new FormData();
    formdata.append('edit_banner_button_icon', imageData);
    return new Promise((resolve, reject) => {
	    const req = scAxiosAdmin.post('/bannerbutton/updatebannerbtndata/'+id, formdata, {
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
const getSingleBannerButtonLinkData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/bannerbutton/getsinglebannerbtndata/'+id, {
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
class EditBannerButtonLink extends Component {
    state = {
        fields: {},
        errors: {},
        banner_btn_id:'',
        edit_banner_button_icon:'',
        edit_banner_button_text:'',
        edit_banner_button_link:'',
        staticpages:[],
    }
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.edit_banner_button_text) {
            formIsValid = false;
            errors["edit_banner_button_text"] = "*Please enter the banner button text.";
        }
        if (!this.state.edit_banner_button_link) {
            formIsValid = false;
            errors["edit_banner_button_link"] = "*Please select the banner button.";
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
            edit_banner_button_icon: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        const id = this.state.banner_btn_id;
        const data = {
            //edit_banner_button_icon: this.state.edit_banner_button_icon,
	        edit_banner_button_text: this.state.edit_banner_button_text,
	        edit_banner_button_link: this.state.edit_banner_button_link,
        }
        UpdateBannerButtonData(id, data, this.state.edit_banner_button_icon)
        .then(res => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            /*setTimeout(function(){ 
                window.location.href = '/bannerbuttonlink';
            }, 6000);*/
        })
        .catch(err => {
            toast.error(err, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
        });
    }
    refreshgetSingleBannerButtonLinkData = (id) => {
        getSingleBannerButtonLinkData(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    banner_btn_id: records.id, 
                    edit_banner_button_icon:records.banner_btn_icon,
                    edit_banner_button_text:records.banner_btn_text,
                    edit_banner_button_link:records.banner_btn_link,
                });
            } else {
                this.setState({ 
                    banner_btn_id: '', 
                    edit_banner_button_icon:'',
                    edit_banner_button_text:'',
                    edit_banner_button_link:'',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
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
        this.refreshgetSingleBannerButtonLinkData(this.props.match.params.id);
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
                                            <h4 className="mt-0 header-title">Edit Banner Button Link</h4>
                                            <form onSubmit={this.handleSubmit} id="addbannerbuttonform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Banner Button Icon</label>
                                                            <input type="file" className="form-control" name="edit_banner_button_icon" id="edit_banner_button_icon" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png"/>
                                                            { this.state.edit_banner_button_icon
                                                                ?
                                                                    <img src={IMAGE_URL+'BannerButtonImg/'+this.state.edit_banner_button_icon} alt="" style={{"width":"150px", "height":"auto", "margin-top":"10px", "border-radius":"5px"}}/>
                                                                :
                                                                    <i className="fa-solid fa-circle-right"></i>
                                                            }
                                                            {/*<input type="text" className="form-control" name="edit_banner_button_icon" id="edit_banner_button_icon" value={this.state.edit_banner_button_icon} onChange={this.handleChange} required placeholder="Banner Button Icon 1"/>*/}
                                                            {/*<span style={alertStyle}>{this.state.errors.edit_banner_button_icon}</span>*/}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Banner Button Text</label>
                                                            <input type="text" className="form-control" name="edit_banner_button_text" id="edit_banner_button_text" value={this.state.edit_banner_button_text} onChange={this.handleChange} required placeholder="Banner Button Text"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_banner_button_text}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Banner Button Link</label>
                                                            <select className="form-control" value={this.state.edit_banner_button_link} name="edit_banner_button_link" onChange={this.handleChange}>
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
                                                            {/*<input type="text" className="form-control" name="edit_banner_button_link" id="edit_banner_button_link" value={this.state.edit_banner_button_link} onChange={this.handleChange} required placeholder="Banner Button Link 1"/>*/}
                                                            <span style={alertStyle}>{this.state.errors.edit_banner_button_link}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div>
                                                        <button type="submit" className="btn btn-pink waves-effect waves-light">
                                                            Update
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
export default EditBannerButtonLink;