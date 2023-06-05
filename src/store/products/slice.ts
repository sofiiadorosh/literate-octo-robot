import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '@types';

import { getProducts, getProductsByIds } from './operations';

export interface ProductsState {
  items: Product[];
  isLoading: boolean;
  error: null | string;
  selectedProduct: null | Product;
  wishlist: string[];
  products: Product[];
}

const productsInitialState: ProductsState = {
  items: [],
  isLoading: false,
  error: null,
  selectedProduct: null,
  wishlist: [],
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState: productsInitialState,
  reducers: {
    setWishlist(state, action: PayloadAction<string>) {
      if (state.wishlist.includes(action.payload)) {
        return {
          ...state,
          wishlist: [...state.wishlist.filter(item => item !== action.payload)],
        };
      }
      return {
        ...state,
        wishlist: [action.payload, ...state.wishlist],
      };
    },
  },
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
    builder.addCase(getProductsByIds.pending, state => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getProductsByIds.fulfilled, (state, { payload }) => {
      return {
        ...state,
        error: null,
        products: payload,
        isLoading: false,
      };
    });
    builder.addCase(getProductsByIds.rejected, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: payload ? payload : 'An unknown error occured',
      };
    });
  },
});

export const { setWishlist } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
