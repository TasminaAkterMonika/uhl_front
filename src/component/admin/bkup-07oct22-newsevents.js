import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
//import { startUserSession } from '../../userSession';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
//import Footer from '../../component/admin/Footer';
//import Moment from 'moment';

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
	}
	handlePageChange(pageNumber) {
    	this.setState({ activePage: pageNumber });
    	this.refreshNewsEvents(pageNumber);
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
          		this.setState({ newsevents: '' });
        	}
        	this.setState({ enableShdo: false, });
      	})
      	.catch(err => {
          	console.log(err);
      	});
    }
    componentDidMount() {
    	this.refreshNewsEvents();
  	} 
  	render() {
  		/*const currentPage = this.state.currentPage;
  		const previousPage = currentPage - 1;
  		const NextPage = currentPage + 1;
  		const LastPage = this.state.LastPage;
  		const pageNumbers = [];
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
		                                            <h4 className="mt-0 header-title">News & Events</h4>
		                                            {/*<p className="text-muted m-b-30 font-14">This is an experimental awesome solution for responsive tables with complex data.</p>*/}
		                                            <div className="table-rep-plugin">
		                                                <div className="table-responsive b-0" data-pattern="priority-columns">
		                                                    <table id="tech-companies-1" className="table  table-striped">
		                                                        <thead>
			                                                        <tr>
			                                                            <th>ID</th>
			                                                            <th data-priority="1">NewsEvents Title</th>
			                                                            {/*<th data-priority="4">NewsEvents Description</th>*/}
			                                                            <th data-priority="4">NewsEvents Picture</th>
			                                                            <th data-priority="3">Action</th>
			                                                        </tr>
		                                                        </thead>
		                                                        <tbody>
		                                                        	{ this.state.newsevents.length > 0
                  														?
	                  														this.state.newsevents.map(newsevent => {
						                                                        return ( 
							                                                        <tr>
							                                                            <th>{newsevent.id}</th>
							                                                            <td>{newsevent.news_events_title}</td>
							                                                            {/*<td>{newsevent.news_events_desc.substr(0, 70)}</td>*/}
							                                                            <td><img src={IMAGE_URL+'/NewsEventsImg/'+newsevent.news_events_pic} alt="" width="100px"/></td>
							                                                            <td>
							                                                            	<a href="/editnewsevents"><i className="fa fa-pencil-square"></i></a>
							                                                            	<a href="/delete/"><i className="fa fa-trash"></i></a>
							                                                            </td>
							                                                        </tr>
							                                                    );
							                                                })
                  														:
                  														<tr><td colspan="6" className="font_12 txt_col fontweight400 " style={{"text-align": "center"}}> There are currently no News Events.</td></tr>
		                                                        	}
		                                                        </tbody>
		                                                    </table>
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
    		</div>
    	);
    }
}
export default NewsEvents;
