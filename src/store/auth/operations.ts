import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

import { auth } from '@config';

export const googleSignIn = createAsyncThunk(
  'auth/signIn',

  async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = {
      email: result.user.email,
      name: result.user.displayName,
      picture: result.user.photoURL,
      id: result.user.uid,
    };
    return user;
  }
);

export const googleSignOut = createAsyncThunk(
  'auth/signOut',

  async () => {
    await signOut(auth);
  }
);
