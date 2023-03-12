import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Pagination from "react-js-pagination";
import Avatar from '../../images/avatar_circle.png';
import Modal from './DeleteConfirmModalPopup';

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
const getSearchStaticPage = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/staticpages/adminsearchstaticpage', {
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
		const req = scAxiosAdmin.request('/staticpages/deletestaticpages', {
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
class staticpages extends Component {
	state = {
		staticpages: [],
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
		staticpage_id:'',
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
	      staticpage_id: id,
	    });
  	}
  	modalDeleteConfirmClose() {
	    this.setState({
	      modalDeleteConfirm: false
	    });
  	}
	modalDeletePackage(id){
	    /*this.setState({ 
	      selectedPost: i,
	    });*/
	    this.setState({
	      modalDeleteConfirm: false
	    });
	    const data = {
			staticpage_id: id
	    }
	    deletePackage(data)
	    .then(res => {
	      	if(res.status === true){
		        toast.success(res.message, {
		          position: toast.POSITION.TOP_RIGHT
		        });
		        setTimeout(function(){ 
                    window.location.href = '/staticpages';
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
	refreshStaticPages = (page) => {
	  	this.setState({ enableShdo: true, });
		const data = {
		    page: page,
		}
        GetAllStaticPages(data)
      	.then(res => {
        	if(res.status===true){
          		var records = res.data.data;
          		this.setState({ staticpages: records });
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
          		this.setState({ staticpages: '' });
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
    	getSearchStaticPage(data)
    	.then(res => {
    		if(res.status===true){
          		var records = res.data.data;
          		this.setState({ staticpages: records });
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
          		this.setState({ staticpages: '' });
        	}
    	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    componentDidMount() {
    	this.refreshStaticPages();
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
				                                            <h4 className="mt-0 header-title">Static Pages</h4>
				                                        </div>
				                                        <div className="col-sm-3 text-right">
				                                            <input type="text" className="form-control" name="search_keywords" id="search_keywords" value={this.state.search_keywords} onChange={this.handleChange} onBlur={this.SearchDocotrs} placeholder="Search"/>
				                                        </div>
				                                        <div className="col-sm-2 text-right">
				                                        	<a href="/addstaticpage" className="btn btn-sm btn-primary waves-effect waves-light">Add Static Page</a>
				                                        </div>
				                                    </div>
		                                            <div className="table-rep-plugin">
		                                                <div className="table-responsive b-0" data-pattern="priority-columns">
		                                                    <table id="tech-companies-1" className="table  table-striped">
		                                                        <thead>
			                                                        <tr>
			                                                            <th>Page ID</th>
                                                                        <th>Banner Image</th>
			                                                            <th data-priority="1">Title</th>
			                                                            <th data-priority="4">Description</th>
																		
			                                                            <th data-priority="3">Action</th>
			                                                        </tr>
		                                                        </thead>
		                                                        <tbody>
		                                                        	{ this.state.staticpages.length > 0
                  														?
	                  														this.state.staticpages.map(pages => {
						                                                        return ( 
							                                                        <tr key={pages.id}>
							                                                            <td>#{pages.id}</td>
                                                                                        <td>
							                                                            {
							                                                            	pages.image
							                                                            	?
							                                                            		<img src={IMAGE_URL+'StaticPages/'+pages.image} alt="avtar" style={{"width":"50px", "height":"50px", "border-radius":"30px"}}/>
							                                                            	:
							                                                            		<img src={Avatar} alt="avtar" width="50px"/>
							                                                            }
							                                                            </td>
							                                                            
							                                                            <td>{pages.title}</td>
							                                                            
							                                                            <td dangerouslySetInnerHTML={{ __html: pages.description.substring(0, 50) }}></td>
																						
                                                                                        
							                                                            <td>
							                                                            	<a href={'/editpage/'+pages.slug}><i className="fa fa-pencil-square"></i></a>
							                                                            	<a href={'/page/'+pages.slug}><i className="fa fa-eye"></i></a>
																							<a onClick={(e) => this.modalDeleteConfirmOpen(e, pages.id)}><i className="fa fa-trash"></i></a>
																							
							                                                            </td>
																						<Modal show={this.state.modalDeleteConfirm} handleClose={e => this.modalDeleteConfirmClose(e)}>
                      																		<div className="custom_reviews_popup">
                        																		<h2 className="text-center">Are you sure you wish to delete this static page ?</h2>
																		                        <form className="pop-form" id="edit_education">
																		                          	<div className="form-group row">
																		                            	<div className="col-sm-3 text-center"></div>
																		                            	<div className="col-sm-6 text-center">
																		                              		<button type="button" className="blue_btn_box add_staff_btn mt-5 mr-2" onClick={e => this.modalDeleteConfirmClose(e)}> No</button>
																		                              		<button type="button" className="blue_btn_box add_staff_btn mt-5" onClick={() => this.modalDeletePackage(this.state.staticpage_id)}>Yes</button>
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
                  														<tr><td colSpan="6" className="font_12 txt_col fontweight400 " style={{"textAlign": "center"}}> There are currently no Static Pages.</td></tr>
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
export default staticpages;
