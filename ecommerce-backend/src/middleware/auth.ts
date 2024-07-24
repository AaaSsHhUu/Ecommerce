import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js"
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { IUser } from "../types/types.js";

export const isAuthenticated = async (req : Request,res : Response,next : NextFunction) => {
        try {
            const { token } = req.cookies

            if(!token){
                throw new ErrorHandler("Authentication token required",401);
            }

            const decodedData = await jwt.verify(token,process.env.JWT_SECRET as string) as {id : string};
            // console.log("decoded data : ", decodedData);
            
            const user = await User.findById(decodedData.id).select("-password");
            // console.log("user after authentication : ",user);
            
            req.user = user as IUser;
            // console.log("req.user", req.user);
            
            return next();
        }catch (error) {
           return next(new ErrorHandler("some error error in Authentication" + error,400)) ;
        }
}

export const isAdmin = async (req : Request, res : Response, next : NextFunction) => {
        if(!req.user){
            return next(new ErrorHandler("You are not logged in",400))
        }
        if(req.user.role !== "admin"){
            return next(new ErrorHandler("You are not allowed to access this page",403));
        }
        return next();
    }
