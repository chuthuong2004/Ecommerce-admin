import { IBrand } from './brand.model';
import { ICategory } from './category.model';

export enum EGenderType {
  Woman = 'women',
  Man = 'man',
  Kid = 'kid',
  Unisex = 'unisex',
}
export interface ISize {
  size: string | number;
  quantity: number;
  _id: string;
}
export interface IColor {
  images: string[];
  imageSmall: string;
  imageMedium: string;
  colorName: string;
  sizes: ISize[];
  _id: string;
}
export interface IProduct {
  name: string;
  description: string;
  price: number;
  discount: number;
  category: ICategory;
  likeCount: number;
  quantitySold: number;
  favorites: string[];
  rate: number;
  keywords: string[];
  reviews: string[];
  colors: IColor[];
  brand: Omit<IBrand, 'products'>;
  gender: string;
  preserveInformation?: string;
  deliveryReturnPolicy?: string;
  slug: string;
  createdAt: string;
  deleted: boolean;
  updatedAt: string;
  _id: string;
  __v: number;
  deletedAt?: string;
}
export interface IQueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
}
export interface IResponseProducts {
  countDocument: number;
  resultPerPage: number;
  data: IProduct[];
}
export enum ESort {
  MOST_POPULAR = '-likeCount',
  LATEST = '-createdAt',
  BEST_SELLER = '-quantitySold',
  PRICE_INCREASE = 'price',
  PRICE_DECREASE = '-price',
}
export interface IFilter {
  gender: string;
  brand: string[];
  category: string[];
  color: string;
  size: string;
  price: string;
}
export interface IActionFilter {
  sort: string;
  filter?: IFilter;
}
