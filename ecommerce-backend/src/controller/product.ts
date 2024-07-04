import { asyncHandler } from "../middleware/error.js";
import {Request, Response, NextFunction} from "express";
import { newProductValidation } from "../types/schema.js";
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/product.js";
import {rm} from "fs";

export const createProduct = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
        const {
            name,
            price,
            stock,
            category
        } = req.body;
        const photo = req.file;
        
        const {success} = newProductValidation.safeParse(req.body);
        
        if(!photo){
            throw new ErrorHandler("Please provide photo",400);
        }
        
        if(!success){
            rm(photo?.path,() => {
                console.log("Image deleted");
            })
            throw new ErrorHandler("Invalid Inputs",400);
        }
        
        const product = await Product.create({
            name,
            category : category.toLowerCase(),
            stock : Number(stock),
            price : Number(price),
            photo : photo?.path
        })

        if(!product){
            throw new ErrorHandler("Some error occured while creating product", 500);
        }

        return res.status(201).json({
            success : true,
            message : "Product created successfully",
            product
        })
    }
)