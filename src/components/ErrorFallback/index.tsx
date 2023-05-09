import React from 'react';

import { Error } from '@components/Error';

const errorMessage = 'but something went wrong...';

export const ErrorFallback = () => {
  return <Error message={errorMessage} />;
};
