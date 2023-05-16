import React, { FC } from 'react';

// import { DropDown } from '@components/DropDown';

import { ReactComponent as Arrow } from '@assets/arrow.svg';

import './Sort.scss';

export const Sort: FC = () => {
  return (
    <div className="sort">
      <div className="sort__title">Sort by</div>
      <div className="sort__line"></div>
      <div className="sort__options">
        <span>Select</span>
        <Arrow className="sort__icon" />
        {/* <DropDown /> */}
      </div>
    </div>
  );
};
