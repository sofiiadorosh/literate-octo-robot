import React, { FC } from 'react';

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
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
