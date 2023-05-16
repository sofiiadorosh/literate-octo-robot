import React, { FC } from 'react';

import { ReactComponent as Check } from '@assets/check.svg';

import './BrandsFilter.scss';

type BrandsFilterProps = {
  brands: string[];
};

export const BrandsFilter: FC<BrandsFilterProps> = ({ brands }) => {
  return (
    <div className="filter">
      <h3 className="filter__title">Brands</h3>
      <ul className="filter__list">
        {brands.map(brand => (
          <li key={brand} className="filter__item">
            <label htmlFor={brand} className="filter__field">
              <input id={brand} type="checkbox" className="filter__input" />
              <span className="filter__checkbox">
                <Check className="filter__icon" />
              </span>
              <span className="brand-filter__label">{brand}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
