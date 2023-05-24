import { createSlice } from '@reduxjs/toolkit';

import { Product } from '@types';

import { getProductById } from './operations';

export interface ProductDetailsState {
  isLoading: boolean;
  error: null | string;
  selectedProduct: null | Product;
}

const productDetailsInitialState: ProductDetailsState = {
  isLoading: false,
  error: null,
  selectedProduct: null,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: productDetailsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProductById.pending, state => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      return {
        ...state,
        error: null,
        selectedProduct: payload,
        isLoading: false,
      };
    });
    builder.addCase(getProductById.rejected, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: payload ? payload : 'An unknown error occured',
      };
    });
  },
});

export const productDetailsReducer = productDetailsSlice.reducer;
