/*
*BZ00019           060621     Using Token login for next reset
************************************************************************
*/
import dbConnect from '../../../../utils/dbConnect';
import jwt from 'jsonwebtoken';
import User from "../../../model/user";
import { serialize } from 'cookie';
import { isEmptyArray } from 'formik';

const CheckTokenForloginUser  = async ( {res,req,body: { user_cookies , check_token }}) => {
    dbConnect();
    let data:String;
    const decode1 = jwt.verify(user_cookies,process.env.NODE_ENV);
    const user = await User.findById(decode1.id);
     if(!user){
      res.status(500).json({ data: null, errors: [{ message: "Cant not found  dataUser" }], })

     }else if(user){
        // console.log("user11111111111"+user);
      return res.status(200).json({ data: user.email,token:user_cookies })
     }else{
      res.status(500).json({ data: null, errors: [{ message: "Error Token " }], })
     }  
}
export default CheckTokenForloginUser;