import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';

const updatemenu = (id, data) => {
    let formdata = new FormData();
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.post('/menu/updatemenu/'+id, formdata, {
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
const getSingleMenu = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/menu/getsinglemenu/'+id, {
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
class editmenu extends Component {
    state = {
        fields: {},
        errors: {},
        menu_id:'',
        staticpages:[],
        edit_menu_title:'',
        edit_menu_url:'',
        edit_current_status:'',
    }
    validateForm() {
        //let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!this.state.edit_menu_title) {
            formIsValid = false;
            errors["edit_menu_title"] = "*Please enter the menu title.";
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

    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()===true) {
            /*let fields = {};
            fields["edit_department_name"] = "";
            this.setState({ fields: fields });*/
            const id = this.state.menu_id;
            const data = {
                edit_menu_title: this.state.edit_menu_title,
                edit_menu_url: this.state.edit_menu_url,
                edit_current_status: this.state.edit_current_status,

            }
            updatemenu(id, data)
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(function(){ 
                    window.location.href = '/menu';
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
    refreshgetSingleMenu = (id) => {
        getSingleMenu(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    menu_id: records.id, 
                    edit_menu_title: records.title,
                    edit_menu_url: records.static_page_id,
                    edit_current_status: records.current_status,
                });
              
            } else {
                this.setState({ 
                    menu_id: '', 
                    edit_menu_title: '',
                    edit_menu_url: '',
                    edit_current_status: '',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    

    componentDidMount(){
        this.refreshgetSingleMenu(this.props.match.params.id);
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
                                        <h4 className="mt-0 header-title">Edit Menu</h4>
                                        <form onSubmit={this.handleSubmit} id="editdoctorform" className="needs-validation" noValidate>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <input type="text" className="form-control" name="edit_menu_title" id="package_name" value={this.state.edit_menu_title} onChange={this.handleChange} required placeholder="Menu Title"/>
                                                        <span style={alertStyle}>{this.state.errors.edit_menu_title}</span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Status</label>
                                                            <select className="form-control" value={this.state.edit_current_status} name="edit_current_status" onChange={this.handleChange}>
                                                                <option value="active">Active</option>
                                                                <option value="deleted">Deleted</option>
                                                            </select>
                                                            <span style={alertStyle}>{this.state.errors.edit_current_status}</span>
                                                        </div>
                                                    </div>
                                                
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Edit page</label>
                                                        {this.state.edit_menu_title === 'Packages'
                                                            ?
                                                                <select className="form-control" value={this.state.edit_menu_url} name="edit_menu_url" onChange={this.handleChange} disabled>
                                                                    {
                                                                        this.state.staticpages.length > 0
                                                                        ?
                                                                            this.state.staticpages.map((cpage, index) => {
                                                                                return ( 
                                                                                    <option value={cpage.id}>{cpage.title}</option>
                                                                                )
                                                                            })
                                                                        :
                                                                            <option value="">Select Department</option>   
                                                                    }
                                                                </select>
                                                            :
                                                                <select className="form-control" value={this.state.edit_menu_url} name="edit_menu_url" onChange={this.handleChange}>
                                                                    {
                                                                        this.state.staticpages.length > 0
                                                                        ?
                                                                            this.state.staticpages.map((cpage, index) => {
                                                                                return ( 
                                                                                    <option value={cpage.id}>{cpage.title}</option>
                                                                                )
                                                                            })
                                                                        :
                                                                            <option value="">Select Department</option>   
                                                                    }
                                                                </select>
                                                        }  
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
export default editmenu;