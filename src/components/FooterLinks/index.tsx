import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './FooterLinks.scss';

type FooterLinksProps = {
  title: string;
  array: { href: string; text: string }[];
};

export const FooterLinks: FC<FooterLinksProps> = ({ title, array }) => {
  return (
    <div className="footer-link__wrapper">
      <p className="footer-link__title">{title}</p>
      <ul className="footer-link__list">
        {array.map(({ href, text }) => (
          <li key={href} className="footer-link">
            <NavLink to={href} className="footer-link__link">
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
