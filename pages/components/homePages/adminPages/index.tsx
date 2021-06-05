/*
*BZ00017            050621     Create validaton for Yup to login user 
************************************************************************
*/
import React,{useEffect, useState} from'react';
import HeaderPage  from '../headerPage';
import { useSelector, useDispatch } from "react-redux";// BZ00016
import Router from 'next/router';
import {getUser} from '../../../../redux/actions/userActions';

const HomePage = () =>{
    const user = useSelector((state :any) => state.users);
    const dispatch = useDispatch();
    console.log("user",user)
    useEffect(() => {
        if (!(user.users)) {
            Router.push('/'); 
        }
        
      }, [user])
 return <React.Fragment>
     <HeaderPage key="HeaderPage"></HeaderPage>   
 </React.Fragment>
}
export default HomePage;