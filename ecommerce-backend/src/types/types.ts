import { NextFunction, Request, Response } from "express"
import {Document} from "mongoose";

export type ControllerType = (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<Response<any, Record<string, any> >>

export interface IUser extends Document {
    photo : string;
    role : "user" | "admin";
    name : string;
    gender : "male" | "female";
    dob : Date;
    email : string;
    password : string;
    generateToken() : string;
    isPasswordCorrect(password : string) : Promise<boolean>;
    age : number,
}

export interface NewProductRequestBody extends Document{
    name : string;
    price : string;
    stock : string;
    category : string;
}