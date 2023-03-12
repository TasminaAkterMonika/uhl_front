import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME,IMAGE_URL } from '../../constants';
import LeftSidebar from './LeftSidebar';
import TopHeader from './TopHeader';
import Avatar from '../../images/avatar_circle.png';

const getsinglestaticpage = (id) => {
    return new Promise((resolve, reject) => {
        const req = scAxiosAdmin.request('/staticpages/getsinglestaticpage/'+id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
            }
        });
        req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
}
class page extends Component {
    state = {
        fields: {},
        errors: {},
        page_id: '', 
        page_description: '',
        page_title: '',
        page_image: '',
    }
    refreshgetsinglestaticpages = (id) => {
        getsinglestaticpage(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    page_id: records.id, 
                    page_title: records.title, 
                    page_description: records.description,
                    page_image: records.image, 
                });
            } else {
                this.setState({ 
                    page_id: '', 
                    page_title:'',
                    page_description: '',
                    page_image: '',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.refreshgetsinglestaticpages(this.props.match.params.id);
    }
    render() {
        return (
            <div className="fixed-left">
                <div id="wrapper">
                    <Route component={LeftSidebar} />
                    <div className="content-page">
                        <div className="content">
                            <Route component={TopHeader} />
                            <div className="page-content-wrapper">
                                <div className="col-lg-12">
                                    <div className="card m-b-20">
                                        <div className="card-body">
                                            <section className="view-page">
                                                <div className="container">
                                                    <div className="view-page-box">
                                                        <div className="row">
                                                            <div className="col-sm-3">
                                                                <div className="view-img">
                                                                    { this.state.page_image
                                                                        ?
                                                                            <img src={IMAGE_URL+'StaticPages/'+this.state.page_image} alt=""/>
                                                                        :
                                                                            <img src={Avatar}  alt=""/>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="view-text">
                                                                    <h2>{this.state.page_title}</h2>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <div className="edit">
                                                                    <a  href={'/editstaticpage/'+this.state.page_title}><i className="fa fa-pencil"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <h3>Description</h3>
                                                        <p dangerouslySetInnerHTML={{ __html: this.state.page_description }}></p>
                                                        <hr/>
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
            </div>
        );
    }
}
export default page;