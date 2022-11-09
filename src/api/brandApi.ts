import { IBrand } from '../models/brand.model';
import { IProduct } from '../models/product.model';
import axiosClient from './axiosClient';

const brandApi = {
  getAll: (
    params: any,
  ): Promise<{ countDocument: number; resultPerPage: number; data: IBrand[] }> => {
    console.log(params);

    const url = 'brands';
    return axiosClient.get(url, { params });
  },
  getById: (id: string): Promise<IBrand> => {
    const url = `brand/${id}`;
    return axiosClient.get(url);
  },
};
export default brandApi;
