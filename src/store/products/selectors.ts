import { RootState } from '../index';

export const selectProducts = (state: RootState) => state.products.items;

export const selectIsLoading = (state: RootState) => state.products.isLoading;
