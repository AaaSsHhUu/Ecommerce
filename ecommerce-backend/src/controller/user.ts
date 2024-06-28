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
    
        return res.status(201).json({
            success : true,
            user
        })
    }
)
