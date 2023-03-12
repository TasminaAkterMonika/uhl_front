//import { TWENTY_MINUTES_TIME_IN_MILLISECONDS, API_TOKEN_NAME, API_TOKEN_EXPIRY_NAME, USER_ROLE, USER_ID, USER_CREATED_BY, USER_EMAIL, IS_ACTIVE, RGSTEP1, RGSTEP2, RGSTEP3, RGSTEP4, LOGIN_PHONE_NUMBER, SEARCH_SELECTED_DOC_ID, SCHEDULE_DATE, APPOINTMENT_ID, DOCTOR_NAME, DOCTOR_FEES, PATIENT_NAME, SCHEDULE_TIME } from "./constants";
import { TWENTY_MINUTES_TIME_IN_MILLISECONDS, API_TOKEN_NAME, API_TOKEN_EXPIRY_NAME, USER_ID, LOGIN_PHONE_NUMBER, SEARCH_SELECTED_DOC_ID, SCHEDULE_DATE, APPOINTMENT_ID, DOCTOR_NAME, DOCTOR_FEES, PATIENT_NAME, SCHEDULE_TIME, SEARCH_SELECTED_DOC_NAME, DOCTOR_PROFILE_AVABILITY } from "./constants";
import { scAxios } from "./";

let userTokenRefreshIntervalId = '';

const userTokenRefreshApi = () => {
    return new Promise((resolve, reject) => {
        const req = scAxios.request('/refresh', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
            },
        });

        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
}

export const userTokenRefreshInterval = () => {
    userTokenRefreshApi()
        .then(res => {
             /* eslint-disable */
            startUserSession(res.access_token);
        })
        .catch(err => {
            console.log('Error refreshing user token.', err);
            alert('Error refreshing user token.', err);
        })
}
export const startUserSession = (token, user_id, login_phone_number, search_selected_doc_id, schedule_date, apointment_id, doctor_name, doctor_fees, patientName, schedule_time, search_selected_doc_name, doctor_profile_avability) => {
    localStorage.setItem(API_TOKEN_NAME, token);
    //localStorage.setItem(USER_ROLE, user_role);
    localStorage.setItem(USER_ID, user_id);
    localStorage.setItem(LOGIN_PHONE_NUMBER, login_phone_number);
    localStorage.setItem(SEARCH_SELECTED_DOC_ID, search_selected_doc_id);
    localStorage.setItem(SCHEDULE_DATE, schedule_date);
    localStorage.setItem(APPOINTMENT_ID, apointment_id);
    localStorage.setItem(DOCTOR_NAME, doctor_name);
    localStorage.setItem(DOCTOR_FEES, doctor_fees);
    localStorage.setItem(PATIENT_NAME, patientName);
    localStorage.setItem(SCHEDULE_TIME, schedule_time);
    localStorage.setItem(SEARCH_SELECTED_DOC_NAME, search_selected_doc_name);
    localStorage.setItem(DOCTOR_PROFILE_AVABILITY, doctor_profile_avability);
    //localStorage.setItem(USER_EMAIL, user_email);
    //localStorage.setItem(IS_ACTIVE, isActive);

    /*localStorage.setItem(RGSTEP1, reg_step_1);
    localStorage.setItem(RGSTEP2, reg_step_2);
    localStorage.setItem(RGSTEP3, reg_step_3);
    localStorage.setItem(RGSTEP4, reg_step_4);*/

    

    let datetime = new Date();
    datetime.setMinutes(datetime.getMinutes() + 999);
    localStorage.setItem(API_TOKEN_EXPIRY_NAME, datetime);

    clearInterval(userTokenRefreshIntervalId);
    userTokenRefreshIntervalId = setInterval(userTokenRefreshInterval, TWENTY_MINUTES_TIME_IN_MILLISECONDS);
}

export const endUserSession = () => {
    clearInterval(userTokenRefreshIntervalId);
    localStorage.clear();
}