import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from './LeftSidebar';
import TopHeader from './TopHeader';
import axios from 'axios';
import BodyLinkDept from './BodyLinkDept';

const savebodyparts = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/bodylink/createbodyparts', {
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
const getAllBodyParts = (gender,data) => {

    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/bodylink/getbodyparts/'+gender, {
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
const getDepartments = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/department/getdepartments', {
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
class addbodylink extends Component {
    state = {
        fields: {},
        errors: {},
        bodyparts:[],
        departments: [],
        department_id:'',
        body_part:'',
        gender:'',
    }
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.gender) {
            formIsValid = false;
            errors["gender"] = "*Please Select a Gender.";
        }
        if (!this.state.department_id) {
            formIsValid = false;
            errors["department_id"] = "*Please Select Department Name.";
        }
        if (!this.state.body_part) {
            formIsValid = false;
            errors["body_part"] = "*Please Select a Body part.";
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
    getBodyParts = event => {
        this.setState({gender:event.target.value});  
        this.refreshbodyparts(event.target.value);      
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            const data = {
                department_id: this.state.department_id,
                body_part: this.state.body_part,
                gender:this.state.gender,
            }
            if(this.state.gender != ''){
                this.setState({gender:this.state.gender});
                this.refreshbodyparts();
            }
            this.refreshbodyparts();
            savebodyparts(data)
            .then(res => {
                if(res.message){
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }else{

                    toast.error(res.error,{
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
                
                setTimeout(function(){ 
                    window.location.href = '/body-links';
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
    refreshbodyparts = (gender) => {
        getAllBodyParts(gender)
        .then(res => {
            if(res.status === true){
                var records = res.data;
                this.setState({ bodyparts: records.map((rec) => rec) });
            } else {
                this.setState({ bodyparts: '' });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    refreshDepartments = () => {
        getDepartments()
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({ departments: records });
            } else {
                this.setState({ departments: '' });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.setState({editorLoaded: true})
        this.refreshbodyparts();
        this.refreshDepartments();
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
                                            <h4 className="mt-0 header-title">Add Body</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                {/* <div className="row"> */}
                                                <div className="col-sm-9">
                                                        <div className="form-group">
                                                            <label>Gender</label>
                                                            <select  defaultValue={'DEFAULT'} className="form-control" value={this.state.gender} name="gender" id="gender" onChange={this.getBodyParts}>
                                                            <option value=""  selected disabled>Select gender</option> 
                                                            <option  value="male" >Male</option>
                                                            <option  value="female">Female</option>   
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.gender}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <div className="form-group">
                                                            <label>Body</label>
                                                            <select defaultValue={this.state.body_part} className="form-control" name="body_part" id="body_part" onChange={this.handleChange}>
                                                            <option value="" selected disabled>Select Body Part</option> 
                                                                 {
                                                                    
                                                                    this.state.bodyparts.length > 0
                                                                    ?
                                                                        this.state.bodyparts.map((bodyparts, index) => {
                                                                            return ( 
                                                                                <option key={bodyparts.id} value={bodyparts.id}>{bodyparts.bodypart_name}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="" selected disabled>Select Body Part</option>   
                                                                }
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.body_part}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <div className="form-group">
                                                            <label>Departments</label>
                                                            {/*<input type="text" className="form-control" name="department_name" id="department_name" value={this.state.department_name} onChange={this.handleChange} required placeholder="Department Name" maxLength="50"/>*/}
                                                            <select defaultValue={this.state.department_id} className="form-control" value={this.state.department_id} name="department_id" id="department_id" onChange={this.handleChange}>
                                                                <option value="" selected disabled>Select Department</option> 
                                                                 {
                                                                    
                                                                    this.state.departments.length > 0
                                                                    ?
                                                                        this.state.departments.map((department, index) => {
                                                                            return ( 
                                                                                <option key={department.dept_id} value={department.dept_id}>{department.department_name}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="" selected disabled>Select Department</option>   
                                                                }
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.department_id}</span>
                                                        </div>
                                                    </div>
                                                  
                                               
                                                {/* </div> */}
                                               
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
export default addbodylink;