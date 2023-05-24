import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product } from '@types';

export const getProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>('products/getById', async (productId, thunkAPI) => {
  try {
    const response = await axios.get<Product>(`/products/${productId}`);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});
