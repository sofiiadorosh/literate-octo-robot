import React, { FC } from 'react';

import './TabItem.scss';

type TabItemProps = {
  selected: boolean;
  children: React.ReactNode;
} & React.HTMLProps<HTMLLIElement>;

export const TabItem: FC<TabItemProps> = ({
  selected,
  children,
  ...otherProps
}) => {
  return (
    <li
      className={selected ? 'tab__item tab__item_selected' : 'tab__item'}
      {...otherProps}
    >
      {children}
    </li>
  );
};
