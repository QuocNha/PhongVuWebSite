/*
*BZ00021            060621     Paganation for List User
************************************************************************
*/
import {DELETEUSERAPI} from '../constant.config.api/config/config';
import axios from 'axios';
import getUserCookies from "./config/getUserCookies";

const  deleteUserAPI = async(email) => {
    var user_cookies = await getUserCookies();
    let data;
    const config = {
        data: {
            email: email
        }
      }
    await axios.delete(
        DELETEUSERAPI,config,
    )
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
        });

    return data;
}

export default deleteUserAPI;