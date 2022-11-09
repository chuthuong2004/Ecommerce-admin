import { IProduct } from './product.model';

export interface IBrand {
  name: string;
  logo: string;
  image?: string;
  history: string;
  products: IProduct[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}
