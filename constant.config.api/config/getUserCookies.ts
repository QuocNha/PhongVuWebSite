/*
*BZ00019            060621     Using Token login for next reset
*/
import Cookies from 'js-cookie';

const  getUserCookies= () => {
    let token = Cookies.get("user");
    //console.log("haoTesst",user);
    if (typeof (Cookies.get("user")) !== 'undefined') {
        //replace('/login');
        return  token;
    }
    else
        return false;
};

export default getUserCookies;