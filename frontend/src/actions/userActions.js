import axios from 'axios'
import {
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

} from '../constants/userConstants'

export const loadUser = (cookies)=>async (dispatch)=>{

    dispatch({
        type:USER_LOGIN_REQUEST
    })     
    dispatch({
        type:USER_LOAD_REQUEST
    }) 

    const config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `JWT ${cookies.get('jwt-access')}`,
            'Accept': 'application/json',               
        },
    }

    await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`, 
        config,
    ).then(res=>{
        dispatch({
            type:USER_LOAD_SUCCESS,
            payload:res.data,
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
        })
    })
    .catch(err=>{
        dispatch({
            type:USER_LOAD_FAIL,
        })

        dispatch({
            type:USER_LOGIN_FAIL,
        })
    })

};

export const logout = (history, cookies) => async(dispatch) => {
    cookies.remove('jwt-access', {path:'/', domain: "localhost"})
    cookies.remove('jwt-refresh', {path:'/', domain: "localhost"})

    await axios.get(
        `${process.env.REACT_APP_API_URL}/logout/`, 
    ).then(res=>{
        cookies.remove('csrftoken', {path:'/', domain: "localhost"})

    })
    .catch(err=>{
    })

    dispatch({ type: USER_LOGOUT })

    history.push({
        pathname:'/',
        state:{
            messages:[
                {
                    severity:"success",
                    message:"ログアウトしました。"
                }
            ]
        }
    })
    
}