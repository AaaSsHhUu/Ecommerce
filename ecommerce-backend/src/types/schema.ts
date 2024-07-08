import {z} from "zod";

// users
export const signupValidation = z.object({
    photo : z.string().min(1,"Please Add one photo"),
    role : z.enum(["admin","user"]).default("user"),
    name : z.string().min(1,"Please Enter name"),
    email : z.string().email("Invalid Email format"),
    password : z.string().min(8, "Password should atleast have 8 letters"),
    gender : z.enum(["male", "female"]),
    dob : z.string().or(z.date()).transform(val => new Date(val)),
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

// type inference
// user
export type SignupInput = z.infer<typeof signupValidation>
export type SigninInput = z.infer<typeof signinValidation>

// product
export type OrderItemType = z.infer<typeof orderItemsSchema>
export type ShippingInfoType = z.infer<typeof shippingInfoSchema>
export type NewOrderRequestBodyType = z.infer<typeof newOrderSchema>