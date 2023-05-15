export type Product = {
  id: string;
  image: string;
  title: string;
  description: string;
  rating: number;
  fresheness: string;
  farm: string;
  delivery: string;
  stock: string;
  price: {
    old: number;
    new: number;
  };
  shipping: 'free' | 'paid';
  deliveryTime: number;
  category: string;
};
