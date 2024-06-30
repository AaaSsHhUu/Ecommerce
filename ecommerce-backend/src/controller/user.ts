import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import {signinValidation,signupValidation} from "../types/schema.js";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "../middleware/error.js";

export const createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const userBody = req.body;
    
        // Zod validation check
        const {success} = signupValidation.safeParse(userBody);
            
        if(!success){
            throw new ErrorHandler("Invalid Input",400);
        }
    
        const userExist = await User.findOne({email : userBody.email});

        if(userExist){
            throw new ErrorHandler("User with this email already exist",400);
        }

        const user = await User.create(userBody);
        if(!user){
            throw new ErrorHandler("Some error occured while creating user",500);
        }

        // generating token and sending it in cookies
        const token = user.generateToken();
        res.cookie("token",token,{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            maxAge : 2 * 24 * 60 ^ 60 * 1000
        })
        return res.status(201).json({
            success : true,
            user
        })
    }
)

// login user
export const loginUser = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
    const {email,password} = req.body;

    const {success} = signinValidation.safeParse(req.body);
    if(!success){
        throw new ErrorHandler("Invalid Inputs", 400);
    }

    const user = await User.findOne({email});
    if(!user){
        throw new ErrorHandler("User with given email doesn't exist, Please Signup first",404);
    }

    const checkPassword = user.isPasswordCorrect(password);

    if(!checkPassword){
        throw new ErrorHandler("Invalid Email or Password",400);
    }

    // generating cookie and sending it to client via cookie
    const token = await user.generateToken();
    // console.log("token for cookie : ", token);
    
    res.cookie("token",token,{
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        maxAge : 2 * 24 * 60 * 60 * 1000
    })
    
    return res.json({
        success : true,
        message : "Logged In Successfully",
        token
    })

})

// Get all users
// Admin route
export const getAllUsers = asyncHandler(
    async (req: Request, res : Response, next : NextFunction) => {
        const users = await User.find();

        if(!users){
            throw new ErrorHandler("No user found",404);
        }

        return res.status(201).json({
            success : true,
            users
        })
    }
)
