import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './DropDown.scss';

type DropDownProps = {
  items: string[];
  onChooseOption: (name: string) => void;
};

export const DropDown: FC<DropDownProps> = ({ items, onChooseOption }) => {
  return (
    <div className="dropdown">
      <ul className="dropdown__list">
        {items.map(item => (
          <li
            key={item}
            className="dropdown__item"
            onClick={() => onChooseOption(item)}
          >
            <NavLink to="/products">{item}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
