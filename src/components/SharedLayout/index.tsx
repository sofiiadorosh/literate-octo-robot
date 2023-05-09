import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@components/Header';

const SharedLayout: FC = () => {
  return (
    <>
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
