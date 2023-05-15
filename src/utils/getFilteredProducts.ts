import { Product } from '@types';

type Filter = {
  products: Product[];
  category?: string;
  query?: string;
};

export const getFilteredProducts = ({ category, query, products }: Filter) => {
  return products.filter(product => {
    const productCategory = product.category?.toLowerCase();
    const productTitle = product.title?.trim().toLowerCase();

    return (
      (!category || productCategory === category.toLowerCase()) &&
      (!query || productTitle?.includes(query.trim()))
    );
  });
};
