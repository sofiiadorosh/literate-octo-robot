import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as User } from '@assets/user.svg';
import { ReactComponent as Cart } from '@assets/cart.svg';

import './UserMenu.scss';

export const UserMenu: FC = () => {
  return (
    <ul className="user-list">
      <li className="user-list__item">
        <NavLink to="/profile" className="user-list__link">
          <User className="user-list__icon" />
        </NavLink>
      </li>
      <li className="user-list__item">
        <NavLink to="/checkout" className="user-list__link">
          <Cart className="user-list__icon" />
        </NavLink>
        <span className="cart">4</span>
      </li>
    </ul>
  );
};
