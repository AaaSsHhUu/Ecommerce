import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignupResponse, LoginResponse } from "../../types/api-types-";
import { LoginInfo, SignupInfo } from "../../types/types";
// import { server } from "../store";

export const userAPI = createApi({
    reducerPath : "userApi",
    baseQuery : fetchBaseQuery({baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/user`}),
    endpoints : (builder) => ({
        // /api/v1/user/signup
        signup : builder.mutation<SignupResponse, SignupInfo>({ // <Response, Query>
            query : (user) => ({
                url : "/signup",
                method : "POST",
                body : user
            })
        }),

        login : builder.mutation<LoginResponse, LoginInfo>({
            query : (user) => ({
                url : "/login",
                method : "POST",
                body : user
            })
        })
    })
})

export const {useSignupMutation} = userAPI;