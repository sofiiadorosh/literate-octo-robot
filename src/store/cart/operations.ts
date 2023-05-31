import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product } from '@types';

export const getProductsByIds = createAsyncThunk<
  Product[],
  string[],
  { rejectValue: string }
>('products/getByIds', async (productIds, thunkAPI) => {
  try {
    const requests = productIds.map(productId =>
      axios.get<Product>(`/products/${productId}`)
    );
    const responses = await Promise.all(requests);
    const products = responses.map(response => response.data);
    return products;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});
