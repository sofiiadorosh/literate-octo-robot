import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { googleSignIn, googleSignOut } from './operations';

type User = {
  email: string | null;
  name: string | null;
  picture: string | null;
  id: string | null;
};

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  isLoading: boolean;
}

const authInitialState: AuthState = {
  user: null,
  authenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(googleSignIn.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(
        googleSignIn.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          return {
            ...state,
            isLoading: false,
            user: action.payload,
            authenticated: true,
          };
        }
      )
      .addCase(googleSignIn.rejected, state => {
        return { ...state, isLoading: false };
      })
      .addCase(googleSignOut.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(googleSignOut.fulfilled, state => {
        return { ...state, isLoading: false, user: null, authenticated: false };
      })
      .addCase(googleSignOut.rejected, state => {
        return { ...state, isLoading: false };
      });
  },
});

export const authReducer = authSlice.reducer;
