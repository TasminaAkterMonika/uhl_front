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

const updateDepartment = (id, data, edit_department_desc_one, edit_department_desc_two, edit_department_desc_three, edit_department_desc_four, edit_department_desc_five) => {
    let formdata = new FormData();
    formdata.append('edit_department_desc_one', edit_department_desc_one);
    formdata.append('edit_department_desc_two', edit_department_desc_two);
    formdata.append('edit_department_desc_three', edit_department_desc_three);
    formdata.append('edit_department_desc_four', edit_department_desc_four);
    formdata.append('edit_department_desc_five', edit_department_desc_five);
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.post('/department/updatedepartment/'+id, formdata, {
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
const getSingleDepartmentData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/department/getsingledepartment/'+id, {
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
class EditDepartment extends Component {
    state = {
        fields: {},
        errors: {},
        department_id:'',
        edit_department_name:'',
        edit_department_desc_one:'',
        edit_department_desc_two:'',
        edit_department_desc_three:'',
        edit_department_desc_four:'',
        edit_department_desc_five:'',
    }
    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!this.state.edit_department_name) {
            formIsValid = false;
            errors["edit_department_name"] = "*Please enter your department name.";
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
    DescOneQuillHandleChange = (name, val) => {
        this.setState({
            edit_department_desc_one: val,
        })
    }
    DescTwoQuillHandleChange = (name, val) => {
        this.setState({
            edit_department_desc_two: val,
        })
    }
    DescThreeQuillHandleChange = (name, val) => {
        this.setState({
            edit_department_desc_three: val,
        })
    }
    DescFourQuillHandleChange = (name, val) => {
        this.setState({
            edit_department_desc_four: val,
        })
    }
    DescFiveQuillHandleChange = (name, val) => {
        this.setState({
            edit_department_desc_five: val,
        })
    }
    /*onChangeDescOne = (evt) =>{
        //console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            edit_department_desc_one: newContent,
        })
    }
    onChangeDescTwo = (evt) =>{
        //console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            edit_department_desc_two: newContent,
        })
    }
    onChangeDescThree = (evt) =>{
        //console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            edit_department_desc_three: newContent,
        })
    }
    onChangeDescFour = (evt) =>{
        //console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            edit_department_desc_four: newContent,
        })
    }
    onChangeDescFive = (evt) =>{
        //console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            edit_department_desc_five: newContent,
        })
    }*/
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            /*let fields = {};
            fields["edit_department_name"] = "";
            this.setState({ fields: fields });*/
            const id = this.state.department_id;
            const data = {
                edit_department_name: this.state.edit_department_name,
                /*edit_department_desc_one: this.state.edit_department_desc_one,
                edit_department_desc_two: this.state.edit_department_desc_two,
                edit_department_desc_three: this.state.edit_department_desc_three,
                edit_department_desc_four: this.state.edit_department_desc_four,
                edit_department_desc_five: this.state.edit_department_desc_five,*/
            }
            updateDepartment(id, data, this.state.edit_department_desc_one, this.state.edit_department_desc_two, this.state.edit_department_desc_three, this.state.edit_department_desc_four, this.state.edit_department_desc_five)
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
            toast.error('Please provide department name!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }
    refreshgetSingleDepartmentData = (id) => {
        getSingleDepartmentData(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    department_id: records.id, 
                    edit_department_name: records.department_name,
                    edit_department_desc_one: records.department_desc_one,
                    edit_department_desc_two: records.department_desc_two,
                    edit_department_desc_three: records.department_desc_three,
                    edit_department_desc_four: records.department_desc_four,
                    edit_department_desc_five: records.department_desc_five,
                });
            } else {
                this.setState({ 
                    department_id: '',
                    edit_department_name: '',
                    edit_department_desc_one: '',
                    edit_department_desc_two: '',
                    edit_department_desc_three: '',
                    edit_department_desc_four: '',
                    edit_department_desc_five: '', 
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.refreshgetSingleDepartmentData(this.props.match.params.id);
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
                                            <h4 className="mt-0 header-title">Edit Department</h4>
                                            <form onSubmit={this.handleSubmit} id="editdepartmentform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Department Name</label>
                                                            <input type="text" className="form-control" name="edit_department_name" id="edit_department_name" value={this.state.edit_department_name} onChange={this.handleChange} required placeholder="Department Name"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_department_name}</span>
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
                                                                value={this.state.edit_department_desc_one}
                                                                onChange={(name, val) => {this.DescOneQuillHandleChange(name, val)}}

                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.edit_department_desc_one} 
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
                                                                value={this.state.edit_department_desc_two}
                                                                onChange={(name, val) => {this.DescTwoQuillHandleChange(name, val)}}

                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.edit_department_desc_two} 
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
                                                                value={this.state.edit_department_desc_three}
                                                                onChange={(name, val) => {this.DescThreeQuillHandleChange(name, val)}}

                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.edit_department_desc_three} 
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
                                                                value={this.state.edit_department_desc_four}
                                                                onChange={(name, val) => {this.DescFourQuillHandleChange(name, val)}}

                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.edit_department_desc_four} 
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
                                                                value={this.state.edit_department_desc_five}
                                                                onChange={(name, val) => {this.DescFiveQuillHandleChange(name, val)}}

                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.edit_department_desc_five} 
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChangeDescFive
                                                                }}
                                                            />*/}
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
export default EditDepartment;