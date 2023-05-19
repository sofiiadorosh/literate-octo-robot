import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Container } from '@components/Container';
import { Contacts } from '@components/Contacts';
import { Navigation } from '@components/Navigation';
import { Logo } from '@components/Logo';
import { SearchBar } from '@components/SearchBar';
import { UserMenu } from '@components/UserMenu';
import { Categories } from '@components/Categories';
import { Breadcrumbs } from '@components/Breadcrumbs';

import './Header.scss';

export const Header: FC = () => {
  const location = useLocation();
  const isSearchBarVisible = location.pathname === '/products';

  return (
    <header className="header">
      <Container>
        <div className="header__contacts-nav">
          <Contacts />
          <Navigation />
        </div>
      </Container>
      <div className="header__main-nav">
        <Container>
          <div className="header__search-nav">
            <Logo />
            {isSearchBarVisible && <SearchBar />}
            <UserMenu />
          </div>
          <Categories />
          <Breadcrumbs />
        </Container>
      </div>
    </header>
  );
};
