import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product } from '@types';

const getProductById = async (productId: string) => {
  const product = await axios.get<Product>(`/products/${productId}`);

  return product.data;
};

export const getProductsByIds = createAsyncThunk<
  Product[],
  string[],
  { rejectValue: string }
>('products/getByIds', async (productIds, thunkAPI) => {
  try {
    const requests = productIds.map(productId => getProductById(productId));
    const products = await Promise.all(requests);
    return products;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});
