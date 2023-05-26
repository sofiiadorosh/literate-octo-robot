import { createSlice } from '@reduxjs/toolkit';

import { Product } from '@types';

import { getProducts } from './operations';

interface ProductsState {
  items: Product[];
  isLoading: boolean;
  error: null | string;
  selectedProduct: null | Product;
}

const productsInitialState: ProductsState = {
  items: [],
  isLoading: false,
  error: null,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState: productsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, state => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      return { ...state, error: null, items: [...payload], isLoading: false };
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: payload ? payload : 'An unknown error occured',
      };
    });
  },
});

export const productsReducer = productsSlice.reducer;
