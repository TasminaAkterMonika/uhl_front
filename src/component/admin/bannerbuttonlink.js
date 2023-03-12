import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, SITE_URL, IMAGE_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
//import Pagination from "react-js-pagination";
import Modal from './DeleteConfirmModalPopup';

const getAllBannerButtonLinkData = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/bannerbutton/getallbannerbtndata', {
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
/*const getSearchBannerButtonLink = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/bannerbutton/adminsearchbannerbtnlink', {
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
}*/
const deleteBannerButtonLink = (data) => {
	return new Promise((resolve, reject) => {
		const req = scAxiosAdmin.request('/bannerbutton/deletebannerbtnlink', {
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
class BannerButtonLink extends Component {
	state = {
		bannerbtnlink: [],
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
		bannerbtnlink_id:'',
        search_keywords:'',
        modalDeleteConfirm:false,
	}
	handleChange = (events) =>{
		this.setState({
            [event.target.name]: event.target.value
        });
	}
	/*handlePageChange(pageNumber) {
    	this.setState({ activePage: pageNumber });
    	this.refreshBannerButtonLink(pageNumber);
  	}*/
	modalDeleteConfirmOpen(e, id) {
	    this.setState({ 
	      modalDeleteConfirm: true,
	      doctor_id: id,
	    });
  	}
  	modalDeleteConfirmClose() {
	    this.setState({
	      modalDeleteConfirm: false
	    });
  	}
	modalDeleteBannerButtonLink(id){
	    this.setState({
	      modalDeleteConfirm: false
	    });
	    const data = {
			bannerbtnlink_id: id
	    }
	    deleteBannerButtonLink(data)
	    .then(res => {
	      	if(res.status === true){
		        toast.success(res.message, {
		          position: toast.POSITION.TOP_RIGHT
		        });
		        setTimeout(function(){ 
                    window.location.href = '/bannerbuttonlink';
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
	refreshBannerButtonLink = (page) => {
	  	this.setState({ enableShdo: true, });
		const data = {
		    page: page,
		}
  		getAllBannerButtonLinkData(data)
      	.then(res => {
        	if(res.status===true){
          		var records = res.data;
          		this.setState({ bannerbtnlink: records });
          		/*this.setState({ total: res.data.total });
          		this.setState({ currentPage: res.data.current_page });
          		this.setState({ PerPage: res.data.per_page });
          		this.setState({ FirstPageUrl: res.data.first_page_url });
          		this.setState({ NextPageUrl: res.data.next_page_url });
          		this.setState({ PrevPageUrl: res.data.prev_page_url });
          		this.setState({ LastPageUrl: res.data.last_page_url });
          		this.setState({ LastPage: res.data.last_page });
          		this.setState({ TotalPages: Math.ceil(this.state.total / this.state.PerPage) });*/
        	} else {
          		this.setState({ bannerbtnlink: '' });
        	}
      	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    /*SearchBannerButtonLink = (e) =>{
    	const data = {
    		keywords: this.state.search_keywords
    	}
    	getSearchBannerButtonLink(data)
    	.then(res => {
    		if(res.status===true){
          		var records = res.data.data;
          		this.setState({ bannerbtnlink: records });
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
          		this.setState({ bannerbtnlink: '' });
        	}
    	})
      	.catch(err => {
          	console.log(err);
      	});
    }*/
    refreshBannerButtonLink = (page) => {
	  	this.setState({ enableShdo: true, });
		const data = {
		    page: page,
		}
  		getAllBannerButtonLinkData(data)
      	.then(res => {
        	if(res.status===true){
          		var records = res.data;
          		this.setState({ bannerbtnlink: records });
          		/*this.setState({ total: res.data.total });
          		this.setState({ currentPage: res.data.current_page });
          		this.setState({ PerPage: res.data.per_page });
          		this.setState({ FirstPageUrl: res.data.first_page_url });
          		this.setState({ NextPageUrl: res.data.next_page_url });
          		this.setState({ PrevPageUrl: res.data.prev_page_url });
          		this.setState({ LastPageUrl: res.data.last_page_url });
          		this.setState({ LastPage: res.data.last_page });
          		this.setState({ TotalPages: Math.ceil(this.state.total / this.state.PerPage) });*/
        	} else {
          		this.setState({ bannerbtnlink: '' });
        	}
      	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    componentDidMount() {
    	this.refreshBannerButtonLink();
  	} 
  	render() {
  		//const currentPage = this.state.currentPage;
		//const previousPage = currentPage - 1;
		//const NextPage = currentPage + 1;
		//const LastPage = this.state.LastPage;
		/*const pageNumbers = [];
		for (let i = 1; i <= this.state.TotalPages; i++) {
		    pageNumbers.push(i);
		}*/
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
				                                            <h4 className="mt-0 header-title">Banner Button Link</h4>
				                                        </div>
				                                        <div className="col-sm-3 text-right">
				                                            {/*<input type="text" className="form-control" name="search_keywords" id="search_keywords" value={this.state.search_keywords} onChange={this.handleChange} onBlur={this.SearchBannerButtonLink} placeholder="Search"/>*/}
				                                        </div>
				                                        {this.state.bannerbtnlink.length < 8
				                                        	?
				                                        		<div className="col-sm-2 text-right">
				                                        			<a href="/addbannerbuttonlink" className="btn btn-sm btn-primary waves-effect waves-light">Add Banner Button Link</a>
				                                        		</div>	
				                                        	:
				                                        		''
				                                        }
				                                    </div>
		                                            <div className="table-rep-plugin">
		                                                <div className="table-responsive b-0" data-pattern="priority-columns">
		                                                    <table id="tech-companies-1" className="table  table-striped">
		                                                        <thead>
			                                                        <tr>
			                                                            <th>Banner Button ID</th>
			                                                            <th>Banner Button Icon</th>
			                                                            <th data-priority="1">Banner Button Text</th>
			                                                            <th data-priority="4">Banner Button Link</th>
			                                                            <th data-priority="3">Action</th>
			                                                        </tr>
		                                                        </thead>
		                                                        <tbody>
		                                                        	{ this.state.bannerbtnlink.length > 0
                  														?
	                  														this.state.bannerbtnlink.map(bannerbtndata => {
						                                                        return ( 
							                                                        <tr key={bannerbtndata.id}>
							                                                            <td>#{bannerbtndata.id}</td>
							                                                            <td>
							                                                            	{
							                                                            		bannerbtndata.banner_btn_icon
							                                                            		?
							                                                            			<img src={IMAGE_URL+'BannerButtonImg/'+bannerbtndata.banner_btn_icon} alt="avtar" style={{"width":"50px", "height":"50px", "border-radius":"30px"}}/>
							                                                            		:
							                                                            			<i className="fa-solid fa-circle-right"></i>
							                                                            	}
							                                                            </td>
							                                                            <td>{bannerbtndata.banner_btn_text}</td>
							                                                            <td>{SITE_URL+'/pages/'+bannerbtndata.slug}</td>
							                                                            <td>
							                                                            	<a href={'/editbannerbuttonlink/'+bannerbtndata.id}><i className="fa fa-pencil-square"></i></a>
							                                                            	{/*<a href="#"><i className="fa fa-eye"></i></a>*/}
																							<a onClick={(e) => this.modalDeleteConfirmOpen(e, bannerbtndata.id)}><i className="fa fa-trash"></i></a>
							                                                            </td>
																						<Modal show={this.state.modalDeleteConfirm} handleClose={e => this.modalDeleteConfirmClose(e)}>
                      																		<div className="custom_reviews_popup">
                        																		<h2 className="text-center">Are you sure you wish to delete this Banner Button ?</h2>
																		                        <form className="pop-form" id="edit_education">
																		                          	<div className="form-group row">
																		                            	<div className="col-sm-3 text-center"></div>
																		                            	<div className="col-sm-6 text-center">
																		                              		<button type="button" className="blue_btn_box add_staff_btn mt-5 mr-2" onClick={e => this.modalDeleteConfirmClose(e)}> No</button>
																		                              		<button type="button" className="blue_btn_box add_staff_btn mt-5" onClick={() => this.modalDeleteBannerButtonLink(bannerbtndata.id)}>Yes</button>
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
                  														<tr><td colSpan="6" className="font_12 txt_col fontweight400 " style={{"textAlign": "center"}}> There are currently no Doctors.</td></tr>
		                                                        	}
		                                                        </tbody>
		                                                    </table>
		                                                    {/*{ 
													            pageNumbers.length > 1 
													            ?
													              <Pagination
													                activePage={this.state.activePage}
													                totalItemsCount={this.state.total}
													                pageRangeDisplayed={5}
													                onChange={this.handlePageChange.bind(this)}
													              />
													            : ''
          													}*/}
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
export default BannerButtonLink;
