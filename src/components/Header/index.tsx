import React, { FC } from 'react';

import { Container } from '@components/Container';
import { Contacts } from '@components/Contacts';
import { Navigation } from '@components/Navigation';
import { Logo } from '@components/Logo';
import { SearchBar } from '@components/SearchBar';
import { UserMenu } from '@components/UserMenu';
import { Categories } from '@components/Categories';

import './Header.scss';

export const Header: FC = () => {
  return (
    <header>
      <Container>
        <div className="contacts-navigation">
          <Contacts />
          <Navigation />
        </div>
        <div className="search-navigation">
          <Logo />
          <SearchBar />
          <UserMenu />
        </div>
        <Categories />
      </Container>
    </header>
  );
};
