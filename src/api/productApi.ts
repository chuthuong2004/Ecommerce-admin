import { IProduct } from '../models/product.model';
import axiosClient from './axiosClient';

const productApi = {
  getAll: (params: any) => {
    console.log(params);

    const url = 'products';
    return axiosClient.get(url, { params });
  },
  getById: (id: string): Promise<IProduct> => {
    const url = `product/${id}`;
    return axiosClient.get(url);
  },
  getBySlug: (slug: string): Promise<IProduct> => {
    const url = `product/slug/${slug}`;
    return axiosClient.get(url);
  },
  addFavorite: (productId: string): Promise<{ message: string; data: IProduct }> => {
    const url = `products/favorite/add/${productId}`;
    return axiosClient.put(url);
  },
  removeFavorite: (productId: string): Promise<{ message: string; data: IProduct }> => {
    const url = `products/favorite/remove/${productId}`;
    return axiosClient.put(url);
  },
};
export default productApi;
