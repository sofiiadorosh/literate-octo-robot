import { Product } from './product';

export type CartItem = {
  product: Product;
  chosenUnit: string;
  chosenQuantity: number;
};
