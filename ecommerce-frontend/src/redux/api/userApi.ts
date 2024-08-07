import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";
import { AllUserResponse, AxiosGetUserResponse, DeleteUserRequest, MessageResponse } from "../../types/api-types-";
import axios from "axios";

export const userAPI = createApi({
    reducerPath : "userApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/user`,
        credentials : "include"
    }),
    tagTypes : ["users"],
    endpoints : (builder) => ({
        // /api/v1/user/signup
        login : builder.mutation<MessageResponse, User>({ // < Response, Query >
            query : (user) => ({
                url : "/new",
                method : "POST",
                body : user
            }),
            invalidatesTags : ["users"]
        }),

        deleteUser : builder.mutation<MessageResponse, DeleteUserRequest>({
            query : ({userId, adminId}) => ({
                url : `/${userId}?id=${adminId}`,
                method : "DELETE"
            }),
            invalidatesTags : ["users"]
        }),

        allUser : builder.query<AllUserResponse, string>({
            query : (adminId) => ({
                url : `/all?id=${adminId}`
            }),
            providesTags : ["users"]
        })

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

export const {useLoginMutation, useDeleteUserMutation, useAllUserQuery} = userAPI;