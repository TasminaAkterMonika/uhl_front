import React, { Component } from 'react';
import {API_TOKEN_NAME, IMAGE_URL} from '../../../constants';
import { scAxiosAdmin } from '../../..';
import potrait from '../../../images/potrait.webp';
import Slider from "react-slick";

const getPublications = () => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/publications/getpublications', {
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
class PublicationsSlide extends Component {
  state = {
    publicationsData:[],
  }
  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value,
    });
  }
  refreshGetPublicationsData = () => {
    getPublications()
    .then(res => {
      if(res.status === true){
        var records = res.data;
        this.setState({
          publicationsData: records,
        });
      } else {
        this.setState({
          publicationsData: '',
        });
      }
    })
    .catch(err => {
     console.log(err);
    });
  }
  componentDidMount(){
    this.refreshGetPublicationsData();
  }
  render() {
    let crousel_row_number = '';
    if(this.state.publicationsData.length < 8){
      crousel_row_number = 1;
    } else {
      crousel_row_number = 2;
    }
    const settings = {
      rows: crousel_row_number,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay:true,
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
    return(
      <div>
        <section className="news-events hr-lines" id="Publications">
          <div className="container">
            <h2 className="border-bottom Publications">Publications</h2>
            <div className="row">
              <div className="col-md-12 right-sp-1">
                <div className="publication_crousel">
                  <div className="row">
                    <Slider {...settings}>
                      {this.state.publicationsData.length > 0
                        ?
                          this.state.publicationsData.map(publications_data => {
                            let publications_title = publications_data.publications_title;
                            let new_publications_title = publications_title.replaceAll(' ', '-');
                            return(
                              <div className="col-sm-3 post-slide" key={publications_data.id}>
                                <a href={'/singlepublications/'+new_publications_title+'~'+publications_data.id} style={{"textDecoration": "none"}}>
                                  <div className="img-back-pub">
                                    <img src={publications_data.publications_pic ? IMAGE_URL+'PublicationsImg/'+publications_data.publications_pic : potrait} alt="potrait" style={{"minHeight": "210px", "height":"210px"}}/>
                                    <div className="areya-contant">
                                      <p title={publications_data.publications_title}>{publications_data.publications_title.substr(0, 18)+'...'}</p>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            )
                          })
                        :
                          <div className="col-sm-12 post-slide">
                            <div className="img-back-pub">
                              <p>Data Not Found</p>
                            </div>
                          </div>
                      }
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default PublicationsSlide;