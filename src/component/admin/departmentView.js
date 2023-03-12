import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME } from '../../constants';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';

const getSingleDepartmentData = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/department/getsingledepartment/'+id, {
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
class DepartmentView extends Component {
    state = {
        fields: {},
        errors: {},
        department_id:'',
        department_name:'',
        department_desc_one:'',
        department_desc_two:'',
        department_desc_three:'',
        department_desc_four:'',
        department_desc_five:'',
    }
    refreshgetSingleDepartmentData = (id) => {
        getSingleDepartmentData(id)
        .then(res => {
            if(res.status===true){
                var records = res.data;
                this.setState({
                    department_id: records.id, 
                    department_name: records.department_name,
                    department_desc_one: records.department_desc_one,
                    department_desc_two: records.department_desc_two,
                    department_desc_three: records.department_desc_three,
                    department_desc_four: records.department_desc_four,
                    department_desc_five: records.department_desc_five,
                });
            } else {
                this.setState({ 
                    department_id: '',
                    department_name: '',
                    department_desc_one: '',
                    department_desc_two: '',
                    department_desc_three: '',
                    department_desc_four: '',
                    department_desc_five: '', 
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount(){
        this.refreshgetSingleDepartmentData(this.props.match.params.id);
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
                                                      <div className="col-sm-9">
                                                        <div className="view-text">
                                                          <h2>{ this.state.department_name }</h2>
                                                         
                                                        </div>
                                                      </div>
                                                      <div className="col-sm-3">
                                                        <div className="edit">
                                                        <a  href={'/editdepartment/'+this.state.department_id}><i className="fa fa-pencil"></i></a>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="row">
                                                        { this.state.department_desc_one
                                                            ?
                                                            <div className="col-lg-6 col-md-12">
                                                                <div className="edu-part">
                                                                <p dangerouslySetInnerHTML={{ __html: this.state.department_desc_one }}></p>
                                                                </div>
                                                            </div>   
                                                            :
                                                            <div></div>
                                                        }
                                                        { this.state.department_desc_two
                                                            ?
                                                            <div className="col-lg-6 col-md-12">
                                                                <div className="edu-part">
                                                                <p dangerouslySetInnerHTML={{ __html: this.state.department_desc_two }}></p>
                                                                </div>
                                                            </div>   
                                                            :
                                                            <div></div>
                                                        }
                                                        { this.state.department_desc_three
                                                            ?
                                                            <div className="col-lg-6 col-md-12">
                                                                <div className="edu-part">
                                                                <p dangerouslySetInnerHTML={{ __html: this.state.department_desc_three }}></p>
                                                                </div>
                                                            </div>   
                                                            :
                                                            <div></div>
                                                        }
                                                        { this.state.department_desc_four
                                                            ?
                                                            <div className="col-lg-6 col-md-12">
                                                                <div className="edu-part">
                                                                <p dangerouslySetInnerHTML={{ __html: this.state.department_desc_four }}></p>
                                                                </div>
                                                            </div>   
                                                            :
                                                            <div></div>
                                                        }
                                                        { this.state.department_desc_five
                                                            ?
                                                            <div className="col-lg-6 col-md-12">
                                                                <div className="edu-part">
                                                                <p dangerouslySetInnerHTML={{ __html: this.state.department_desc_five }}></p>
                                                                </div>
                                                            </div>   
                                                            :
                                                            <div></div>
                                                        }
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
export default DepartmentView;