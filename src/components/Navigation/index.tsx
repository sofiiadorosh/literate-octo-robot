import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { navItems } from '@constants';

import './Navigation.scss';

export const Navigation: FC = () => {
  return (
    <nav>
      <ul className="nav-list">
        {navItems.map(({ href, text }) => (
          <li key={href} className="nav-list__item">
            <NavLink to={href} className="nav-list__link">
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
