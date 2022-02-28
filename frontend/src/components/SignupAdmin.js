import React,{useState, Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {
    TextField,
    Button,
    Snackbar,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { instance } from '../utils/axios';
// import {withCookies} from 'react-cookie';

const SignupAdmin = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [company, setCompany] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('');
    const [showAlert, setShowAlert] = useState(false)
    // const [validatePassword, setValidatePassword] = useState(true)
    const [validateRePassword, setValidateRePassword] = useState(true)
    // const [passwordHelperTexts, setPasswordHelperTexts] = useState([])
    const [passwordTooShort, setPasswordTooShort] = useState(false)
    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
    const [passwordTooCommon, setPasswordTooCommon] = useState(false);    
    const [passwordTooSimilar, setPasswordTooSimilar] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);


    useEffect(()=>{
        if(signupSuccess){
            setShowAlert(true)
        }
    },[signupSuccess])




    const signup = async (username, email, password, re_password) =>{
        const config = {
            headers:{
                'Content-Type': 'application/json',               
                'Accept': 'application/json',               
            },
        }
        // const body = JSON.stringify({username, email, password, re_password})
        const body = {
            username,
            email, 
            password,
            re_password,
            company,
            employeeId,
            is_admin:true,
        }
        await instance.post(
            '/auth/users/',
            body,
            config
        )
        .then(res =>{
            if(200 <= res.status && res.status <= 299){
                setSignupSuccess(true)
                // setIsAuthenticated(true)
            }
        })
        .catch(err=>{
            console.log(err)
            if(err.response.status===400){

                if(err.response.data['email'] && err.response.data['email'].includes("user with this email already exists.")){
                    setEmailAlreadyExists(true)
                }else{
                    setEmailAlreadyExists(false)
                }
                if(err.response.data['password']&& err.response.data['password'].includes("This password is too common.")){

                    setPasswordTooCommon(true)
                }else{
                    setPasswordTooCommon(false)
                }
                if(err.response.data['password']&& err.response.data['password'].includes("The password is too similar to the username.")){

                    setPasswordTooSimilar(true)
                }else{
                    setPasswordTooSimilar(false)
                }
            }
        })
    };

    const handleSubmit = (event) =>{
        event.preventDefault()
        signup(username, email, password, rePassword)
        
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value)
        if(event.target.value.length < 8){
            setPasswordTooShort(true)


        }else{
            setPasswordTooShort(false)
        }
    }

    const handleRePassword = (event)=>{
        setRePassword(event.target.value)
        if(password !==event.target.value){
            setValidateRePassword(false)

        }else{

            setValidateRePassword(true)

        }
    }

    const handlePasswordHelperText = ()=>{
        let helperTexts = []
        
        if(passwordTooCommon){
            // passwordHelperTexts.push("パスワードが簡単すぎます")

            helperTexts.push("パスワードが簡単すぎます。")
        }
        if(passwordTooShort){
            helperTexts.push("8文字以上にしてください。")
        }
        if(passwordTooSimilar){
            helperTexts.push("パスワードとユーザー名が似すぎています。")
        }

        return (
                helperTexts.map((text)=>{
                    return (
                        <Fragment>
                            {text}<br/>
                        </Fragment>

                    )
                })
        )
        // if(emailAlreadyExists){
        //     // renderTexts.push("そのメールアドレスはすでに登録されています。")
        // }
    }

    const handleAlertClose = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
        setShowAlert(false)
    }

    





    return (
        <div style={{maxWidth:600, margin:"0 auto"}}>
            <div
                style={{
                    marginBottom:30,
                    fontSize:24,
                }} 
            >
                会社・管理者登録
            </div>                        
            
            <form onSubmit={(e) =>handleSubmit(e)} style={{width:"100%", marginBottom:30}}>

                {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                <div style={{marginBottom:20}}>
                    <div>
                        会社名
                    </div>
                    <TextField  
                        required
                        fullWidth 
                        variant="outlined"
                        value={company}
                        onChange={(e)=>setCompany(e.target.value)}
                    />
                </div>
                {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                
                <div style={{marginBottom:20}}>
                    <div>
                        社員ID
                    </div>
                    <TextField  
                        // required
                        fullWidth 
                        variant="outlined"
                        value={employeeId}
                        onChange={(e)=>setEmployeeId(e.target.value)}
                    />
                </div>
                <div style={{marginBottom:20}}>
                    <div>
                        氏名
                    </div>
                    <TextField  
                        required
                        fullWidth 
                        variant="outlined"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>

                <div style={{marginBottom:20}}>
                    <div>
                        メールアドレス
                    </div>
                    <TextField  
                        fullWidth 
                        variant="outlined"
                        required
                        type="email"
                        value={email}
                        error={emailAlreadyExists}
                        helperText={emailAlreadyExists?"そのメールアドレスはすでに登録されています。":null}
                        onChange={(e)=>setEmail(e.target.value)}

                    />
                </div>

                <div style={{marginBottom:30}}>
                    <div>
                        パスワード（8文字以上）
                    </div>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        value={password}
                        error={passwordTooShort || passwordTooCommon}
                        helperText={passwordTooShort  || passwordTooCommon?handlePasswordHelperText():null}
                        onChange={handlePassword}

                    />
                </div>               
                <div style={{marginBottom:30}}>
                    <div>
                        パスワード（再入力）
                    </div>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        error={!validateRePassword}
                        helperText={!validateRePassword?"パスワードが一致しません。":null}
                        value={rePassword}
                        onChange={handleRePassword}

                    />
                </div>                     
                <Button 
                    fullWidth
                    variant="contained" 
                    type="submit"
                    style={{
                        marginBottom:10, 
                        fontSize:18,
                        border:"none",
                        backgroundColor:"#11b717",
                        color:"#ffffff",
                    }}

                >
                    登録
                </Button>

            </form>
            <div>
                <Link 
                    to="/login"
                    // style={{
                    //     marginBottom:50, 
                    // }}
                
                >ログインはこちら</Link>
            </div>


            <Snackbar open={showAlert}  onClose={handleAlertClose}>
            <Alert variant="filled" onClose={handleAlertClose} severity="success">
                メールを送信しました。確認してアカウントを有効化してください。
            </Alert>
               
            </Snackbar>

            
        </div>
    )
}

export default SignupAdmin
