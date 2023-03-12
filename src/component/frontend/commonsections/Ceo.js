import React, { Component } from 'react';
import sign from '../../../images/sign.png';
import ceo from '../../../images/ceo.jpg';

class Ceo extends Component {
  render() {
    return(
      <div>
        <section className="ceo-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-7">
                <div className="sspp">
                  <h3>Message From The C.E.O </h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. </p>
                  <img src={sign} alt="sign" />
                </div>
              </div>
              <div className="col-sm-5">
                <img src={ceo} alt="ceo" className="ceo-img" />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default Ceo;