import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { href: '/', text: 'Homepage' },
  { href: '/products', text: 'All products' },
  { href: '/checkout', text: 'Checkout Page' },
  { href: '*', text: 'Not Found Page' },
];

export const Navigation: FC = () => {
  return (
    <nav>
      <ul>
        {navItems.map(({ href, text }) => (
          <li key={href} style={{ fontSize: 18 }}>
            <NavLink to={href}>{text}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
