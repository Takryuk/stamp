import React from 'react'
import Alert from '@mui/material/Alert';


const AlertMessage = ({location}) => {

    const listOfMessages = location.state.messages.map(({severity, message})=>{
        return (
            <Alert severity={severity} style={{marginBottom:10}}>
                {message}
            </Alert>
        );

    })
    return (
        <div style={{marginBottom:30}}>

            {listOfMessages}
        </div>
    )
}

export default AlertMessage;
