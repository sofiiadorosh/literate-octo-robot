export type Product = {
  id: string;
  previewImage: string;
  images: string[];
  title: string;
  overview: string;
  description: {
    name: string;
    details: string;
  }[];
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
  questions: {
    question: string;
    answer: string;
  }[];
  reviews: {
    user: string;
    rating: number;
    title: string;
    review: string;
  }[];
};
