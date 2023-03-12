import React, { Component } from 'react';
import {API_TOKEN_NAME, IMAGE_URL,SITE_URL} from '../../../constants';
import { scAxiosAdmin } from '../../..';
import 'react-toastify/dist/ReactToastify.css';
import banner_img from '../../../images/banner-profile.jpg';
import SubPopupIndex2 from '../../../component/frontend/SubPopupIndex2';
import $ from 'jquery';
import icon2 from '../../../images/icon-2.png';

const getSingleDoctorData = (id) => {
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

const getAllDepartments = (data) => {
  return new Promise((resolve, reject) => {
      const req = scAxiosAdmin.request('/department/getdepartments', {
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

class SingleDepartmentView extends Component {
  state = {
    department_name:'',
    department_desc_one:'',
    department_desc_two:'',
    department_desc_three:'',
    department_desc_four:'',
    department_desc_five: '',
    image: '',
    departments:[],
    showDoctorSearchPopup:false,
  }
  handleChange = event => { 
    this.setState({
        [event.target.name]: event.target.value
    });
    var doctor_avability_time = $("input[name='doctor_avability_time']:checked").val();
    if(doctor_avability_time){
      $(".doctor_search_list_popup").css("visibility", 'visible');
      $(".doctor_search_list_popup").addClass('show');
      this.setState({
        showDoctorSearchPopup:true
      });
    }
  }
 
  refreshDepartments = (event) => {
    getAllDepartments()
    .then(res => {
        if(res.status===true){
            var records = res.data;
            this.setState({ departments: records });
        } else {
            this.setState({ departments: '' });
        }
    })
    .catch(err => {
        console.log(err);
    });
}

  refreshGetDoctorData = (id) => {
    getSingleDoctorData(id)
    .then(res => {
      if(res.status===true){
        var records = res.data;
        this.setState({ 
          department_name: records.department_name, 
          department_desc_one: records.department_desc_one,
          department_desc_two: records.department_desc_two,
          department_desc_three: records.department_desc_three,
          department_desc_four: records.department_desc_four,
          department_desc_five: records.department_desc_five,
          image: records.image
        });
      } else {
        this.setState({ 
          department_name: '', 
          department_desc_one: '',
          department_desc_two: '',
          department_desc_three: '',
          department_desc_four: '',
          department_desc_five: '',
          image:''
        });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  
  componentDidMount(){
    let department_name_string = this.props.currentDocId;
    let department_id = department_name_string.split("~").pop();
    //let doctor_name = doctor_name_string.split("~")[0];
    //let new_doctor_name = doctor_name.replaceAll('-', ' ');
    this.refreshGetDoctorData(department_id);
    this.refreshDepartments();
  }
  render() {
    return(
      <div>
        <section className="banner-hero">
          <img src={banner_img} alt="banner-profile" className="w-100" />
        </section>
        <section className="prof-dr">
          <div className="container">
            <div className="box-of-about border-part mb-4">
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <div className="text-profile "> 
                    { this.state.image
                      ?
                        <img src={IMAGE_URL+'/DepartmentImage/'+ this.state.image} alt="doc" className="img-doc" />
                      :
                      <img src={icon2} alt="avtars" width="100px" className="img-doc"/>
                    }
                    <h2>{this.state.department_name}</h2>
                      { this.state.department_desc_one
                
                          ?
                          <div className="col-lg-12 col-md-12">
                            
                                <p dangerouslySetInnerHTML={{ __html: this.state.department_desc_one }}></p>
                              </div>
                            
                          :
                            ''
                      }

                    { this.state.department_desc_two
                              
                              ?
                              
                                    <p dangerouslySetInnerHTML={{ __html: this.state.department_desc_two }}></p>
                                
                              :
                                ''
                            }

                            { this.state.department_desc_three
                              
                              ?
                                    <p dangerouslySetInnerHTML={{ __html: this.state.department_desc_three }}></p>
                                
                              :
                                ''
                            }

                            { this.state.department_desc_four
                              
                              ?
                            
                              <p dangerouslySetInnerHTML={{ __html: this.state.department_desc_four }}></p>
                                  
                              :
                                ''
                            }

                            {  this.state.department_desc_five
                              ?
                            
                              <p dangerouslySetInnerHTML={{ __html: this.state.department_desc_five }}></p>
                                
                              :
                                ''
                            }

                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="text-profile" id="mobile-part">
                    
                      <div id="sidebar-2" className="row">

                          <div className="col-md-12 sidebar-item ">
                              <a className="category-list-link open-cat-list" href="#">Select Departments <i id="cat-arrow" className="fa fa-angle-down"></i></a>
                              <ul className="list-unstyled category-list patients-category-list" id="department-list-sidebar">
                                  <li><a className="" href="/departments/anesthesiology">Anesthesiology</a></li>
                                  {
                                      this.state.departments.length > 0
                                      ?
                                          this.state.departments.map((department) => {
                                            var department_name = department.department_name;
                                            var new_department_name = department_name.replaceAll(' ', '-');
                                              return ( 
                                                <li><a className="" href={SITE_URL+'/departments/'+new_department_name+'~'+department.id}>{department_name}</a></li>
                                              )
                                          })
                                      :
                                          '' 
                                  }
                                
                              </ul>
                          </div>

                      </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>
        {
          this.state.showDoctorSearchPopup
          ?
            <SubPopupIndex2 showPopup={this.state.showDoctorSearchPopup} doctorname={this.state.doctor_name}/>
          :
            null
        }
      </div>
    )
  }
}
export default SingleDepartmentView;