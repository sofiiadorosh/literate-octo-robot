import { RootState } from '../index';

export const selectData = (state: RootState) => state.cart.data;

export const selectCountry = (state: RootState) => state.cart.country;
