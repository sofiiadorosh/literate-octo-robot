import React, { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const Loader: FC = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#6a983c"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ margin: '0 auto' }}
      visible={true}
    />
  );
};
