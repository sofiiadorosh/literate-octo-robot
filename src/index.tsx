'use client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { store } from '@store';

import App from 'App';
import { ErrorFallback } from '@components/ErrorFallback';

import './styles/base.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <App />
        </ErrorBoundary>
      </Router>
    </Provider>
  </React.StrictMode>
);
