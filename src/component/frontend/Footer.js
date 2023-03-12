import React, { Component } from 'react';
class Footer extends Component {
  render() {
    return (
      <div className="footer-part" >
        <div className="container">
          <div className="row">
            <div className="col-sm-3 colum-1">
              <div className="united-hospital">
                <h3>United Hospital</h3>
                <p>Plot 15, Road 71, Gulshan <br />Dhaka 1212, Bangladesh</p>
                <div className="Chittagong-part">
                  <h3>Chittagong Info Center</h3>
                  <p>23/A, M M Ali Road, Golpahar Moor <br />Mehdibag, Chittagong.<br />Cell: <a href="tel:01914001211">01914001211</a> </p>
                </div>
                <h3>Sylhet Info Center</h3>
                <p>21 Niloy, Gour Govinda Tila Road<br />
                  (Behind the Muktijoddha Complex, <br />
                  Near Noorjahan Clinic),<br />
                  Chowhatta, Sylhet <br />
                  Cell: <a href="tel:01914001211">01914001211</a></p>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="united-hospital">
                <p><a href="/BriefHistory">Brief History </a></p>
                <p><a href="/MissionStatement">Mission Statement</a></p>
                <p><a href="/BoardMembers">Board Members </a></p>
                <p><a href="/PeopleDiversity">People &amp; Diversity </a></p>
                <p><a href="#">Operation Team </a></p>
                <h3>MEDIA CENTER</h3>
                <p><a href="#">Latest News</a></p>
                <p><a href="#">Publications </a></p>
                <p><a href="#">Notice Board</a></p>
                <h3>GALLERY</h3>
                <p><a href="#">Photo Gallery </a></p>
                <p><a href="#">Video Gallery</a></p>
                <p><a href="#">Life at UHL </a></p>
              </div>
            </div>
            <div className="col-sm-3 col-6 colum-3" style={{ "margin-top": "-17px" }}>
              <div className="united-hospital">
                <h3>CAREER</h3>
                <p><a href="#">Job Openings </a></p>
                <p><a href="#">Application Form </a></p>
                <p><a href="#">CV Upload </a></p>
                <h3>CONTACT</h3>
                <p><a href="#">Basic Information</a></p>
                <p><a href="#">Location Map</a></p>
                <p><a href="#">Write to us </a></p>
                <h3>APPOINTMENT <br />PHONE NUMBER:</h3>
                <p><a href="tel:10666">10666</a></p>
                <p><a href="tel:10666"> 02 22 22 62 466 </a></p>
              </div>
            </div>
            <div className="col-sm-3">
              <p><a href="/terms-conditions">Terms &amp; Conditions</a></p>
              <p><a href="/privacy-policy">Privacy Policy</a></p>
              <p><a href="/declaration">Disclaimer </a></p>
              <p><a href="#">Sitemap </a></p>
              <p><a href="#">Webmail</a></p>
              <p><a href="https://www.united.com.bd">United Group</a></p>
              <p><a href="#">StanChart</a></p>
              <p><a href="#">EBL </a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Footer;