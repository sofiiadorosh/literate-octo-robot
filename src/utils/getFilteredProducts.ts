import { Product } from '@types';

type Filter = {
  category?: string;
  query?: string;
  products: Product[];
};

export const getFilteredProducts = ({ category, query, products }: Filter) => {
  if (category && query) {
    return products
      .filter(product => product.category.toLowerCase() === category)
      .filter(product =>
        product.title.trim().toLowerCase().includes(query.trim())
      );
  }
  if (category && !query) {
    return products.filter(
      product => product.category.toLowerCase() === category
    );
  }
  if (!category && query) {
    return products.filter(product =>
      product.title.trim().toLowerCase().includes(query.trim())
    );
  }
  return products;
};
