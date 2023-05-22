import React, { FC } from 'react';

import { ReactComponent as Check } from '@assets/check.svg';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectBrand } from '@store/filters/selectors';
import { setBrand } from '@store/filters/slice';

import './BrandsFilter.scss';

type BrandsFilterProps = {
  brands: string[];
};

export const BrandsFilter: FC<BrandsFilterProps> = ({ brands }) => {
  const dispatch = useAppDispatch();
  const selectedBrands = useAppSelector(selectBrand);

  const setBrandHandler = (brand: string) => {
    dispatch(setBrand(brand));
  };

  const setCheckedBrands = (productBrand: string) =>
    selectedBrands.some(
      brand => brand.trim().toLowerCase() === productBrand.trim().toLowerCase()
    );

  return (
    <div className="filter">
      <h3 className="filter__title">Brands</h3>
      <ul className="filter__list">
        {brands.map(brand => (
          <li key={brand} className="filter__item">
            <label htmlFor={brand} className="filter__field">
              <input
                id={brand}
                type="checkbox"
                checked={setCheckedBrands(brand)}
                className="filter__input"
                onChange={() => setBrandHandler(brand)}
              />
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
