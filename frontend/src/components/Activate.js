import React, {useState, useEffect} from 'react'
import {
    Typography,
} from '@mui/material';
import {Link} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const Activate = () => {
    const [verified, setVerified] = useState(false);
    let {uid, token} = useParams();
    const verify = async (uid, token) =>{
        const config = {
            headers:{
                'Content-Type': 'application/json',               
            },
        }

        const body = JSON.stringify({uid, token})

        await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
            body,
            config,
        )
        .then(res=>{
            setVerified(true)
        })
        .catch(err=>{
        })
    };


    const activate = () =>{
        verify(uid, token)
    }

    useEffect(()=>{
        activate()
    },[])

    
    return (
        <div style={{margin:"0 auto",width:"80%"}}>
            {verified?
                <Alert fullWidth severity="success" style={{marginBottom:30}}>
                    アカウントが有効化されました。</Alert>
            :
                <Typography>
                    アカウントを有効化しています。少々お待ちください...
                </Typography>
            }
            <Link to='/'>トップページに戻る</Link>
            
        </div>
    )
}

export default Activate
