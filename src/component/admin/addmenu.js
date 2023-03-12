import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';

const savemenu = (data) => {
    let formdata = new FormData();

    return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.post('/menu/createmenu',formdata, {
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

const GetAllStaticPages = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/staticpages/getallstaticpages', {
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
class addmenu extends Component {
    state = {
        fields: {},
        errors: {},
        menu: [],
        staticpages:[],
        menu_title:'',
        menu_url:'',
        menu_current_status:'',
        data:'',
    }
    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!this.state.menu_title) {
            formIsValid = false;
            errors["menu_title"] = "*Please enter the menu title.";
        }
        if (!this.state.menu_current_status) {
            formIsValid = false;
            errors["menu_current_status"] = "*Please enter the menu title.";
        }
        if (!this.state.menu_url) {
            formIsValid = false;
            errors["menu_url"] = "*Please enter the menu url.";
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
    
    
    refreshStaticPages = (page) => {
        GetAllStaticPages(page)
          .then(res => {
            if(res.status===true){
                  var records = res.data.data;
                  this.setState({ staticpages: records });
                  
            } else {
                  this.setState({ staticpages: '' });
            }
            this.setState({ enableShdo: false, });
          })
          .catch(err => {
              console.log(err);
          });
        }
  

    onBlur(evt){
      console.log("onBlur event called with event info: ", evt);
    }
    afterPaste(evt){
      console.log("afterPaste event called with event info: ", evt);
    }
    
    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
         
          
            const data = {
                menu_title: this.state.menu_title,
                menu_url: this.state.menu_url,
                menu_current_status: this.state.menu_current_status,
            

            }
            savemenu(data)

            .then(res => {
                if (res.status==='ok') {
                  toast.success(res.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });

                   setTimeout(function(){ 
                    window.location.href = '/menu';
                  }, 6000);

                }else if(res.status==='notok'){
                  toast.error(res.message, {
                      position: toast.POSITION.BOTTOM_RIGHT
                  });
                }else if(res.status==='title_error') {
                    toast.error(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                }else if(res.status==='page_error') {
                    toast.error(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                }
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
    componentDidMount(){
        this.setState({editorLoaded: true});
        this.refreshStaticPages();
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
                                            <h4 className="mt-0 header-title">Add Menu</h4>
                                            <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Title</label>
                                                            <input type="text" className="form-control" name="menu_title" id="page_title" value={this.state.fields.menu_title} onChange={this.handleChange} required placeholder="Menu title"/>
                                                            <span style={alertStyle}>{this.state.errors.menu_title}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Status</label>
                                                            <select className="form-control" value={this.state.fields.menu_current_status} name="menu_current_status" onChange={this.handleChange}>
                                                                <option value="active">Active</option>
                                                                <option value="deleted">Deleted</option>
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.menu_current_status}</span>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                    <div className="form-group">
                                                            <label>Select page</label>
                                                            <select className="form-control" name="menu_url" value={this.state.fields.menu_url} onChange={this.handleChange}>
                                                                <option value="">Select Page </option>
                                                                {
                                                                    this.state.staticpages.length > 0
                                                                    ?
                                                                        this.state.staticpages.map((cpage, index) => {
                                                                            return ( 
                                                                                <option value={cpage.id}>{cpage.title}</option>
                                                                            )
                                                                        })
                                                                    :
                                                                        <option value="">Select Page</option>   
                                                                }
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.menu_url}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div>
                                                        <button type="submit" className="btn btn-pink waves-effect waves-light">
                                                            Submit
                                                        </button>
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
        )
    }
}
export default addmenu;