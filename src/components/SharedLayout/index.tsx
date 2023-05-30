import React, { FC, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Loader } from '@components/Loader';

import './SharedLayout.scss';

const SharedLayout: FC = () => {
  const location = useLocation();
  const isFooterVisible = location.pathname !== '/checkout';
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      {isFooterVisible && <Footer />}
    </div>
  );
};

export default SharedLayout;
