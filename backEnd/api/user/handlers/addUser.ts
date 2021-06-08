/*
*BZ00025            080621     Create AddUser API


************************************************************************
*/
import dbConnect from '../../../../utils/dbConnect';
import User from "../../../model/user";
import mongoose from'mongoose';

const addUser  = async ( {res,req,body:{email,address1,firstName,lastName,img}}) => {
    console.log("addUser connect");
    await dbConnect();
    let result ;
    try {
        const user  = await User.findOne({
            email
            });
          if (user) {
              return res.status(400).json({
                data: null,
                errors: 'Email already exists :  ' + email ,
              });
          }
        result = await User.create({ _id:mongoose.Types.ObjectId(),email,address1,firstName,lastName,img});
        await result.save();
        // console.log(" result.data"+ result);

    }catch(error){
        return res.status(400).json({
            data: null,
            errors: [{message: error.message, code: "err002"}],
          });
    }
    return res.status(200).json({ data: result ?? null });

    

}
export default  addUser;