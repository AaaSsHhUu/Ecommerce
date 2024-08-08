import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
    reducerPath : "dashboardApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/admin`
    }),
    endpoints : (builder) => ({

    })
})

export const {} = dashboardApi;