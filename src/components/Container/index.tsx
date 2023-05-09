import React, { FC } from 'react';

import './Container.scss';

type ContainerProps = {
  children: React.ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};
