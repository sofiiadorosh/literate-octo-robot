import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';

const navItems = [
  { href: '/blog', text: 'Blog' },
  { href: '/about', text: 'About Us' },
  { href: '/career', text: 'Careers' },
];

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
