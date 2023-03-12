import React, {Component} from "react";
import {API_TOKEN_NAME, IMAGE_URL, SITE_URL} from '../../../constants';
import { scAxiosAdmin } from '../../..';
import $ from 'jquery';

class NewSingleMaleBodyContent extends Component {
  handleChange = event => {
        this.setState({
              [event.target.name]: event.target.value,
        });
  }
  render(){
    return(
      <div className="structure male">
        <img src="https://www.fortishealthcare.com/revised/images/man-structure.png" alt=""/>
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
    )
  }
}
export default NewSingleMaleBodyContent;