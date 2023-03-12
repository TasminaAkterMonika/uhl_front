import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, WEBSITEPAGE_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Pagination from "react-js-pagination";
import Modal from './DeleteConfirmModalPopup';
import $ from 'jquery';

const GetAllMenu = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/menu/getallmenu', {
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
const getSearchMenu = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/menu/adminsearchmenu', {
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
const deleteMenu = (data) => {
	return new Promise((resolve, reject) => {
		const req = scAxiosAdmin.request('/menu/deletemenu', {
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
class menu extends Component {
	state = {
		menu: [],
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
		menu_id:'',
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
	      menu_id: id,
	    });
  	}
  	modalDeleteConfirmClose() {
	    this.setState({
	      modalDeleteConfirm: false
	    });
  	}
    modalDeleteMenu(id){
	    this.setState({
	      modalDeleteConfirm: false
	    });
	    const data = {
			menu_id: id
	    }
	    deleteMenu(data)
	    .then(res => {
	      	if(res.status === true){
		        toast.success(res.message, {
		          position: toast.POSITION.TOP_RIGHT
		        });
		        setTimeout(function(){ 
                    window.location.href = '/menu';
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
    refreshStaticMenu = (page) => {
	  	this.setState({ enableShdo: true, });
		const data = {
		    page: page,
		}
        GetAllMenu(data)
      	.then(res => {
        	if(res.status===true){
          		var records = res.data.data;
          		this.setState({ menu: records });
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
          		this.setState({ menu: '' });
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
    	getSearchMenu(data)
    	.then(res => {
    		if(res.status===true){
          		var records = res.data.data;
          		this.setState({ menu: records });
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
          		this.setState({ menu: '' });
        	}
    	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    modalcopy = (e, id,url) => {
		var $temp = $("<input>");
		var $url = url+id;
		$("body").append($temp);
		$temp.val($url).select();
		document.execCommand("copy");
		$temp.remove();
		alert("url link copied");
	}
    componentDidMount() {
    	this.refreshStaticMenu();
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
				                                            <h4 className="mt-0 header-title">Header Menu</h4>
				                                        </div>
				                                        <div className="col-sm-3 text-right">
				                                            <input type="text" className="form-control" name="search_keywords" id="search_keywords" value={this.state.search_keywords} onChange={this.handleChange} onBlur={this.SearchDocotrs} placeholder="Search"/>
				                                        </div>
				                                        <div className="col-sm-2 text-right">
				                                        	<a href="/addmenu" className="btn btn-sm btn-primary waves-effect waves-light">Add Menu</a>
				                                        </div>
				                                    </div>
		                                            <div className="table-rep-plugin">
		                                                <div className="table-responsive b-0" data-pattern="priority-columns">
		                                                    <table id="tech-companies-1" className="table  table-striped">
		                                                        <thead>
			                                                        <tr>
			                                                            <th>Menu ID</th>
                                                                        <th>Menu Title</th>
			                                                            <th data-priority="1">Url</th>
                                                                        <th data-priority="1">status</th>
			                                                            <th data-priority="3">Action</th>
			                                                        </tr>
		                                                        </thead>
		                                                        <tbody>
		                                                        	{ this.state.menu.length > 0
                  														?
                                                                            this.state.menu.map(hmenu => {
						                                                        return ( 
							                                                        <tr key={hmenu.id}>
							                                                            <td>#{hmenu.id}</td>
							                                                            <td>{hmenu.title}</td>
							                                                            <td>{WEBSITEPAGE_URL+hmenu.slug}</td>
                                                                                        <td>{hmenu.current_status.charAt(0).toUpperCase() + hmenu.current_status.slice(1)}</td>
																						{hmenu.title !== 'Book Appointment' && hmenu.title !== 'Packages' 
																							? 
																								<td>
																									<a onClick={(e) => this.modalcopy(e, hmenu.slug,WEBSITEPAGE_URL)}><i className="fa fa-copy"></i></a>
																									<a href={'/editmenu/'+hmenu.slug}><i className="fa fa-pencil-square"></i></a>
																									<a onClick={(e) => this.modalDeleteConfirmOpen(e, hmenu.id)}><i className="fa fa-trash"></i></a>
																								</td>
																							: 
																								hmenu.title === 'Packages'
																								?
																									<td>
																										<a href={'/editmenu/'+hmenu.slug}><i className="fa fa-pencil-square"></i></a>
																									</td>
																								:
																									<td></td> 
																						}
																						<Modal show={this.state.modalDeleteConfirm} handleClose={e => this.modalDeleteConfirmClose(e)}>
                      																		<div className="custom_reviews_popup">
                        																		<h2 className="text-center">Are you sure you wish to delete this menu?</h2>
																		                        <form className="pop-form" id="edit_education">
																		                          	<div className="form-group row">
																		                            	<div className="col-sm-3 text-center"></div>
																		                            	<div className="col-sm-6 text-center">
																		                              		<button type="button" className="blue_btn_box add_staff_btn mt-5 mr-2" onClick={e => this.modalDeleteConfirmClose(e)}> No</button>
																		                              		<button type="button" className="blue_btn_box add_staff_btn mt-5" onClick={() => this.modalDeleteMenu(this.state.menu_id)}>Yes</button>
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
                  														<tr><td colSpan="6" className="font_12 txt_col fontweight400 " style={{"textAlign": "center"}}> No menu data found.</td></tr>
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
export default menu;
