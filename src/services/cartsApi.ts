import { BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import { ICart } from '../models/cart.model';
import { IUser } from './../models/user.model';
export const cartsApi = createApi({
  reducerPath: 'cartsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/api/v1',
    // Xử lý header trước khi gửi request
    prepareHeaders: (headers, { getState }) => {
      // getState() giúp lấy ra toàn bộ state trong store
      // getState().user lấy ra state trong userSlice
      const token = (getState() as RootState).auth.token;
      // Nếu có token thì thêm vào headers
      if (token?.accessToken && token.refreshToken) {
        headers.set('Authorization', `Bearer ${token.accessToken}`);
        headers.set('x-refresh', token.refreshToken);
      }
      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getMyCart: builder.query<ICart, {}>({
      query: () => {
        return {
          url: '/cart/me',
          method: 'GET',
          // credentials: 'include',
        };
      },
      providesTags: ['Cart'],
    }),
    addItemToCart: builder.mutation<
      { message: string; data: ICart },
      { product: string; color: string; size: string | number }
    >({
      query: (body) => {
        return {
          url: '/cart/add-to-cart',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Cart'],
    }),
    removeItemFromCart: builder.mutation<ICart, string>({
      query: (cartItemId) => {
        return {
          url: `cart/remove-item-from-cart/${cartItemId}`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Cart'],
    }),
    updateQuantityCart: builder.mutation<ICart, { cartItemId: string; quantity: number }>({
      query: ({ cartItemId, quantity }) => {
        return {
          url: `/cart/${cartItemId}`,
          method: 'PUT',
          body: { quantity },
        };
      },
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetMyCartQuery,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
  useUpdateQuantityCartMutation,
} = cartsApi;
