import { Product } from '@types';

export const getCategories = (products: Product[]) => {
  return Array.from(new Set(products.map(({ category }) => category)));
};
