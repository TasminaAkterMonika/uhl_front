import React, { Component } from 'react';
import {API_TOKEN_NAME, IMAGE_URL} from '../../../constants';
import { scAxios, scAxiosAdmin } from '../../..';
import Pagination from "react-js-pagination";

const getPackagesLists = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/packages/getallpackages', {
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
const getAllPackagesLists = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxios.request('/packages', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
      }
    });
    req.then(res => resolve(res.data))
        .catch(err => reject(err));
  });
}
const getDepartmentLists = () => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/department/getalldepartments', {
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
const getPreExistingConditionLists = () => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/packages/getallprecondtion', {
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
const getSearchPackageData = (data) => {
  return new Promise((resolve, reject) => {
      const req = scAxiosAdmin.request('/packages/getsearchpackagedata', {
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
class PackageTwo extends Component {
  state = {
    packages:[],
    departments:[],
    pre_existing_condition:[],
    gender:'',
    age:'',
    department:'',
    pre_exist_condition:'',
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
  }
  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value,
    });
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.refreshGetPackagesData(pageNumber);
    this.onChangeGender(pageNumber);
    this.onChangeAge(pageNumber);
    this.onChangeDepartment(pageNumber);
    this.onChangePreExitingCondition(pageNumber);
  }
  refreshGetPackagesData = (page) => {
    /*const data = {
        page: page,
    }*/
    const data = {
        next: page,
    }
    getAllPackagesLists(data)
    .then(res => {
      if(res){
        this.setState({ packages: res });
      } else {
        this.setState({ packages: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
    /*getPackagesLists(data)
    .then(res => {
      if(res.status===true){
        var records = res.data.data;
        this.setState({ packages: records });
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
        this.setState({ packages: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });*/
  }

  getAllPackagesLists
  refreshGetDepartmentData = () => {
    getDepartmentLists()
    .then(res => {
      if(res.status===true){
        var records = res.data.data;
        this.setState({ departments: records });
      } else {
        this.setState({ departments: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  refreshGetPreExistingConditionData = () => {
    getPreExistingConditionLists()
    .then(res => {
      if(res.status===true){
        var records = res.data;
        this.setState({ pre_existing_condition: records });
      } else {
        this.setState({ pre_existing_condition: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  onChangeGender = (event, page) => {
    var gender_val = event.target.value;
    this.setState({gender: gender_val});
    const data = {
      page: page,
      gender: gender_val,
      age: document.getElementById('age').value,
      department: document.getElementById('department').value,
      pre_exist_conditon: document.getElementById('pre_exist_condition').value,
    }
    getSearchPackageData(data)
    .then(res => {
      if(res.status===true){
        var records = res.data.data;
        this.setState({ packages: records });
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
        this.setState({ packages: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  onChangeAge = (event, page) => {
    var age_val = event.target.value;
    this.setState({age: age_val});
    const data = {
      page: page,
      gender: document.getElementById('gender').value,
      age: age_val,
      department: document.getElementById('department').value,
      pre_exist_conditon: document.getElementById('pre_exist_condition').value,
    }
    getSearchPackageData(data)
    .then(res => {
      if(res.status===true){
        var records = res.data.data;
        this.setState({ packages: records });
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
        this.setState({ packages: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  onChangeDepartment = (event, page) => {
    var department_val = event.target.value;
    this.setState({department: department_val});
    const data = {
      page: page,
      gender: document.getElementById('gender').value,
      age: document.getElementById('age').value,
      department: department_val,
      pre_exist_conditon: document.getElementById('pre_exist_condition').value,
    }
    getSearchPackageData(data)
    .then(res => {
      if(res.status===true){
        var records = res.data.data;
        this.setState({ packages: records });
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
        this.setState({ packages: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  onChangePreExitingCondition = (event, page) => {
    var pre_exit_condition_val = event.target.value;
    this.setState({pre_exist_condition: pre_exit_condition_val});
    const data = {
      page: page,
      gender: document.getElementById('gender').value,
      age: document.getElementById('age').value,
      department: document.getElementById('department').value,
      pre_exist_condition: pre_exit_condition_val,
    }
    getSearchPackageData(data)
    .then(res => {
      if(res.status===true){
        var records = res.data.data;
        this.setState({ packages: records });
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
        this.setState({ packages: '' });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }
  componentDidMount(){
    this.refreshGetPackagesData();
    this.refreshGetDepartmentData();
    this.refreshGetPreExistingConditionData();
  }
  render() {
    const pageNumbers = [];
    for (let i = 1; i <= this.state.TotalPages; i++) {
        pageNumbers.push(i);
    }
    return(
      <div>
        <section className="drop-gender">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="dropdown">
                  <select id="gender" name="gender" value={this.state.gender} onChange={this.onChangeGender} style={{"width": "100%", "padding": "15px 10px"}}>
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option> 
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <select id="age" name="age" value={this.state.age} onChange={this.onChangeAge} style={{"width": "100%", "padding": "15px 10px"}}>
                  <option value="">Age</option>
                  <option value="0-10">0-10</option>
                  <option value="11-20">11-20</option> 
                  <option value="21-30">21-30</option>
                  <option value="31-40">31-40</option>
                  <option value="41-50">41-50</option>
                  <option value="51-60">51-60</option>
                  <option value="61-70">61-70</option>
                  <option value="71-80">71-80</option>
                  <option value="81-90">81-90</option>
                  <option value="91-100">91-100</option>
                </select>               
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="dropdown">
                  <select id="department" name="department" value={this.state.department} onChange={this.onChangeDepartment} style={{"width": "100%", "padding": "15px 10px"}}>
                    <option value="">Focus Area</option>
                    {this.state.departments.length > 0 
                      ?
                        this.state.departments.map(department_data => {
                          return(
                            <option value={department_data.dept_id}>{department_data.department_name}</option>
                          )
                        })
                      :
                        <option value="">Focus Area</option>
                    }
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="dropdown">
                  <select id="pre_exist_condition" name="pre_exist_condition" value={this.state.pre_exist_condition} onChange={this.onChangePreExitingCondition} style={{"width": "100%", "padding": "15px 10px"}}>
                    <option value="">Pre-existing Conditions</option>
                    { this.state.pre_existing_condition.length > 0 
                        ?
                          this.state.pre_existing_condition.map(pre_existing_condition_data => {
                            return(
                              <option value={pre_existing_condition_data.id}>{pre_existing_condition_data.name}</option>
                            )
                          })
                        :
                          <option value="">Pre-existing Conditions</option>
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className="our-recommendations">
              <div className="row">
                <div className="col-lg-3 col-md-5"><h3><strong>Our Recommendations</strong></h3></div>
                <div className="col-lg-7 col-md-5"> <hr /></div>
              </div>
              <div className="row mt-4">
                { this.state.packages.length > 0
                  ?
                    this.state.packages.map(package_data => {
                      let package_price = package_data.IPDPrice;
                      let package_amount = parseFloat(package_price);
                      return(
                        <div className="col-lg-4 col-md-12">
                          <div className="doctor-list">
                            <div className="row">
                              <div className="col-5">
                                { package_data.image
                                  ?
                                    <img src={IMAGE_URL+'/Packagesimg/'+package_data.image} alt="Bitmap-3" style={{"height": "150px", "width": "100%"}}/>
                                  :
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="Bitmap-3" style={{"height": "150px", "width": "100%"}}/>
                                }
                              </div>
                              <div className="col-7">
                                <h4>{package_data.Description}</h4>
                                <h4>{package_data.PackageNature}</h4>
                                <p>BDT <br /> {package_amount.toFixed(2)}</p>
                                <p><b>More Information</b></p>
                              </div>
                            </div>
                          </div>
                        </div>
                        /*<div className="col-lg-4 col-md-12">
                          <a href={'/singlepackage/'+package_data.name} style={{"color":"#333", "textDecoration":"none"}}>
                            <div className="doctor-list">
                              <div className="row">
                                <div className="col-5">
                                  { package_data.image
                                    ?
                                      <img src={IMAGE_URL+'/Packagesimg/'+package_data.image} alt="Bitmap-3" style={{"height": "150px", "width": "100%"}}/>
                                    :
                                      <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="Bitmap-3" style={{"height": "150px", "width": "100%"}}/>
                                  }
                                </div>
                                <div className="col-7">
                                  <h4>{package_data.name}</h4>
                                  <p>BDT <br /> {package_amount.toFixed(2)}</p>
                                  <p><b>More Information</b></p>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>*/
                      )
                    })
                  :
                    <div className="col-lg-12 col-md-12">
                      <div className="doctor-list">
                        <div className="row">
                          <p>No packages found</p>
                        </div>
                      </div>
                    </div>
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
          </div>
        </section>
      </div>
    )
  }
}
export default PackageTwo;