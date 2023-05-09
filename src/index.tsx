import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@store';

import App from 'App';

import './styles/base.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/literate-octo-robot">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
