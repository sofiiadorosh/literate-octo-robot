import { RootState } from '../index';

export const selectCategory = (state: RootState) => state.filters.category;

export const selectQuery = (state: RootState) => state.filters.query;

export const selectBrand = (state: RootState) => state.filters.brand;

export const selectRating = (state: RootState) => state.filters.rating;

export const selectPrice = (state: RootState) => state.filters.price;
