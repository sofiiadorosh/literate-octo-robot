import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product } from '@types';

axios.defaults.baseURL = 'https://64589eb68badff578ef5fcf0.mockapi.io/';

const getProductById = async (productId: string) => {
  const product = await axios.get<Product>(`/products/${productId}`);

  return product.data;
};

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
