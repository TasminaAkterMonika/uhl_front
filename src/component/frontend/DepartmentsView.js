
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
import SingleDepartmentView from "../../component/frontend/commonsections/SingleDepartmentView";
import { API_TOKEN_NAME, IMAGE_URL, SITE_URL } from '../../constants';
import { scAxiosAdmin } from '../..';
import icon2 from '../../images/icon-2.png';
import banner_img from '../../images/banner-profile.jpg';


class DepartmentsView extends Component {



    state = {
        departments: []
    }

    getAllDepartments = (data) => {
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




    componentDidMount() {
        this.getAllDepartments().then(res => {
            if (res.status === true) {
                var records = res.data;
                this.setState({ departments: records })
            };
            console.log(res.data);
        });
    }

    render() {
        return (
            <div>
                <Route component={Header} />
                <section className="banner-hero " >
                    <img src={banner_img} alt="banner-profile" className="w-100" />
                </section>

                <section>
                    <div class="container mt-5 mb-5" >
                        <div class="row">
                            {this.state.departments.map(body_department => {
                                let department_name = body_department.department_name;
                                let new_department_name = department_name.replaceAll(' ', '-');

                                return (
                                    <div className="col-lg-4 mb-3" key={body_department.id}>
                                        <div className="doctor-list">
                                            <Link to={`/department/${body_department.id}`} style={{ "textDecoration": "none" }}>
                                                {/*<input type="radio" className="patient_user" name="body_dept_id" value={body_department.dept_id} onChange={this.handleChange} />*/}
                                                <div className="row list_content_sec">
                                                    <div className="col-5">
                                                        {
                                                            body_department.image
                                                                ?
                                                                <img src={IMAGE_URL + 'DepartmentImage/' + body_department.image} alt="avtars" style={{ "width": "75px" }} />
                                                                :
                                                                <img src={icon2} alt="Bitmap-3" style={{ "width": "75px" }} />
                                                        }
                                                    </div>
                                                    <div className="col-7" style={{ "paddingLeft": "0px", "textAlign": "left" }}>
                                                        <h6 style={{ "paddingTop": "0px" }}>{body_department.department_name}</h6>
                                                        <h6>Department</h6>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </section>
                <Route component={Footer} />
            </div>
        );
    }
}
export default DepartmentsView;