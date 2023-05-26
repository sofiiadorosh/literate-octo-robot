export const getNewPrice = (oldPrice: number, discount: number) => {
  return Number((oldPrice - (oldPrice * discount) / 100).toFixed(2));
};
