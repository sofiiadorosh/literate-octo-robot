import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Price, SortingFilters } from '@types';

const INITIAL_PAGE = 1;
const LIMIT = 5;

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
  page: INITIAL_PAGE,
  limit: LIMIT,
} as FiltersState;

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      return { ...state, page: INITIAL_PAGE, category: action.payload };
    },
    setQuery(state, action: PayloadAction<string>) {
      return { ...state, page: INITIAL_PAGE, query: action.payload };
    },
    setBrand(state, action: PayloadAction<string>) {
      if (state.brand.includes(action.payload)) {
        return {
          ...state,
          page: INITIAL_PAGE,
          brand: [...state.brand.filter(element => element !== action.payload)],
        };
      }
      return {
        ...state,
        page: INITIAL_PAGE,
        brand: [...state.brand, action.payload],
      };
    },
    setRating(state, action: PayloadAction<number>) {
      if (state.rating.includes(action.payload)) {
        return {
          ...state,
          page: INITIAL_PAGE,
          rating: [
            ...state.rating.filter(element => element !== action.payload),
          ],
        };
      }
      return {
        ...state,
        page: INITIAL_PAGE,
        rating: [...state.rating, action.payload],
      };
    },
    setMinPrice(state, action: PayloadAction<number>) {
      return {
        ...state,
        page: INITIAL_PAGE,
        price: { ...state.price, min: action.payload },
      };
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      return {
        ...state,
        page: INITIAL_PAGE,
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
        page: INITIAL_PAGE,
      };
    },
    setSort(state, action: PayloadAction<SortingFilters>) {
      return { ...state, page: INITIAL_PAGE, sort: action.payload };
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
