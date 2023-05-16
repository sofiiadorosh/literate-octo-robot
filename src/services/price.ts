import { Product, Price } from '@types';

export const getPrices = (products: Product[]): Price => {
  let min = products[0].price.new;
  let max = products[0].price.new;

  products.forEach(product => {
    const newPrice = product.price['new'];
    if (newPrice < min) {
      min = newPrice;
    }
    if (newPrice > max) {
      max = newPrice;
    }
  });

  const roundedMin = Math.floor(min);
  const roundedMax = Math.ceil(max);

  return { min: roundedMin, max: roundedMax };
};
