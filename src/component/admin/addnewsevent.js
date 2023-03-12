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

const savenewsevents = (data,news_events_desc,imageData) => {
    let formdata = new FormData();
    formdata.append('news_events_desc', news_events_desc);
    formdata.append('news_events_pic', imageData);
    return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.post('/newsevents/savenewsevents',formdata, {
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


const alertStyle = {
  color: 'red',
};
class AddNewsEvent extends Component {
    state = {
        fields: {},
        errors: {},
        news_events_title:'',
        news_events_desc:'',
        news_events_pic:'',
       
    }
    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["news_events_title"]) {
            formIsValid = false;
            errors["news_events_title"] = "*Please enter the name.";
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
            news_events_desc: val,
        })
    }
    /*onChangeDescOne = (evt) =>{
        //console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            news_events_desc: newContent,
        })
    }*/
   
    onFileChange (file) {
        // alert(file[0]);
        // console.log(file[0]);
        this.setState({ 
            news_events_pic: file[0],
            
        })
       
    }
   
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["news_events_title"] = "";
            this.setState({ fields: fields });
            const data = {
                news_events_title: this.state.fields.news_events_title,
                //news_events_desc: this.state.news_events_desc,
                
            }
            savenewsevents(data,this.state.news_events_desc, this.state.news_events_pic)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/newsevents';
                }, 3000);
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
                                            <h4 className="mt-0 header-title">Add News Event</h4>
                                            <form onSubmit={this.handleSubmit} id="adddepartmentform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Name</label>
                                                            <input type="text" className="form-control" name="news_events_title" id="news_events_title" value={this.state.fields.news_events_title} onChange={this.handleChange} required placeholder="Name"/>
                                                            <span style={alertStyle}>{this.state.errors.news_events_title}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label>Description</label>
                                                            <MultipleReactQuillEditor
                                                                id="adddescnewseditor"
                                                                name="adddescnewseditor"
                                                                value={this.state.news_events_desc}
                                                                onChange={(name, val) => {this.DescQuillHandleChange(name, val)}}
                                                            />
                                                            {/*<CKEditor 
                                                                activeClass="p10" 
                                                                content={this.state.news_events_desc} 
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
                                                            <label>Image</label>
                                                            <input type="file" className="form-control" name="news_events_pic" id="news_events_pic" onChange={ (event) => this.onFileChange(event.target.files) } accept="jpg,png"/>
                                                           
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
export default AddNewsEvent;