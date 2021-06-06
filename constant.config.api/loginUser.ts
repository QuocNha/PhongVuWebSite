/*
*BZ0016            060321     Setup Server  connect MongGoDB
************************************************************************
*/
import axios from 'axios';
// const resign =  "http://localhost:3000/api/login";
//server
//const resign =  "https://order-demo-nextjs.herokuapp.com/api/resign";
import Cookies from 'js-cookie';
import {LOGINUSER} from '../constant.config.api/config/config';


async function loginUser(user:any) {

    let data;
    let param={
        email: user.userID,
        password: user.userPasword,
    };
    
    console.log("param",param)
    await axios.post(
        LOGINUSER,param
        
    )
        .then(function (response) {
            data = response;
            Cookies.set("user",response.data.token)
        })
        .catch(function (err) {
            data = err.response;
            console.log("Data",data)
        });

    return data;
}

export default loginUser;