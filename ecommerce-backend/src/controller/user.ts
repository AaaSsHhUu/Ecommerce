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

// Get user by id
export const getUser = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
        const id = req.params.id;
        
        const user = await User.findById(id).select("-password");
        
        if(!user){
            throw new ErrorHandler("User not found",404);
        }

        return res.status(200).json({
            success : true,
            user
        })
    }
)

// Get all users
export const getAllUsers = asyncHandler(
    async (req: Request, res : Response, next : NextFunction) => {
        const users = await User.find();

        if(!users){
            throw new ErrorHandler("No user found",404);
        }

        return res.status(201).json({
            success : true,
            users,
            NumOfUsers : users.length
        })
    }
)

// Delete user
export const deleteUser = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
        const id = req.params.id;

        const user = await User.findByIdAndDelete(id);

        if(!user){
            throw new ErrorHandler("Some error occured while deleting the user",500);
        }

        return res.status(201).json({
            success : true,
            deletedUser : user
        })
    }
)

// Update user
export const updateUserProfile = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
        const id = req.params.id;
        const updationData = {
            name : req.body.name,
            email : req.body.email,
            role : req.body.role
        }
        const user = await User.findByIdAndUpdate(id,updationData,{
            new : true, 
            runValidators : true
        })

        if(!user){
            throw new ErrorHandler("Some error occured while updating new user profile",500);
        }

        return res.status(200).json({
            success : true,
            updatedUser : user
        })
    }
)