import { IColor, IProduct } from './product.model';

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
export interface IFavorite {
  product: IProduct;
  size: string | number;
  color: string;
  colorId: IColor['_id'];
  quantity: number;
  _id: string;
}
export enum EGender {
  Male = 'Nam',
  Female = 'Nữ',
  Other = 'Other',
}
export interface IUser {
  _id: string;
  email: string;
  username: string;
  phone?: string;
  isAdmin: boolean;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  gender?: EGender;
  dateOfBirth?: string;
  orders?: string[];
  reviews?: string[];
  favorites?: IFavorite[];
  addresses?: IAddressUser[];
  cart?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
  loggedOut?: boolean;
  loggedOutAt?: string;
}

export interface IAddress {
  firstName: string;
  lastName?: string;
  phone?: string;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  _id?: string;
}
export interface IAddressUser extends IAddress {
  isDefault: boolean;
}

export interface IProvince {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: string;
  districts: IDistrict[];
}
export interface IDistrict {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  wards: IWard[];
}
export interface IWard {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
}
export interface FileResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
