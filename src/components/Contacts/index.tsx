import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './Contacts.scss';

const navItems = [
  { href: '/chat', text: 'Chat with us' },
  { href: 'tel:+420336775664', text: '+420 336 775 664' },
  { href: 'mailto:info@freshnesecom.com', text: 'info@freshnesecom.com' },
];

export const Contacts: FC = () => {
  return (
    <ul className="contact-list">
      {navItems.map(({ href, text }) => (
        <li key={href} className="contact-list__item">
          <NavLink to={href} className="contact-list__link">
            {text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
