import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Modal from './DeleteConfirmModalPopup';

const getallpublications = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/publications/getallpublications', {
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
const getSearchPublications = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/publications/adminsearchpublications', {
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
const deletepublication = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/publications/deletepublications', {
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
class Publications extends Component {
	state = {
		publications: [],
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
		publications_id:'',
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
	      publications_id: id,
	    });
  	}
    modalDeletePublication(id){
	    const data = {
            publications_id: id
	    }
	    deletepublication(data)
	    .then(res => {
	      	if(res.status === true){
		        toast.success(res.message, {
		          position: toast.POSITION.TOP_RIGHT
		        });
		        setTimeout(function(){ 
                    window.location.href = '/publications';
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
	refreshPublication = (page) => {
	  	this.setState({ enableShdo: true, });
		const data = {
		    page: page,
		}
        getallpublications(data)
      	.then(res => {
        	if(res.status===true){
          		var records = res.data.data;
          		this.setState({ publications: records });
          		//this.setState({ total: res.total });
          		/*this.setState({ currentPage: res.success.current_page });
          		this.setState({ PerPage: res.success.per_page });
          		this.setState({ FirstPageUrl: res.success.first_page_url });
          		this.setState({ NextPageUrl: res.success.next_page_url });
          		this.setState({ PrevPageUrl: res.success.prev_page_url });
          		this.setState({ LastPageUrl: res.success.last_page_url });
          		this.setState({ LastPage: res.success.last_page });
          		this.setState({ TotalPages: Math.ceil(this.state.total / this.state.PerPage) });*/
        	} else {
          		this.setState({ publications: '' });
        	}
        	this.setState({ enableShdo: false, });
      	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    SearchPublications = (e) =>{
        const data = {
            keywords: this.state.search_keywords
        }
        getSearchPublications(data)
        .then(res => {
            if(res.status===true){
                var records = res.data.data;
                this.setState({ publications: records });
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
                this.setState({ publications: '' });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount() {
    	this.refreshPublication();
  	} 
  	render() {
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
                            <div className="row page-content-wrapper">
                            	<div className="col-sm-7"></div>
                            	<div className="col-sm-3 text-right">
                                    <input type="text" className="form-control" name="search_keywords" id="search_keywords" value={this.state.search_keywords} onChange={this.handleChange} onBlur={this.SearchPublications} placeholder="Search"/>
                                </div>
								<div className="col-sm-12 mb-4 text-right">
					                <a href="/addpublication" className="btn btn-sm btn-primary waves-effect waves-light">Add Publication</a>
					            </div>
                                <div className="col-lg-12">
                                    <div className="card m-b-20">
                                        <div className="card-body">
                                            <section class="view-page">
                                                <div className="container">
                                                    <div className="view-page-box">
                                                        <hr/>
                                                        <div className="row">
            												{ this.state.publications.length > 0
            													?
            														this.state.publications.map(publication => {
            															return ( 
            																<div className="col-lg-4">
            																    <div className="news-part-event">
            																        <img src={IMAGE_URL+'/PublicationsImg/'+publication.publications_pic} alt="" width="100%"/>
            																        <div className='newdata position-relative'>
            																            <div className="row">
            																	            <div className="col-lg-10">
            																                    <h3 className="d-inline" title={publication.doctor_name} style={{"fontSize":"18px"}}>{publication.doctor_name}</h3>
                                                                                            </div>
            																            </div>
                                                                                        <h4 title={publication.publications_title} style={{"fontSize":"16px"}}>{publication.publications_title.substr(0,70)}</h4>
            																            <h5 className="float-end position-absolute mt-2 top-0 end-0">
                                                                                            <a href={'/editpublication/'+publication.id}><i className="fa fa-pencil-square mx-2 display-4"></i></a>
            																                <a href={'/viewpublication/'+publication.id}><i className="fa fa-eye"></i></a>
                                                                                            <a onClick={(e) => this.modalDeleteConfirmOpen(e, publication.id)}><i className="fa fa-trash"></i></a>
                                                                                        </h5>
            																        </div>
            																        <p dangerouslySetInnerHTML={{__html: publication.publications_desc ? publication.publications_desc.substr(0, 180) : ''}}></p>
            																    </div>
                                                                                <Modal show={this.state.modalDeleteConfirm} handleClose={e => this.modalDeleteConfirmClose(e)}>
                																	<div className="custom_reviews_popup">
                																		<h2 className="text-center">Are you sure you to delete this publication?</h2>
                																		<form className="pop-form" id="edit_education">
                																			<div className="form-group row">
                																				<div className="col-sm-3 text-center"></div>
                																				<div className="col-sm-6 text-center">
                																					<button type="button" className="blue_btn_box add_staff_btn mt-5 mr-2" onClick={e => this.modalDeleteConfirmClose(e)}> No</button>
                																					<button type="button" className="blue_btn_box add_staff_btn mt-5" onClick={() => this.modalDeletePublication(this.state.publications_id)}>Yes</button>
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
export default Publications;
