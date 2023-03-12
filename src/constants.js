export const HOME_PAGE_PATH = '/';
export const LOGIN_PAGE_PATH = '/login';
export const ADMIN_LOGIN_PAGE_PATH = '/adminlogin';
export const TWENTY_MINUTES_TIME_IN_MILLISECONDS = '59940000';
export const API_TOKEN_NAME = 'api_token';
export const API_TOKEN_EXPIRY_NAME = 'api_token_expiry';
export const API_AUTH_USERNAME = 'OSL';
export const API_AUTH_PASSWORD = 'osl@2022';
export const USER_ROLE = 'USER_ROLE';
export const USER_ID = 'USER_ID';
export const USER_EMAIL = 'USER_EMAIL';
export const LOGIN_PHONE_NUMBER = 'login_phone_number';
export const SEARCH_SELECTED_DOC_ID = 'search_selected_doc_id';
export const SCHEDULE_DATE = 'schedule_date';
export const APPOINTMENT_ID = 'apointment_id';
export const DOCTOR_NAME = 'doctor_name';
export const DOCTOR_FEES = 'doctor_fees';
export const PATIENT_NAME = 'patient_name';
export const SCHEDULE_TIME = 'schedule_time';
export const SEARCH_SELECTED_DOC_NAME = 'search_selected_doc_name';
export const DOCTOR_PROFILE_AVABILITY = 'doctor_profile_avability';

let dynUrl;
let imgUrl;
let Pageurl;
let siteUrl;
if(window.location.hostname ==='localhost'){
	imgUrl = 'http://localhost/reactjs/unitedhospitalapi/public/';
	dynUrl = 'http://localhost/reactjs/demoreactapibackend/api'; 
	Pageurl = 'http://localhost:3000/pages/';
	siteUrl = 'http://localhost:3000';
} else {
	imgUrl = 'http://etherstaging.com/unitedhospitalapi/public/';
   	dynUrl = 'http://etherstaging.com/unitedhospitalapi//api';
   	Pageurl = 'http://etherstaging.com/pages/'; 
   	siteUrl = 'http://etherstaging.com';
}

export const IMAGE_URL = imgUrl;
export const BASE_URL = dynUrl;
export const WEBSITEPAGE_URL = Pageurl;
export const SITE_URL = siteUrl;
export const PROFILE_URL = 'http://etherstaging.com/unitedhospitalapi';
