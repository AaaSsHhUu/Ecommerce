import mongoose from "mongoose";
import {z} from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const UserSchemaValidation = z.object({
    photo : z.string().min(1,"Please Add one photo"),
    role : z.enum(["admin","user"]).default("user"),
    name : z.string().min(1,"Please Enter name"),
    email : z.string().email("Invalid Email format"),
    password : z.string().min(8, "Password should atleast have 8 letters"),
    gender : z.enum(["male", "female"]),
    dob : z.string().or(z.date()).transform(val => new Date(val)),
})

type UserInput = z.infer<typeof UserSchemaValidation>


const userSchema = new mongoose.Schema({
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
    },
    password : {
        type : String,
        required : [true, "Please Provide password"]
    }
},{timestamps : true})


userSchema.virtual("age").get(function(this : UserInput){
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

userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);        
    }
    else{
        next();
    }
})


const User = mongoose.model<UserInput>("User",userSchema);
export default User;