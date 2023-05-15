import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Container } from '@components/Container';
import { Contacts } from '@components/Contacts';
import { Navigation } from '@components/Navigation';
import { Logo } from '@components/Logo';
import { SearchBar } from '@components/SearchBar';
import { UserMenu } from '@components/UserMenu';
import { Categories } from '@components/Categories';

import './Header.scss';

export const Header: FC = () => {
  const location = useLocation();
  const isSearchBarVisible = location.pathname === '/products';

  return (
    <header>
      <Container>
        <div className="contacts-navigation">
          <Contacts />
          <Navigation />
        </div>
      </Container>
      <div className="main-navigation">
        <Container>
          <div className="search-navigation">
            <Logo />
            {isSearchBarVisible && <SearchBar />}
            <UserMenu />
          </div>
          <Categories />
        </Container>
      </div>
    </header>
  );
};
