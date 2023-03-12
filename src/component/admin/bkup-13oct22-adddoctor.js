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

const saveDoctor = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/doctor/createddoctors', {
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
class AddDoctor extends Component {
    state = {
        fields: {},
        errors: {},
        departments: [],
        doctor_name:'',
        doctor_degree:'',
        doctor_fees:'',
        doctor_profile:'',
        doctor_department:''
    }
    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["doctor_name"]) {
            formIsValid = false;
            errors["doctor_name"] = "*Please enter doctor name.";
        }
        if (!fields["doctor_fess"]) {
            formIsValid = false;
            errors["doctor_fees"] = "*Please enter doctor fees.";
        }
        if (!fields["doctor_degree"]) {
            formIsValid = false;
            errors["doctor_degree"] = "*Please enter doctor degree.";
        }
        if (!fields["doctor_department"]) {
            formIsValid = false;
            errors["doctor_department"] = "*Please select doctor department.";
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
        if (this.validateForm()) {
            let fields = {};
            fields["doctor_name"] = "";
            fields["doctor_fees"] = "";
            fields["doctor_degree"] = "";
            fields["doctor_department"] = "";
            this.setState({ fields: fields });
            const data = {
                doctor_name: this.state.fields.doctor_name,
            }
            saveDoctor(data)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/doctors';
                }, 6000);
            })
            .catch(err => {
                console.log(err);
                /*toast.error('Error occured', {
                  position: toast.POSITION.BOTTOM_RIGHT
                });*/
            });
        } else {
            toast.error('Please provide department name!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
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
    componentDidMount() {
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
                                            <form onSubmit={this.handleSubmit} id="adddoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Name</label>
                                                            <input type="text" className="form-control" name="doctor_name" id="doctor_name" value={this.state.fields.doctor_name} onChange={this.handleChange} required placeholder="Doctor Name"/>
                                                            <span style={alertStyle}>{this.state.errors.doctor_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Degree</label>
                                                            <input type="text" className="form-control" name="doctor_degree" id="doctor_degree" value={this.state.fields.doctor_degree} onChange={this.handleChange} required placeholder="Doctor Degree"/>
                                                            <span style={alertStyle}>{this.state.errors.doctor_degree}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Department</label>
                                                            <select className="form-control" name="doctor_department" onChange={this.handleChange}>
                                                                {
                                                                    this.state.departments.length > 0
                                                                    ?
                                                                        this.state.departments.map(department => {
                                                                            return ( 
                                                                                <option value={department.dept_id}>{department.department_name}</option>
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
                                                            <input type="text" className="form-control" name="doctor_fees" id="doctor_fees" value={this.state.fields.doctor_fees} onChange={this.handleChange} required placeholder="Doctor Fees"/>
                                                            <span style={alertStyle}>{this.state.errors.doctor_fees}</span>
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
export default AddDoctor;