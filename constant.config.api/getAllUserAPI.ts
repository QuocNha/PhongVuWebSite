/*
*BZ00021            060621     Paganation for List User
************************************************************************
*/
import {GETALLUSERAPI} from '../constant.config.api/config/config';
import axios from 'axios';
import getUserCookies from "./config/getUserCookies";

const  getAllUserAPI = async(page,limit) => {
    var user_cookies = await getUserCookies();
    let data;
    let url = GETALLUSERAPI + `?page=${page}&limit=${limit}`;//BZ00021
    await axios.get(
        url,
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
            console.log("Data",data)
        });

    return data;
}

export default getAllUserAPI;