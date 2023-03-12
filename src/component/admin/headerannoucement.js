import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
//import { startUserSession } from '../../userSession';
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
//import Footer from '../../component/admin/Footer';
//import Moment from 'moment';
import Pagination from "react-js-pagination";
import Avatar from '../../images/avatar_circle.png';
import Modal from './DeleteConfirmModalPopup';

const getAllHeaderAnnoucement = (data) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/headerannoucement/getallheaderannoucement', {
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
class HeaderAnnoucement extends Component {
	state = {
		headerannoucement: [],
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
		id:'',
        enableShdo: false,
        enableShdoLive: false,
	}
	handleChange = (events) =>{
		this.setState({
            [event.target.name]: event.target.value
        });
	}
	handlePageChange(pageNumber) {
    	this.setState({ activePage: pageNumber });
    	this.refreshHeaderAnnoucement(pageNumber);
  	}
	refreshHeaderAnnoucement = (page) => {
	  	this.setState({ enableShdo: true, });
		const data = {
		    page: page,
		}
  		getAllHeaderAnnoucement(data)
      	.then(res => {
        	if(res.status===true){
          		var records = res.data.data;
          		this.setState({ headerannoucement: records });
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
          		this.setState({ doctors: '' });
        	}
        	this.setState({ enableShdo: false, });
      	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    componentDidMount() {
    	this.refreshHeaderAnnoucement();
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
				                                            <h4 className="mt-0 header-title">Header Annoucement</h4>
				                                        </div>
				                                        <div className="col-sm-3 text-right"></div>
				                                        {/*<div className="col-sm-2 text-right">
				                                        	<a href="/addheaderannoucement" className="btn btn-sm btn-primary waves-effect waves-light">Add Doctor</a>
				                                        </div>*/}
				                                    </div>
		                                            <div className="table-rep-plugin">
		                                                <div className="table-responsive b-0" data-pattern="priority-columns">
		                                                    <table id="tech-companies-1" className="table  table-striped">
		                                                        <thead>
			                                                        <tr>
			                                                            <th>Id</th>
			                                                            <th>Header Annoucement Text</th>
			                                                            <th>Header Annoucement Link</th>
			                                                            <th>Header Phone No.</th>
			                                                            <th>Action</th>
			                                                        </tr>
		                                                        </thead>
		                                                        <tbody>
		                                                        	{ this.state.headerannoucement.length > 0
                  														?
	                  														this.state.headerannoucement.map(header_annoucement => {
						                                                        return ( 
							                                                        <tr key={header_annoucement.id}>
							                                                            <td>{header_annoucement.id}</td>
							                                                            <td>{header_annoucement.header_annoucement_text}</td>
							                                                            <td>{header_annoucement.header_annoucement_link}</td>
							                                                            <td>{header_annoucement.header_phone_no}</td>
							                                                            <td>
							                                                            	<a href={'/editheaderannoucement/'+header_annoucement.id}><i className="fa fa-pencil-square"></i></a>
							                                                            </td>
							                                                        </tr>
							                                                    );
							                                                })
                  														:
                  														<tr><td colSpan="6" className="font_12 txt_col fontweight400 " style={{"textAlign": "center"}}> There are currently no Header Annoucement.</td></tr>
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
export default HeaderAnnoucement;
