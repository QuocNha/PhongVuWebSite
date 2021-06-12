/*
*BZ00031            130621     Delete,Edit for user

**************************************************************
 */
import dbConnect from '../../../../utils/dbConnect';
import jwt from 'jsonwebtoken';
import User from "../../../model/user";
const deleteUser = async( {res,req,body: { email }})=>{
    await dbConnect();
    try{
    const user  = await User.findOne({
        email
    });
    if(!user){
        return res.status(400).json({
            data: null,
            errors: 'Cannot found  mail ' + email ,
          });
    }if(user){
        console.log("User111111111",user);
        if(user.isDelete){
            console.log("user.isDelete111111111",);
            let data = await User.findOneAndUpdate({
                email:email,
                isDeleted:false,
            },{
                $set:{isDeleted:true
                }
            },{new:true});
            if(!data){
                return res.status(400).json({
                    data: null,
                    errors:[{message:"Delete user not Success"}]
            });
            }else{
                return res.status(200).json({
                    data : null,
                    errors:[{message:"Delete user Success"}]
                })
            }

        }else{
            console.log("user.isDelete khong ton tai");
            let data =User.collection.deleteOne({ email: email});
            console.log("data1111111111111",data);
            
            if(!data){
                return res.status(400).json({
                    data:null,
                    errors:[{message:"Delete not Delele Susscess"}]
                })
            }else if(data){
                return res.status(200).json({
                    data:null,
                    errors:[{message:" Delele Susscess"}]
                })       
            }
        }
    }
    }catch(error){

    }
}
export default deleteUser;