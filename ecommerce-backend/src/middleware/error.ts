import { Request, Response, NextFunction } from "express"
import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = async (err : ErrorHandler, req : Request, res : Response, next : NextFunction) => {
    err.message ||= "Some Error Occured";
    err.statusCode ||= 500;

    res.status(err.statusCode).json({
        message : err.message,
        error : err,
    })
}

export default errorMiddleware;