import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME,IMAGE_URL } from '../../constants';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
import Avatar from '../../images/avatar_circle.png';

const getSingleDoctorDatadetails = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/doctors/getsingledoctorsdetails/'+id, {
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
    const req = scAxiosAdmin.request('/doctors/doctorpublication/'+id, {
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
class DoctorView extends Component {
  state = {
    fields: {},
    errors: {},
    publications: [],
    doctor_id:'',
    doctor_name:'',
    doctor_degree:'',
    doctor_fees:'',
    doctor_department:'',
    doctor_profile:'',
    doctor_desc:'',
    doctor_edu:'',
    doctor_exp:'',
    doctor_department_name:'',
  }
  refreshgetSingleDoctorDataDetails = (id) => {
    getSingleDoctorDatadetails(id)
    .then(res => {
        if(res.status===true){
            var records = res.data;
            this.setState({
                doctor_id: records.id, 
                doctor_department_name: records.department_name, 
                doctor_name: records.doctor_name,
                doctor_degree: records.degree,
                doctor_fees: records.doctor_fees,
                doctor_department: records.dept_id,
                doctor_profile: records.doctor_profile,
                doctor_desc: records.doctor_desc,
                doctor_edu: records.doctor_edu,
                doctor_exp: records.doctor_exp,
            });
        } else {
            this.setState({ 
                doctor_id: '', 
                doctor_name: '',
                doctor_degree: '',
                doctor_fees: '',
                doctor_department: '',
                doctor_profile:'',
                doctor_desc: '',
                doctor_edu: '',
                doctor_exp: '',
                doctor_department_name:'',
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
  }
  refreshgetSingleDoctorPublication = (id) => {
    getSingleDoctorPublications(id)
    .then(res => {
        if(res.status===true){
          var records = res.data;
          this.setState({ publications: records });
        } else {
          this.setState({ publications: '' });
        }
    })
    .catch(err => {
        console.log(err);
    });
  }
  componentDidMount(){
    this.refreshgetSingleDoctorDataDetails(this.props.match.params.id);
    this.refreshgetSingleDoctorPublication(this.props.match.params.id);
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
                                      { this.state.doctor_profile
                                            ?
                                                <img src={IMAGE_URL+'DoctorProfileImg/'+this.state.doctor_profile} alt=""/>
                                            :
                                                <img src={Avatar}  alt=""/>
                                      }
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="view-text">
                                      <h2>{this.state.doctor_name}</h2>
                                      <p><b>{this.state.doctor_degree}</b></p>
                                      <p>{this.state.doctor_department_name}</p>
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
                                      <a  href={'/editdoctor/'+this.state.doctor_id}><i className="fa fa-pencil"></i></a>
                                    </div>
                                  </div>
                                </div>
                                <hr/>
                                <h3>Objective</h3>
                                <p dangerouslySetInnerHTML={{ __html: this.state.doctor_desc }}></p>
                                <hr/>
                                <h3>Availability</h3>
                                <div className="row" id="tab-mob">
                                  <div className="col-2 ">
                                  <table className="table table-sst">
                                    <tbody><tr>
                                      <th>Sun </th>
                                    </tr>
                                    <tr>
                                      <td>9am-5p.m.</td>
                                    </tr>
                                  </tbody></table>
                                  </div>
                                  <div className="col-2">
                                    <table className="table table-sst">
                                      <tbody><tr>
                                        <th>Mon </th>
                                      </tr>
                                      <tr>
                                        <td>9am-5p.m.</td>
                                      </tr>
                                    </tbody></table>
                                  </div>
                                  <div className="col-2 p-0">
                                    <table className="table table-sst">
                                      <tbody><tr>
                                        <th>Tue </th>
                                      </tr>
                                      <tr>
                                        <td>9am-5p.m.</td>
                                      </tr>
                                    </tbody></table>
                                  </div>
                                  <div className="col-2">
                                    <table className="table table-sst">
                                      <tbody><tr>
                                        <th>Web </th>
                                      </tr>
                                      <tr>
                                        <td>9am-5p.m.</td>
                                      </tr>
                                      
                                    </tbody></table>
                                  </div>
                                  <div className="col-2 p-0">
                                    <table className="table table-sst">
                                      <tbody><tr>
                                        <th>Thurs </th>
                                      </tr>
                                      <tr>
                                        <td>9am-5p.m.</td>
                                      </tr>
                                    </tbody></table>
                                  </div>
                                  <div className="col-2">
                                    <table className="table table-sst">
                                      <tbody>
                                        <tr>
                                          <th>Sat </th>
                                        </tr>
                                        <tr>
                                          <td>9am-5p.m.</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-6 col-md-12">
                                    <div className="edu-part">
                                      <h3>Education</h3>
                                      <p dangerouslySetInnerHTML={{ __html: this.state.doctor_edu }}></p>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-12">
                                    <div className="edu-part">
                                      <h3>Experience</h3>
                                      <p dangerouslySetInnerHTML={{ __html: this.state.doctor_exp }}></p>
                                    </div>
                                  </div>
                                </div>
                                <h3 className="mt-5">Publications</h3>
                                <div className="card m-b-20">
                                  <div className="card-body">
                                    <section className="view-page">
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
                                                        <h3 className="d-inline">{publication.doctor_name}</h3></div>
                                                        </div>
                                                                                        <h4>{publication.publications_title}</h4>
                                                        <h5 className="float-end position-absolute mt-2 top-0 end-0"><a href={'/editpublication/'+publication.id}><i className="fa fa-pencil-square mx-2 display-4"></i></a>
                                                        </h5>
                                                        </div>

                                                        <p dangerouslySetInnerHTML={{ __html: publication.publications_desc ? publication.publications_desc.substr(0, 70) : '' }}></p>

                                                        </div>

                                                        </div>	
                                                      );
                                                    })
                                                  :
                                                  <div colspan="6" className="font_12 txt_col fontweight400 " style={{"text-align": "center"}}> There are currently no News Events.</div>
                                                }
                                            </div><br/>
                                          </div>
                                        </div>
                                      </section>
                                  </div>
                                </div>        
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
export default DoctorView;