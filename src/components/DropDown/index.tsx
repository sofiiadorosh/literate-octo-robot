import React, { FC } from 'react';

import { categories } from '@constants';

import './DropDown.scss';

export const DropDown: FC = () => {
  return (
    <div className="dropdown">
      <ul className="dropdown__list">
        {categories.map(category => (
          <li key={category} className="dropdown__item">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
