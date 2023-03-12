import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Pagination from "react-js-pagination";
import Modal from './DeleteConfirmModalPopup';

const GetAllPackages = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/packages/getallpackages', {
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
const getSearchPackage = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/packages/adminsearchPackage', {
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
const deletePackage = (data) => {
	return new Promise((resolve, reject) => {
		const req = scAxiosAdmin.request('/packages/deletepackage', {
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
class Packages extends Component {
	state = {
		packages: [],
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
		package_id:'',
        enableShdo: false,
        enableShdoLive: false,
        search_keywords:'',
	}
	handleChange = (events) =>{
		this.setState({
            [event.target.name]: event.target.value
        });
	}
	handlePageChange(pageNumber) {
    	this.setState({ activePage: pageNumber });
    	this.refreshPackages(pageNumber);
  	}
	modalDeleteConfirmOpen(e, id) {
	    this.setState({ 
	      modalDeleteConfirm: true,
	      package_id: id,
	    });
  	}
  	modalDeleteConfirmClose() {
	    this.setState({
	      modalDeleteConfirm: false
	    });
  	}
	modalDeletePackage(id){
	    this.setState({
	      modalDeleteConfirm: false
	    });
	    const data = {
			package_id: id
	    }
	    deletePackage(data)
	    .then(res => {
	      	if(res.status === true){
		        toast.success(res.message, {
		          position: toast.POSITION.TOP_RIGHT
		        });
		        setTimeout(function(){ 
                    window.location.href = '/packages';
                }, 6000);
	      	} else {
		        toast.error(res.message, {
		          position: toast.POSITION.BOTTOM_RIGHT
		        });
	      	}
	    })
	    .catch(err => {
	        console.log(err);
	    });
  	}
	refreshPackages = (page) => {
	  	this.setState({ enableShdo: true, });
		const data = {
		    page: page,
		}
        GetAllPackages(data)
      	.then(res => {
        	if(res.status===true){
          		var records = res.data.data;
          		this.setState({ packages: records });
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
          		this.setState({ packages: '' });
        	}
        	this.setState({ enableShdo: false, });
      	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    SearchDocotrs = (e) =>{
    	const data = {
    		keywords: this.state.search_keywords
    	}
    	getSearchPackage(data)
    	.then(res => {
    		if(res.status===true){
          		var records = res.data.data;
          		this.setState({ packages: records });
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
          		this.setState({ packages: '' });
        	}
    	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    componentDidMount() {
    	this.refreshPackages();
  	} 
  	render() {
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
				                                            <h4 className="mt-0 header-title">Packages</h4>
				                                        </div>
				                                        <div className="col-sm-3 text-right">
				                                            <input type="text" className="form-control" name="search_keywords" id="search_keywords" value={this.state.search_keywords} onChange={this.handleChange} onBlur={this.SearchDocotrs} placeholder="Search"/>
				                                        </div>
				                                        <div className="col-sm-2 text-right">
				                                        	<a href="/addpackage" className="btn btn-sm btn-primary waves-effect waves-light">Add Package</a>
				                                        </div>
				                                    </div>
		                                            <div className="table-rep-plugin">
		                                                <div className="table-responsive b-0" data-pattern="priority-columns">
		                                                    <table id="tech-companies-1" className="table  table-striped">
		                                                        <thead>
			                                                        <tr>
			                                                            <th>Package ID</th>
			                                                          
			                                                            <th data-priority="1">Package Name</th>
			                                                            <th data-priority="4">Department</th>
																		<th>Age Range</th>
																		<th>Gender</th>
			                                                            <th data-priority="3">Action</th>
			                                                        </tr>
		                                                        </thead>
		                                                        <tbody>
		                                                        	{ this.state.packages.length > 0
                  														?
	                  														this.state.packages.map(cpackage => {
						                                                        return ( 
							                                                        <tr key={cpackage.id}>
							                                                            <td>#{cpackage.id}</td>
							                                                            
							                                                            <td>{cpackage.name}</td>
							                                                            
							                                                            <td>{cpackage.department_name}</td>
																						<td>{cpackage.age}</td>
																						<td>{cpackage.gender}</td>
                                                                                        
							                                                            <td>
							                                                            	<a href={'/editpackage/'+cpackage.id}><i className="fa fa-pencil-square"></i></a>
							                                                            	<a href={'/viewpackage/'+cpackage.id}><i className="fa fa-eye"></i></a>
																							<a onClick={(e) => this.modalDeleteConfirmOpen(e, cpackage.id)}><i className="fa fa-trash"></i></a>
							                                                            </td>
																						<Modal show={this.state.modalDeleteConfirm} handleClose={e => this.modalDeleteConfirmClose(e)}>
                      																		<div className="custom_reviews_popup">
                        																		<h2 className="text-center">Are you sure you wish to delete this package ?</h2>
																		                        <form className="pop-form" id="edit_education">
																		                          	<div className="form-group row">
																		                            	<div className="col-sm-3 text-center"></div>
																		                            	<div className="col-sm-6 text-center">
																		                              		<button type="button" className="blue_btn_box add_staff_btn mt-5 mr-2" onClick={e => this.modalDeleteConfirmClose(e)}> No</button>
																		                              		<button type="button" className="blue_btn_box add_staff_btn mt-5" onClick={() => this.modalDeletePackage(this.state.package_id)}>Yes</button>
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
                  														<tr><td colSpan="6" className="font_12 txt_col fontweight400 " style={{"textAlign": "center"}}> There are currently no Packages.</td></tr>
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
export default Packages;
