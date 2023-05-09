import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

import './SharedLayout.scss';

const SharedLayout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
