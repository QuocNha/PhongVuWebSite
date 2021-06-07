/*
*BZ0016            060321     Setup Server  connect MongGoDB
************************************************************************
*/
import mongoose ,{ Document, Model } from "mongoose";
import bcryptjs from 'bcryptjs';
export interface UserDocument extends  Document{
    email: String;
    password: string;
    comparePassword(password:String, passwordbefor:String): Promise<boolean>;
  }
var  UserSchema =  new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName: {
		type: String,
		required: [true, "Name is required!"],
		maxlength: [30, 'Name cannot be more than 60 characters'],
		trim: true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required: [true, "Email is required!"],
        trim:true,
        unique: true
    },
     password: {
         type: String,
         required: [true, 'Your password is required'],
         max: 100
     },
     address1:{
         type:String
     },
     address2:{
         type:String
     },
     phone:{
         type:String
     },
     userType: {
         type: String,
         enum: ['SuperAdmin', 'Normal'],
         default: 'Normal'
       },
  
     userRole: {
         type: String,
         enum: ['SuperAdmin', 'Owner'],
         default: 'SuperAdmin'
     },
     createAt: {
        type: Date,
        required: true,
        default: Date.now 
    },

});
UserSchema.methods.comparePassword = async function (password, passwordbefor) {
    return bcryptjs.compare(password, passwordbefor);
};

const User : Model<UserDocument |any> = mongoose.models.users || mongoose.model<UserDocument>("users",UserSchema);

export default User;


