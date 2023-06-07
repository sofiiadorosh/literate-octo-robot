import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '@types';

import { getProductsByIds } from './operations';

export interface WishlistState {
  items: Product[];
  isLoading: boolean;
  error: null | string;
  wishlist: {
    id: string;
    products: string[];
  }[];
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
    setWishlist(
      state,
      action: PayloadAction<{ userId: string; productId: string }>
    ) {
      const { userId, productId } = action.payload;
      const existingItem = state.wishlist.find(item => item.id === userId);

      if (existingItem) {
        if (existingItem.products.includes(productId)) {
          const filteredProducts = existingItem.products.filter(
            id => id !== productId
          );

          return {
            ...state,
            wishlist: state.wishlist.map(item =>
              item.id === userId
                ? { ...item, products: filteredProducts }
                : item
            ),
            items: state.items.filter(item => item.id !== productId),
          };
        } else {
          return {
            ...state,
            wishlist: state.wishlist.map(item =>
              item.id === userId
                ? { ...item, products: [productId, ...item.products] }
                : item
            ),
          };
        }
      }
      return {
        ...state,
        wishlist: [{ id: userId, products: [productId] }, ...state.wishlist],
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
