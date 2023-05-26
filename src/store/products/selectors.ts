import { createSelector } from '@reduxjs/toolkit';

import {
  selectCategory,
  selectQuery,
  selectBrand,
  selectRating,
  selectPrice,
  selectSort,
} from '@store/filters/selectors';
import { SortingFilters } from '@types';
import { getNewPrice } from '@utils';

import { RootState } from '../index';

export const selectProducts = (state: RootState) => state.products.items;

export const selectIsLoading = (state: RootState) => state.products.isLoading;

export const selectError = (state: RootState) => state.products.error;

export const selectPrices = createSelector([selectProducts], products => {
  let min = 0;
  let max = 0;

  products.forEach(product => {
    const newPrice = getNewPrice(product.price.pcs, product.discount);
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
});

export const selectVisibleProducts = createSelector(
  [
    selectProducts,
    selectCategory,
    selectQuery,
    selectBrand,
    selectRating,
    selectPrice,
    selectSort,
  ],
  (products, category, query, brands, rating, price, sort) => {
    const visibleProducts = products.filter(product => {
      const productCategory = product.category.toLowerCase();
      const productTitle = product.title.trim().toLowerCase();
      const productBrand = product.farm.trim().toLowerCase();
      const productRating = product.rating;
      const productPrice = getNewPrice(product.price.pcs, product.discount);

      const matchesCategory =
        category === 'All categories' ||
        (category && productCategory === category.toLowerCase());
      const matchesQuery =
        !query || (query.trim() && productTitle.includes(query.trim()));
      const matchesBrand =
        !brands.length ||
        (brands.length &&
          brands.some(brand => brand.trim().toLowerCase() === productBrand));
      const matchesRating =
        !rating.length ||
        (rating.length && rating.some(element => element === productRating));
      const matchesPrice =
        productPrice >= price.min && productPrice <= price.max;

      return (
        matchesCategory &&
        matchesQuery &&
        matchesBrand &&
        matchesRating &&
        matchesPrice
      );
    });

    switch (sort) {
      case SortingFilters.A_TO_Z:
        visibleProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case SortingFilters.Z_to_A:
        visibleProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case SortingFilters.PRICE_HIGH_TO_LOW:
        visibleProducts.sort((a, b) => {
          const prevPrice = getNewPrice(a.price.pcs, a.discount);
          const nextPrice = getNewPrice(b.price.pcs, b.discount);
          return nextPrice - prevPrice;
        });
        break;
      case SortingFilters.PRICE_LOW_TO_HIGH:
        visibleProducts.sort((a, b) => {
          const prevPrice = getNewPrice(a.price.pcs, a.discount);
          const nextPrice = getNewPrice(b.price.pcs, b.discount);
          return prevPrice - nextPrice;
        });
        break;
      case SortingFilters.RATING_HIGH_TO_LOW:
        visibleProducts.sort((a, b) => b.rating - a.rating);
        break;
      case SortingFilters.RATING_LOW_TO_HIGH:
        visibleProducts.sort((a, b) => a.rating - b.rating);
        break;

      default:
        visibleProducts;
    }
    return visibleProducts;
  }
);
