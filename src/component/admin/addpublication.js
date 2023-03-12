import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
//import { startUserSession } from '../../userSession';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
//import Footer from '../../component/admin/Footer';
//import CKEditor from "react-ckeditor-component";
import "../../component/admin/MultipleReactQuillEditor";
import { MultipleReactQuillEditor } from "../../component/admin/MultipleReactQuillEditor";

const savepublication = (data, publications_desc, imageData) => {
    let formdata = new FormData();
    formdata.append('publications_desc', publications_desc);
    formdata.append('publications_pic', imageData);
    return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.post('/publications/savepublications',formdata, {
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

const getAllDoctor = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/publications/getdoctors', {
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
class AddPublications extends Component {
    state = {
        fields: {},
        errors: {},
        doctors: [],
        publications_title:'',
        publications_desc:'',
        publications_pic:'',
       
    }
    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["publications_title"]) {
            formIsValid = false;
            errors["publications_title"] = "*Please enter the name.";
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
    DescQuillHandleChange = (name, val) => {
        this.setState({
            publications_desc: val,
        })
    }
    /*onChangeDescOne = (evt) =>{
        //console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            publications_desc: newContent,
        })
    }*/
   
    onFileChange (file) {
        // alert(file[0]);
        // console.log(file[0]);
        this.setState({ 
            publications_pic: file[0],
            
        })
       
    }
   
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["publications_title"] = "";
            this.setState({ fields: fields });
            const data = {
                publications_title: this.state.fields.publications_title,
                //publications_desc: this.state.publications_desc,
                doctor_id: this.state.doctor_id,
                
            }
            savepublication(data, this.state.publications_desc, this.state.publications_pic)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/publications';
                }, 3000);
            })
            .catch(err => {
                toast.error('Error occured', {
                  position: toast.POSITION.BOTTOM_RIGHT
                });
            });
        } else {
            toast.error('Please provide publications name!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }
    refreshDoctor = () => {
        getAllDoctor()
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({ doctors: records });
            } else {
                this.setState({ doctors: '' });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount() {
        this.refreshDoctor();
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
                                            <h4 className="mt-0 header-title">Add Publication</h4>
                                            <form onSubmit={this.handleSubmit} id="adddepartmentform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Name</label>
                                                            <input type="text" className="form-control" name="publications_title" id="publications_title" value={this.state.fields.publications_title} onChange={this.handleChange} required placeholder="Name"/>
                                                            <span style={alertStyle}>{this.state.errors.publications_title}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        
                                                        <div className="form-group">
                                                            <label>Doctor Name</label>
                                                            <select className="form-control" name="doctor_id" onChange={this.handleChange}>
                                                                {
                                                                    this.state.doctors.length > 0
                                                                    ?
                                                                        this.state.doctors.map(doctor => {
                                                                            return ( 
                                                                                <option value={doctor.id}>{doctor.doctor_name}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="">Select Doctor</option>   
                                                                }
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.doctor_id}</span>
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Description</label>
                                                            <MultipleReactQuillEditor
                                                                id="adddescpubeditor"
                                                                name="adddescpubeditor"
                                                                value={this.state.publications_desc}
                                                                onChange={(name, val) => {this.DescQuillHandleChange(name, val)}}
                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.publications_desc} 
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChangeDescOne
                                                                }}
                                                            />*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Image</label>
                                                            <input type="file" className="form-control" name="publications_pic" id="publications_pic" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png"/>
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                               
                                                
                                                <div className="form-group">
                                                    <div>
                                                        <button type="submit" className="btn btn-pink waves-effect waves-light">
                                                            Submit
                                                        </button>
                                                        {/*<button type="reset" className="btn btn-secondary waves-effect m-l-5">
                                                            Cancel
                                                        </button>*/}
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
export default AddPublications;