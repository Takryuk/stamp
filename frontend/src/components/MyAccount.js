import React , {useState, Fragment} from 'react'
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import {withCookies} from 'react-cookie';
import {
    List, 
    ListItem, 
    ListItemText, 
    Button, 
    Modal,
    TextField,
} from '@mui/material';
import {useSelector } from 'react-redux'
import {instance} from '../utils/axios';

const useStyles = makeStyles(()=>({
   root:{
       maxWidth:720,
   },
   paper: {
    position: 'absolute',
    width: 400,
    backgroundColor:"#fff",
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: 20,
  },
}));


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


function MyAccount(props) {
    const classes = useStyles();
    const [clicked, setClicked]= useState(null)
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [reNewPassword, setReNewPassword] = React.useState('');
    const [newPasswordNotMatch, setNewPasswordNotMatch] = React.useState(false)
    const [currentPasswordInvalid, setCurrentPasswordInvalid] = useState(false)
    const [newPasswordTooShort, setNewPasswordTooShort] = useState(false);

    const userInfo = useSelector(state=>state.userInfo)

    const handleOpen = (clicked) => {
        setClicked(clicked)
        setOpen(true);
      };
    
      const handleClose = () => {
        setClicked(null)
        setOpen(false);
      };

    // パスワードの変更
    const handlePasswordSubmit = async(event) =>{
        event.preventDefault()
        if(newPassword !==reNewPassword){
            setNewPasswordNotMatch(true)
        }else{
            setNewPasswordNotMatch(false)

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`JWT ${props.cookies.get('jwt-access')}`,
                    'X-CSRFToken':props.cookies.get('csrftoken'),

                },
            }
            const body = JSON.stringify({
                current_password: currentPassword,
                new_password:newPassword, 
                re_new_password:reNewPassword,
            })
            await instance.post(
                '/auth/users/set_password/',
                body,
                config,
            )

            .then(res=>{
                handleClose()
            })
            .catch(err=>{
                if(err.response.data['current_password'] && err.response.data['current_password'].includes("Invalid password.")){
                    setCurrentPasswordInvalid(true)
                }else{
                    setCurrentPasswordInvalid(false)
                }

                if(err.response.data['new_password'] && err.response.data['new_password'].includes("This password is too short. It must contain at least 8 characters.")){
                    setNewPasswordTooShort(true)
                }else{
                    setNewPasswordTooShort(false)
                }
            })
        }

    }

        
    const handleNewPasswordHelperText = () =>{
        let helperTexts = []
        if(newPasswordTooShort){
            helperTexts.push("8文字以上にしてください。")
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
    }

      const passwordBody = (
        <div style={modalStyle} className={classes.paper}>
            <form onSubmit={handlePasswordSubmit} style={{width:"100%", marginBottom:30}}>
                <Typography variant="h6" style={{marginBottom:30}} >パスワード変更</Typography>
                {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                <div style={{marginBottom:20}}>
                    <Typography>
                        現在のパスワード
                    </Typography>
                    <TextField  
                        type="password" 
                        fullWidth 
                        variant="outlined"
                        value={currentPassword}
                        onChange={e=>setCurrentPassword(e.target.value)}
                        error={currentPasswordInvalid}
                        helperText={currentPasswordInvalid?"パスワードが違います。":null}
                    />
                </div>

                <div style={{marginBottom:20}}>
                    <Typography>
                        新しいパスワード（8文字以上）
                    </Typography>
                    <TextField  
                        type="password" 
                        fullWidth 
                        variant="outlined"
                        required
                        value={newPassword}
                        onChange={e=>setNewPassword(e.target.value)}
                        error={newPasswordNotMatch || newPasswordTooShort}
                        helperText={newPasswordNotMatch || newPasswordTooShort?handleNewPasswordHelperText():null}
                    />
                </div>

                <div style={{marginBottom:30}}>
                    <Typography>
                        新しいパスワード（確認）
                    </Typography>
                    <TextField 
                        type="password" 
                        variant="outlined" 
                        fullWidth
                        required
                        value={reNewPassword}
                        onChange={e=>setReNewPassword(e.target.value)}
                    />
                </div>               
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                >
                    変更
                </Button>

            </form>        
        </div>
      );
      

      const handleBody = ()=>{
          switch (clicked) {
            case 'password':
                return passwordBody;
              default:
                  return <Fragment></Fragment>;
          }
      }

  
    return (
        <div style={{width:"80%", margin:"0 auto"}}>
            <div style={{marginBottom:50}}>
            <Typography variant="h5" style={{marginBottom:30}}>
                マイアカウント

            </Typography>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem divider>
                        <ListItemText primary={`ユーザー名：${userInfo?userInfo.profile_username:''}`} />
                    </ListItem>
                    <ListItem divider>
                        <ListItemText 
                            primary={`メールアドレス：${userInfo?userInfo.email:''}`} 
                        />
                    </ListItem>
                    <ListItem divider>
                        <ListItemText 
                            primary={`社員ID:${userInfo && userInfo.employeeId? userInfo.employeeId:''}`} 
                        />
                    </ListItem>
                    <ListItem divider>
                        <ListItemText primary="パスワード：（非表示）" />
                        <Button 
                            onClick={()=>handleOpen("password")} 
                            size="small" variant="outlined"　
                            style={{
                                display:"inline-block", 
                                marginLeft:"auto"
                            }}
                        >
                            変更
                        </Button>
                    </ListItem>    
                </List>
                
                </div>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {handleBody()}
            </Modal>
  
        </div>
    )
}

export default withCookies(MyAccount);
