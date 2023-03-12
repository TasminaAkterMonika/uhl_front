import React, { Component } from 'react';
import {API_TOKEN_NAME, IMAGE_URL} from '../../../constants';
import { scAxiosAdmin } from '../../..';
import news_events_1 from '../../../images/news_events_1.png';
import Slider from "react-slick";

const getNewsEvents = () => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/newsevents/getnewsevents', {
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
class NewsEventsSlide extends Component {
  state = {
    newsEventData:[],
  }
  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value,
    });
  }
  refreshGetNewsEventsData = () => {
    getNewsEvents()
    .then(res => {
      if(res.status === true){
        var records = res.data;
        this.setState({
          newsEventData: records,
        });
      } else {
        this.setState({
          newsEventData: '',
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  componentDidMount(){
    this.refreshGetNewsEventsData();
  }
  render() {
    let crousel_row_number = '';
    if(this.state.newsEventData.length < 8){
      crousel_row_number = '1';
    } else {
      crousel_row_number = '2';
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
        <section className="news-events" id="hr-lines">
          <div className="container">
            <h2>News &amp; Events</h2>
            <hr />
            <div className="row">
              <div className="col-md-12 right-sp-1">
                <div className="news_section">
                  <div className="row">
                    <Slider {...settings}>
                      {
                        this.state.newsEventData.length > 0
                        ?
                          this.state.newsEventData.map(newsevent_data =>{
                            let news_events_title = newsevent_data.news_events_title;
                            let new_news_events_title = news_events_title.replaceAll(' ', '-');
                            return(
                              <div className="col-sm-3 post-slide" key={newsevent_data.id}>
                                <a href={'/singlenewsevents/'+new_news_events_title} style={{"textDecoration": "none"}}>
                                  <div className="news-part" style={{"paddingLeft":"0px", "paddingRight":"0px"}}>
                                    <img src={newsevent_data.news_events_pic ? IMAGE_URL+'NewsEventsImg/'+newsevent_data.news_events_pic : news_events_1} alt="news_events_1" style={{"minHeight": "172px"}}/>
                                    <div className="bg-color-back" style={{"width": "100%", "paddingBottom":"0px"}}>
                                      <p className="news_events_title" title={newsevent_data.news_events_title}>{newsevent_data.news_events_title ? newsevent_data.news_events_title.substr(0,35)+'...' : ''}</p>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            )
                          })
                        :
                          <div className="col-sm-12 post-slide">
                            <div className="news-part">
                              <div className="bg-color-back">
                                <p>No any news & events founds</p>
                              </div>
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
export default NewsEventsSlide;