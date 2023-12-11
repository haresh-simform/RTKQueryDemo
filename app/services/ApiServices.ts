import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsData, void>({
      query: () => 'products'
    }),
    getCategories: builder.query<String[], void>({
      query: () => 'products/categories'
    }),
    getCategorieSpecificProduct: builder.query<ProductsData, string>({
      query: (category) => `products/category/${category}`
    }),
    getSearchedProduct: builder.query<ProductsData, string>({
      query: (keyword) => `products/search?q=${keyword}`
    }),
    getProductDetails: builder.query<Product, { id: string; id: number }>({
      query: ({ id }) => `products/${id}`
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: 'products/add',
        method: 'POST',
        body
      })
    }),
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: 'products/update',
        method: 'POST',
        body
      })
    }),
    deleteProduct: builder.mutation<Product, string>({
      query: (productId) => ({
        url: `products/${productId}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useLazyGetCategorieSpecificProductQuery,
  useLazyGetSearchedProductQuery,
  useGetProductDetailsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi;

interface ProductsData {
  products: Product[];
}
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
