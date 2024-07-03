import { asyncHandler } from "../middleware/error.js";
import {Request, Response, NextFunction} from "express";
import { newProductValidation } from "../types/schema.js";
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/product.js";

export const createProduct = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
        const {
            name,
            price,
            stock,
            category
        } = req.body;
        const photo = req.file;
        
        console.log(name);
        console.log(price);
        console.log(stock);
        console.log(category);
        console.log(photo);
        
        const {success} = newProductValidation.safeParse({name,price,stock,category});
        if(!success){
            throw new ErrorHandler("Invalid Inputs for Product",400);
        }
        console.log("success : ", success);
        
        const product = await Product.create({
            name,
            category : category.toLowerCase(),
            stock,
            price,
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