import { RootState } from '../index';

export const selectWishlistIds = (state: RootState) => state.wishlist.wishlist;

export const selectWishlist = (state: RootState) => state.wishlist.items;

export const selectIsLoading = (state: RootState) => state.wishlist.isLoading;
