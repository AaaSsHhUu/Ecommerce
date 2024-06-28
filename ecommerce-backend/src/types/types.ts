import { NextFunction, Request, Response } from "express"

export type ControllerType = (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<Response<any, Record<string, any> >>