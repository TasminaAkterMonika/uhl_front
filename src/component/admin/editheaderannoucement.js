import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';

const updateHeaderAnnoucement = (id, data) => {
    return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/headerannoucement/updateheaderannoucement/'+id, {
      method: 'post',
      headers: {
          'Accept': 'application/json',
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
const getSingleHeaderAnnoucementData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/headerannoucement/getsingleheaderannoucement/'+id, {
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
class EditHeaderAnnoucement extends Component {
    state = {
        fields: {},
        errors: {},
        id:'',
        edit_header_annoucement_text:'',
        edit_header_annoucement_link:'',
        edit_header_phone_no:'',
    }
    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!this.state.edit_header_annoucement_text) {
            formIsValid = false;
            errors["edit_header_annoucement_text"] = "*Please enter the header annoucement title.";
        }
        if (!this.state.edit_header_annoucement_link) {
            formIsValid = false;
            errors["edit_header_annoucement_link"] = "*Please enter the header annoucement link.";
        }
        if (!this.state.edit_header_phone_no) {
            formIsValid = false;
            errors["edit_header_phone_no"] = "*Please enter the header phone no.";
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
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            const id = this.state.id;
            const data = {
                edit_header_annoucement_text: this.state.edit_header_annoucement_text,
                edit_header_annoucement_link: this.state.edit_header_annoucement_link,
                edit_header_phone_no: this.state.edit_header_phone_no,
            }
            updateHeaderAnnoucement(id, data)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/headerannoucement';
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
    refreshgetSingleHeaderAnnoucementData = (id) => {
        getSingleHeaderAnnoucementData(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    id: records.id, 
                    edit_header_annoucement_text: records.header_annoucement_text,
                    edit_header_annoucement_link: records.header_annoucement_link,
                    edit_header_phone_no: records.header_phone_no,
                });
            } else {
                this.setState({ 
                    id: '', 
                    edit_header_annoucement_text: '',
                    edit_header_annoucement_link: '',
                    edit_header_phone_no:'',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.refreshgetSingleHeaderAnnoucementData(this.props.match.params.id);
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
                                            <h4 className="mt-0 header-title">Edit Header Annoucement</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Header Annoucement Text</label>
                                                            <input type="text" className="form-control" name="edit_header_annoucement_text" id="edit_header_annoucement_text" value={this.state.edit_header_annoucement_text} onChange={this.handleChange} required placeholder="Header Annoucement Text"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_header_annoucement_text}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Header Annoucement Link</label>
                                                            <input type="text" className="form-control" name="edit_header_annoucement_link" id="edit_header_annoucement_link" value={this.state.edit_header_annoucement_link} onChange={this.handleChange} required placeholder="Header Annoucement Link"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_header_annoucement_link}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Header Phone No.</label>
                                                            <input type="text" className="form-control" name="edit_header_phone_no" id="edit_header_phone_no" value={this.state.edit_header_phone_no} onChange={this.handleChange} required placeholder="Header Phone No"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_header_phone_no}</span>
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
export default EditHeaderAnnoucement;