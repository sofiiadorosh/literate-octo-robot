import { Product } from '@types';

type Parameters = {
  page: number;
  limit: number;
  products: Product[];
};

export const getProductPerPage = ({ page, limit, products }: Parameters) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return products.slice(startIndex, endIndex);
};
