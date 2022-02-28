import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
// import axios from 'axios';
import {instance} from '../utils/axios';
import {withCookies} from 'react-cookie';
// import React from 'react'
import {useSelector } from 'react-redux';
import { FormatTime } from '../utils/FormatDatetime';

const HomeAuthenticated = (props) => {
    const [disabled, setDisabled] = useState([false, true, true, true])
    let userInfo = useSelector(state=>state.userInfo)
    const [finished, setFinished] = useState(false)
    const [start, setStart] = useState(userInfo.profile_start)
    const [breakStart, setBreakStart] = useState(userInfo.profile_break_start)
    const [breakEnd, setBreakEnd] = useState(userInfo.profile_break_end)
    const [end, setEnd] = useState(userInfo.profile_end)

    useEffect(() => {
        disabledByState(userInfo.profile_state)
    }, [])

    const baseBtnStyle = {
        margin:"0 auto",
        // marginBottom:30, 
        fontSize:18,
        border:"none",
        color:"#ffffff",
        display:"block",
        width:400,
        height:60,
    }

    const changeDisabled = mode =>{
        // dispatch(loadUser(props.cookies))

        if(mode===0){
            setDisabled([true, false, true, false])
            setStart(Date.now())
        }
        else if(mode===1){
            setDisabled([true, true, false, true])
            setBreakStart(Date.now())
        }
        else if(mode===2){
            setDisabled([true, true, true, false])
            setBreakEnd(Date.now())
        }
        else if(mode===3){
            setDisabled([true, true, true, true])
            setFinished(true)
            setEnd(Date.now())
        }
    }    
    
    const disabledByState = mode =>{
        if(mode===0){
            setDisabled([false, true, true, true])
        }
        else if(mode===1){
            setDisabled([true, false, true, false])
        }
        else if(mode===2){
            setDisabled([true, true, false, true])
        }
        else if(mode===3){
            setDisabled([true, true, true, false])
        }
    }

    const handleStamp = async(mode)=>{
        await instance.patch(
            '/stamp/update',
            {
                mode
            },
            {
                headers: 
                {
                    'Content-type': 'application/json',
                    'Authorization':`JWT ${props.cookies.get('jwt-access')}`,
                }
            },        
        )
        .then(res=>{
            changeDisabled(mode)       
        })
    }    
    
    

    return (
        <div
            style={{
                paddingTop:1,
                // margin:"0 auto"
            }}
        >
                {!start?(<div
                    style={{
                        // marginTop:30,
                        textAlign:"center",
                        fontSize:20,
                        color:"#ff5722",

                    }}
                >
                    こんにちは {userInfo.profile_username} さん!
                </div>):null}

            <Button
                variant="contained" 
                type="submit"
                style={{
                    ...baseBtnStyle,
                    backgroundColor:"#2196f3",
                    marginTop:30,
                    opacity:disabled[0]?0.5:1

                }}
                onClick={()=>handleStamp(0)}
                disabled={disabled[0]}
                
            >
                出勤&nbsp;{FormatTime(start)}
            </Button>

            <Button
                variant="contained" 
                type="submit"
                style={{
                    ...baseBtnStyle,
                    marginTop:30,
                    backgroundColor:"#11b717",
                    opacity:disabled[1]?0.5:1

                }}
                onClick={()=>handleStamp(1)}
                disabled={disabled[1]}
                

            >
                休憩開始&nbsp;{FormatTime(breakStart)}
            </Button>

            <Button
                variant="contained" 
                type="submit"
                style={{
                    ...baseBtnStyle,
                    marginTop:30,
                    backgroundColor:"#11b717",
                    opacity:disabled[2]?0.5:1

                }}
                onClick={()=>handleStamp(2)}
                disabled={disabled[2]}


            >
                休憩終了&nbsp;{FormatTime(breakEnd)}
            </Button>
            <Button
                variant="contained" 
                type="submit"
                style={{
                    ...baseBtnStyle,
                    marginTop:30,
                    backgroundColor:"#f44336",
                    opacity:disabled[3]?0.5:1

                }}
                onClick={()=>handleStamp(3)}
                disabled={disabled[3]}

            >
                退勤&nbsp;{FormatTime(end)}
            </Button>

            {finished?
            <div
                style={{
                    marginTop:30,
                    textAlign:"center",
                    color:"#ff5722",
                    fontSize:20,
                }}
            >
                おつかれさまでした！
            </div>:null}

                   
        </div>
    )
}

export default withCookies(HomeAuthenticated)
