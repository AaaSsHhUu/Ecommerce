import mongoose from "mongoose";

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
        required : [true, "Please enter your email"]
    },
},{timestamps : true})

const User = mongoose.model("User",userSchema);
export default User;