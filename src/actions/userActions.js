import * as types from './actionTypes';

export const initUser = () => ({ type: types.USER_INIT });
export const userLoginSuccess = (user) => ({ type: types.USER_LOGIN_SUCCESS, user });
export const userLoginError = (error) => ({ type: types.USER_LOGIN_ERROR, error });
export const userLogoutSuccess = () => ({ type: types.USER_LOGOUT_SUCCESS });
export const userLogoutError = (error) => ({ type: types.USER_LOGOUT_ERROR, error });

/* helper functions */


/* thunk functions */

export const loadCars = () => {
    return async dispatch => {
        /* to place a api call and dispatch action*/
    }
}
