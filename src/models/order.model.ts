import { IAddress, IUser } from './user.model';

export interface IOrderItem {
  product: string;
  brandName: string;
  image: string;
  quantity: number;
  size: string | number;
  color: string;
  discount: number;
  price: number;
  name: string;
  _id: string;
}
export enum EOrderStatus {
  Processing = 'Processing',
  Shipping = 'Shipping',
  Delivery = 'Delivery',
  Delivered = 'Delivered',
  Canceled = 'Canceled',
}
export interface IOrder {
  _id: string;
  orderId: string;
  user: IUser;
  orderItems: IOrderItem[];
  deliveryInformation: IAddress;
  taxPrice: number;
  shippingPrice: number;
  orderStatus: string;
  totalPrice: number;
  provisionalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  shippingAt?: string;
  deliveryAt?: string;
  deliveredAt?: string;
  canceledAt?: string;
  canceledReason?: string;
  isEvaluated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
