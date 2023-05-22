'use client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { ErrorFallback } from '@components/ErrorFallback';
import { store, persistor } from '@store';
import App from 'App';

import './styles/base.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <App />
          </ErrorBoundary>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
