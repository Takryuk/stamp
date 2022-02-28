import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,

    USER_LOGOUT,
} from '../constants/userConstants'


export const userLoginReducer = (state = {isAuthenticated:false, isLoading:true}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {...state, isLoading: true }

        case USER_LOGIN_SUCCESS:
            return {...state, isLoading:false, isAuthenticated:true}

        case USER_LOGIN_FAIL:
            return {...state, isLoading:false, isAuthenticated:false}

        case USER_LOGOUT:
            return {...state, isLoading:false, isAuthenticated:false}

        default:
            return state
    }
}

export const userInfoReducer = (state = null, action) => {
    switch (action.type) {
        case USER_LOAD_SUCCESS:
            return {...action.payload, isLoading:false}

        case USER_LOAD_REQUEST:
            return {...state, isLoading:true}

        case USER_LOAD_FAIL:
        case USER_LOGOUT:
            return {...state, isLoading:false}

        default:
            return state
    }
}

