import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME, IMAGE_URL } from '../../constants';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Avatar from '../../images/avatar_circle.png';

const getSinglePublictication = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/publications/getsinglepublications/'+id, {
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
const getSingleDoctorPublications = (id) => {
    return new Promise((resolve, reject) => {
      const req = scAxiosAdmin.request('/publications/getdoctorpublicationname/'+id, {
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
class publicationView extends Component {
    state = {
        fields: {},
        errors: {},
        publication_id:'',
        publications_title:'',
        publications_desc:'',
        publications_pic:'',
    }
    refreshgetSinglePublication = (id) => {
        getSinglePublictication(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    publication_id: records.id, 
                    publications_title: records.publications_title,
                    doctor_id: records.doctor_id,
                    publications_desc: records.publications_desc,
                    publications_pic: records.publications_pic,
                  
                });
            } else {
                this.setState({ 
                    publication_id: '', 
                    publications_title: '',
                    publications_desc: '',
                    publications_pic: '',
                    doctor_id:'',
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    refreshgetDoctorNamePublication = (id) => {
        getSingleDoctorPublications(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                   
                    doctor_name: records.doctor_name, 
                  
                });
            } else {
                this.setState({ 

                    doctor_name: records.doctor_name, 
                   
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.refreshgetSinglePublication(this.props.match.params.id);
        this.refreshgetDoctorNamePublication(this.props.match.params.id);
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
                                                        { this.state.publications_pic
                                                                ?
                                                                    <img src={IMAGE_URL+'PublicationsImg/'+this.state.publications_pic} alt=""/>
                                                                :
                                                                    <img src={Avatar}  alt=""/>
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="col-sm-6">
                                                        <div className="view-text">
                                                          <h2>{ this.state.publications_title }</h2>
                                                          <p><b>{ this.state.doctor_name }</b></p>
                                                        </div>
                                                      </div>
                                                      <div className="col-sm-3">
                                                        <div className="edit">
                                                          <a href={'/editpublication/'+this.state.publication_id}><i className="fa fa-pencil"></i></a>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <hr/>
                                                        
                                                    { this.state.publications_desc
                                                            ?
                                                            <div className="col-lg-6 col-md-12">
                                                               <h3>Description</h3>
                                                                <p dangerouslySetInnerHTML={{ __html: this.state.publications_desc }}></p>
                                                               
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
export default publicationView;