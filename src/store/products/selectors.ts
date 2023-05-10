import { RootState } from '../index';

export const selectProducts = (state: RootState) => state.products.items;
