import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { initUser } from './actions/userActions';
//import { API_TOKEN_NAME, LOGIN_PAGE_PATH, IS_ACTIVE, USER_ID} from './constants';
import './css/style.css';
import './css/newstyle.css';
import './css/dashboardstyle.css';
import './css/responsive.css';
import './css/bodypartcss/style.css';
//import './css/bodypartcss/devcustom.css';
//import './css/bodypartcss/custom.css';
//import servernode from '../server.js';
//import './assets/scss/app.scss';
//import './assets/css/topbar.css';
//import './assets/css/vertical.css';
//import './assets/css/custom.css';

let dynUrl;
let dynAdmUrl;
let dynUrlSms;
if(window.location.hostname ==='localhost'){
    dynAdmUrl = 'http://localhost/reactjs/unitedhospitalapi/api';
    //dynUrl = 'http://localhost/reactjs/demoreactapibackend/api';
    //dynUrl = 'https://cors-anywhere.herokuapp.com/http://45.64.132.130:3388/zab';
    //dynUrl = 'http://45.64.132.130:3388/zab';
    //dynUrl = 'https://cors-anywhere.herokuapp.com/http://45.64.132.149:3388/zab';
    dynUrl = 'http://45.64.132.149:3388/zab';
    dynUrlSms = 'http://etherstaging.com/unitedhospitalapi/api';
} else {
    dynAdmUrl = 'http://etherstaging.com/unitedhospitalapi/api';
    //dynUrl = 'http://localhost/reactjs/demoreactapibackend/api';
    //dynUrl = 'https://cors-anywhere.herokuapp.com/http://45.64.132.130:3388/zab';
    //dynUrl = 'http://45.64.132.130:3388/zab';
    //dynUrl = 'https://cors-anywhere.herokuapp.com/http://45.64.132.149:3388/zab';
    dynUrl = 'http://45.64.132.149:3388/zab';
    dynUrlSms = 'http://etherstaging.com/unitedhospitalapi/api';
}

export const scAxios = axios.create({
    baseURL: dynUrl,
});

export const scAxiosAdmin = axios.create({
    baseURL: dynAdmUrl,
});

export const scAxiosSMS = axios.create({
    baseURL: dynUrlSms,
});

export const thirdparty = axios.create({
    baseURL: 'http://',
});
const store = configureStore();
store.dispatch(initUser());


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();

