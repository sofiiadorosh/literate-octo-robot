import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FormValues } from '@types';

export interface CartState {
  data: FormValues;
  country: string;
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
  },
});

export const { setData, setCountry } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
