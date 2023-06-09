import React, { FC } from 'react';

import { ReactComponent as Google } from '@assets/google.svg';
import { useAppDispatch } from '@hooks';
import { googleSignIn } from '@store/auth/operations';

import './LoginForm.scss';

type LoginFormProps = {
  closeModal?: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();

  const googleSignInHandler = async () => {
    await dispatch(googleSignIn());
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <div className="login">
      <p className="login__description">
        Sign in with Google to continue exploring our amazing platform.
      </p>
      <button
        type="button"
        className="login__button"
        onClick={googleSignInHandler}
      >
        <Google />
        Sign in by Google
      </button>
    </div>
  );
};
