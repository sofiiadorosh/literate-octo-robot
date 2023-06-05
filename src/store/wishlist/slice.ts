import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '@types';

import { getProductsByIds } from './operations';

export interface WishlistState {
  items: Product[];
  isLoading: boolean;
  error: null | string;
  wishlist: string[];
}

const wishlistInitialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: wishlistInitialState,
  reducers: {
    setWishlist(state, action: PayloadAction<string>) {
      if (state.wishlist.includes(action.payload)) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      }
      return {
        ...state,
        wishlist: [action.payload, ...state.wishlist],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(getProductsByIds.pending, state => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getProductsByIds.fulfilled, (state, { payload }) => {
      return {
        ...state,
        error: null,
        items: payload,
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

export const { setWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
