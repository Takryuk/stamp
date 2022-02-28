import React, {useEffect} from 'react'
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import {
    loadUser,
} from '../actions/userActions';
import {useDispatch} from 'react-redux';
import {withCookies} from 'react-cookie';
import AlertMessage from '../components/AlertMessage';

const Layout = ({children, cookies}) => {

    const dispatch = useDispatch()
    let location = useLocation();

    useEffect(()=>{
        dispatch(loadUser(cookies))
    },[])

    return (
        <div>
            <Navbar/>
            <Container maxWidth="lg">
                {location.state?<AlertMessage location={location}/>:null}
                {children}
            </Container>
            
        </div>
    )
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      // console.log(params)
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

export default  withRouter(withCookies(Layout));
