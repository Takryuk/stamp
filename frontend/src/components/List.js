import React, {useState, useEffect} from 'react'
import { Link as RouterLink } from 'react-router-dom';
import {withCookies} from 'react-cookie';
import { FormatDate, FormatTime, FormatTimeDelta } from '../utils/FormatDatetime';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import {instance} from '../utils/axios';  
  
const List = (props) =>{
    const[stamps, setStamps] = useState([])
    const[page, setPage] = useState(1)
    const userInfo = useSelector(state=>state.userInfo)


    useEffect(() => {
      fetchStamps()
    }, [])

    // if(isLoading){
    //   return  <div></div>;
    // }
    if (!userInfo.profile_is_admin){
      window.location.href = "/"

      return <div></div>
    }
  
  const fetchStamps = async()=>{

    instance.get(
      `/stamp/list?page=${page}`,
      // `/stamp/list`,
      {
            headers: {
                'Content-type': 'application/json',
                'Authorization':`JWT ${props.cookies.get('jwt-access')}`,
            },
        },
    ).then(res=>{
        setStamps([...stamps, ...res.data.results])
        setPage(page+1)
    }).catch(err=>{
        // console.log(err)
    })
  }  

  function CustomPaginationActionsTable(stamps, func) {    
      return (
        <TableContainer component={Paper}>
          <Table size="small" sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                  <TableRow>
                      {/* <TableCell align="center">日付</TableCell> */}
                      <TableCell align="center">日付</TableCell>
                      <TableCell align="center">氏名</TableCell>
                      <TableCell align="center">社員ID</TableCell>
                      <TableCell align="center">勤務時間(休憩を含む)</TableCell>
                      <TableCell align="center">休憩時間</TableCell>
                      <TableCell align="center">出勤時刻</TableCell>
                      <TableCell align="center">退勤時刻</TableCell>
                      <TableCell align="center">休憩開始</TableCell>
                      <TableCell align="center">休憩終了</TableCell>            
                  </TableRow>
              </TableHead>
            <TableBody>
              {stamps.map((stamp) => 
                  {
                      const workingTime = FormatTimeDelta(stamp.start, stamp.end)
                      const breakTime = FormatTimeDelta(stamp.break_start, stamp.break_end)
                      const start = FormatTime(stamp.start)
                      const end = FormatTime(stamp.end)                      
                      const breakStart = FormatTime(stamp.break_start)                      
                      const breakEnd = FormatTime(stamp.break_end)   
                      const date = FormatDate(stamp.start)                   
                      return(
                          <TableRow key={stamp.id}>
                              <TableCell align="center" style={{ width: 120, }}>
                              {date}
                              </TableCell>
                              <TableCell align="center" style={{ width: 120, }}>
                              {stamp.employee}
                              </TableCell>
                              <TableCell align="center" style={{ width: 90, minWidth:60 }}>
                              {stamp.employee_id}
                              </TableCell>
                              <TableCell align="center" style={{ width: 160,minWidth:60,  }}>
                              {workingTime}
                              </TableCell>                              
                              <TableCell align="center" style={{ width: 160,minWidth:60,  }}>
                              {breakTime}
                              </TableCell>
                              <TableCell align="center" style={{ width: 90, minWidth:60 }}>
                              {start}
                              </TableCell>
                              <TableCell align="center" style={{ width: 90, minWidth:60 }}>
                              {end}
                              </TableCell>
                              <TableCell align="center" style={{ width: 90, minWidth:60 }}>
                              {breakStart}
                              </TableCell>
                              <TableCell align="center" style={{ width: 90, minWidth:60 }}>
                              {breakEnd}
                              </TableCell>
                          </TableRow>)
                  }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    const isRestaurant = userInfo?userInfo.is_restaurant:false

    return (
        <div 
            style={{
                margin:"0 auto",
                //maxWidth:1200,
                // width:"60%",
            }}
        >
          {!isRestaurant?(
            <div>
              <div
                style={{
                  marginTop:30,
                }}
              >
                <div
                  style={{
                    fontSize:20,
                    marginBottom:20,
                  }}
                >
                  {userInfo.profile_company}&nbsp;勤務一覧
                </div>
                {CustomPaginationActionsTable(stamps, fetchStamps)}
                  <Button
                    // fullWidth
                    variant="contained" 
                    type="submit"
                    onClick={fetchStamps}
                    style={{
                        marginTop:30,
                        marginLeft:"auto",
                        marginRight:"auto", 
                        fontSize:18,
                        border:"none",
                        backgroundColor:"#11b717",
                        color:"#ffffff",
                        display:"block",
                        width:"20%",
                    }}
                >
                  More
                </Button>
              </div>
            </div>
          ):(
            <div>
              <div>
                <Button 
                    fullWidth
                    variant="contained" 
                    type="submit"
                    component={RouterLink} 
                    to="restaurant-list"
                    style={{
                        marginBottom:30, 
                        fontSize:18,
                        border:"none",
                        backgroundColor:"#ff9800",
                        color:"#ffffff",
                    }}

                >
                      予約する
                </Button>
                <Button 
                    fullWidth
                    variant="contained" 
                    type="submit"
                    component={RouterLink} 
                    to="stamp-confirm"
                    style={{
                        marginBottom:30, 
                        fontSize:18,
                        border:"none",
                        backgroundColor:"#ff9800",
                        color:"#ffffff",
                    }}

                >
                      予約確認
                </Button>
                <Button 
                    fullWidth
                    variant="contained" 
                    type="submit"
                    to="myaccount"
                    component={RouterLink} 
                    style={{
                        marginBottom:30, 
                        fontSize:18,
                        border:"none",
                        backgroundColor:"#ff9800",
                        color:"#ffffff",
                    }}
                >
                      認定幹事の変更
                </Button>
              </div>
              
            </div>
          )}
          
    
        </div>
    )
}

export default withCookies(List)
