import { Product } from '@types';

type Price = {
  maxPrice: number;
  minPrice: number;
};

export const getPrices = (products: Product[]): Price => {
  const prices = products.map(({ price }) => price.new);
  const maxPrice = Math.ceil(Math.max(...prices));
  const minPrice = Math.floor(Math.min(...prices));
  return { maxPrice, minPrice };
};
