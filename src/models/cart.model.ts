import { IProduct } from './product.model';
import { IUser } from './user.model';

export interface ICart {
  _id: string;
  user: IUser;
  cartItems: ICartItem[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
export interface ICartItem {
  product: IProduct;
  quantity: number;
  size: string | number;
  color: string;
  image: string;
  _id?: string;
}
export enum EActionCart {
  ADD = 'add',
  REMOVE = 'remove',
  INCREASE = 'increase',
  DECREASE = 'decrease',
}
