import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Avatar from '../../images/avatar_circle.png';

const getSingleTestimonialData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/testimonials/getsingletestimonials/'+id, {
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
class testimonialView extends Component {
    state = {
        fields: {},
        errors: {},
        departments:[],
        testimonial_id:'',
        testimonial_name:'',
        testimonial_desc:'',
        author_name:'',
        rating:'',
        author_profile_pic:'',
    }
    refreshgetSingleTestimonialData = (id) => {
        getSingleTestimonialData(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    testimonial_id: records.id, 
                    testimonial_name: records.testimonial_name,
                    testimonial_desc: records.testimonial_desc,
                    author_name: records.author_name,
                    rating: records.rating,
                    author_profile_pic: records.author_profile_pic,
                });
            } else {
                this.setState({ 
                    testimonial_id: '', 
                    testimonial_name: '',
                    testimonial_desc: '',
                    author_name: '',
                    rating: '',
                    author_profile_pic: '',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.refreshgetSingleTestimonialData(this.props.match.params.id);
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
                                                        { this.state.author_profile_pic
                                                                ?
                                                                    <img src={IMAGE_URL+'AuthorProfileImg/'+this.state.author_profile_pic} alt=""/>
                                                                :
                                                                    <img src={Avatar}  alt=""/>
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="col-sm-6">
                                                        <div className="view-text">
                                                          <h2>{ this.state.testimonial_name }</h2>
                                                          <p><b>{ this.state.author_name }</b></p>
                                                         
                                                          <div className="start-icons">
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="col-sm-3">
                                                        <div className="edit">
                                                          <a href={'/edittestimonial/'+this.state.testimonial_id}><i className="fa fa-pencil"></i></a>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <hr/>
                                                        
                                                    { this.state.testimonial_desc
                                                            ?
                                                            <div className="col-lg-6 col-md-12">
                                                               <h3>Description</h3>
                                                                <p dangerouslySetInnerHTML={{ __html: this.state.testimonial_desc }}></p>
                                                               
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
export default testimonialView;