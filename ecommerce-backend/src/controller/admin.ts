import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/error.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";

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