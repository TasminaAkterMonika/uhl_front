import React, { Component } from 'react';
import { API_TOKEN_NAME, IMAGE_URL, SITE_URL } from '../../../constants';
import { scAxiosAdmin } from '../../..';
import icon2 from '../../../images/icon-2.png';
import male from '../../../images/male.svg';
import female from '../../../images/female.svg';
import NewSingleMaleBodyContent from "./NewSingleMaleBodyContent";
import NewSingleFemaleBodyContent from "./NewSingleFemaleBodyContent";
import $ from 'jquery';
import Slider from "react-slick";

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
const getAllBodyParts = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/bodypart/getallbodyparts', {
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
const getAllTestimonials = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/testimonials/getalltestimonials', {
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
class NewCenterExcellence extends Component {
  state = {
    showMaleComponent: false,
    showFemaleComponent: false,
    bodyTitle: '',
    departments: [],
    testimonials: [],
    bodyparts: []
  }
  modalMaleBodySingleContentOpen(e, title) {
    this.setState({
      showMaleComponent: true,
      bodyTitle: title,
    });
    $('.humanMaleBodyImg').hide();
    $('.humanFemaleBodyImg').show();
  }
  modalFemaleBodySingleContentOpen(e, title) {
    this.setState({
      showFemaleComponent: true,
      bodyTitle: title,
    });
    $('.humanMaleBodyImg').show();
    $('.humanFemaleBodyImg').hide();
  }
  onClickMalePrevStep = (e) => {
    this.setState({
      showMaleComponent: false,
    });
    $('#excellence-part').hide();
    $('.humanMaleBodyImg').show();
    $('.humanFemaleBodyImg').show();
  }
  onClickFemalePrevStep = (e) => {
    this.setState({
      showFemaleComponent: false,
    });
    $('#excellence-part').hide();
    $('.humanMaleBodyImg').show();
    $('.humanFemaleBodyImg').show();
  }
  refreshGetAllTestimonials = () => {
    getAllTestimonials()
      .then(res => {
        if (res.status === true) {
          var records = res.data.data;
          this.setState({ testimonials: records });
        } else {
          this.setState({ testimonials: '' });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  refreshDepartments = (event) => {
    getAllDepartments()
      .then(res => {
        if (res.status === true) {
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
  refreshGetAllMaleBodyParts = (event) => {
    const data = {
      gender: 'male'
    }
    getAllBodyParts(data)
      .then(res => {
        if (res.status === true) {
          var records = res.data;
          this.setState({ bodyparts: records });
        } else {
          this.setState({ bodyparts: '' });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  refreshGetAllFemaleBodyParts = (event) => {
    const data = {
      gender: 'female'
    }
    getAllBodyParts(data)
      .then(res => {
        if (res.status === true) {
          var records = res.data;
          this.setState({ bodyparts: records });
        } else {
          this.setState({ bodyparts: '' });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.refreshDepartments();
    this.refreshGetAllTestimonials();
    this.refreshGetAllMaleBodyParts();
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]

    };
    const testimonial_settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    const FeMaleBodySVGReactElement = (
      <div className="structure ffff female">
        <img src="https://www.fortishealthcare.com/revised/images/woman-structure.png" alt="" />
        <ul className="body_list left">
          <li className="eyeMpointer">
            <a><span className="txt">Eye</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Eye</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/ophthalmology">Ophthalmology (Eye Care)</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="earMPointer">
            <a><span className="txt">Ear</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Ear</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/ent--head-neck-surgery">ENT (Ear, Nose, Throat)</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="teethMpointer">
            <a><span className="txt">Teeth</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Teeth</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departmenthttps://www.uhlbd.com/departments/dentistrys/ent--head-neck-surgery">Dentistry</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="throatMpointer">
            <a><span className="txt">Throat</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Throat</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/ent--head-neck-surgery">ENT (Ear, Nose, Throat)</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="chestMpointer">
            <a><span className="txt">Breast</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Breast</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/breast-surgery-579">Breast Surgery</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="liverMpointer">
            <a><span className="txt">Liver</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Liver</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/gastroenterology-hepatology">Gastroenterology & Hepatology</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="handMpointer">
            <a><span className="txt">Arm</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Arm</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Arthroscopic Surgery</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Hand and upper limb surgery</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Orthopaedics</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/rheumatology-211">Rheumatology</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="kidneysMpointer">
            <a
            ><span class="txt">Kidneys</span
            ><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Kidneys</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/nephrologykidney">Nephrology (Kidney Centre)</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.fortishealthcare.com/india/clinical-speciality/kidney-transplant-590"
                    >Kidney Transplant</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/urology"
                    >Urology</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="lowerBackMpointer">
            <a
            ><span class="txt">Lower Back</span
            ><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Lower Back</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/neurology"
                    >Neurology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Orthopaedics</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.fortishealthcare.com/india/clinical-speciality/rheumatology-211"
                    >Rheumatology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Spine Surgery</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="reproductiveMpointer">
            <a
            ><span class="txt">Reproductive systems</span
            ><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Reproductive systems</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.fortishealthcare.com/india/clinical-speciality/gynaecology-oncology-253"
                    >Gynecologic Oncology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.fortishealthcare.com/india/clinical-speciality/obstetrics-and-gynaecology-289"
                    >Obstetrics &amp; Gynaecology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.fortishealthcare.com/india/clinical-speciality/infertility-medicine-ivf-285"
                    >Infertility Medicine</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="thighMpointer">
            <a
            ><span class="txt">Thigh</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Thigh</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Bone and Joint</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Orthopaedics</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="footMpointer">
            <a
            ><span class="txt">Foot</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Foot</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Bone and Joint</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Orthopaedics</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/diabetes-endocrinology"
                    >Podiatry/ Diabetic Foot Care</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <ul class="body_list right">
          <li class="brainMpointer">
            <a
            ><span class="txt">Brain</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Brain</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/neurology"
                    >Neurology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/neurosurgery"
                    >Neurosurgery</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/psychiatry"
                    >Psychiatry</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="noseMpointer">
            <a
            ><span class="txt">Nose</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Nose</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/ent--head-neck-surgery"
                    >ENT (Ear, Nose, Throat)</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="heartMpointer">
            <a
            ><span class="txt">Heart</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Heart</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/cardiology"
                    >Cardiac Sciences</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/cardiac-surgery"
                    >Adult CTVS (Cardiothoracic and Vascular
                      Surgery)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/cardiac-surgery"
                    >Heart Transplant</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/cardiology"
                    >Interventional Cardiology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/cardiology"
                    >Invasive Cardiology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/cardiology"
                    >Non-Invasive Cardiology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/cardiology"
                    >Paediatrics Cardiac Sciences</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/cardiac-surgery"
                    >Paediatrics CTVS (Cardiothoracic and Vascular
                      Surgery)</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/vascular-surgery"
                    >Vascular surgery</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="lungMpointer">
            <a
            ><span class="txt">Lungs</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Lungs</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.fortishealthcare.com/india/clinical-speciality/paediatric-pulmonology-chest-medicine-2"
                    >Paediatrics Pulmonology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.fortishealthcare.com/india/clinical-speciality/pulmonology-chest-sleep-medicine-248"
                    >Pulmonology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.fortishealthcare.com/india/clinical-speciality/pulmonology-chest-sleep-medicine-248"
                    >Respiratory Medicine</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="elbowMpointer">
            <a
            ><span class="txt">Elbow</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Elbow</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Arthroscopic Surgery</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Bone and Joint</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Orthopedics</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.fortishealthcare.com/india/clinical-speciality/rheumatology-211"
                    >Rheumatology</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="spineMpointer">
            <a
            ><span class="txt">Spine</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Spine</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/neurology"
                    >Neurology</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Orthopaedics
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Spine Surgery</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/general-surgery"
                    >General Surgery</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="stomachMpointer">
            <a
            ><span class="txt">Stomach</span
            ><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Stomach</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/gastroenterology-hepatology"
                    >Bariatric Surgery</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/gastroenterology-hepatology"
                    >GI Sciences</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/laparoscopic-surgery"
                    >Laparoscopic Surgery</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/general-surgery"
                    >General Surgery</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="hipMpointer">
            <a
            ><span class="txt">Hip</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Hip</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Bone and Joint</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Orthopaedics</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/gastroenterology-hepatology"
                    >Rheumatology</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="skinMpointer">
            <a
            ><span class="txt">Skin</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Skin</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/dermatology"
                    >Dermatology</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="kneeMpointer">
            <a
            ><span class="txt">Knee</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Knee</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Bone and Joint</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Orthopaedics</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="ankleMpointer">
            <a
            ><span class="txt">Ankle</span><span class="dot"></span
            ></a>
            <div class="right_txt">
              <p>Ankle</p>
              <div class="inner_dd">
                <ul class="bp_subdropdown">
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Bone and Joint</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://www.uhlbd.com/departments/orthopedics"
                    >Orthopaedics</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
    const MaleBodySVGReactElement = (
      <div className="structure dddd male">
        <img src="https://www.fortishealthcare.com/revised/images/man-structure.png" alt="" />
        <ul className="body_list left">
          <li className="eyeMpointer">
            <a><span className="txt">Eye</span><span class="dot"></span></a>
            <div className="right_txt">
              <p>Eye</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/ophthalmology">Ophthalmology (Eye Care)</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="earMPointer">
            <a><span className="txt">Ear</span><span class="dot"></span></a>
            <div className="right_txt">
              <p>Ear</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/ent--head-neck-surgery">ENT (Ear, Nose, Throat)</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="teethMpointer">
            <a><span className="txt">Teeth</span><span class="dot"></span></a>
            <div class="right_txt">
              <p>Teeth</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departmenthttps://www.uhlbd.com/departments/dentistrys/ent--head-neck-surgery">Dentistry</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="throatMpointer">
            <a><span className="txt">Throat</span><span class="dot"></span></a>
            <div className="right_txt">
              <p>Throat</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/ent--head-neck-surgery">ENT (Ear, Nose, Throat)</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="liverMpointer">
            <a><span className="txt">Liver</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Liver</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/gastroenterology-hepatology">Gastroenterology & Hepatology</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="handMpointer">
            <a><span className="txt">Arm</span><span class="dot"></span></a>
            <div className="right_txt">
              <p>Arm</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Arthroscopic Surgery</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Hand and upper limb surgery</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Orthopaedics</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/rheumatology-211">Rheumatology</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="kidneysMpointer">
            <a><span className="txt">Kidneys</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Kidneys</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/nephrologykidney">Nephrology (Kidney Centre)</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/kidney-transplant-590">Kidney Transplant</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/urology">Urology</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="lowerBackMpointer">
            <a><span className="txt">Lower Back</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Lower Back</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/neurology">Neurology</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Orthopaedics</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/rheumatology-211">Rheumatology</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Spine Surgery</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="thighMpointer">
            <a><span className="txt">Thigh</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Thigh</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Bone and Joint Surgery</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Orthopaedics</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="footMpointer">
            <a><span className="txt">Foot</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Foot</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Bone and Joint</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Orthopaedics</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/diabetes-endocrinology">Podiatry/ Diabetic Foot Care</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <ul className="body_list right">
          <li className="brainMpointer">
            <a><span className="txt">Brain</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Brain</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/neurology">Neurology</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/neurosurgery">Neurosurgery</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/psychiatry">Psychiatry</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="noseMpointer">
            <a><span className="txt">Nose</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Nose</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/ent--head-neck-surgery">ENT (Ear, Nose, Throat)</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="heartMpointer active">
            <a><span className="txt">Heart</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Heart</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/cardiology-228">Cardiac Sciences</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/cardiac-surgery-cardio-thoracic-vascular-surgery-498">Adult CTVS (Cardiothoracic and Vascular Surgery)</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/heart-transplant-585">Heart Transplant</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/cardiology-interventional-577">Interventional Cardiology</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/clinical-speciality/invasive-583">Invasive Cardiology</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/clinical-speciality/non-invasive-cardiology-542">Non-Invasive Cardiology</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/clinical-speciality/paediatric-cardiology-328">Paediatrics Cardiac Sciences</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/paediatrics-ctvs-cardiothoracic-and-vascular-surgery--598">Paediatrics CTVS (Cardiothoracic and Vascular Surgery)</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/clinical-speciality/vascular-surgery-226">Vascular surgery</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="lungMpointer">
            <a><span className="txt">Lungs</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Lungs</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/respiratory-medicine">Paediatrics Pulmonology</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/respiratory-medicine">Pulmonology</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/respiratory-medicine">Respiratory Medicine</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="elbowMpointer">
            <a><span className="txt">Elbow</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Elbow</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Arthroscopic Surgery</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Bone and Joint</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Orthopaedics</a>
                  </li>
                  <li>
                    <a href="https://www.fortishealthcare.com/india/clinical-speciality/rheumatology-211">Rheumatology</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="spineMpointer">
            <a><span className="txt">Spine</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Spine</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/neurology">Neurology</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Orthopaedics</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Spine Surgery</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/general-surgery">General Surgery</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="stomachMpointer">
            <a><span className="txt">Stomach</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Stomach</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/gastroenterology-hepatology">Bariatric Surgery</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/gastroenterology-hepatology">GI Sciences</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/laparoscopic-surgery">Laparoscopic Surgery</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/general-surgery">General Surgery</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="hipMpointer">
            <a><span className="txt">Hip</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Hip</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Bone and Joint</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Orthopaedics</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/gastroenterology-hepatology">Rheumatology</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="skinMpointer">
            <a><span className="txt">Skin</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Skin</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/dermatology">Dermatology</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="kneeMpointer">
            <a><span className="txt">Knee</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Knee</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Bone and Joint</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Orthopaedics</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="ankleMpointer">
            <a><span className="txt">Ankle</span><span className="dot"></span></a>
            <div className="right_txt">
              <p>Ankle</p>
              <div className="inner_dd">
                <ul className="bp_subdropdown">
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Bone and Joint</a>
                  </li>
                  <li>
                    <a href="https://www.uhlbd.com/departments/orthopedics">Orthopaedics</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
    return (
      <div>
        <section className="center-of-excellence">
          <div className="container">
            <h2>Center of Excellence</h2>
            <div className="row">
              <Slider {...settings}>
                {this.state.departments.length > 0
                  ?
                  this.state.departments.map(depart => {
                    let department_name = depart.department_name;
                    let new_department_name = department_name.replaceAll(' ', '-');
                    return (
                      <div className="col-sm-2 post-slide mb-3" key={depart.id}>
                        <a href={SITE_URL + '/department/' + new_department_name + '~' + depart.id} style={{ "text-decoration": "none", "color": "#333333" }}>
                          <div className="icon_sec" style={{ "width": "120px" }}>
                            {
                              depart.image
                                ?
                                <img src={IMAGE_URL + 'DepartmentImage/' + depart.image} alt="avtars" style={{ "border-radius": "30px" }} />
                                :
                                <img src={icon2} alt="avtars" width="100px" height="100px" />
                            }
                            <p>{depart.department_name}</p>
                          </div>
                        </a>
                      </div>
                    )
                  })
                  :
                  ''
                }
              </Slider>
            </div>
            <div className="tabs" id="tabs-mm">
              <div id="tab2" className="tab">
                <ul className="nav">
                  <li><a href="#tab1"><img src={male} alt="" /> Male</a></li>
                  <li className="active"><a href="#tab2" className="border-red"><img src={female} alt="" /> Female</a></li>
                </ul>
                <div className="text-areya">
                  <div className="fullinner" style={{ "backgroundImage": "url(https://www.fortishealthcare.com/revised/images/cs-bg.jpg)" }}>
                    <div className="inner">
                      <div className="row" style={{ "maxWidth": "100%" }}>
                        {FeMaleBodySVGReactElement}
                        {this.state.showFemaleComponent ?
                          <NewSingleFemaleBodyContent bodyTitle={this.state.bodyTitle} showOldFemaleComponent={this.state.showFemaleComponent} onClickFemalePrevStep={this.onClickFemalePrevStep} /> :
                          null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab1" className="tab">
                <ul className="nav">
                  <li className="active"><a href="#tab1"><img src={male} alt="" /> Male</a></li>
                  <li><a href="#tab2" className="border-red"><img src={female} alt="" /> Female</a></li>
                </ul>
                <div className="text-areya">
                  <div className="fullinner" style={{ "backgroundImage": "url(https://www.fortishealthcare.com/revised/images/cs-bg.jpg)" }}>
                    <div className="inner">
                      <div className="row" style={{ "maxWidth": "100%" }}>
                        {MaleBodySVGReactElement}
                        {this.state.showMaleComponent
                          ?
                          <NewSingleMaleBodyContent />
                          :
                          null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Slider {...testimonial_settings}>
              {this.state.testimonials.length > 0
                ?
                this.state.testimonials.map(testimonial => {
                  return (
                    <div>
                      <div className="row" id="saying">
                        {/*<div className="col-sm-12 mb-4">
                            <h2>{testimonial.testimonial_name}</h2>
                          </div>*/}
                        {/*<div className="col-sm-3 text-center">
                            { testimonial.doctor_profile
                              ?
                                <img src={IMAGE_URL+'/DoctorProfileImg/'+ testimonial.doctor_profile} alt="doc" style={{"border-radius": "110px"}}/>
                              :
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="doc" style={{"border-radius": "110px"}}/> 
                            }
                          </div>*/}
                        <div className="col-sm-9">
                          <div className="zubaida" >

                            <h3>{testimonial.author_name} {/*<span>(Cardiac Surgery)</span>*/}</h3>
                            <h5>{testimonial.testimonial_name}</h5>
                            {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit</p>*/}
                            <p className="text-chnage" dangerouslySetInnerHTML={{ __html: testimonial.testimonial_desc ? testimonial.testimonial_desc.substr(0, 150) : '' }}></p>
                          </div>
                        </div>
                        <div className="col-sm-3 mt-5 settings-mt-0">
                          <a href="/alltestimonials" className="see-more ">See More Patient Stories</a>
                        </div>
                      </div>
                    </div>
                  )
                })
                :
                ''
              }
            </Slider>
          </div>
        </section>
      </div>
    )
  }
}
export default NewCenterExcellence;