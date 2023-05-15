import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  category: string;
  query: string;
}

const filtersInitialState = {
  category: 'All categories',
  query: '',
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
  },
});

export const { setCategory, setQuery } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
