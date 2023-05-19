import React, { FC } from 'react';

import { Product } from '@types';
import { useAppSelector, useAppDispatch } from '@hooks';
import { selectProducts } from '@store/products/selectors';
import { setBrand, setCategory } from '@store/filters/slice';
import { getCategories, getBrandsByCategory } from '@services';
import { DropDown } from '@components/DropDown';
import { ReactComponent as Arrow } from '@assets/arrow.svg';

import './Categories.scss';

export const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const categories = Object.keys(getCategories(products));
  const getBrands = (products: Product[], category: string) =>
    getBrandsByCategory(products, category);

  const setBrandHadler = (category: string, brand: string) => {
    dispatch(setCategory(category));
    dispatch(setBrand(brand));
  };

  return (
    <ul className="categories-list">
      {categories.map(category => (
        <li key={category} className="categories-list__item">
          <span className="categories-list__title">{category}</span>
          <Arrow className="categories-list__icon" />
          <DropDown
            items={getBrands(products, category)}
            onChooseOption={(brand: string) => setBrandHadler(category, brand)}
          />
        </li>
      ))}
    </ul>
  );
};
