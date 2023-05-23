import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './FooterLinks.scss';

type FooterLinksProps = {
  title: string;
  array: { href: string; text: string }[];
};

export const FooterLinks: FC<FooterLinksProps> = ({ title, array }) => {
  return (
    <div className="footer-block">
      <h3 className="footer-block__title">{title}</h3>
      <ul className="footer-block__list">
        {array.map(({ href, text }) => (
          <li key={href} className="footer-block__item">
            <NavLink to={href} className="footer-block__link">
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
