import * as types from '../actions/actionTypes';

import initialState from './initialState';


export default (state = initialState.user, action) => {
    switch (action.type) {
        case types.USER_INIT:
            return { ...state };

        case types.USER_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.user
            };

        case types.USER_LOGIN_ERROR:
            alert('login error');
            return {
                ...state,
            };

        case types.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                ...initialState.user
            };

        case types.USER_LOGOUT_ERROR:
            alert('logout error');
            return {
                ...state,
            };

        default:
            return state;
    }
}
