import React, { FC, useState, useEffect, useRef } from 'react';
import { BiFilterAlt } from 'react-icons/bi';

import { useAppSelector } from '@hooks';
import {
  selectProducts,
  selectVisibleProducts,
  selectIsLoading,
} from '@store/products/selectors';
import { selectCategory } from '@store/filters/selectors';

import { getCategories, getBrandsByCategory } from '@services';

import { Container } from '@components/Container';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { Sort } from '@components/Sort';
import { Sidebar } from '@components/Sidebar';
import { ProductsList } from '@components/ProductsList';
import { Loader } from '@components/Loader';
import { Notification } from '@components/Notification';

import './ProductsPage.scss';

const ProductsPage: FC = () => {
  const products = useAppSelector(selectProducts);
  const visibleProducts = useAppSelector(selectVisibleProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const categoriesObject = getCategories(products);
  const selectedCategory = useAppSelector(selectCategory);
  const brands = getBrandsByCategory(products, selectedCategory);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLBaseElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (isSidebarOpen && sidebarRef.current) {
      const clickedElement = e.target as HTMLElement;
      const isSidebar = clickedElement.classList.contains('sidebar');
      const isSidebarOverlay =
        clickedElement.classList.contains('sidebar__overlay');

      if (isSidebar && !isSidebarOverlay) {
        setIsSidebarOpen(prevState => !prevState);
      }
    }
  };

  useEffect(() => {
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

  const openSidebarHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <section className="products">
      <Container>
        <Breadcrumbs />
        <div className="products__title">
          <h1 className="products__heading">All Products</h1>
          <div className="products__quantity">
            <span className="products__quantity--number">
              {visibleProducts.length}
            </span>
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
        {isLoading ? (
          <Loader />
        ) : (
          <div className="products__content">
            <Sidebar
              ref={sidebarRef}
              categories={categoriesObject}
              brands={brands}
            />
            {!isLoading && products.length && !visibleProducts.length ? (
              <Notification message="We're sorry, but there are no products." />
            ) : (
              <ProductsList products={visibleProducts} />
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductsPage;
