import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { contacts } from '@constants';

import './Contacts.scss';

export const Contacts: FC = () => {
  return (
    <ul className="contact-list">
      {contacts.map(({ href, text }) => (
        <li key={href} className="contact-list__item">
          <NavLink to={href} className="contact-list__link">
            {text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
