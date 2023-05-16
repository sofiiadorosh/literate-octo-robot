import { Product, CategoryCount } from '@types';

export const getCategories = (products: Product[]): CategoryCount => {
  return products
    .map(({ category }) => category)
    .reduce((acc: CategoryCount, category) => {
      if (!acc[category]) {
        acc[category] = 1;
      } else {
        acc[category] += 1;
      }
      return acc;
    }, {});
};
