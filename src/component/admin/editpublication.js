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

const updatePublication = (id, data, edit_publications_desc, imageData) => {
    let formdata = new FormData();
    formdata.append('edit_publications_desc', edit_publications_desc);
    formdata.append('edit_publications_pic', imageData);
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.post('/publications/updatepublications/'+id, formdata, {
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
const getSinglePublictication = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/publications/getsinglepublications/'+id, {
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


const getAllDoctor = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/publications/getdoctors', {
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
class EditPublication extends Component {
    state = {
        fields: {},
        errors: {},
        doctors:[],
        publication_id:'',
        edit_publications_title:'',
        edit_publications_desc:'',
        edit_publications_pic:'',
    }
    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!this.state.edit_publications_title) {
            formIsValid = false;
            errors["edit_publications_title"] = "*Please enter the news name.";
        }
        
        if (!this.state.edit_publications_desc) {
            formIsValid = false;
            errors["edit_publications_desc"] = "*Please enter the news description.";
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
            edit_publications_desc: val,
        })
    }
    /*onChange = (evt) =>{
      //console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.setState({
        edit_publications_desc: newContent,
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
            edit_publications_pic: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            /*let fields = {};
            fields["edit_department_name"] = "";
            this.setState({ fields: fields });*/
            const id = this.state.publication_id;
            const data = {
                edit_publications_title: this.state.edit_publications_title,
                //edit_publications_desc: this.state.edit_publications_desc,
                edit_doctor_id: this.state.edit_doctor_id,
            }
            updatePublication(id, data, this.state.edit_publications_desc, this.state.edit_publications_pic)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/publications';
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
    refreshgetSinglePublication = (id) => {
        getSinglePublictication(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    publication_id: records.id, 
                    edit_publications_title: records.publications_title,
                    edit_doctor_id: records.doctor_id,
                    edit_publications_desc: records.publications_desc,
                    edit_publications_pic: records.publications_pic,
                  
                });
            } else {
                this.setState({ 
                    publication_id: '', 
                    edit_publications_title: '',
                    edit_publications_desc: '',
                    edit_publications_pic: '',
                    edit_doctor_id:'',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    refreshDoctor = () => {
        getAllDoctor()
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({ doctors: records });
            } else {
                this.setState({ doctors: '' });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    componentDidMount(){
        this.refreshgetSinglePublication(this.props.match.params.id);
        this.refreshDoctor();
       
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
                                            <h4 className="mt-0 header-title">Edit Publication</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Name</label>
                                                            <input type="text" className="form-control" name="edit_publications_title" id="edit_publications_title" value={this.state.edit_publications_title} onChange={this.handleChange} required placeholder="Name"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_publications_title}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        
                                                        <div className="form-group">
                                                            <label>Doctor Name</label>
                                                           
                                                            <select className="form-control" value={this.state.edit_doctor_id} name="edit_doctor_id" onChange={this.handleChange}>
                                                                {
                                                                    this.state.doctors.length > 0
                                                                    ?
                                                                        this.state.doctors.map((doctor, index) => {
                                                                            return ( 
                                                                                <option key={doctor.id} value={doctor.id}>{doctor.doctor_name}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="">Select Department</option>   
                                                                }
                                                            </select>

                                                            <span style={alertStyle}>{this.state.errors.doctor_id}</span>
                                                        
                                                        </div>
                                                    </div>
                                                   
                                                    
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Description</label>
                                                            <MultipleReactQuillEditor
                                                                id="editdescpubeditor"
                                                                name="editdescpubeditor"
                                                                value={this.state.edit_publications_desc}
                                                                onChange={(name, val) => {this.DescQuillHandleChange(name, val)}}
                                                            />
                                                            <span style={alertStyle}>{this.state.errors.edit_publications_desc}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Image</label>
                                                            <input type="file" className="form-control" name="edit_publications_pic" id="edit_publications_pic" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png" placeholder="Doctor Fees"/>
                                                            { this.state.edit_publications_pic
                                                                ?
                                                                    <img src={IMAGE_URL+'PublicationsImg/'+this.state.edit_publications_pic} alt="" style={{"width":"150px", "height":"auto", "margin-top":"10px", "border-radius":"5px"}}/>
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
export default EditPublication;