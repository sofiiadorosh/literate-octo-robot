import React, { FC, useState } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { DropDown } from '@components/DropDown';
import { useAppSelector, useAppDispatch } from '@hooks';
import { getCategories, getBrandsByCategory } from '@services';
import { setBrand, setCategory } from '@store/filters/slice';
import { selectProducts } from '@store/products/selectors';
import { Product } from '@types';

import './Categories.scss';

export const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const categories = Object.keys(getCategories(products));

  const [menuOpen, setMenuOpen] = useState<{ [category: string]: boolean }>({});

  const getBrands = (products: Product[], category: string) =>
    getBrandsByCategory(products, category);

  const setBrandHadler = (category: string, brand: string) => {
    dispatch(setCategory(category));
    dispatch(setBrand(brand));
    closeMenuHandler(category);
  };

  const openMenuHandler = (category: string) => {
    setMenuOpen(prevState => ({
      ...prevState,
      [category]: true,
    }));
  };

  const closeMenuHandler = (category: string) => {
    setMenuOpen(prevState => ({
      ...prevState,
      [category]: false,
    }));
  };

  return (
    <ul className="categories-list">
      {categories.map(category => (
        <li
          key={category}
          className="categories-list__item"
          onMouseOver={() => openMenuHandler(category)}
          onMouseLeave={() => closeMenuHandler(category)}
        >
          <span className="categories-list__title">{category}</span>
          <Arrow className="categories-list__icon" />
          {menuOpen[category] && (
            <DropDown
              items={getBrands(products, category)}
              onChooseOption={(brand: string) =>
                setBrandHadler(category, brand)
              }
            />
          )}
        </li>
      ))}
    </ul>
  );
};
