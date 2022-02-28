import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
// import axios from 'axios';
import {instance} from '../utils/axios';
import {withCookies} from 'react-cookie';

const HomeAnonymous = (props) => {

    const baseBtnStyle = {
        margin:"0 auto",
        fontSize:18,
        display:"flex",
        width:400,
        height:60,
    }

    const handleStamp = async(mode)=>{
        await instance.post('/stamp/update',
        {
            'mode':mode
        },{
            'Authorization':`JWT ${props.cookies.get('jwt-access')}`,
        })
    }
    

    return (
        <div
            style={{
                paddingTop:1,
            }}
        >
            <Button
                variant="outlined" 
                type="submit"
                component={RouterLink} 
                to="/login"
                style={{
                    ...baseBtnStyle,
                    // backgroundColor:"#2196f3",
                    marginTop:30,
                }}
                onClick={()=>handleStamp(0)}
            >
                ログイン
            </Button>

            <Button
                variant="outlined" 
                type="submit"
                component={RouterLink} 
                to="/signup-admin"
                style={{
                    ...baseBtnStyle,
                    marginTop:30,
                    // backgroundColor:"#11b717",
                }}
                onClick={()=>handleStamp(1)}
            >
                登録
            </Button>
        </div>
    )
}

export default withCookies(HomeAnonymous)
