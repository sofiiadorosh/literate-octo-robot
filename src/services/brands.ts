import { Product } from '@types';

export const getUniqueBrands = (products: Product[]) => {
  return Array.from(new Set(products.map(({ farm }) => farm)));
};

export const getBrandsByCategory = (
  products: Product[],
  categoryName: string
) => {
  if (categoryName === 'All categories') {
    return getUniqueBrands(products);
  }
  return getUniqueBrands(
    products.filter(({ category }) => category === categoryName)
  );
};
