import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js"
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.js";
import { asyncHandler } from "./error.js";

export const isAuthenticated = async (req : Request,res : Response,next : NextFunction) => {
        try {
            const {token} = req.cookies;
            // console.log("token : ",token);

            if(!token){
                throw new ErrorHandler("Authentication token required",401);
            }

            const decodedData = await jwt.verify(token,process.env.JWT_SECRET as string) as {_id : string};
            // console.log("decoded data : ", decodedData);
            
            const user = await User.findById(decodedData._id).select("-password");
            // req.user = user;
            res.json({
                message : "Authentication successfull"
            })
        }catch (error) {
           next(error) ;
        }
}
