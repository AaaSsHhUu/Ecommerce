import {z} from "zod";

// users
export const signupValidation = z.object({
    _id : z.string(),
    photo : z.string().min(1,"Please Add one photo").optional(),
    role : z.enum(["admin","user"]).default("user").optional(),
    name : z.string().min(1,"Please Enter name"),
    email : z.string().email("Invalid Email format"),
    password : z.string().min(8, "Password should atleast have 8 letters"),
    gender : z.enum(["male", "female"]),
    dob : z.date().or(z.string().transform(val => new Date(val))),
})

export const signinValidation = z.object({
    email : z.string().email("Enter valid email address"),
    password : z.string()
})

// Product
export const newProductValidation = z.object({
    name : z.string(),
    price : z.string(),
    stock : z.string(),
    category : z.string()
})

export const shippingInfoSchema = z.object({
    address : z.string(),
    city : z.string(),
    state : z.string(),
    country : z.string(),
    pinCode : z.number()
})

export const orderItemsSchema = z.object({
    name : z.string(),
    photo : z.string(),
    price : z.number(),
    quantity : z.number(),
    productId : z.string()
})

export const newOrderSchema = z.object({
    shippingInfo : shippingInfoSchema,
    user : z.string(),
    subTotal : z.number(),
    tax : z.number(),
    shippingCharges : z.number(),
    discount : z.number(),
    total : z.number(),
    status : z.enum(["Processing" || "Shipped" || "Delivered"]).optional().default("Processing"),
    orderItems : z.array(orderItemsSchema)
})

export const couponSchema = z.object({
    coupon : z.string().min(6, "Coupon should have atleast 6 letters"),
    amount : z.number()
})
