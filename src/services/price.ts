import { Product } from '@types';

export const getPrices = (products: Product[]) => {
  const prices = products.map(({ price }) => price.new);
  const maxPrice = Math.ceil(Math.max(...prices));
  const minPrice = Math.floor(Math.min(...prices));
  return { maxPrice, minPrice };
};
