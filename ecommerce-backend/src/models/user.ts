import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {IUser} from "../types/types.js"

const userSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true
    },
    photo : {
        type : String,
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    name : {
        type : String,
        required : [true, "Please enter your name"]
    },
    gender : {
        type : String,
        enum : ["male", "female"],
        required : [true, "Please enter you gender"]
    },
    dob : {
        type : Date,
        required : [true, "Please enter your DOB"]
    },
    email : {
        type : String,
        unique : true,
        required : [true, "Please enter your email"],
    },
},{timestamps : true})


userSchema.virtual("age").get(function(this){
    const today = new Date();
    const dob = this.dob;

    let age = today.getFullYear() - dob.getFullYear();
    if(today.getMonth() < dob.getMonth() ||
     (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ){
        age--;
    }
    return age;
})

// Adding methods in userSchema
userSchema.methods.isPasswordCorrect = async function (password : string){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = async function(){
    const token = jwt.sign(
        {id : this._id},
        process.env.JWT_SECRET as string ,
        {expiresIn : "2d"}
    )

    return token;
}


const User = mongoose.model<IUser>("User",userSchema);
export default User;