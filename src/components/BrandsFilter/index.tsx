import React, { FC } from 'react';

import { ReactComponent as Check } from '@assets/check.svg';

import './BrandsFilter.scss';

export const BrandsFilter: FC = () => {
  return (
    <div className="filter">
      <h3 className="filter__title">Brands</h3>
      <ul className="filter__list">
        <li className="filter__item">
          <label htmlFor="1" className="filter__field">
            <input id="1" type="checkbox" className="filter__input" />
            <span className="filter__checkbox">
              <Check className="filter__icon" />
            </span>
            <span className="brand-filter__label">Filter by brand item</span>
          </label>
        </li>
        <li className="filter__item">
          <label htmlFor="2" className="filter__field">
            <input id="2" type="checkbox" className="filter__input" />
            <span className="filter__checkbox">
              <Check className="filter__icon" />
            </span>
            <span className="brand-filter__label">Filter by brand item</span>
          </label>
        </li>
        <li className="filter__item">
          <label htmlFor="3" className="filter__field">
            <input id="3" type="checkbox" className="filter__input" />
            <span className="filter__checkbox">
              <Check className="filter__icon" />
            </span>
            <span className="brand-filter__label">Filter by brand item</span>
          </label>
        </li>
        <li className="filter__item">
          <label htmlFor="4" className="filter__field">
            <input id="4" type="checkbox" className="filter__input" />
            <span className="filter__checkbox">
              <Check className="filter__icon" />
            </span>
            <span className="brand-filter__label">Filter by brand item</span>
          </label>
        </li>
        <li className="filter__item">
          <label htmlFor="5" className="filter__field">
            <input id="5" type="checkbox" className="filter__input" />
            <span className="filter__checkbox">
              <Check className="filter__icon" />
            </span>
            <span className="brand-filter__label">Filter by brand item</span>
          </label>
        </li>
      </ul>
    </div>
  );
};
