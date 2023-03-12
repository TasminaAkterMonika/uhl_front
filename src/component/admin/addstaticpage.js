import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import "../../component/admin/MultipleReactQuillEditor";
import { MultipleReactQuillEditor } from "../../component/admin/MultipleReactQuillEditor";

const savestaticpage = (data, page_desc,imageData) => {
    let formdata = new FormData();
    formdata.append('page_desc', page_desc);
    formdata.append('banner_img', imageData);
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.post('/staticpages/createstaticpage',formdata, {
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
const alertStyle = {
  color: 'red',
};
class addstaticpage extends Component {
    state = {
        fields: {},
        errors: {},
        page_title:'',
        banner_img:'',
        page_desc:'',
        editorLoaded: false,
        data:'',
    }
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.page_title) {
            formIsValid = false;
            errors["page_title"] = "*Please enter the page title.";
        }
        if (!this.state.page_desc) {
            formIsValid = false;
            errors["page_desc"] = "*Please enter the page description.";
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
    DescReactQuillHandleChange = (name, val) => {
        this.setState({
            page_desc: val,
        })
    }
    onBlur(evt){
      console.log("onBlur event called with event info: ", evt);
    }
    afterPaste(evt){
      console.log("afterPaste event called with event info: ", evt);
    }
    onFileChange (file) {
        this.setState({ 
            banner_img: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            const data = {
                page_title: this.state.page_title,
            }
            savestaticpage(data, this.state.page_desc,this.state.banner_img)
            .then(res => {
                if (res.status==='ok') {
                    toast.success(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    setTimeout(function(){ 
                        window.location.href = '/staticpages';
                    }, 6000);
                } else if(res.status==='notok'){
                    toast.error(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                } else if(res.status==='title_error') {
                    toast.error(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
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
    componentDidMount(){
        this.setState({editorLoaded: true})
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
                                            <h4 className="mt-0 header-title">Add Static Page</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Page title</label>
                                                            <input type="text" className="form-control" name="page_title" id="page_title" value={this.state.page_title} onChange={this.handleChange} required placeholder="Page title"/>
                                                            <span style={alertStyle}>{this.state.errors.page_title}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Page Description</label>
                                                            <MultipleReactQuillEditor
                                                                id="desceditor"
                                                                name="desceditor"
                                                                value={this.state.page_desc}
                                                                onChange={(name, val) => {this.DescReactQuillHandleChange(name, val)}}

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Banner Image</label>
                                                            <input type="file" className="form-control" name="banner_img" id="banner_img" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png" placeholder="Doctor Fees"/>
                                                            
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
export default addstaticpage;