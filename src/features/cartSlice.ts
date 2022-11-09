import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { ICart, ICartItem } from '../models/cart.model';
import { IUser } from '../models/user.model';
import { selectAuth } from './authSlice';
import { v4 as uuidv4 } from 'uuid';
const initialState: { cartItems: ICartItem[] } = {
  cartItems: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const indexItem = state.cartItems.findIndex(
        (cartItem) =>
          cartItem.product._id === action.payload.product._id &&
          cartItem.color === action.payload.color &&
          cartItem.size === action.payload.size,
      );

      if (indexItem >= 0) {
        const indexColor = action.payload.product.colors.findIndex(
          (item) => item.colorName === action.payload.color,
        );
        const indexSize = action.payload.product.colors[indexColor].sizes.findIndex(
          (item) => item.size === action.payload.size,
        );
        const quantityInStock = action.payload.product.colors[indexColor].sizes[indexSize].quantity;
        if (quantityInStock === state.cartItems[indexItem].quantity) {
          toast.error(
            `Màu [${action.payload.color}] - size [${action.payload.size}] chỉ tối đa ${quantityInStock} sản phẩm !`,
          );
        } else {
          state.cartItems[indexItem].quantity += action.payload.quantity;
          toast.info('Thêm số lượng sản phẩm vào giỏ hàng thành công !');
        }
      } else {
        state.cartItems.push({ ...action.payload, _id: uuidv4() });
        toast.success('Thêm vào giỏ hàng thành công !');
      }
    },
    removeFromCart: (state, action: PayloadAction<ICartItem>) => {
      const newState: ICartItem[] = state.cartItems.filter(
        (cartItem: ICartItem) => cartItem._id !== action.payload._id,
      );
      state.cartItems = newState;
      toast.info('Đã xóa sản phẩm khỏi giỏ hàng !');
    },
    decreaseCart: (state, action: PayloadAction<ICartItem>) => {
      const indexItem = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id,
      );
      if (state.cartItems[indexItem].quantity > 1) {
        state.cartItems[indexItem].quantity -= 1;
        // toast.info('Cập nhật giỏ hàng thành công !');
      } else if (state.cartItems[indexItem].quantity === 1) {
        const newState: ICartItem[] = state.cartItems.filter(
          (cartItem: ICartItem) => cartItem._id !== action.payload._id,
        );
        state.cartItems = newState;
        toast.info('Đã xóa sản phẩm khỏi giỏ hàng !');
      }
    },
    increaseCart: (state, action: PayloadAction<ICartItem>) => {
      const indexItem = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id,
      );
      state.cartItems[indexItem].quantity += 1;
      // toast.info('Cập nhật giỏ hàng thành công !');
    },
    setCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartItems = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { setCart, addToCart, removeFromCart, decreaseCart, increaseCart, clearCart } =
  cartSlice.actions;
// export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
