import { createSelector } from '@reduxjs/toolkit';

import { CartItem } from '@types';

import { RootState } from '../index';

export const selectData = (state: RootState) => state.cart.data;

export const selectCountry = (state: RootState) => state.cart.country;

export const selectCart = (state: RootState) => state.cart.cart;

export const selectIsPromocodeApplied = (state: RootState) =>
  state.cart.appliedPromocode;

export const selectPromocodeDiscount = (state: RootState) =>
  state.cart.promocodeDiscount;

export const selectTax = (state: RootState) => state.cart.tax;

export const selectCartProducts = (state: RootState) => state.cart.products;

export const selectIsFormSubmitted = (state: RootState) =>
  state.cart.isFormSubmitted;

export const selectCartItems = createSelector(
  [selectCart, selectCartProducts],
  (cart, products) => {
    const selectedProducts = cart.reduce((selectedItems, matchingCartItem) => {
      const matchingProduct = products.find(
        product => product.id === matchingCartItem.id
      );
      if (matchingProduct) {
        const cartItem: CartItem = {
          id: matchingCartItem._id,
          product: matchingProduct,
          chosenUnit: matchingCartItem.unit,
          chosenQuantity: matchingCartItem.quantity,
        };
        selectedItems.push(cartItem);
      }
      return selectedItems;
    }, [] as CartItem[]);

    return selectedProducts;
  }
);
