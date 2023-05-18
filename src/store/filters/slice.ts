import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Price, SortingFilters } from '@types';

export interface FiltersState {
  category: string;
  query: string;
  brand: string[];
  rating: number[];
  price: Price;
  sort: SortingFilters;
  page: number;
  limit: number;
}

const filtersInitialState = {
  category: 'All categories',
  query: '',
  brand: [],
  rating: [],
  price: {
    min: 0,
    max: 0,
  },
  sort: SortingFilters.SELECT,
  page: 1,
  limit: 5,
} as FiltersState;

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      return { ...state, page: 1, category: action.payload };
    },
    setQuery(state, action: PayloadAction<string>) {
      return { ...state, page: 1, query: action.payload };
    },
    setBrand(state, action: PayloadAction<string>) {
      if (state.brand.includes(action.payload)) {
        return {
          ...state,
          page: 1,
          brand: [...state.brand.filter(element => element !== action.payload)],
        };
      }
      return { ...state, page: 1, brand: [...state.brand, action.payload] };
    },
    setRating(state, action: PayloadAction<number>) {
      if (state.rating.includes(action.payload)) {
        return {
          ...state,
          page: 1,
          rating: [
            ...state.rating.filter(element => element !== action.payload),
          ],
        };
      }
      return { ...state, page: 1, rating: [...state.rating, action.payload] };
    },
    setMinPrice(state, action: PayloadAction<number>) {
      return {
        ...state,
        page: 1,
        price: { ...state.price, min: action.payload },
      };
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      return {
        ...state,
        page: 1,
        price: { ...state.price, max: action.payload },
      };
    },
    resetFilters(state) {
      return {
        ...state,
        category: 'All categories',
        query: '',
        brand: [],
        rating: [],
        price: { min: 0, max: 0 },
        sort: SortingFilters.SELECT,
        page: 1,
      };
    },
    setSort(state, action: PayloadAction<SortingFilters>) {
      return { ...state, page: 1, sort: action.payload };
    },
    setPage(state, action: PayloadAction<number>) {
      return { ...state, page: action.payload };
    },
    setNextPage(state) {
      return { ...state, page: state.page + 1 };
    },
  },
});

export const {
  setCategory,
  setQuery,
  setBrand,
  setRating,
  setMinPrice,
  setMaxPrice,
  resetFilters,
  setSort,
  setPage,
  setNextPage,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
