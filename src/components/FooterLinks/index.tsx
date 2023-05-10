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
      <h3 className="footer-link__title">{title}</h3>
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
