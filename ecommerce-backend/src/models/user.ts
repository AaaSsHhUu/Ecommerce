import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document{
    _id : string;
    photo : string;
    role : "user" | "admin";
    name : string;
    gender : "male" | "female";
    dob : Date;
    email : string;
    createdAt : Date;
    updatedAt : Date;
    // virtual Attribute
    age : number;
}

const userSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : [true, "Please give id"]
    },
    photo : {
        type : String,
        required : [true, "Please add photo"]
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
        unique : [true,"Email already exist"],
        required : [true, "Please enter your email"],
        validator : validator.default.isEmail
    },
},{timestamps : true})


userSchema.virtual("age").get(function(this : IUser){
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

const User = mongoose.model<IUser>("User",userSchema);
export default User;