import React from 'react'
import {withCookies} from 'react-cookie';
import {useSelector } from 'react-redux';
import HomeAnonymous from './HomeAnonymous';
import HomeAuthenticated from './HomeAuthenticated';


const Home = (props) => {
    const {isAuthenticated, isLoading} = useSelector(state=>state.userLogin)

    if(isLoading){
        return  <div></div>;
    }
    if(isAuthenticated){
        return <HomeAuthenticated/>
    }
    return <HomeAnonymous/>
}

export default withCookies(Home)
