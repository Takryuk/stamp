import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {withCookies} from 'react-cookie';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom';

const ResetPasswordConfirm = ({match, cookies}) => {
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    let {uid, token} = useParams();

    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setRenewPassword] = useState('')

    const onSubmit = event => {
        event.preventDefault();

        resetPasswordConfirm(uid, token, newPassword, reNewPassword);
    };

    const resetPasswordConfirm = async(uid, token, newPassword, reNewPassword) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':cookies.get('csrftoken'),

            }
        };
    
        const body = JSON.stringify(
            {
                uid, 
                token, 
                new_password:newPassword, 
                re_new_password:reNewPassword,
            }
        );
    
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
            setPasswordChangeSuccess(true);
    
            // dispatch({
            //     type: PASSWORD_RESET_CONFIRM_SUCCESS
            // });
        } catch (err) {
            console.log(err)
            // dispatch({
            //     type: PASSWORD_RESET_CONFIRM_FAIL
            // });
        }
    };

    if (passwordChangeSuccess) {
        return <Navigate to='/' />
    }

    return (
        <div>
            <form 
                onSubmit={e => onSubmit(e)}
                style={{
                    marginBottom:30, 
                    marginLeft:"auto",
                    marginRight:"auto",
                    maxWidth:600,
                }}
            >
            <div
                style={{
                    fontSize:20,
                    marginBottom:30,
                }}
            >
                パスワード再設定
            </div>
                <div 
                    style={{
                        marginBottom:30, 

                    }}
                >
                    <div>
                        新しいパスワード
                    </div>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        minLength='6'
                    />
                </div>                     
                <div 
                    style={{
                        marginBottom:30, 
                        maxWidth:600,
                    }}
                >
                    <div>
                        新しいパスワード（再入力）
                    </div>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        value={reNewPassword}
                        onChange={e => setRenewPassword(e.target.value)}
                        minLength='6'
                    />
                </div>   
                <Button 
                    fullWidth
                    variant="contained" 
                    type="submit"
                    onSubmit={onSubmit}
                    style={{
                        marginBottom:30, 
                        fontSize:18,
                        border:"none",
                        backgroundColor:"#11b717",
                        color:"#ffffff",
                    }}

                >
                    パスワードリセット
                </Button>            
            </form>
        </div>
    );
};

export default withCookies(ResetPasswordConfirm);
