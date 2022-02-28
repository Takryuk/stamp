import React from 'react'
import {Navigate } from 'react-router-dom';
import {useSelector } from 'react-redux'


const PrivateRoute = ({children}) => {

     const {isAuthenticated, isLoading} = useSelector(state=>state.userLogin) 

    if(isLoading){
        return  <div></div>;
    }
    if(isAuthenticated){
        return children
    }

    

    return <Navigate to='/'/>

}

export default PrivateRoute
