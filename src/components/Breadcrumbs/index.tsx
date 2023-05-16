import React, { FC } from 'react';

import './Breadcrumbs.scss';

export const Breadcrumbs: FC = () => {
  return (
    <ul className="breadcrumbs">
      <li className="breadcrumbs__page">Homepage</li>
      <li className="breadcrumbs__page">/</li>
      <li className="breadcrumbs__page breadcrumbs__page--active">
        All products
      </li>
    </ul>
  );
};
