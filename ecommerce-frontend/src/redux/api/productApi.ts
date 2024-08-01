import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryResponse, DeleteProductRequest, MessageResponse, NewProductRequest, ProductDetails, ProductsResponse, SearchProductsQuery, SearchProductsResponse, UpdateProductRequest } from "../../types/api-types-";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
    credentials : "include" // for cookies
  }),

  tagTypes : ["product"], // for revalidating cached data

  endpoints: (builder) => ({

    latestProducts : builder.query<ProductsResponse, string>({
      query: () => "/latest",
      providesTags : ["product"]
    }),

    allProducts : builder.query<ProductsResponse, string>({
      query: (id) => `/admin-products?id=${id}`,
      providesTags : ["product"]
    }),

    categories : builder.query<CategoryResponse, string>({
      query: () => "/categories",
      providesTags : ["product"]
    }),

    searchProducts : builder.query<SearchProductsResponse, SearchProductsQuery>({
        query : ({search, price, page, category, sort}) => {
            let baseQuery = `/all?search=${search}&page=${page}`;
            
            if(price) baseQuery += `&price=${price}`;
            if(category) baseQuery += `&category=${category}`;
            if(sort) baseQuery += `&sort=${sort}`;

            return baseQuery;
        },
        providesTags : ["product"]
    }),

    newProduct : builder.mutation<MessageResponse, NewProductRequest>({
      query : ({formData, id}) => ({
        url : `/new?id=${id}`,
        method : "POST",
        body : formData
      }),
      invalidatesTags : ["product"]
    }),

    productDetails : builder.query<ProductDetails,string>({
      query : (id) => (`/${id}`),
      providesTags : ["product"]
    }),

    updateProduct : builder.mutation<MessageResponse, UpdateProductRequest>({
      query : ({formData, userId, productId}) => ({  
        url : `/${productId}?id=${userId}`,
        method : "PUT",
        body : formData
      }),
      invalidatesTags : ["product"]
    }),

    deleteProduct : builder.mutation<MessageResponse, DeleteProductRequest>({
      query : ({userId, productId}) => ({
        url : `/${productId}?id=${userId}`,
        method : "DELETE",
      }),
      invalidatesTags : ["product"]
    })

  }),
});

export const { 
  useLatestProductsQuery, 
  useAllProductsQuery, 
  useCategoriesQuery, 
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi;

/*
  # For queries, you usually destructure the result like this:
      const { data, isLoading } = useGetSomeDataQuery();

  # For mutations, the hook returns an array where the first element is the trigger function and the second element is an object containing the mutation state. Therefore, you should use array destructuring.
      const [triggerFunction, { data, isLoading }] = useMutation();

*/
