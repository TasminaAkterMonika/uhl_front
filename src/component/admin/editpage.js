import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from './LeftSidebar';
import TopHeader from './TopHeader';
import "./MultipleReactQuillEditor";
import { MultipleReactQuillEditor } from "./MultipleReactQuillEditor";

const updatestaticpage = (id, data, edit_page_desc, edit_banner_image) => {
    let formdata = new FormData();
    formdata.append('edit_page_desc', edit_page_desc);
    formdata.append('edit_banner_image', edit_banner_image);
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.post('/staticpages/updatestaticpage/'+id, formdata, {
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
const getsinglestaticpage = (id) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/staticpages/getsinglestaticpage/'+id, {
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
const alertStyle = {
  color: 'red',
};
class editpage extends Component {
    state = {
        fields: {},
        errors: {},
        staticpage_id:'',
        edit_page_title:'',
        edit_page_desc:'',
        edit_banner_image:'',
    }
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.edit_page_title) {
            formIsValid = false;
            errors["edit_page_title"] = "*Please enter the page title.";
        }
        if (!this.state.edit_page_desc) {
            formIsValid = false;
            errors["edit_page_desc"] = "*Please enter the page description.";
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
            edit_page_desc: val,
        })
    }
    onFileChange (file) {
        this.setState({ 
            edit_banner_image: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            const id = this.state.staticpage_id;
            const data = {
                edit_page_title: this.state.edit_page_title,
            }
            updatestaticpage(id, data, this.state.edit_page_desc, this.state.edit_banner_image)
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
    refreshgetSingleStaticPage = (id) => {
        getsinglestaticpage(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    staticpage_id: records.id, 
                    edit_page_title: records.title,
                    edit_page_desc: records.description,
                    edit_banner_image: records.image,
                });
            } else {
                this.setState({ 
                    staticpage_id: '', 
                    edit_page_title:'',
                    edit_page_desc:'',
                    edit_banner_image:'',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.refreshgetSingleStaticPage(this.props.match.params.id);
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
                                            <h4 className="mt-0 header-title">Edit Page</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Page title</label>
                                                            <input type="text" className="form-control" name="edit_page_title" id="edit_page_title" value={this.state.edit_page_title} onChange={this.handleChange} required placeholder="Page title"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_page_title}</span>
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
                                                                value={this.state.edit_page_desc}
                                                                onChange={(name, val) => {this.DescReactQuillHandleChange(name, val)}}

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Banner Image</label>
                                                            <input type="file" className="form-control" name="edit_banner_image" id="edit_banner_image" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png" placeholder="Doctor Fees"/>
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
        );
    }
}
export default editpage;