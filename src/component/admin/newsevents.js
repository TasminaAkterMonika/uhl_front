import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Modal from './DeleteConfirmModalPopup';

const getAllNewsEvents = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/newsevents/getallnewsevents', {
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
const getSearchNewsEvents = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/newsevents/adminsearchnewsevents', {
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
const deletenewsevent = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/newsevents/deletenewsevents', {
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
class NewsEvents extends Component {
	state = {
		newsevents: [],
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
		newsevent_id:'',
		search_keywords:'',
	}
	handleChange = (events) =>{
		this.setState({
            [event.target.name]: event.target.value
        });
	}
	handlePageChange(pageNumber) {
    	this.setState({ activePage: pageNumber });
    	this.refreshNewsEvents(pageNumber);
  	}
	modalDeleteConfirmOpen(e, id) {
	    this.setState({ 
	      modalDeleteConfirm: true,
	      newsevent_id: id,
	    });
  	}
	modalDeleteNewsEvent(id){
	    const data = {
            newsevent_id: id
	    }
	    deletenewsevent(data)
	    .then(res => {
	      	if(res.status === true){
		        toast.success(res.message, {
		          position: toast.POSITION.TOP_RIGHT
		        });
		        setTimeout(function(){ 
                    window.location.href = '/newsevents';
                }, 3000);
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
     modalDeleteConfirmClose() {
	    this.setState({
	      modalDeleteConfirm: false
	    });
  	}
	refreshNewsEvents = (page) => {
	  	this.setState({ enableShdo: true, });
		const data = {
		    page: page,
		}
  		getAllNewsEvents(data)
      	.then(res => {
        	if(res.status===true){
          		var records = res.data.data;
          		this.setState({ newsevents: records });
          		this.setState({ total: res.total });
          		this.setState({ currentPage: res.data.current_page });
          		this.setState({ PerPage: res.data.per_page });
          		this.setState({ FirstPageUrl: res.data.first_page_url });
          		this.setState({ NextPageUrl: res.data.next_page_url });
          		this.setState({ PrevPageUrl: res.data.prev_page_url });
          		this.setState({ LastPageUrl: res.data.last_page_url });
          		this.setState({ LastPage: res.data.last_page });
          		this.setState({ TotalPages: Math.ceil(this.state.total / this.state.PerPage) });
        	} else {
          		this.setState({ newsevents: '' });
        	}
        	this.setState({ enableShdo: false, });
      	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    SearchNewsEvents = (e) =>{
    	const data = {
    		keywords: this.state.search_keywords
    	}
    	getSearchNewsEvents(data)
    	.then(res => {
    		if(res.status===true){
          		var records = res.data.data;
          		this.setState({ newsevents: records });
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
          		this.setState({ newsevents: '' });
        	}
    	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    componentDidMount() {
    	this.refreshNewsEvents();
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
                            <div className="row page-content-wrapper">
                            	<div className="col-sm-7">
                            	</div>
                            	<div className="col-sm-3 text-right">
                                    <input type="text" className="form-control" name="search_keywords" id="search_keywords" value={this.state.search_keywords} onChange={this.handleChange} onBlur={this.SearchNewsEvents} placeholder="Search"/>
                                </div>
								<div className="col-sm-2 mb-4 text-right">
					                <a href="/addnewsevent" className="btn btn-sm btn-primary waves-effect waves-light">Add News Event</a>
					            </div>
                                <div className="col-lg-12">
                                    <div className="card m-b-20">
                                        <div className="card-body">
                                            <section class="view-page">
                                                <div className="container">
                                                	<div className="view-page-box">
                                                   		<hr/>
                                                   		<div className="row">
															{ this.state.newsevents.length > 0
																?
																	this.state.newsevents.map(newsevent => {
																		return ( 
																			<div className="col-lg-4">
																				<div className="news-part-event">
																					<img src={IMAGE_URL+'/NewsEventsImg/'+newsevent.news_events_pic} alt="" width="100%"/>
																					<div className='newdata position-relative'>
																						<div className="row">
																							<div className="col-lg-10">
																								<h3 className="d-inline" style={{"fontSize":"18px"}} title={newsevent.news_events_title}>{newsevent.news_events_title ? newsevent.news_events_title.substr(0,50)+'...' : ''}</h3>
																							</div>
																						</div>
																						<h5 className="float-end position-absolute mt-2 top-0 end-0">
																							<a href={'/editnewsevent/'+newsevent.id}><i className="fa fa-pencil-square mx-2 display-4"></i></a>
																							<a href={'/viewnewsevent/'+newsevent.id}><i className="fa fa-eye"></i></a>
																							<a onClick={(e) => this.modalDeleteConfirmOpen(e, newsevent.id)}><i className="fa fa-trash"></i></a>
																						</h5>
																					</div>
																					<p dangerouslySetInnerHTML={{ __html: newsevent.news_events_desc ? newsevent.news_events_desc.substr(0, 170) : '' }}></p>
																				</div>           
																				<Modal show={this.state.modalDeleteConfirm} handleClose={e => this.modalDeleteConfirmClose(e)}>
																					<div className="custom_reviews_popup">
																						<h2 className="text-center">Are you sure you to delete this news event ?</h2>
																						<form className="pop-form" id="edit_education">
																							<div className="form-group row">
																								<div className="col-sm-3 text-center"></div>
																								<div className="col-sm-6 text-center">
																									<button type="button" className="blue_btn_box add_staff_btn mt-5 mr-2" onClick={e => this.modalDeleteConfirmClose(e)}> No</button>
																									<button type="button" className="blue_btn_box add_staff_btn mt-5" onClick={() => this.modalDeleteNewsEvent(this.state.newsevent_id)}>Yes</button>
																								</div>
																								<div className="col-sm-3 text-center"></div>
																							</div>
																						</form>
																					</div>
																				</Modal>
																		   	</div>	
																		);
																	})
																:
																	<div colspan="6" className="font_12 txt_col fontweight400 " style={{"text-align": "center"}}> There are currently no News Events.</div>
															}
                                                		</div>
                                                		<br/>
                                                	</div>
                                              	</div>
                                            </section>
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
export default NewsEvents;
