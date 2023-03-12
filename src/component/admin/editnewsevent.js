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

const updateNewevent = (id, data, edit_news_events_desc, imageData) => {
    let formdata = new FormData();
    formdata.append('edit_news_events_desc', edit_news_events_desc);
    formdata.append('edit_news_events_pic', imageData);
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.post('/newsevents/updatenewsevents/'+id, formdata, {
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
const getSingleNewsEvent = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/newsevents/getsinglenewsevents/'+id, {
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
class EditNewsEvent extends Component {
    state = {
        fields: {},
        errors: {},
        departments:[],
        news_id:'',
        edit_news_events_title:'',
        edit_news_events_desc:'',
        edit_news_events_pic:'',
    }
    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!this.state.edit_news_events_title) {
            formIsValid = false;
            errors["edit_news_events_title"] = "*Please enter the news name.";
        }
        
        if (!this.state.edit_news_events_desc) {
            formIsValid = false;
            errors["edit_news_events_desc"] = "*Please enter the news description.";
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
            edit_news_events_desc: val,
        })
    }
    /*onChange = (evt) =>{
      //console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.setState({
        edit_news_events_desc: newContent,
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
            edit_news_events_pic: file[0],
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            /*let fields = {};
            fields["edit_department_name"] = "";
            this.setState({ fields: fields });*/
            const id = this.state.news_id;
            const data = {
                edit_news_events_title: this.state.edit_news_events_title,
                edit_news_events_desc: this.state.edit_news_events_desc,
            }
            updateNewevent(id, data, this.state.edit_news_events_desc, this.state.edit_news_events_pic)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/newsevents';
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
    refreshgetSingleNewsEvent = (id) => {
        getSingleNewsEvent(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    news_id: records.id, 
                    edit_news_events_title: records.news_events_title,
                    edit_news_events_desc: records.news_events_desc,
                    edit_news_events_pic: records.news_events_pic,
                  
                });
            } else {
                this.setState({ 
                    news_id: '', 
                    edit_news_events_title: '',
                    edit_news_events_desc: '',
                    edit_news_events_pic: '',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    componentDidMount(){
        this.refreshgetSingleNewsEvent(this.props.match.params.id);
       
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
                                            <h4 className="mt-0 header-title">Edit News Event</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Name</label>
                                                            <input type="text" className="form-control" name="edit_news_events_title" id="edit_news_events_title" value={this.state.edit_news_events_title} onChange={this.handleChange} required placeholder="Name"/>
                                                            <span style={alertStyle}>{this.state.errors.edit_news_events_title}</span>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Description</label>
                                                            <MultipleReactQuillEditor
                                                                id="editdescnewseditor"
                                                                name="editdescnewseditor"
                                                                value={this.state.edit_news_events_desc}
                                                                onChange={(name, val) => {this.DescQuillHandleChange(name, val)}}
                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.edit_news_events_desc} 
                                                                events={{
                                                                    "blur": this.onBlur,
                                                                    "afterPaste": this.afterPaste,
                                                                    "change": this.onChange
                                                                }}
                                                            />*/}
                                                            <span style={alertStyle}>{this.state.errors.edit_news_events_desc}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Image</label>
                                                            <input type="file" className="form-control" name="edit_news_events_pic" id="edit_news_events_pic" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png" placeholder="Doctor Fees"/>
                                                            { this.state.edit_news_events_pic
                                                                ?
                                                                    <img src={IMAGE_URL+'NewsEventsImg/'+this.state.edit_news_events_pic} alt="" style={{"width":"150px", "height":"auto", "margin-top":"10px", "border-radius":"5px"}}/>
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
export default EditNewsEvent;