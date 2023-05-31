import { createSelector } from '@reduxjs/toolkit';

import { selectProducts } from '@store/products/selectors';
import { CartItem } from '@types';

import { RootState } from '../index';

export const selectData = (state: RootState) => state.cart.data;

export const selectCountry = (state: RootState) => state.cart.country;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectIsPromocodeApplied = (state: RootState) =>
  state.cart.appliedPromocode;

export const selectPromocodeDiscount = (state: RootState) =>
  state.cart.promocodeDiscount;

export const selectTax = (state: RootState) => state.cart.tax;

export const selectIsFormSubmitted = (state: RootState) =>
  state.cart.isFormSubmitted;

export const selectOrder = createSelector(
  [selectProducts, selectCartItems],
  (allProducts, cartProducts) => {
    return allProducts
      .map(product => {
        const cartProduct = cartProducts.find(item => item.id === product.id);
        if (cartProduct) {
          const { unit, quantity } = cartProduct;
          const orderItem: CartItem = {
            product,
            chosenUnit: unit,
            chosenQuantity: quantity,
          };
          return orderItem;
        }
        return null;
      })
      .filter(item => item !== null) as CartItem[];
  }
);
