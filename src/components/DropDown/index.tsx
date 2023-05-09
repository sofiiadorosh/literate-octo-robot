import React, { FC } from 'react';

import './DropDown.scss';

const items = [
  'Electronics',
  'Food',
  'Clothes',
  'Skin and care',
  'Toys',
  'Special nutrition',
  'Sports and outdoors',
  'Books',
];

export const DropDown: FC = () => {
  return (
    <div className="dropdown">
      <ul className="dropdown__list">
        {items.map(item => (
          <li key={item} className="dropdown__item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
