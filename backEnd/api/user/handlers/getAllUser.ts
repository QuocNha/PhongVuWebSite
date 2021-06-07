/*
*BZ00021           060621     Paganation for List User

************************************************************************
*/
import dbConnect from '../../../../utils/dbConnect';
import jwt from 'jsonwebtoken';
import User from "../../../model/user";

const getAllUser  = async ( {res,req,body: { user_cookies , check_token }}) => {
    let result={data:[]};
    await dbConnect(); 
    //BEGIN BZ00021
    const limit:number=+req.query.limit;
        const user = await User.find({}).skip((limit * req.query.page) - req.query.limit).limit(limit) 
        .sort({
            createdAt: "desc",
          });
        //   console.log("req.query",req.query.page);
        //   console.log("req.query",user);
          for(let i=0 ;i<user.length;i++){
            result.data.push(
                {
                    _id:user[i]._id,
                    userName:user[i].email,
                    number:i+1,
                    userRole:user[i].userRole,
                }
            )
         }
    //END BZ00021 
        //  console.log("user get all user",user);
         try {   
        }catch(error){
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
         return res.status(200).json({
             data: result.data,
             errors: [{message: 'Get list susscess.'}],
         })
          
}
export default getAllUser;