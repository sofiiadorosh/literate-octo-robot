import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const SharedLayout: FC = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
