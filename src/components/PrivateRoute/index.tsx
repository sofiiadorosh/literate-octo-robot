import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@hooks';
import { selectUser } from '@store/auth/selectors';

type PrivateRouteProps = {
  component: JSX.Element;
  redirectTo: string;
};

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/',
}: PrivateRouteProps): JSX.Element => {
  const user = useAppSelector(selectUser);
  const shouldRedirect = !user;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
