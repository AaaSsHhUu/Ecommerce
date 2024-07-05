import { asyncHandler } from "../middleware/error.js";
import { Request, Response, NextFunction } from "express";
import { newProductValidation } from "../types/schema.js";
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/product.js";
import { rm } from "fs";
import {SearchQueryInputs, BaseQuery, NewProductRequestBody} from "../types/types.js";
import { myCache } from "../app.js";
// import {faker} from "@faker-js/faker";

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
    let products = [];

    if(myCache.has("lastest-products")){
      products = JSON.parse(myCache.get("lastest-products") as string)
    }
    else{
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
      myCache.set("latest-products", JSON.stringify(products));
    }


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

export const getAdminProducts = asyncHandler(
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


// Get all products in search

export const getAllProducts = asyncHandler(
  async(req : Request, res : Response, next : NextFunction) => {
    const {search, category, price, page, sort } : SearchQueryInputs = req.query;
    
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (Number(page) - 1) * (limit);

    let baseQuery : BaseQuery = {};

    if(search){
      baseQuery.name = {
          $regex : search,
          $options : "i"
      }
    }

    if(price){
      baseQuery.price = {
        $lte : Number(price)
      }
    }

    if(category){
      baseQuery.category = category;
    }

    // Promise.all -> Creates a Promise that is resolved with an array of results when all of the provided Promises resolve (or rejected when any Promise is rejected).
    const [products, filteredProducts] = await Promise.all([
        Product.find(baseQuery).sort(sort && {price : sort === "asc" ? 1 : -1}).limit(limit).skip(skip),
        Product.find(baseQuery)
    ])

    const totalPages = Math.ceil(filteredProducts.length / limit);

    if(!products){
      throw new ErrorHandler("Products not found", 404);
    }

    return res.status(200).json({
      success : true,
      products,
      totalPages
    })

  }
)

// const createRandomProducts = async (count : number = 10) => {
    
//     const products = [];
//     for(let i=0;i < count; i++){
//       const product = {
//         name : faker.commerce.productName(),
//         photo : "uploads\\a406ff9e-6542-4b0c-9451-5172ebeeb9e7.jpg",
//         price : faker.commerce.price({min : 1000, max : 100000, dec : 0}),
//         stock : faker.commerce.price({min : 10, max : 100, dec : 0}),
//         category : faker.commerce.department(),
//         createdAt : new Date(faker.date.past()),
//         updatedAt : new Date(faker.date.recent()),
//         _v : 0
//       }

//       products.push(product);
//     }

//     await Product.create(products);
//     console.log("Successfully created");
// }

// const deleteRandomProduct = async (count : number = 10) => {
//   const products = await Product.find().skip(10);
//   for(let i=0; i < count ; i++){
//         const product = products[i];
//         await Product.deleteOne({_id : product.id});
//     }

//     console.log("Successfully deleted products");
// }

// deleteRandomProduct(40);