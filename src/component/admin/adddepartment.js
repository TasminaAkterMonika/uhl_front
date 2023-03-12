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
import SEO from "../../component/Seo";

const saveDepartment = (data,department_desc_one, department_desc_two, department_desc_three, department_desc_four, department_desc_five,department_image) => {
    let formdata = new FormData();
    formdata.append('department_desc_one', department_desc_one);
    formdata.append('department_desc_two', department_desc_two);
    formdata.append('department_desc_three', department_desc_three);
    formdata.append('department_desc_four', department_desc_four);
    formdata.append('department_desc_five', department_desc_five);
    formdata.append('department_image', department_image);
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.post('/department/createdepartment', formdata, {
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
const checkDepartmentIdDuplicate = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/department/checkdepartmentidduplicate', {
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
class AddDepartment extends Component {
    state = {
        fields: {},
        errors: {},
        department_name:'',
        department_desc_one:'',
        department_desc_two:'',
        department_desc_three:'',
        department_desc_four:'',
        department_desc_five:'',
        department_image:'',
        department_id:''
    }
    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!this.state.department_name) {
            formIsValid = false;
            errors["department_name"] = "*Please enter your department name.";
        }
        if (!this.state.department_id) {
            formIsValid = false;
            errors["department_id"] = "*Please enter your department id.";
        }
        if (!this.state.department_image) {
            formIsValid = false;
            errors["department_image"] = "*Please enter your department image.";
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
    handleBlur = event => {
        const data = {
            departmentId: event.target.value
        }
        checkDepartmentIdDuplicate(data)
        .then(res => {
            if(res.status == true){
                document.getElementById("department_submit_btn").disabled = false;
            } else {
                document.getElementById("department_submit_btn").disabled = true;
            }
        })
        .catch(err => {
            
        });
    }
    DescOneQuillHandleChange = (name, val) => {
        this.setState({
            department_desc_one: val,
        })
    }
    DescTwoQuillHandleChange = (name, val) => {
        this.setState({
            department_desc_two: val,
        })
    }
    DescThreeQuillHandleChange = (name, val) => {
        this.setState({
            department_desc_three: val,
        })
    }
    DescFourQuillHandleChange = (name, val) => {
        this.setState({
            department_desc_four: val,
        })
    }
    DescFiveQuillHandleChange = (name, val) => {
        this.setState({
            department_desc_five: val,
        })
    }
    onFileChange (file) {
        this.setState({ 
            department_image: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()) {
            // let fields = {};
            // fields["department_name"] = "";
            // this.setState({ fields: fields });
            const data = {
                department_name: this.state.department_name,
                department_id: this.state.department_id,
                /*department_desc_one: this.state.department_desc_one,
                department_desc_two: this.state.department_desc_two,
                department_desc_three: this.state.department_desc_three,
                department_desc_four: this.state.department_desc_four,
                department_desc_five: this.state.department_desc_five,*/
            }
            saveDepartment(data, this.state.department_desc_one, this.state.department_desc_two, this.state.department_desc_three, this.state.department_desc_four, this.state.department_desc_five,this.state.department_image)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/departments';
                }, 6000);
            })
            .catch(err => {
                toast.error('Error occured', {
                  position: toast.POSITION.BOTTOM_RIGHT
                });
            });
        } else {
            toast.error('Department name, Department Id and Department image are required field', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }
    render() {
        return (
            <div className="fixed-left">
                <SEO title="Add Department" description="Add Department United Hospital" pathSlug="/adddepartment" keywords="Add Department, Department" />
                <div id="wrapper">
                    <Route component={LeftSidebar} />
                    <div className="content-page">
                        <div className="content">
                            <Route component={TopHeader} />
                            <div className="page-content-wrapper">
                                <div className="col-lg-12">
                                    <div className="card m-b-20">
                                        <div className="card-body">
                                            <h4 className="mt-0 header-title">Add Department</h4>
                                            <form onSubmit={this.handleSubmit} id="adddepartmentform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Department Name</label>
                                                            <input type="text" className="form-control" name="department_name" id="department_name" value={this.state.department_name} onChange={this.handleChange} required placeholder="Department Name"/>
                                                            <span style={alertStyle}>{this.state.errors.department_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Department Id</label>
                                                            <input type="number" className="form-control" name="department_id" id="department_id" value={this.state.department_id} onBlur={this.handleBlur} onChange={this.handleChange} pattern="[0-9]*" required placeholder="Department Id"/>
                                                            <span style={alertStyle}>{this.state.errors.department_id}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Department Description One</label>
                                                            <MultipleReactQuillEditor
                                                                id="desceditor1"
                                                                name="desceditor1"
                                                                value={this.state.department_desc_one}
                                                                onChange={(name, val) => {this.DescOneQuillHandleChange(name, val)}}

                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.department_desc_one} 
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
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Department Description Two</label>
                                                            <MultipleReactQuillEditor
                                                                id="desceditor2"
                                                                name="desceditor2"
                                                                value={this.state.department_desc_two}
                                                                onChange={(name, val) => {this.DescTwoQuillHandleChange(name, val)}}

                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.department_desc_two} 
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChangeDescTwo
                                                                }}
                                                            />*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Department Description Three</label>
                                                            <MultipleReactQuillEditor
                                                                id="desceditor3"
                                                                name="desceditor3"
                                                                value={this.state.department_desc_three}
                                                                onChange={(name, val) => {this.DescThreeQuillHandleChange(name, val)}}

                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.department_desc_three} 
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChangeDescThree
                                                                }}
                                                            />*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Department Description Four</label>
                                                            <MultipleReactQuillEditor
                                                                id="desceditor4"
                                                                name="desceditor4"
                                                                value={this.state.department_desc_four}
                                                                onChange={(name, val) => {this.DescFourQuillHandleChange(name, val)}}

                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.department_desc_four} 
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChangeDescFour
                                                                }}
                                                            />*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Department Description Five</label>
                                                            <MultipleReactQuillEditor
                                                                id="desceditor5"
                                                                name="desceditor5"
                                                                value={this.state.department_desc_five}
                                                                onChange={(name, val) => {this.DescFiveQuillHandleChange(name, val)}}

                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.department_desc_five} 
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChangeDescFive
                                                                }}
                                                            />*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Department Icon</label>
                                                            <input type="file" className="form-control" name="department_image" id="department_image" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png"/>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div>
                                                        <button type="submit" className="btn btn-pink waves-effect waves-light" id="department_submit_btn">
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
export default AddDepartment;