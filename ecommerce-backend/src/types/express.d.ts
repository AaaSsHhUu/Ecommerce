import { IUser } from "../types/types.ts";

declare module "express"{
    interface Request{
        user ?: IUser;
    }
}