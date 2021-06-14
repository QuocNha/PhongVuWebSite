/*
*BZ00033           130621     Export excel  for user


************************************************************************
*/
import axios from 'axios';
// const resign =  "http://localhost:3000/api/login";
//server
//const resign =  "https://order-demo-nextjs.herokuapp.com/api/resign";
import Cookies from 'js-cookie';
import getUserCookies from "./config/getUserCookies";

import {EXPORTUSERFOREXCELAPI} from '../constant.config.api/config/config';


async function exportUserForExcelAPI(checkExportUserForExcel:any) {
    var user_cookies = await getUserCookies();

    let data;
    let param={
        checkExportUserForExcel:checkExportUserForExcel,
     
    };
    
    // console.log("param",param)
    await axios.post(
        EXPORTUSERFOREXCELAPI,param,{
        headers: {
            "Authorization": "Bearer " + user_cookies.token
            /*"Authorization" : "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTY4NjcyNDliYzY2OTZlY2VlNzMwZSIsInB3aCI6NzQ4NDYyMjc2LCJpYXQiOjE1NDE4Mzc1MzUsImV4cCI6MTU0MTkyMzkzNX0.gkD_Ym2uk17YcQydIuQ8q0Vm5a8SmF1KygrdnVX-4l0'*/
        },
        responseType: 'blob'
    })    
        .then(function (response) {
            //console.log("response.data",response.data);
            //console.log("response.data",typeof response.data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                //let disposition = response.headers['content-disposition']
                let filename = `Bao_Cao.xlsx`;
                link.setAttribute('download', filename); //or any other extension
                document.body.appendChild(link);
                link.click();
            data = response;
        })
        .catch(function (err) {
            data = err.response;
            //console.log("Data",data)
        });

    return data;
}

export default exportUserForExcelAPI;