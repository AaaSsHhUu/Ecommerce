import { IUser } from "../models/user.ts";

declare module "express"{
    interface Request{
        user ?: IUser;
    }
}