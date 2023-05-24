import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product, Units } from '@types';

import { getProductById } from './operations';

export interface ProductDetailsState {
  isLoading: boolean;
  error: null | string;
  selectedProduct: null | Product;
  quantity: number;
  unit: Units;
}

const productDetailsInitialState: ProductDetailsState = {
  isLoading: false,
  error: null,
  selectedProduct: null,
  quantity: 1,
  unit: Units.PCS,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: productDetailsInitialState,
  reducers: {
    setQuantity(state, action: PayloadAction<number>) {
      return { ...state, quantity: action.payload };
    },
    setUnit(state, action: PayloadAction<Units>) {
      return { ...state, unit: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(getProductById.pending, state => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      return {
        ...state,
        error: null,
        quantity: 1,
        unit: Units.PCS,
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

export const { setQuantity, setUnit } = productDetailsSlice.actions;
export const productDetailsReducer = productDetailsSlice.reducer;
