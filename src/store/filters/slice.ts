import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Price } from '@types';

export interface FiltersState {
  category: string;
  query: string;
  brand: string[];
  rating: number[];
  price: Price;
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
} as FiltersState;

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      return { ...state, category: action.payload };
    },
    setQuery(state, action: PayloadAction<string>) {
      return { ...state, query: action.payload };
    },
    setBrand(state, action: PayloadAction<string>) {
      if (state.brand.includes(action.payload)) {
        return {
          ...state,
          brand: [...state.brand.filter(element => element !== action.payload)],
        };
      }
      return { ...state, brand: [...state.brand, action.payload] };
    },
    setRating(state, action: PayloadAction<number>) {
      if (state.rating.includes(action.payload)) {
        return {
          ...state,
          rating: [
            ...state.rating.filter(element => element !== action.payload),
          ],
        };
      }
      return { ...state, rating: [...state.rating, action.payload] };
    },
    setMinPrice(state, action: PayloadAction<number>) {
      return { ...state, price: { ...state.price, min: action.payload } };
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      return { ...state, price: { ...state.price, max: action.payload } };
    },
    resetFilters(state) {
      return {
        ...state,
        category: 'All categories',
        query: '',
        brand: [],
        rating: [],
        price: { min: 0, max: 0 },
      };
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
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
