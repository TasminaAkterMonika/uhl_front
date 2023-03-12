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

const saveTestimonials = (data,testimonial_desc,imageData) => {
    let formdata = new FormData();
    formdata.append('testimonial_desc', testimonial_desc);
    formdata.append('author_profile_pic', imageData);
    return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.post('/testimonials/savetestimonials',formdata, {
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
class AddTestimonials extends Component {
    state = {
        fields: {},
        errors: {},
        testimonial_name:'',
        testimonial_desc:'',
        author_id:'',
        rating:'',
        author_profile_pic: '',
        doctors:[],
    }
    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["testimonial_name"]) {
            formIsValid = false;
            errors["testimonial_name"] = "*Please enter the name.";
        }

        if (!fields["author_id"]) {
            formIsValid = false;
            errors["author_id"] = "*Please enter the author name.";
        }

        if (!fields["rating"]) {
            formIsValid = false;
            errors["rating"] = "*Please enter the rating.";
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
            testimonial_desc: val,
        })
    }
    /*onChangeDescOne = (evt) =>{
        //console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            testimonial_desc: newContent,
        })
    }*/
    
    onFileChange (file) {
        this.setState({ 
            author_profile_pic: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["testimonial_name"] = "";
            fields["author_id"] = "";
            fields["rating"] = "";
            this.setState({ fields: fields });
            const data = {
                testimonial_name: this.state.fields.testimonial_name,
                //testimonial_desc: this.state.testimonial_desc,
                author_id: this.state.author_id,
                rating: this.state.rating,
            }
            saveTestimonials(data,this.state.testimonial_desc,this.state.author_profile_pic)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/testimonials';
                }, 3000);
            })
            .catch(err => {
                toast.error('Error occured', {
                  position: toast.POSITION.BOTTOM_RIGHT
                });
            });
        } else {
            toast.error('Please provide all fields!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
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
        this.refreshDoctors();
    }
    render() {
        return (
            <div className="fixed-left">
                <SEO title="Add Testimonials" description="Add Testimonials United Hospital" pathSlug="/addtestimonial" keywords="Add Testimonials, Testimonials" />
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
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Testimonial Name</label>
                                                            <input type="text" className="form-control" name="testimonial_name" id="testimonial_name" value={this.state.testimonial_name} onChange={this.handleChange} required placeholder="Testimonial Name"/>
                                                            <span style={alertStyle}>{this.state.errors.testimonial_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Testimonial Author Name</label>
                                                            <select className="form-control" name="author_id" id="author_id" value={this.state.fields.author_id} onChange={this.handleChange}>
                                                                <option value="">Select Author Name</option>
                                                                {this.state.doctors.length > 0
                                                                    ?
                                                                        this.state.doctors.map(doctor => {
                                                                            return ( 
                                                                                <option value={doctor.id}>{doctor.doctor_name}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="">Select Author Name</option>
                                                                }
                                                            </select>
                                                            {/*<input type="text" className="form-control" name="author_name" id="author_name" value={this.state.author_name} onChange={this.handleChange} required placeholder="Testimonial Author Name"/>*/}
                                                            <span style={alertStyle}>{this.state.errors.author_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label>Testimonial Rating</label>
                                                            <input type="number" className="form-control" name="rating" id="rating" value={this.state.rating} onChange={this.handleChange} required placeholder="Rating" min="0" max="5"/>
                                                            <span style={alertStyle}>{this.state.errors.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Testimonial Description One</label>
                                                            <MultipleReactQuillEditor
                                                                id="adddesctestieditor"
                                                                name="adddesctestieditor"
                                                                value={this.state.testimonial_desc}
                                                                onChange={(name, val) => {this.DescQuillHandleChange(name, val)}}
                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.testimonial_desc} 
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
                                                            <label>Testimonial Author Image</label>
                                                            <input type="file" className="form-control" name="author_profile_pic" id="author_profile_pic" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png" placeholder="Doctor Fees"/>
                                                            
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
export default AddTestimonials;