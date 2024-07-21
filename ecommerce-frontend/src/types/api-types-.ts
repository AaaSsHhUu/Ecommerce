import { Product, User } from "./types";

export interface MessageResponse{
    success : boolean;
    message : string;
}

export type AxiosGetUserResponse = {
    success : boolean;
    user : User;
}

export type ProductsResponse = {
    success : boolean;
    products : Product[];
}