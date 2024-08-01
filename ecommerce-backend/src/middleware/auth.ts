import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js"
import User from "../models/user.js";

export const adminOnly = 
    async (req : Request,res : Response,next : NextFunction) => {
        const {id} = req.query;

        if(!id){
            return next(new ErrorHandler("Please Login First", 401));
        }

        const user = await User.findById(id);

        if(!user){
            return next(new ErrorHandler("User doesn't exist, Please Signup first", 401));
        }
        if(user.role !== "admin"){
            return next(new ErrorHandler("You can't access this page", 403));
        }

        return next();
    }
