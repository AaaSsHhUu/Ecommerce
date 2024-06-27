import { Request, Response, NextFunction } from "express";
import User, { UserSchemaValidation } from "../models/user.js";

export const createUser = async (req: Request,res: Response,next: NextFunction) => {
    const userBody = req.body;
    console.log("user body : ", userBody);
    
    try{
        // Zod validation check
        const success = UserSchemaValidation.parse(userBody);
        console.log("zod success : ",success);
        
        if(!success){
            return res.status(200).json({
                success : true,
                message : `Welcome ${userBody.name}`
            })
        }

        const user = await User.create(userBody);
        if(!user){
            throw Error("Some error occured while creating user");
        }

        res.status(201).json({
            success : true,
            user
        })
    }catch(err){
        res.status(400).json({
            success : false,
            error : err
        })
    }
};
