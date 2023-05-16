import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { selectCategory, selectQuery } from '@store/filters/selectors';

export const selectProducts = (state: RootState) => state.products.items;

export const selectIsLoading = (state: RootState) => state.products.isLoading;

export const selectVisibleProducts = createSelector(
  [selectProducts, selectCategory, selectQuery],
  (products, category, query) => {
    return products.filter(product => {
      const productCategory = product.category.toLowerCase();
      const productTitle = product.title.trim().toLowerCase();

      if (category === 'All categories') {
        return productTitle.includes(query.trim());
      }

      if (category && query) {
        return (
          productCategory === category.toLowerCase() &&
          productTitle.includes(query.trim())
        );
      } else if (category) {
        return productCategory === category.toLowerCase();
      } else if (query) {
        return productTitle.includes(query.trim());
      } else {
        return products;
      }
    });
  }
);
