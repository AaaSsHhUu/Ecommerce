import { asyncHandler } from "../middleware/error.js";
import { Request, Response, NextFunction } from "express";
import { newProductValidation } from "../types/schema.js";
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/product.js";
import { rm } from "fs";

export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    const { success } = newProductValidation.safeParse(req.body);

    if (!photo) {
      throw new ErrorHandler("Please provide photo", 400);
    }

    if (!success) {
      rm(photo?.path, () => {
        console.log("Image deleted");
      });
      throw new ErrorHandler("Invalid Inputs", 400);
    }

    const product = await Product.create({
      name,
      category: category.toLowerCase(),
      stock: Number(stock),
      price: Number(price),
      photo: photo?.path,
    });

    if (!product) {
      throw new ErrorHandler("Some error occured while creating product", 500);
    }

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  }
);

// Get lastest Products
export const getLatestProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find().sort({ createdAt: -1 }).limit(5);

    if (!products) {
      throw new ErrorHandler("Some error occured while fetching products", 500);
    }

    return res.status(200).json({
      success: true,
      products,
    });
  }
);

// Get all categories

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Product.distinct("category");

    if (!categories) {
      throw new ErrorHandler("No categories found", 404);
    }

    return res.status(200).json({
      success: true,
      categories,
    });
  }
);

// get all products

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();

    if (!products) {
      throw new ErrorHandler("No Product found", 404);
    }

    return res.status(200).json({
      success: true,
      products,
    });
  }
);

// getProduct by id
export const getOneProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    return res.status(200).json({
      success: true,
      product,
    });
  }
);

// delete product
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      throw new ErrorHandler("Invalid id, product not found", 404);
    }

    if (product) {
      rm(product?.photo!, () => {
        console.log("removed product photo");
      });
    }

    await Product.deleteOne({_id : id});
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  }
);

// update product
export const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const { name, price, stock, category } = req.body;
    const photo = req.file;

    const product = await Product.findById(id);
    // console.log("product : ",product);
    
    if (!product) {
      throw new ErrorHandler("Invalid id, product not found", 404);
    }

    if (photo) {
      rm(product?.photo!, () => {
        console.log("removed product previous photo");
      });
      product.photo = photo.path
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    const updatedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  }
);
