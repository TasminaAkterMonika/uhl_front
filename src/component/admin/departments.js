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
//import Moment from 'moment';
import Pagination from "react-js-pagination";
import Modal from './DeleteConfirmModalPopup';

const getAllDepartments = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/department/getalldepartments', {
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
const getSearchDepartments = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/department/adminsearchdepartments', {
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
const deleteDepartment = (data) => {
  return new Promise((resolve, reject) => {
      const req = scAxiosAdmin.request('/department/deletedepartment', {
          method: 'post',
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
class Departments extends Component {
	state = {
		departments: [],
		total: '',
        currentPage: '',
        LastPage:'',
        PerPage: '',
        FirstPageUrl:'',
        NextPageUrl:'',
        PrevPageUrl:'',
        LastPageUrl:'',
        TotalPages:'',
        activePage: 1,
        enableShdo: false,
        enableShdoLive: false,
        department_id:'',
        modalDeleteConfirm:false,
        selectedPost: null,
        search_keywords:'',
	}
	handleChange = (events) =>{
		this.setState({
            [event.target.name]: event.target.value
        });
	}
	handlePageChange(pageNumber) {
    	this.setState({ activePage: pageNumber });
    	this.refreshDepartments(pageNumber);
  	}
  	modalDeleteConfirmOpen(e, id) {
	    this.setState({ 
	      modalDeleteConfirm: true,
	      department_id: id,
	    });
  	}
  	modalDeleteConfirmClose() {
	    this.setState({
	      modalDeleteConfirm: false
	    });
  	}
  	modalDeleteDepartment(id){
  		this.setState({
	      modalDeleteConfirm: false
	    });
	    /*this.setState({ 
	      selectedPost: i,
	    });*/
	    const data = {
	      department_id: id
	    }
	    deleteDepartment(data)
	    .then(res => {
	      	if(res.status === true){
		        toast.success(res.message, {
		          position: toast.POSITION.TOP_RIGHT
		        });
		        setTimeout(function(){ 
                    window.location.href = '/departments';
                }, 6000);
	      	} else {
		        toast.error(res.message, {
		          position: toast.POSITION.BOTTOM_RIGHT
		        });
	      	}
	      	//window.location='/departments';
	    })
	    .catch(err => {
	        console.log(err);
	    });
  	}
	refreshDepartments = (page) => {
	  	this.setState({ enableShdo: true, });
		const data = {
		    page: page,
		}
  		getAllDepartments(data)
      	.then(res => {
        	if(res.status===true){
          		var records = res.data.data;
          		this.setState({ departments: records });
          		this.setState({ total: res.data.total });
          		this.setState({ currentPage: res.data.current_page });
          		this.setState({ PerPage: res.data.per_page });
          		this.setState({ FirstPageUrl: res.data.first_page_url });
          		this.setState({ NextPageUrl: res.data.next_page_url });
          		this.setState({ PrevPageUrl: res.data.prev_page_url });
          		this.setState({ LastPageUrl: res.data.last_page_url });
          		this.setState({ LastPage: res.data.last_page });
          		this.setState({ TotalPages: Math.ceil(this.state.total / this.state.PerPage) });
        	} else {
          		this.setState({ departments: '' });
        	}
        	this.setState({ enableShdo: false, });
      	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    SearchDepartments = (e) =>{
    	const data = {
    		keywords: this.state.search_keywords
    	}
    	getSearchDepartments(data)
    	.then(res => {
    		if(res.status===true){
          		var records = res.data.data;
          		this.setState({ departments: records });
          		this.setState({ total: res.data.total });
          		this.setState({ currentPage: res.data.current_page });
          		this.setState({ PerPage: res.data.per_page });
          		this.setState({ FirstPageUrl: res.data.first_page_url });
          		this.setState({ NextPageUrl: res.data.next_page_url });
          		this.setState({ PrevPageUrl: res.data.prev_page_url });
          		this.setState({ LastPageUrl: res.data.last_page_url });
          		this.setState({ LastPage: res.data.last_page });
          		this.setState({ TotalPages: Math.ceil(this.state.total / this.state.PerPage) });
        	} else {
          		this.setState({ departments: '' });
        	}
    	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    componentDidMount() {
    	this.refreshDepartments();
  	} 
  	render() {
  		//const currentPage = this.state.currentPage;
		//const previousPage = currentPage - 1;
		//const NextPage = currentPage + 1;
		//const LastPage = this.state.LastPage;
		const pageNumbers = [];
		for (let i = 1; i <= this.state.TotalPages; i++) {
		    pageNumbers.push(i);
		}
    	return (
    		<div className="fixed-left">
	    		<div id="wrapper">
	    			<Route component={LeftSidebar} />
	    			<div className="content-page">
                		<div className="content">
	    					<Route component={TopHeader} />
	    					<div className="page-content-wrapper">
	    						<div className="container-fluid">
		                            <div className="row">
		                                <div className="col-12">
		                                    <div className="card m-b-20">
		                                        <div className="card-body">
		                                        	<div className="row">
		                                        		<div className="col-sm-7">
				                                            <h4 className="mt-0 header-title">Departments</h4>
				                                        </div>
				                                        <div className="col-sm-3 text-right">
				                                            <input type="text" className="form-control" name="search_keywords" id="search_keywords" value={this.state.search_keywords} onChange={this.handleChange} onBlur={this.SearchDepartments} placeholder="Search"/>
				                                        </div>
				                                        <div className="col-sm-2 text-right">
				                                        	<a href="/adddepartment" className="btn btn-sm btn-primary waves-effect waves-light">Add Department</a>
				                                        </div>
				                                    </div>
		                                            <div className="table-rep-plugin">
		                                                <div className="table-responsive b-0" data-pattern="priority-columns">
		                                                    <table id="tech-companies-1" className="table  table-striped">
		                                                        <thead>
			                                                        <tr>
			                                                            <th>Department ID</th>
			                                                            <th data-priority="1">Department Name</th>
			                                                            <th data-priority="4">Status</th>
			                                                            <th data-priority="3">Action</th>
			                                                        </tr>
		                                                        </thead>
		                                                        <tbody>
		                                                        	{ this.state.departments.length > 0
                  														?
	                  														this.state.departments.map(department => {
						                                                        return ( 
							                                                        <tr key={department.id}>
							                                                            <td>#{department.dept_id}</td>
							                                                            <td>{department.department_name}</td>
							                                                            <td>
							                                                            { department.status === '1'
							                                                              ?
							                                                              	'Active'
							                                                              :
							                                                              	'InActive'	
							                                                            }</td>
							                                                            <td>
							                                                            	<a href={'/editdepartment/'+department.id}><i className="fa fa-pencil-square"></i></a>
							                                                            	<a href={'/viewdepartment/'+department.id}><i className="fa fa-eye"></i></a>
							                                                            	<a onClick={(e) => this.modalDeleteConfirmOpen(e, department.id)}><i className="fa fa-trash"></i></a>
							                                                            </td>
							                                                            <Modal show={this.state.modalDeleteConfirm} handleClose={e => this.modalDeleteConfirmClose(e)}>
                      																		<div className="custom_reviews_popup">
                        																		<h2 className="text-center">Are you sure you wish to delete this department ?</h2>
																		                        <form className="pop-form" id="edit_education">
																		                          	<div className="form-group row">
																		                            	<div className="col-sm-3 text-center"></div>
																		                            	<div className="col-sm-6 text-center">
																		                              		<button type="button" className="blue_btn_box add_staff_btn mt-5 mr-2" onClick={e => this.modalDeleteConfirmClose(e)}> No</button>
																		                              		<button type="button" className="blue_btn_box add_staff_btn mt-5" onClick={() => this.modalDeleteDepartment(this.state.department_id)}>Yes</button>
																		                            	</div>
																		                            	<div className="col-sm-3 text-center"></div>
																		                          	</div>
																		                        </form>
                      																		</div>
                    																	</Modal>
							                                                        </tr>
							                                                    );
							                                                })
                  														:
                  														<tr><td colSpan="6" className="font_12 txt_col fontweight400 " style={{"textAlign": "center"}}> There are currently no Departments.</td></tr>
		                                                        	}
		                                                        </tbody>
		                                                    </table>
		                                                    { 
													            pageNumbers.length > 1 
													            ?
													              <Pagination
													                activePage={this.state.activePage}
													                totalItemsCount={this.state.total}
													                pageRangeDisplayed={5}
													                onChange={this.handlePageChange.bind(this)}
													              />
													            : ''
          													}
		                                                </div>
		                                            </div>
		                                        </div>
		                                    </div>
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
export default Departments;
