import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import { IAddressUser, IToken, IUser } from '../models/user.model';
import { IProduct } from '../models/product.model';
import { ICart } from '../models/cart.model';
export const authApi = createApi({
  reducerPath: 'authApi',
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
  tagTypes: ['User', 'Product', 'Cart'],
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUser & IToken, { email: string; password: string }>({
      query: (body: { email: string; password: string }) => {
        return {
          url: '/users/login',
          method: 'POST',
          body,
          // credentials: 'include',
        };
      },
    }),
    loginWithGoogle: builder.mutation({
      query: (body: { tokenId: string }) => {
        return {
          url: '/auth/google',
          method: 'POST',
          body,
          // credentials: 'include',
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: { email: string; password: string; phone: string }) => {
        return {
          url: '/users/register',
          method: 'POST',
          body,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: '/password/forgot',
          method: 'POST',
          body,
        };
      },
    }),
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: '/users/logout',
          method: 'DELETE',
          // credentials: 'include',
        };
      },
    }),
    getMyProfile: builder.query<IUser, {}>({
      query: () => {
        return {
          url: '/me',
        };
      },
      providesTags: ['User', 'Product', 'Cart'],
    }),
    updateProfile: builder.mutation<IUser, IUser | any>({
      query: (body) => {
        return {
          url: `/me/update`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    addAddress: builder.mutation<{ message: string }, IAddressUser>({
      query: (body) => {
        return {
          url: `/me/addresses/add`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    updateAddress: builder.mutation<
      { message: string },
      { address: IAddressUser; addressId: string }
    >({
      query: ({ address, addressId }) => {
        return {
          url: `/me/addresses/${addressId}`,
          method: 'PUT',
          body: address,
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginWithGoogleMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useGetMyProfileQuery,
  useForgotPasswordMutation,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useUpdateProfileMutation,
} = authApi;
