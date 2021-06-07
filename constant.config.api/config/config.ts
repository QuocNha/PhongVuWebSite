/*
*BZ0016            060321     Setup Server  connect MongGoDB
*BZ00017            050621     Create validaton for Yup to login user 
*BZ00018            050621     Create Page For admin User 
*BZ00019            060621     Using Token login for next reset
*BZ00020            060621     Get All User
************************************************************************
*/
const SERVERAPI = "http://localhost:3000/";
// bang3 LIve
//const SERVERAPI ="https://order-demo-nextjs.herokuapp.com/";

const LOGINUSER = SERVERAPI+ "api/login";//BZ00017
const CHECK_TOKENAPI = SERVERAPI+ "api/checkTokenAPI";//BZ00019
const GETALLUSERAPI = SERVERAPI+ "api/getAllUserAPI";//BZ00020

export {
    LOGINUSER,
    CHECK_TOKENAPI,
    GETALLUSERAPI
}