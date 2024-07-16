import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";


export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer : {
        [userAPI.reducerPath] : userAPI.reducer,
    },
    middleware : (defaultMiddlewares) => defaultMiddlewares().concat(userAPI.middleware)
})