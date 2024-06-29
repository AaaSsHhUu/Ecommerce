import { Request, Response, NextFunction } from "express";
import User, { UserSchemaValidation } from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "../middleware/error.js";

export const createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const userBody = req.body;
    
        // Zod validation check
        const {success} = UserSchemaValidation.safeParse(userBody);
            
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
