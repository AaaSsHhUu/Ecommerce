import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";
import { AxiosGetUserResponse, MessageResponse } from "../../types/api-types-";
import axios from "axios";

export const userAPI = createApi({
    reducerPath : "userApi",
    baseQuery : fetchBaseQuery({baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/user`}),
    endpoints : (builder) => ({
        // /api/v1/user/signup
        login : builder.mutation<MessageResponse, User>({ // < Response, Query >
            query : (user) => ({
                url : "/new",
                method : "POST",
                body : user
            })
        }),

    })
})

export const getUser = async (id : string) => {
    try {
        const {data} : {data : AxiosGetUserResponse} = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const {useLoginMutation} = userAPI;