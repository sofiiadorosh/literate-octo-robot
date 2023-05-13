import React, { FC, useState, useEffect, useRef } from 'react';
import { BiFilterAlt } from 'react-icons/bi';

import { useAppSelector } from '@hooks';
import { selectProducts } from '@store/products/selectors';

import { Container } from '@components/Container';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { Sort } from '@components/Sort';
import { Sidebar } from '@components/Sidebar';
import { ProductsList } from '@components/ProductsList';

import './ProductsPage.scss';

const ProductsPage: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const products = useAppSelector(selectProducts).length;
  const sidebarRef = useRef<HTMLBaseElement>(null);

  const openSidebarHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(prevState => !prevState);
      }
    };

    if (sidebarRef.current) {
      if (isSidebarOpen) {
        sidebarRef.current.classList.add('sidebar--opened');
        document.body.style.overflow = 'hidden';
        document.addEventListener('mousedown', handleOutsideClick);
      } else {
        sidebarRef.current.classList.remove('sidebar--opened');
        document.body.style.overflow = 'auto';
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <section className="products">
      <Container>
        <Breadcrumbs />
        <div className="products__title">
          <h1 className="products__heading">All Products</h1>
          <div className="products__quantity">
            <span className="products__quantity--number">{products}</span>
            <span>Products</span>
          </div>
        </div>
        <div className="products__filter">
          <Sort />
          <button
            type="button"
            onClick={openSidebarHandler}
            className="filter-button"
          >
            <BiFilterAlt size={20} />
            <span>Filters</span>
          </button>
        </div>
        <div className="products__content">
          <Sidebar ref={sidebarRef} />
          <ProductsList />
        </div>
      </Container>
    </section>
  );
};

export default ProductsPage;
