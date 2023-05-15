import { Product } from '@types';

export const getBrands = (products: Product[]) => {
  return Array.from(new Set(products.map(({ farm }) => farm)));
};

export const getBrandsByCategory = (
  products: Product[],
  categoryName: string
) => {
  return products
    .filter(({ category }) => category === categoryName)
    .map(({ farm }) => farm);
};
