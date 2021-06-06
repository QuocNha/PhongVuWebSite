/*
*BZ0016            060321     Setup Server  connect MongGoDB
************************************************************************
*/
import axios from 'axios';
// const resign =  "http://localhost:3000/api/login";
//server
//const resign =  "https://order-demo-nextjs.herokuapp.com/api/resign";

import {GETALLUSERAPI} from '../constant.config.api/config/config';
import getUserCookies from "./config/getUserCookies";
async function checkToKen() {
    var user_cookies = await getUserCookies();
    let data;
   
    let param={
        'user_cookies':user_cookies,
        'check_token':true,
    };
    
    console.log("param",param)
    await axios.post(
        GETALLUSERAPI,param,
        {
            // headers: {
            //     "Authorization": "Bearer " + user_cookies
            //     /*"Authorization" : "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTY4NjcyNDliYzY2OTZlY2VlNzMwZSIsInB3aCI6NzQ4NDYyMjc2LCJpYXQiOjE1NDE4Mzc1MzUsImV4cCI6MTU0MTkyMzkzNX0.gkD_Ym2uk17YcQydIuQ8q0Vm5a8SmF1KygrdnVX-4l0'*/
            // }
        })  
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
        });

    return data;
}

export default checkToKen;