import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
//import { startUserSession } from '../../userSession';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
//import Footer from '../../component/admin/Footer';
import Avatar from '../../images/avatar_circle.png';
import CKEditor from "react-ckeditor-component";

const updateDoctor = (id, data, imageData) => {
    let edit_doctor_profile = new FormData();
    edit_doctor_profile.append('edit_doctor_profile', imageData);
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.post('/doctors/updatedoctor/'+id, edit_doctor_profile, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': `multipart/form-data; boundary=${edit_doctor_profile._boundary}`,
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
const getSingleDoctorData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/doctors/getsingledoctors/'+id, {
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
const alertStyle = {
  color: 'red',
};
class EditDoctor extends Component {
    state = {
        fields: {},
        errors: {},
        departments:[],
        doctor_id:'',
        edit_doctor_name:'',
        edit_doctor_degree:'',
        edit_doctor_fees:'',
        edit_doctor_department:'',
        edit_doctor_profile:'',
        edit_doctor_desc:'',
    }
    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!this.state.edit_doctor_name) {
            formIsValid = false;
            errors["edit_doctor_name"] = "*Please enter your doctor name.";
        }
        if (!this.state.edit_doctor_degree) {
            formIsValid = false;
            errors["edit_doctor_degree"] = "*Please enter your doctor degree.";
        }
        if (!this.state.edit_doctor_fees) {
            formIsValid = false;
            errors["edit_doctor_fees"] = "*Please enter your doctor fees.";
        }
        if (!this.state.edit_doctor_department) {
            formIsValid = false;
            errors["edit_doctor_department"] = "*Please enter your doctor department.";
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
    onChange = (evt) =>{
      //console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.setState({
        edit_doctor_desc: newContent,
      })
    }
    /*onBlur(evt){
      console.log("onBlur event called with event info: ", evt);
    }
    afterPaste(evt){
      console.log("afterPaste event called with event info: ", evt);
    }*/
    onFileChange (file) {
        this.setState({ 
            edit_doctor_profile: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            /*let fields = {};
            fields["edit_department_name"] = "";
            this.setState({ fields: fields });*/
            const id = this.state.doctor_id;
            const data = {
                edit_doctor_name: this.state.edit_doctor_name,
                edit_doctor_degree: this.state.edit_doctor_degree,
                edit_doctor_fees: this.state.edit_doctor_fees,
                edit_doctor_department: this.state.edit_doctor_department,
                edit_doctor_desc: this.state.edit_doctor_desc,
            }
            updateDoctor(id, data, this.state.edit_doctor_profile)
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
    refreshgetSingleDoctorData = (id) => {
        getSingleDoctorData(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    doctor_id: records.id, 
                    edit_doctor_name: records.doctor_name,
                    edit_doctor_degree: records.degree,
                    edit_doctor_fees: records.doctor_fees,
                    edit_doctor_department: records.dept_id,
                    edit_doctor_profile: records.doctor_profile,
                    edit_doctor_desc: records.doctor_desc,
                });
            } else {
                this.setState({ 
                    doctor_id: '', 
                    edit_doctor_name: '',
                    edit_doctor_degree: '',
                    edit_doctor_fees: '',
                    edit_doctor_department: '',
                    edit_doctor_profile:'',
                    edit_doctor_desc: '',
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
    componentDidMount(){
        this.refreshgetSingleDoctorData(this.props.match.params.id);
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
                                            <h4 className="mt-0 header-title">Edit Doctor</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Name</label>
                                                            <input type="text" className="form-control" name="edit_doctor_name" id="edit_doctor_name" value={this.state.edit_doctor_name} onChange={this.handleChange} required placeholder="Doctor Name"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_doctor_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Degree</label>
                                                            <input type="text" className="form-control" name="edit_doctor_degree" id="edit_doctor_degree" value={this.state.edit_doctor_degree} onChange={this.handleChange} required placeholder="Doctor Degree"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_doctor_degree}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Department</label>
                                                            <select className="form-control" value={this.state.edit_doctor_department} name="edit_doctor_department" onChange={this.handleChange}>
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
                                                            <input type="text" className="form-control" name="edit_doctor_fees" id="edit_doctor_fees" value={this.state.edit_doctor_fees} onChange={this.handleChange} required placeholder="Doctor Fees"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_doctor_fees}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Doctor Description</label>
                                                            <CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.edit_doctor_desc} 
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChange
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Doctor Profile</label>
                                                            <input type="file" className="form-control" name="edit_doctor_profile" id="edit_doctor_profile" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png" placeholder="Doctor Fees"/>
                                                            { this.state.edit_doctor_profile
                                                                ?
                                                                    <img src={IMAGE_URL+'DoctorProfileImg/'+this.state.edit_doctor_profile} alt="" style={{"width":"150px", "height":"auto", "margin-top":"10px", "border-radius":"5px"}}/>
                                                                :
                                                                    <img src={Avatar} width="100px" alt=""/>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div>
                                                        <button type="submit" className="btn btn-pink waves-effect waves-light">
                                                            Update
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
export default EditDoctor;