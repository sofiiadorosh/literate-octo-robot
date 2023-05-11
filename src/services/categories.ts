import { Product } from '@types';

export const getCategories = (products: Product[]) => {
  return Array.from(new Set(products.map(({ category }) => category)));
};

export const getProductsByCategory = (
  products: Product[],
  productCategory: string
) => {
  return products.filter(
    ({ category }) => category.toLowerCase() === productCategory
  );
};
