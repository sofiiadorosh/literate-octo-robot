import { RootState } from '../index';

export const selectError = (state: RootState) => state.productDetails.error;

export const selectIsLoading = (state: RootState) =>
  state.productDetails.isLoading;

export const selectProductDetails = (state: RootState) =>
  state.productDetails.selectedProduct;
