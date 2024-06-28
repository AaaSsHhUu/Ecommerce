import { Request, Response, NextFunction } from "express";
import User, { UserSchemaValidation } from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createUser = async (req: Request,res: Response,next: NextFunction) => {
    const userBody = req.body;
    // console.log("user body : ", userBody);
    try{
        // Zod validation check
        const {success} = UserSchemaValidation.safeParse(userBody);
        console.log("zod success : ",success);
        
        if(!success){
            throw new ErrorHandler("Invalid Input",400);
        }

        const user = await User.create(userBody);
        if(!user){
            throw new ErrorHandler("Some error occured while creating user",500);
        }

        res.status(201).json({
            success : true,
            user
        })
    }catch(err){
        next(err);
    }
};
