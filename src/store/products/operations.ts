import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product } from '@types';

axios.defaults.baseURL = 'https://64589eb68badff578ef5fcf0.mockapi.io/';

export const getProducts = createAsyncThunk<
  Product[],
  undefined,
  { rejectValue: string }
>('products/get', async (_, thunkAPI) => {
  try {
    const response = await axios.get<Product[]>('/products');
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});
