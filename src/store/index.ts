import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/slice';
import { AuthState } from './auth/slice';
import { cartReducer } from './cart/slice';
import { CartState } from './cart/slice';
import { filtersReducer } from './filters/slice';
import { FiltersState } from './filters/slice';
import { productDetailsReducer } from './productDetails/slice';
import { ProductDetailsState } from './productDetails/slice';
import { productsReducer } from './products/slice';
import { WishlistState } from './wishlist/slice';
import { wishlistReducer } from './wishlist/slice';

const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
};

const filtersPersistConfig = {
  key: 'filters',
  storage,
};

const productDetailsPersistConfig = {
  key: 'productDetails',
  storage,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: persistReducer<FiltersState>(filtersPersistConfig, filtersReducer),
    productDetails: persistReducer<ProductDetailsState>(
      productDetailsPersistConfig,
      productDetailsReducer
    ),
    cart: persistReducer<CartState>(cartPersistConfig, cartReducer),
    wishlist: persistReducer<WishlistState>(
      wishlistPersistConfig,
      wishlistReducer
    ),
    auth: persistReducer<AuthState>(authPersistConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
