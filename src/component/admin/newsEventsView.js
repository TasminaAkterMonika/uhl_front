import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Avatar from '../../images/avatar_circle.png';

const getSingleNewsEvent = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/newsevents/getsinglenewsevents/'+id, {
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

class newsEventsView extends Component {
    state = {
        fields: {},
        errors: {},
        news_id:'',
        edit_news_events_title:'',
        edit_news_events_desc:'',
        edit_news_events_pic:'',
    }
    refreshgetSingleNewsEvent = (id) => {
        getSingleNewsEvent(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    news_id: records.id, 
                    news_events_title: records.news_events_title,
                    news_events_desc: records.news_events_desc,
                    news_events_pic: records.news_events_pic,
                  
                });
            } else {
                this.setState({ 
                    news_id: '', 
                    news_events_title: '',
                    news_events_desc: '',
                    news_events_pic: '',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.refreshgetSingleNewsEvent(this.props.match.params.id);
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
                                           <section class="view-page">
                                              <div className="container">
                                                <div className="view-page-box">
                                                    <div className="row">
                                                      <div className="col-sm-3">
                                                        <div className="view-img">
                                                        { this.state.news_events_pic
                                                                ?
                                                                    <img src={IMAGE_URL+'NewsEventsImg/'+this.state.news_events_pic} alt=""/>
                                                                :
                                                                    <img src={Avatar}  alt=""/>
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="col-sm-6">
                                                        <div className="view-text">
                                                          <h2>{ this.state.news_events_title }</h2>
                                                         
                                                        </div>
                                                      </div>
                                                      <div className="col-sm-3">
                                                        <div className="edit">
                                                          <a href={'/editnewsevent/'+this.state.news_id}><i className="fa fa-pencil"></i></a>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <hr/>
                                                        
                                                    { this.state.news_events_desc
                                                            ?
                                                            <div className="col-lg-6 col-md-12">
                                                               <h3>Description</h3>
                                                                <p dangerouslySetInnerHTML={{ __html: this.state.news_events_desc }}></p>
                                                               
                                                            </div>   
                                                            :
                                                            <div></div>
                                                    }
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
export default newsEventsView;