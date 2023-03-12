import React, { Component ,useEffect} from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';

const updateBodyLink = (id, data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/bodylink/updatebodylink/'+id, {
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

const editBodyLink = (id,data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/bodylink/editbodylink/'+id, {
            method: 'get',
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


class EditBodyLink extends Component {
    state = {
        fields: {},
        errors: {},
        bodyparts:[],
        id:'',
        gender:'',
        edit_department_id:'',
        edit_body_part_id:'',
        departments: [],
    }
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.gender) {
            formIsValid = false;
            errors["gender"] = "*Please Select a Gender.";
        }
        if (!this.state.edit_department_id) {
            formIsValid = false;
            errors["edit_department_id"] = "*Please Select Department name.";
        }
        if (!this.state.edit_body_part_id) {
            formIsValid = false;
            errors["edit_body_part_id"] = "*Please Select a Body part.";
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
        this.refreshAllBodyParts(event.target.value);      
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            const id = this.props.match.params.id;
            this.setState({id:id});
            const data = {
                edit_department_id: this.state.edit_department_id,
                edit_body_part_id: this.state.edit_body_part_id,
                gender:this.state.gender
            }
            if(this.state.gender != ''){
                this.setState({gender:this.state.gender});
                this.refreshAllBodyParts();
            }
            this.refreshEditBodylink();
            updateBodyLink(id, data)
            .then(res => {
                if(res.message){
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                else{

                    toast.error(res.error,{
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
                setTimeout(function(){ 
                    window.location.href = '/body-links';
                }, 6000);
            }) 
        }
    }
    refreshAllBodyParts = (gender) => {
        getAllBodyParts(gender)
        .then(res => {
            // console.log(gender);
            if(res.status===true){
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
    refreshEditBodylink = (id) => {
        editBodyLink(this.props.match.params.id)
        .then(res => {
            
            if(res.status===true){
                var records = res.data;
                var bodypart = res.bodypart;
                this.setState({ gender:records.gender })
                this.setState({ edit_department_id: records.department_id });
                this.setState({ bodyparts: bodypart.map((rec) => rec) });
                this.setState({ edit_body_part_id: records.id });
            } else {
                this.setState({ gender: '' });
                this.setState({ edit_department_id: '' });
                this.setState({ edit_body_part_id: '' });
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
    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({id:id});
        this.refreshEditBodylink();
        // this.refreshAllBodyParts();
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
                                            <h4 className="mt-0 header-title">Edit Body Link</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="col-sm-9">
                                                        <div className="form-group">
                                                            <label>Gender</label>
                                                            <select defaultValue={'DEFAULT'} className="form-control" value={this.state.gender}  name="gender" id="gender" onChange={this.getBodyParts}>
                                                            <option value=""  selected disabled>Select gender</option> 
                                                            <option  value="male" >Male</option>
                                                            <option  value="female" >Female</option>          
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.gender}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <div className="form-group">
                                                            <label>Body Parts</label>
                                                            <select value={this.state.edit_body_part_id} className="form-control" name="edit_body_part_id" onChange={this.handleChange}>
                                                            <option value="" disabled>Select Body Part</option> 
                                                                {
                                                                    this.state.bodyparts.length 
                                                                    ?
                                                                        this.state.bodyparts.map((bodypart) => {
                                                                            return ( 
                                                                                <option key={bodypart.id} value={bodypart.id}>{bodypart.bodypart_name}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="" selected disabled>Select Body Parts</option>   
                                                                }
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.edit_body_part_id}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <div className="form-group">
                                                            <label>Department Name</label>
                                                            {/*<input type="text" className="form-control" name="edit_department_name" id="edit_department_name" value={this.state.edit_department_name} onChange={this.handleChange} required placeholder="Department Name"/>*/}
                                                            <select defaultValue={this.state.edit_department_id} className="form-control" value={this.state.edit_department_id} name="edit_department_id" id="edit_department_id" onChange={this.handleChange}>
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
                                                            <span style={alertStyle}>{this.state.errors.edit_department_id}</span>
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
export default EditBodyLink;