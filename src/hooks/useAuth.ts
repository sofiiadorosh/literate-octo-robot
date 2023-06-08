import { selectUser, selectIsAuthenticated } from '@store/auth/selectors';

import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  const user = useAppSelector(selectUser);
  const isAuthorized = useAppSelector(selectIsAuthenticated);
  return {
    isAuthorized,
    user,
  };
};
