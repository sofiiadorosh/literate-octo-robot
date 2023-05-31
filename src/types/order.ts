import { Product } from './product';

export type CartItem = {
  id: string;
  product: Product;
  chosenUnit: string;
  chosenQuantity: number;
};
