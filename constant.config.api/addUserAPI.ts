
/*
*BZ00025            080621     Create AddUser API
************************************************************************
*/
import axios from 'axios';
// const resign =  "http://localhost:3000/api/login";
//server
//const resign =  "https://order-demo-nextjs.herokuapp.com/api/resign";
import {ADDUSERAPI} from '../constant.config.api/config/config';
import getUserCookies from "./config/getUserCookies";



const   addUserAPI = async(payload:any) => {
    var user_cookies = await getUserCookies();
// console.log("user",payload);
    let data;
    let param={
       'address1' :payload.address1,    
       'email':payload.email,
       'firstName':payload.firstName,
       'lastName':payload.lastName,
       'img':payload.img,
       'check_Add_User':true
    };
    
    // console.log("param",param)
    await axios.post(
        ADDUSERAPI,param,
        {headers: {
            "Authorization": "Bearer " + user_cookies
            /*"Authorization" : "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTY4NjcyNDliYzY2OTZlY2VlNzMwZSIsInB3aCI6NzQ4NDYyMjc2LCJpYXQiOjE1NDE4Mzc1MzUsImV4cCI6MTU0MTkyMzkzNX0.gkD_Ym2uk17YcQydIuQ8q0Vm5a8SmF1KygrdnVX-4l0'*/
        }
       }

        
    )
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
            // console.log("Data",data)
        });

    return data;
}

export default addUserAPI;