import mongoose,{Document} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {SigninInput, SignupInput} from "../types/schema.js"

export interface IUser extends Document {
    photo : string;
    role : "user" | "admin";
    name : string;
    gender : "male" | "female";
    dob : Date;
    email : string;
    password : string;
    generateToken() : string;
    isPasswordCorrect(password : string) : Promise<boolean>;
    age : number,
}

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
        unique : true,
        required : [true, "Please enter your email"],
    },
    password : {
        type : String,
        required : [true, "Please Provide password"]
    }
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

userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);        
        next();
    }
    else{
        next();
    }
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