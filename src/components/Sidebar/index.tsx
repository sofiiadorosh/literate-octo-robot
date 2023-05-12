import React, { FC } from 'react';

import { CategoriesFilter } from '@components/CategoriesFilter';
import { BrandsFilter } from '@components/BrandsFilter';
import { RatingFilter } from '@components/RatingFilter';
import { PriceFilter } from '@components/PriceFilter';

import './Sidebar.scss';

export const Sidebar: FC = () => {
  return (
    <aside className="sidebar">
      <CategoriesFilter />
      <BrandsFilter />
      <RatingFilter />
      <PriceFilter min={0} max={1000} />
      <button type="button" className="reset-button">
        Reset
      </button>
    </aside>
  );
};
