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

// type inference
export type SignupInput = z.infer<typeof signupValidation>
export type SigninInput = z.infer<typeof signinValidation>