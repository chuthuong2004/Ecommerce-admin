import { ICatalog } from './catalog.model';
import { EGenderType, IProduct } from './product.model';

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  products: IProduct['_id'][];
  catalog: ICatalog['_id'];
  gender: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
