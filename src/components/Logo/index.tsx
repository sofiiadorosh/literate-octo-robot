import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoPicture } from '@assets/logo.svg';
import { Pathname } from '@types';

import './Logo.scss';

export const Logo: FC = () => {
  return (
    <Link to={Pathname.HOME} className="logo">
      <LogoPicture className="logo__icon" />
    </Link>
  );
};
