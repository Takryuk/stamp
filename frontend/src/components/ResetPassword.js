import React, { useState } from 'react';
import {fontFamily, } from '../css/css.js';
import Button from '@mui/material/Button';
import {withCookies} from 'react-cookie';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const ResetPassword = (props) => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false)

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        resetPassword(email);
    };

    const resetPassword = async(email) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',                
                'X-CSRFToken':props.cookies.get('csrftoken'),

            }
        };
        const body = JSON.stringify({ email });
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
    
            // dispatch({
            //     type: PASSWORD_RESET_SUCCESS
            // });
            setPasswordResetSuccess(true)
        } catch (err) {
            // dispatch({
            //     type: PASSWORD_RESET_FAIL
            // });
        }
    };

    return (
        <div >
            {passwordResetSuccess? 
                <Alert severity="success">
                    メールを送信しました。確認してアカウントを有効化してください。
                </Alert>
            :null}

            <div
                style={{
                    fontSize:20,
                    marginBottom:30,
                    textAlign:"center",
                }}
            >
                パスワード再設定のため登録時のメールアドレスを入力してください。
            </div>
            <form onSubmit={e => onSubmit(e)}>
                <div
                    style={{
                        maxWidth:600,
                        margin:"0 auto",
                        // display:"flex",
                        // justifyContent:"center",
                    }}
                >
                    <input
                        type='email'
                        placeholder='メールアドレス'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                        style={{
                            padding:6,
                            width:"100%",
                            display:"block",
                            // border:"1px solid",
                            borderRadius: 4,
                            border: "none",
                            boxShadow: "0 0 0 1px #ccc inset",
                            appearance: "none",
                            "-webkit-appearance": "none",
                            "-moz-appearance": "none",
                            resize:"none",
                            marginBottom:30, 
                            fontFamily:fontFamily.body,
                            fontSize:15,
                            "-webkit-box-sizing": "border-box",
                            boxSizing: "border-box",
                            // marginRight: "auto",
                            // marginLeft: "auto",

    
                        }}
                    />
                    <Button 
                        fullWidth
                        variant="contained" 
                        type="submit"
                        style={{
                            display:"block",
                            marginBottom:30, 
                            fontSize:15,
                            border:"none",
                            backgroundColor:"#11b717",
                            color:"#ffffff",
                            // margin: "0 auto",

                        }}

                    >
                        パスワード再設定
                    </Button>                
                </div>
            </form>
        </div>
    );
};

export default withCookies(ResetPassword);
