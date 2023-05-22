import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Breadcrumbs } from '@components/Breadcrumbs';
import { Categories } from '@components/Categories';
import { Contacts } from '@components/Contacts';
import { Container } from '@components/Container';
import { Logo } from '@components/Logo';
import { Navigation } from '@components/Navigation';
import { SearchBar } from '@components/SearchBar';
import { UserMenu } from '@components/UserMenu';

import './Header.scss';

export const Header: FC = () => {
  const location = useLocation();
  const isSearchBarVisible = location.pathname === '/products';

  return (
    <>
      <header className="header">
        <Container>
          <div className="header__contacts-nav">
            <Contacts />
            <Navigation />
          </div>
        </Container>
      </header>
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
    </>
  );
};
