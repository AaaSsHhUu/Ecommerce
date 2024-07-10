import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/error.js";
import { myCache } from "../app.js";

export const getDashboardStats = asyncHandler(
    async(req : Request , res : Response , next : NextFunction) => {
        
        let stats;

        if(myCache.has("admin-stats")){
            stats = JSON.parse(myCache.get("admin-stats") as string);
        }
        else{
            // stats = await
        }

        return res.status(200).json({
            success : true,
            stats
        })
    }
)
export const getPieCharts = asyncHandler(
    async(req : Request , res : Response , next : NextFunction) => {
        
    }
)
export const getBarCharts = asyncHandler(
    async(req : Request , res : Response , next : NextFunction) => {
        
    }
)
export const getLineCharts = asyncHandler(
    async(req : Request , res : Response , next : NextFunction) => {
        
    }
)