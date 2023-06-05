import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Cart } from '@assets/cart.svg';
import { ReactComponent as User } from '@assets/user.svg';
import { useAppSelector } from '@hooks';
import { selectCart } from '@store/cart/selectors';

import './UserMenu.scss';

export const UserMenu: FC = () => {
  const items = useAppSelector(selectCart);
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
        {Boolean(items.length) && <span className="cart">{items.length}</span>}
      </li>
    </ul>
  );
};
