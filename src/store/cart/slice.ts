import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FormValues, CartItem, Product } from '@types';

import { getProductsByIds } from './operations';

type Cart = {
  _id: string;
  id: string;
  unit: string;
  quantity: number;
  stock: string;
};

type CartItemAction = {
  _id: string;
  id: string;
  unit?: string;
  quantity?: number;
};

export interface CartState {
  data: FormValues;
  country: string;
  cart: Cart[];
  appliedPromocode: boolean;
  promocodeDiscount: number;
  tax: number;
  items: CartItem[];
  products: Product[];
  isLoading: boolean;
  error: null | string;
  isFormSubmitted: boolean;
}

export const cartInitialState = {
  data: {
    firstName: '',
    lastName: '',
    emailName: '',
    phoneName: '',
    countryName: '',
    cityName: '',
    apartmentName: '',
    zipName: '',
    notes: '',
    sending: false,
    agreement: false,
  },
  country: '',
  cart: [],
  appliedPromocode: false,
  promocodeDiscount: 0,
  tax: 0,
  items: [],
  products: [],
  error: null,
  isLoading: false,
  isFormSubmitted: false,
} as CartState;

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    setData(state, action: PayloadAction<Partial<FormValues>>) {
      return { ...state, data: { ...state.data, ...action.payload } };
    },
    setCountry(state, action: PayloadAction<Partial<string>>) {
      return { ...state, country: action.payload };
    },
    addToCart(state, action: PayloadAction<Cart>) {
      const { _id, id, stock, unit, quantity } = action.payload;

      const existingItem = state.cart.find(
        item => item.id === id && item.unit === unit
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === id && item.unit === unit
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [{ _id, id, stock, unit, quantity }, ...state.cart],
        };
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload),
      };
    },
    updateCartItem(state, action: PayloadAction<CartItemAction>) {
      const { _id, id, unit, quantity } = action.payload;

      const existingItem = state.cart.find(
        item => item.id === id && item.unit === unit && item._id !== _id
      );
      if (existingItem) {
        const combinedCart = state.cart.map(item => {
          if (item._id === _id && unit) {
            return {
              ...item,
              unit,
              quantity:
                item.quantity + existingItem.quantity > parseInt(item.stock)
                  ? parseInt(item.stock)
                  : item.quantity + existingItem.quantity,
            };
          }
          return item;
        });
        const filteredCart = combinedCart.filter(
          item => item?._id !== existingItem._id
        );
        return { ...state, cart: filteredCart };
      } else {
        const updatedCart = state.cart.map(item => {
          if (item._id === _id) {
            return {
              ...item,
              unit: unit ?? item.unit,
              quantity: quantity ?? item.quantity,
            };
          }
          return item;
        });

        return {
          ...state,
          cart: updatedCart,
        };
      }
    },
    applyPromocode(state) {
      return { ...state, appliedPromocode: true };
    },
    setPromocodeDiscount(state, action: PayloadAction<number>) {
      return { ...state, promocodeDiscount: action.payload };
    },
    setTax(state, action: PayloadAction<number>) {
      return { ...state, tax: action.payload };
    },
    setFormSubmitted(state, action: PayloadAction<boolean>) {
      return { ...state, isFormSubmitted: action.payload };
    },
    clearCart(state) {
      return {
        ...state,
        data: {
          firstName: '',
          lastName: '',
          emailName: '',
          phoneName: '',
          countryName: '',
          cityName: '',
          apartmentName: '',
          zipName: '',
          notes: '',
          sending: false,
          agreement: false,
        },
        cart: [],
        country: '',
        appliedPromocode: false,
        promocodeDiscount: 0,
        tax: 0,
        items: [],
        products: [],
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
        products: payload,
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

export const {
  setData,
  setCountry,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
  applyPromocode,
  setPromocodeDiscount,
  setTax,
  setFormSubmitted,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
