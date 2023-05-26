import { Description } from './description';
import { Question } from './question';
import { Review } from './review';

export type Product = {
  id: string;
  previewImage: string;
  images: string[];
  title: string;
  overview: string;
  description: Description[];
  country: string;
  color?: string;
  rating: number;
  fresheness: string;
  farm: string;
  deliveryArea: string;
  stock: string;
  price: {
    [key: string]: number;
  };
  discount: number;
  shipping: 'free' | 'paid';
  deliveryTime: number;
  category: string;
  sizes: string[];
  units: string[];
  questions: Question[];
  reviews: Review[];
};
