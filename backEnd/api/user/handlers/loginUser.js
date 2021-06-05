import dbConnect from '../../../../utils/dbConnect';
import mongoose from "mongoose";
import User from "../../../model/user";
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
const loginUser  = async ( {res,req,body: { email, password }}) => {
    dbConnect();
    const user  = await User.findOne({
      email
      });
    mongoose.connection.close();
    if (!user) {
        return res.status(400).json({
          data: null,
          errors: 'Không tìm thấy địa chỉ mail ' + email ,
        });
    }
     console.log("user",user)
    const isValidPassword = await user.comparePassword(password, user.password);
      console.log("user",isValidPassword);
      if (!isValidPassword) {
        return res.status(400).json({
          data: null,
          errors: 'Password không hợp lệ.',
        });
      }
    //   const jwt = user.generateJWT()
  const token=  jwt.sign({
        email:user.email,
        id:user._id
    },process.env.NODE_ENV,{
        expiresIn:"1h"
    });
    console.log("token",req);
    console.log("token",token);
    const decode = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF1b2NuaGFAZ21haWwuY29tIiwiaWQiOiI2MDBkM2M1MzBhODM5NzA3MjBlNTFjNzYiLCJpYXQiOjE2MjI4OTQ5MDcsImV4cCI6MTYyMjg5ODUwN30.70fzW3AHlt3yC7yiWleeTmTmyjsB_GITjDfqpuM-S1g",process.env.NODE_ENV);
    console.log("decode"+JSON.stringify(decode));
    const decode1 = jwt.verify(token,process.env.NODE_ENV);
    console.log("decode"+JSON.stringify(decode1));
      res.setHeader('Set-Cookie', serialize('user-token', token, {
        httpOnly: true,
        maxAge: 604800, // 1 week
        secure: process.env.JWT_KEY !== 'development',
        sameSite: 'strict',
        path: '/'
      }));
      return res.status(200).json({ data: user.email,token:token })
}
export default loginUser;