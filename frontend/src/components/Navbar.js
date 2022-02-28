import React, { Fragment} from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
    Button,
} from '@mui/material';

import {withCookies} from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../actions/userActions';
import { useNavigate } from "react-router-dom";
import {fontFamily} from '../css/css';


const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: 30,
    },
  }));


const Navbar = (props) => {

    const classes = useStyles();
    const {isAuthenticated} = useSelector(state=>state.userLogin)
    const history = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector(state=>state.userInfo)

    // console.log(userInfo)
    // console.log(userInfo)

    const handleLogout =()=>{
        dispatch(logout(history, props.cookies))
    }

    if(!userInfo){
        return <div></div>
    }

    if (userInfo && userInfo.isLoading){
        return <div></div>
    }
    return (
        <Fragment>
            <div 
                className={classes.root}
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",

                    backgroundColor:"#F27200"
                }}
            >
                <Button 
                    className={classes.title} 
                    component={RouterLink} to="/"
                    color="inherit"
                    style={{
                        // fontFamily:fontFamily.h1,
                        fontSize:24,
                        color:"#fff",
                        marginLeft:20,

                    }}
                >
                    Stamp app
                </Button>

                <div 
                    style={{
                        marginRight:30,
                        // margin:"0 0 0 auto"
                    }} 
                    
                >
                    {isAuthenticated?(
                        <Fragment>                        
                            {userInfo.profile_is_admin?(
                                <Fragment>
                                    <Button 
                                    component={RouterLink} 
                                    to='/list' 
                                    style={{
                                        fontFamily:fontFamily.body,
                                        color:"#ffffff",
                                    }}
                                    >
                                        打刻一覧
                                    </Button>
                                    <Button 
                                    component={RouterLink} 
                                    to='/signup-employee' 
                                    style={{
                                        fontFamily:fontFamily.body,
                                        color:"#ffffff",
                                    }}
                                    >
                                        社員アカウント作成
                                    </Button>                                
                                </Fragment>
                            ):null}

                            <Button 
                                component={RouterLink} 
                                to='/myaccount' 
                                style={{
                                    fontFamily:fontFamily.body,
                                    color:"#ffffff",
                                }}

                            >
                                アカウント
                            </Button>
                            <Button 
                                onClick={handleLogout} 
                                style={{
                                    fontFamily:fontFamily.body,
                                    color:"#ffffff",
                                }}
                            >
                                ログアウト
                            </Button>
                        </Fragment>
                    ):(
                        <Fragment>
                            <Button 
                                component={RouterLink} 
                                to='/signup-admin' 
                                color="inherit"
                                style={{
                                    fontFamily:fontFamily.body,
                                    color:"#ffffff"
                                }}
                            >
                                登録
                            </Button>
                            <Button 
                                component={RouterLink} 
                                to='/login' 
                                color="inherit"
                                style={{
                                    fontFamily:fontFamily.body,
                                    color:"#ffffff"
                                }}
                            >
                                ログイン
                            </Button>
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default withCookies(Navbar);
