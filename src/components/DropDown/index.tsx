import React, { FC } from 'react';

import './DropDown.scss';

type DropDownProps = {
  items: string[];
  onChooseOption: (name: string) => void;
};

export const DropDown: FC<DropDownProps> = ({ items, onChooseOption }) => {
  const chooseCategoryHandler = (name: string) => {
    onChooseOption(name);
  };
  return (
    <div className="dropdown">
      <ul className="dropdown__list">
        {items.map(item => (
          <li
            key={item}
            className="dropdown__item"
            onClick={() => chooseCategoryHandler(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
