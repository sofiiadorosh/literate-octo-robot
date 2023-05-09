import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as User } from '@assets/user.svg';
import { ReactComponent as Cart } from '@assets/cart.svg';

import './UserMenu.scss';

const navItems = [
  { href: '/profile', icon: User },
  { href: '/checkout', icon: Cart },
];

export const UserMenu: FC = () => {
  return (
    <ul className="user-list">
      {navItems.map(({ href, icon: Icon }) => (
        <li key={href} className="user-list__item">
          <NavLink to={href} className="user-list__link">
            <Icon className="user-list__icon" />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
