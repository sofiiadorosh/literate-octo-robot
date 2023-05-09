import React, { FC } from 'react';

import { Error } from '@components/Error';

const notFoundMessage = 'but the page you were looking for can’t be found...';

const NotFoundPage: FC = () => {
  return <Error message={notFoundMessage} />;
};

export default NotFoundPage;
