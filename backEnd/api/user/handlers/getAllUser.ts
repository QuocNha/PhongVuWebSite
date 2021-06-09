/*
*BZ00021           060621     Paganation for List User
*BZ00029           060621     Install monent for convert Date

************************************************************************
*/
import dbConnect from '../../../../utils/dbConnect';
import jwt from 'jsonwebtoken';
import User from "../../../model/user";
import moment from 'moment';//BZ00029

const getAllUser  = async ( {res,req,body: { user_cookies , check_token }}) => {
    let result={data:[]};
    await dbConnect(); 
    //BEGIN BZ00021
    const limit:number=+req.query.limit;
        const userAllDataLength=(await User.find({}).sort({
            createdAt: "desc",
          })).length;
        const user = await User.find({}).skip((limit * req.query.page) - req.query.limit).limit(limit) 
        .sort({
            createAt: "desc",
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
                    img:user[i].img,
                    createAt: moment(user[i].createAt).format('DD-MM-YYYY'),//BZ00029
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
             dataLenght: userAllDataLength,
             errors: [{message: 'Get list susscess.'}],
         })
          
}
export default getAllUser;