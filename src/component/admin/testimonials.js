import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Pagination from "react-js-pagination";
import Avatar from '../../images/avatar_circle.png';
import Modal from './DeleteConfirmModalPopup';

const getAllTestimonials = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/testimonials/getalltestimonials', {
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
const getSearchTestimonials = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/testimonials/adminsearchtestimonials', {
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
const deletetestimonials = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/testimonials/deletetestimonials', {
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
class Testimonials extends Component {
	state = {
		testimonials: [],
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
        testimonial_id:'',
        search_keywords:'',
	}
    handleChange = (events) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }
	handlePageChange(pageNumber) {
    	this.setState({ activePage: pageNumber });
    	this.refreshTestimonials(pageNumber);
  	}
    modalDeleteConfirmOpen(e, id) {
	    this.setState({ 
	      modalDeleteConfirm: true,
	      testimonial_id: id,
	    });
  	}
     modalDeleteConfirmClose() {
	    this.setState({
	      modalDeleteConfirm: false
	    });
  	}
  	modalDeleteTestimonials(id){
	    const data = {
            testimonial_id: id
	    }
	    deletetestimonials(data)
	    .then(res => {
	      	if(res.status === true){
		        toast.success(res.message, {
		          position: toast.POSITION.TOP_RIGHT
		        });
		        setTimeout(function(){ 
                    window.location.href = '/testimonials';
                }, 3000);
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
    refreshTestimonials = (page) => {
	  	this.setState({ enableShdo: true, });
		const data = {
		    page: page,
		}
        getAllTestimonials(data)
      	.then(res => {
        	if(res.status===true){
          		var records = res.data.data;
          		this.setState({ testimonials: records });
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
          		this.setState({ testimonials: '' });
        	}
        	this.setState({ enableShdo: false, });
      	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    SearchTestimonials = (e) =>{
        const data = {
            keywords: this.state.search_keywords
        }
        getSearchTestimonials(data)
        .then(res => {
            if(res.status===true){
                var records = res.data.data;
                this.setState({ testimonials: records });
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
                this.setState({ testimonials: '' });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount() {
    	this.refreshTestimonials();
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
                                    <input type="text" className="form-control" name="search_keywords" id="search_keywords" value={this.state.search_keywords} onChange={this.handleChange} onBlur={this.SearchTestimonials} placeholder="Search"/>
                                </div>
                                <div className="col-sm-2 mb-4 text-right">
    				                <a href="/addtestimonial" className="btn btn-sm btn-primary waves-effect waves-light">Add Testimonials</a>
    				            </div>
                                <div className="col-lg-12">
                                    <div className="card m-b-20">
                                        <div className="card-body">
                                            <section className="view-page">
                                                <div className="container">
                                                    <div className="view-page-box">
                                                        <h1 className="text-center">Testimonial</h1><br/>
                                                        { this.state.testimonials.length > 0
    														?
      														    this.state.testimonials.map(testimonial => {
        	                                                        return ( 
                                                                        <div className="row" style={{"margin-bottom":"20px","padding-bottom":"20px","border-bottom":"1px solid lightgray"}}>
                                                                            <div className="col-sm-1">
                                                                                <div className="view-img">
                                                                                    {/*{
                		                                                            	testimonial.author_profile_pic
                		                                                            	?
                		                                                            		<img src={IMAGE_URL+'AuthorProfileImg/'+testimonial.author_profile_pic} alt="avtars" style={{"width":"300px", "height":"250px", "border-radius":"30px"}}/>
                		                                                            	:
                		                                                            		<img src={Avatar} alt="avtars" width="50px"/>
                		                                                            }*/}
                                                                                    {
                                                                                        testimonial.doctor_profile
                                                                                        ?
                                                                                            <img src={IMAGE_URL+'DoctorProfileImg/'+testimonial.doctor_profile} alt="avtars" style={{"width":"50px", "height":"50px", "border-radius":"30px"}}/>
                                                                                        :
                                                                                            <img src={Avatar} alt="avtars" width="50px"/>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-11">
                                                                                <div className="view-text">
                                                                                    <h2 className="d-inline">{testimonial.author_name}</h2>
                                                                                    <h5 className="float-end"><a href={'/edittestimonial/'+testimonial.id}><i className="fa fa-pencil-square mx-2 display-4"></i></a>
                                                                                    <a href={'/viewtestimonial/'+testimonial.id}><i className="fa fa-eye"></i></a>
                                                                                    <a onClick={(e) => this.modalDeleteConfirmOpen(e, testimonial.id)}><i className="fa fa-trash"></i></a></h5>
                                                                                    <p><b>{testimonial.testimonial_name}</b></p>
                                                                                    <article className="box">
                                                                                        <div dangerouslySetInnerHTML={{__html:testimonial.testimonial_desc}}></div>
                                                                                    </article>  
                                                                                    <div id="star_print" className="start-icons">
                                                                                        <i className="fa-solid fa-star"></i>
                                                                                        <i className="fa-solid fa-star"></i>
                                                                                        <i className="fa-solid fa-star"></i>
                                                                                        <i className="fa-solid fa-star"></i>
                                                                                        <i className="fa-solid fa-star"></i>
                                                                                    </div> 
                                                                                </div>
                                                                            </div> 
                                                                            <Modal show={this.state.modalDeleteConfirm} handleClose={e => this.modalDeleteConfirmClose(e)}>
                                                                                <div className="custom_reviews_popup">
                                                                                    <h2 className="text-center">Are you sure you to delete this testimonials ?</h2>
                                                                                    <form className="pop-form" id="edit_education">
                                                                                        <div className="form-group row">
                                                                                            <div className="col-sm-3 text-center"></div>
                                                                                            <div className="col-sm-6 text-center">
                                                                                                <button type="button" className="blue_btn_box add_staff_btn mt-5 mr-2" onClick={e => this.modalDeleteConfirmClose(e)}> No</button>
                                                                                                <button type="button" className="blue_btn_box add_staff_btn mt-5" onClick={() => this.modalDeleteTestimonials(this.state.testimonial_id)}>Yes</button>
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
                                                                <div className="row">No Records found</div> 
    		                                            }
                                                    </div>
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
export default Testimonials;
