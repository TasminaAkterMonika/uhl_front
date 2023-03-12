import React, {Component} from "react";
import {API_TOKEN_NAME, IMAGE_URL, SITE_URL} from '../../../constants';
import { scAxiosAdmin } from '../../..';
import $ from 'jquery';

class NewSingleFemaleBodyContent extends Component {
  handleChange = event => {
        this.setState({
              [event.target.name]: event.target.value,
        });
  }
  render(){
    return(
      <div className="structure female">
        <img src="https://www.fortishealthcare.com/revised/images/woman-structure.png" alt=""/>
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
    )
  }
}
export default NewSingleFemaleBodyContent;