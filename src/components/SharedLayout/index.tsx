import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { Loader } from '@components/Loader';

import './SharedLayout.scss';

const SharedLayout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
