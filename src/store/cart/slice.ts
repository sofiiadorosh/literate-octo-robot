import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FormValues } from '@types';

type CartItem = {
  id: string;
  unit: string;
  quantity: number;
};

type CartItemAction = {
  id: string;
  unit?: string;
  quantity?: number;
};

export interface CartState {
  data: FormValues;
  country: string;
  items: CartItem[];
  appliedPromocode: boolean;
  promocodeDiscount: number;
  tax: number;
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
  items: [],
  appliedPromocode: false,
  promocodeDiscount: 0,
  tax: 0,
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
    addToCart(state, action: PayloadAction<CartItem>) {
      return { ...state, items: [...state.items, action.payload] };
    },
    removeFromCart(state, action: PayloadAction<string>) {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    },
    updateCartItem(state, action: PayloadAction<CartItemAction>) {
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.id) {
            if (action.payload.unit) {
              return { ...item, unit: action.payload.unit };
            } else if (action.payload.quantity) {
              return { ...item, quantity: action.payload.quantity };
            }
          }
          return item;
        }),
      };
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
        items: [],
        country: '',
        appliedPromocode: false,
        promocodeDiscount: 0,
        tax: 0,
      };
    },
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
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
