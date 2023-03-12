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

const updatepackage = (id, data, edit_package_description, imageData) => {
    let formdata = new FormData();
    formdata.append('edit_package_description', edit_package_description);
    formdata.append('edit_package_profile', imageData);
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.post('/packages/updatepackage/'+id, formdata, {
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
const getSinglePackageData = (id) => {
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
const getAllPreExistingConditon = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/packages/getallprecondtion', {
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
class EditPackage extends Component {
    state = {
        fields: {},
        errors: {},
        departments:[],
        pre_existing_conditon:[],
        package_id:'',
        edit_package_name:'',
        edit_package_description:'',
        edit_package_amount:'',
        edit_package_dept_id:'',
        edit_package_pre_existing_conditon_id:'',
        edit_package_age:'',
        edit_package_gender:'',
        edit_package_profile:'',
    }
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.edit_package_name) {
            formIsValid = false;
            errors["edit_package_name"] = "*Please enter the package name.";
        }
        if (!this.state.edit_package_amount) {
            formIsValid = false;
            errors["edit_package_amount"] = "*Please enter the package amount.";
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
            edit_package_description: val,
        })
    }
    onFileChange (file) {
        this.setState({ 
            edit_package_profile: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            const id = this.state.package_id;
            const data = {
                edit_package_name: this.state.edit_package_name,
                edit_package_pre_existing_conditon_id: this.state.edit_package_pre_existing_conditon_id,
                edit_package_amount: this.state.edit_package_amount,
                edit_package_dept_id: this.state.edit_package_dept_id,
                edit_package_age: this.state.edit_package_age,
                edit_package_gender: this.state.edit_package_gender,
            }
            updatepackage(id, data, this.state.edit_package_description, this.state.edit_package_profile)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/packages';
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
    refreshgetSinglePackageData = (id) => {
        getSinglePackageData(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    package_id: records.id, 
                    edit_package_name: records.name,
                    edit_package_description: records.description,
                    edit_package_profile: records.image,
                    edit_package_amount: records.amount,
                    edit_package_dept_id: records.dept_id,
                    edit_package_gender: records.gender,
                    edit_package_age: records.age,
                    edit_package_pre_existing_conditon_id: records.pre_existing_conditon_id,
                });
            } else {
                this.setState({ 
                    package_id: '', 
                    edit_package_name: '',
                    edit_package_description: '',
                    edit_package_profile: '',
                    edit_package_amount: '',
                    edit_package_dept_id:'',
                    edit_package_gender: '',
                    edit_package_age: '',
                    edit_package_pre_existing_conditon_id: '',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    refreshDepartments = () => {
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
    refreshPreExistingConditon = (event) => {
        getAllPreExistingConditon()
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({ pre_existing_conditon: records });
            } else {
                this.setState({ pre_existing_conditon: '' });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.refreshgetSinglePackageData(this.props.match.params.id);
        this.refreshDepartments();
        this.refreshPreExistingConditon();
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
                                            <h4 className="mt-0 header-title">Edit Package</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Package Name</label>
                                                            <input type="text" className="form-control" name="edit_package_name" id="package_name" value={this.state.edit_package_name} onChange={this.handleChange} required placeholder="Package Name"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_package_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Package Amount</label>
                                                            <input type="text" className="form-control" name="edit_package_amount" id="edit_package_amount" value={this.state.edit_package_amount} onChange={this.handleChange} required placeholder="Package Fees"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_package_amount}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Package Department</label>
                                                            <select className="form-control" value={this.state.edit_package_dept_id} name="edit_package_dept_id" onChange={this.handleChange}>
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
                                                            <span style={alertStyle}>{this.state.errors.edit_package_dept_id}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Package Pre Condition</label>
                                                            <select className="form-control" value={this.state.edit_package_pre_existing_conditon_id} name="package_pre_condition" onChange={this.handleChange}>
                                                                {
                                                                    this.state.pre_existing_conditon.length > 0
                                                                    ?
                                                                        this.state.pre_existing_conditon.map((pre_existing_conditons, index) => {
                                                                            return ( 
                                                                                <option key={pre_existing_conditons.id} value={pre_existing_conditons.id}>{pre_existing_conditons.name}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="">Select Pre Condition</option>   
                                                                }
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.edit_package_pre_existing_conditon_id}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Age</label>
                                                            <select className="form-control" value={this.state.edit_package_age} name="edit_package_age" onChange={this.handleChange}>
                                                                <option value="0-10">0-10</option>
                                                                <option value="11-20">11-20</option>
                                                                <option value="21-30">21-30</option>
                                                                <option value="31-40">31-40</option>
                                                                <option value="41-50">41-50</option>
                                                                <option value="51-60">51-60</option>
                                                                <option value="61-70">61-70</option>
                                                                <option value="71-80">71-80</option>
                                                                <option value="81-90">81-90</option>
                                                                <option value="91-100">91-100</option>
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.edit_package_age}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Gender</label>
                                                            <select className="form-control" value={this.state.edit_package_gender} name="edit_package_gender" onChange={this.handleChange}>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.edit_package_gender}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Package Description</label>
                                                            <MultipleReactQuillEditor
                                                                id="desceditor"
                                                                name="desceditor"
                                                                value={this.state.edit_package_description}
                                                                onChange={(name, val) => {this.DescReactQuillHandleChange(name, val)}}

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Package Profile</label>
                                                            <input type="file" className="form-control" name="edit_package_profile" id="edit_package_profile" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png" placeholder="Doctor Fees"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div>
                                                        <button type="submit" className="btn btn-pink waves-effect waves-light">Submit</button>
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
export default EditPackage;