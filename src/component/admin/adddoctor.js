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

const saveDoctor = (data, doctor_desc, doctor_edu, doctor_exp, imageData) => {
    let formdata = new FormData();
    formdata.append('doctor_desc', doctor_desc);
    formdata.append('doctor_edu', doctor_edu);
    formdata.append('doctor_exp', doctor_exp);
    formdata.append('doctor_profile', imageData);
    return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.post('/doctors/createdoctor',formdata, {
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
const getAllDepartments = (data) => {
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
class adddoctor extends Component {
    state = {
        fields: {},
        errors: {},
        departments:[],
        doctor_id:'',
        doctor_name:'',
        doctor_degree:'',
        doctor_fees:'',
        doctor_department:'',
        doctor_profile:'',
        doctor_desc:'',
        doctor_edu:'',
        doctor_exp:'',
        editorLoaded: false,
        data:'',
    }
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.doctor_name) {
            formIsValid = false;
            errors["doctor_name"] = "*Please enter your doctor name.";
        }
        if (!this.state.doctor_degree) {
            formIsValid = false;
            errors["doctor_degree"] = "*Please enter your doctor degree.";
        }
        if (!this.state.doctor_fees) {
            formIsValid = false;
            errors["doctor_fees"] = "*Please enter your doctor fees.";
        }
        if (!this.state.doctor_department) {
            formIsValid = false;
            errors["doctor_department"] = "*Please enter your doctor department.";
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
            doctor_desc: val,
        })
    }
    EduReactQuillHandleChange = (name, val) => {
        this.setState({
            doctor_edu: val,
        })
    }
    ExpReactQuillHandleChange = (name, val) => {
        this.setState({
            doctor_exp: val,
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
            doctor_profile: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            const data = {
                doctor_name: this.state.doctor_name,
                doctor_degree: this.state.doctor_degree,
                doctor_fees: this.state.doctor_fees,
                doctor_department: this.state.doctor_department,
            }
            saveDoctor(data, this.state.doctor_desc, this.state.doctor_edu, this.state.doctor_exp, this.state.doctor_profile)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/doctors';
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
    refreshDepartments = (event) => {
        getAllDepartments()
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
                                            <h4 className="mt-0 header-title">Add Doctor</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Name</label>
                                                            <input type="text" className="form-control" name="doctor_name" id="doctor_name" value={this.state.doctor_name} onChange={this.handleChange} required placeholder="Doctor Name"/>
                                                            <span style={alertStyle}>{this.state.errors.doctor_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Degree</label>
                                                            <input type="text" className="form-control" name="doctor_degree" id="doctor_degree" value={this.state.doctor_degree} onChange={this.handleChange} required placeholder="Doctor Degree"/>
                                                            <span style={alertStyle}>{this.state.errors.doctor_degree}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Department</label>
                                                            <select className="form-control" value={this.state.doctor_department} name="doctor_department" onChange={this.handleChange}>
                                                                {
                                                                    this.state.departments.length > 0
                                                                    ?
                                                                        this.state.departments.map((department, index) => {
                                                                            return ( 
                                                                                <option key={department.id} value={department.dept_id}>{department.department_name}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="">Select Department</option>   
                                                                }
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.doctor_department}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Fees</label>
                                                            <input type="text" className="form-control" name="doctor_fees" id="doctor_fees" value={this.state.doctor_fees} onChange={this.handleChange} required placeholder="Doctor Fees"/>
                                                            <span style={alertStyle}>{this.state.errors.doctor_fees}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Doctor Description</label>
                                                            <MultipleReactQuillEditor
                                                                id="desceditor"
                                                                name="desceditor"
                                                                value={this.state.doctor_desc}
                                                                onChange={(name, val) => {this.DescReactQuillHandleChange(name, val)}}

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Doctor Educations</label>
                                                            <MultipleReactQuillEditor
                                                                id="edueditor"
                                                                name="edueditor"
                                                                value={this.state.doctor_edu}
                                                                onChange={(name, val) => {this.EduReactQuillHandleChange(name, val)}}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Doctor Experience</label>
                                                            <MultipleReactQuillEditor
                                                                id="expeditor"
                                                                name="expeditor"
                                                                value={this.state.doctor_exp}
                                                                onChange={(name, val) => {this.ExpReactQuillHandleChange(name, val)}}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Profile</label>
                                                            <input type="file" className="form-control" name="doctor_profile" id="doctor_profile" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png" placeholder="Doctor Fees"/>
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
export default adddoctor;