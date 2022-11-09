import { BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import { ICart } from '../models/cart.model';
import { EOrderStatus, IOrder } from '../models/order.model';
import { IAddress, IUser } from './../models/user.model';
export const ordersApi = createApi({
  reducerPath: 'ordersApi',
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
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getMyOrder: builder.query<
      { countDocument: number; totalAmount: number; resultPerPage: number; data: IOrder[] },
      {}
    >({
      query: () => `/order/me?sort=-updatedAt`,
      providesTags: ['Order'],
    }),
    createNewOrder: builder.mutation<
      IOrder,
      {
        deliveryInformation: IAddress;
        cartItemsId: string[];
        isPaid?: boolean;
        shippingPrice?: number;
      }
    >({
      query: (body) => {
        return {
          url: '/order/new',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Order'],
    }),
    getOrderById: builder.query<IOrder, { orderId: string }>({
      query: ({ orderId }) => `/order/${orderId}`,
      providesTags: ['Order'],
    }),
    cancelOrder: builder.mutation<{ message: string }, { orderId: string; canceledReason: string }>(
      {
        query: ({ canceledReason, orderId }) => {
          return {
            url: `/order/cancel/${orderId}`,
            method: 'PUT',
            body: { canceledReason },
          };
        },
        invalidatesTags: ['Order'],
      },
    ),
  }),
});

export const {
  useGetMyOrderQuery,
  useCreateNewOrderMutation,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
} = ordersApi;
