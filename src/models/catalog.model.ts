export interface ICatalog {
  _id: string;
  name: string;
  categories: string[];
  type: IGenderCatalog[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface IGenderCatalog {
  productType: string;
  image: string;
  description: string;
  _id: string;
  slug: string;
}
