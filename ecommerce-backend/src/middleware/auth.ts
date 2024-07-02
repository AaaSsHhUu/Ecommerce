import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js"
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { asyncHandler } from "./error.js";
import { IUser } from "../types/types.js";

export const isAuthenticated = async (req : Request,res : Response,next : NextFunction) => {
        try {
            const {token} = req.cookies;
            // console.log("token : ",token);

            if(!token){
                throw new ErrorHandler("Authentication token required",401);
            }

            const decodedData = await jwt.verify(token,process.env.JWT_SECRET as string) as {id : string};
            // console.log("decoded data : ", decodedData);
            
            const user = await User.findById(decodedData.id).select("-password");
            // console.log("user after authentication : ",user);
            
            req.user = user as IUser;
            next();
        }catch (error) {
           next(error) ;
        }
}

export const isAdmin= () => {
    return async (req : Request,res : Response,next : NextFunction) => {
        // console.log("req.user : ", req.user);
        
        if(req.user && req.user.role === "admin"){
            next();
        }
        else{
            next(new ErrorHandler("You can't access this route", 403));
        }
    }
}