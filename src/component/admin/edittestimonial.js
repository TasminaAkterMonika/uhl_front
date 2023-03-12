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
//import CKEditor from "react-ckeditor-component";
import "../../component/admin/MultipleReactQuillEditor";
import { MultipleReactQuillEditor } from "../../component/admin/MultipleReactQuillEditor";

const updateTestimonial = (id, data, edit_testimonial_desc, imageData) => {
    let formdata = new FormData();
    formdata.append('edit_testimonial_desc', edit_testimonial_desc);
    formdata.append('edit_author_profile_pic', imageData);
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.post('/testimonials/updatetestimonials/'+id, formdata, {
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
const getSingleTestimonialData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/testimonials/getsingletestimonials/'+id, {
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
const getAllDoctors = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/doctors/getdoctors', {
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
class EditTestimonial extends Component {
    state = {
        fields: {},
        errors: {},
        departments:[],
        testimonial_id:'',
        edit_testimonial_name:'',
        edit_testimonial_desc:'',
        edit_author_id:'',
        edit_rating:'',
        edit_author_profile_pic:'',
        doctors:[],
    }
    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.state.edit_testimonial_name) {
            formIsValid = false;
            errors["edit_testimonial_name"] = "*Please enter the name.";
        }
        if (!this.state.edit_author_id) {
            formIsValid = false;
            errors["edit_author_id"] = "*Please enter the author name.";
        }
        if (!this.state.edit_rating) {
            formIsValid = false;
            errors["edit_rating"] = "*Please enter the rating.";
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
        console.log(val);
        this.setState({
            edit_testimonial_desc: val,
        });
    }
    /*onChange = (evt) =>{
      //console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.setState({
        edit_testimonial_desc: newContent,
      })
    }*/
    /*onBlur(evt){
      console.log("onBlur event called with event info: ", evt);
    }
    afterPaste(evt){
      console.log("afterPaste event called with event info: ", evt);
    }*/
    onFileChange (file) {
        this.setState({ 
            edit_author_profile_pic: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            /*let fields = {};
            fields["edit_department_name"] = "";
            this.setState({ fields: fields });*/
            const id = this.state.testimonial_id;
            const data = {
                edit_testimonial_name: this.state.edit_testimonial_name,
                //edit_testimonial_desc: this.state.edit_testimonial_desc,
                edit_author_id: this.state.edit_author_id,
                edit_doctor_department: this.state.edit_doctor_department,
                edit_rating: this.state.edit_rating,
            }
            updateTestimonial(id, data, this.state.edit_testimonial_desc, this.state.edit_author_profile_pic)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/testimonials';
                }, 3000);
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
    refreshgetSingleTestimonialData = (id) => {
        getSingleTestimonialData(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    testimonial_id: records.id, 
                    edit_testimonial_name: records.testimonial_name,
                    edit_testimonial_desc: records.testimonial_desc,
                    edit_author_id: records.author_id,
                    edit_rating: records.rating,
                    edit_author_profile_pic: records.author_profile_pic,
                });
            } else {
                this.setState({ 
                    testimonial_id: '', 
                    edit_testimonial_name: '',
                    edit_testimonial_desc: '',
                    edit_author_id: '',
                    edit_rating: '',
                    edit_author_profile_pic: '',
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
    refreshDoctors = (page) => {
        this.setState({ enableShdo: true, });
        const data = {
            page: page,
        }
        getAllDoctors(data)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({ doctors: records });
            } else {
                this.setState({ doctors: '' });
            }
            this.setState({ enableShdo: false, });
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.refreshgetSingleTestimonialData(this.props.match.params.id);
        this.refreshDepartments();
        this.refreshDoctors();
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
                                            <h4 className="mt-0 header-title">Edit Testimonial</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Testimonial Name</label>
                                                            <input type="text" className="form-control" name="edit_testimonial_name" id="edit_testimonial_name" value={this.state.edit_testimonial_name} onChange={this.handleChange} required placeholder="Testimonial Name"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_testimonial_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Testimonial Author Name</label>
                                                            <select className="form-control" name="edit_author_id" id="edit_author_id" value={this.state.edit_author_id} onChange={this.handleChange}>
                                                                <option value="">Select Author Name</option>
                                                                {this.state.doctors.length > 0
                                                                    ?
                                                                        this.state.doctors.map((doctor) => {
                                                                            return ( 
                                                                                <option value={doctor.id} >{doctor.doctor_name}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="">Select Author Name</option>
                                                                }
                                                            </select>
                                                            {/*<input type="text" className="form-control" name="edit_author_name" id="edit_author_name" value={this.state.edit_author_name} onChange={this.handleChange} required placeholder="Testimonial Author Name"/>*/}
                                                            <span style={alertStyle}>{this.state.errors.edit_author_id}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Testimonial Rating</label>
                                                            <input type="number" className="form-control" name="edit_rating" id="edit_doctor_fees" value={this.state.edit_rating} onChange={this.handleChange} required placeholder="Rating"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Testimonial Description</label>
                                                            <MultipleReactQuillEditor
                                                                id="editdesctestieditor"
                                                                name="editdesctestieditor"
                                                                value={this.state.edit_testimonial_desc}
                                                                onChange={(name, val) => {this.DescQuillHandleChange(name, val)}}
                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.edit_testimonial_desc} 
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChange
                                                                }}
                                                            />*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Testimonial Author Image</label>
                                                            <input type="file" className="form-control" name="edit_author_profile_pic" id="edit_author_profile_pic" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png" placeholder="Doctor Fees"/>
                                                            { this.state.edit_author_profile_pic
                                                                ?
                                                                    <img src={IMAGE_URL+'AuthorProfileImg/'+this.state.edit_author_profile_pic} alt="" style={{"width":"150px", "height":"auto", "margin-top":"10px", "border-radius":"5px"}}/>
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
export default EditTestimonial;