import React, { FC, useState, useEffect, useRef } from 'react';
import { BiFilterAlt } from 'react-icons/bi';

import { Product } from '@types';

import { useAppSelector } from '@hooks';
import {
  selectProducts,
  selectVisibleProducts,
  selectIsLoading,
} from '@store/products/selectors';
import {
  selectCategory,
  selectLimit,
  selectPage,
} from '@store/filters/selectors';

import { getCategories, getBrandsByCategory } from '@services';
import { getProductPerPage } from '@utils';

import { Container } from '@components/Container';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { Sort } from '@components/Sort';
import { Sidebar } from '@components/Sidebar';
import { ProductsList } from '@components/ProductsList';
import { Pagination } from '@components/Pagination';
import { Loader } from '@components/Loader';
import { Notification } from '@components/Notification';

import './ProductsPage.scss';

const ProductsPage: FC = () => {
  const [productsPerPage, setProductsPerPage] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const products = useAppSelector(selectProducts);
  const visibleProducts = useAppSelector(selectVisibleProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const categoriesObject = getCategories(products);
  const selectedCategory = useAppSelector(selectCategory);
  const brands = getBrandsByCategory(products, selectedCategory);
  const sidebarRef = useRef<HTMLBaseElement>(null);
  const productsListRef = useRef<HTMLUListElement>(null);
  const selectedPage = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  const isVisibleButton = selectedPage * limit < visibleProducts.length;

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

  useEffect(() => {
    const products = getProductPerPage({
      page: selectedPage,
      limit,
      products: visibleProducts,
    });
    setProductsPerPage(products);
  }, [visibleProducts]);

  const showNextHandler = (page: number) => {
    const products = getProductPerPage({
      page,
      limit,
      products: visibleProducts,
    });
    setProductsPerPage(products);
    if (productsListRef.current) {
      productsListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const showMoreHandler = (page: number) => {
    const products = getProductPerPage({
      page,
      limit,
      products: visibleProducts,
    });
    setProductsPerPage(prevState => [...prevState, ...products]);
  };

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
              {productsPerPage.length}
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
              <ProductsList ref={productsListRef} products={productsPerPage} />
            )}
          </div>
        )}
        <Pagination
          onShowNext={showNextHandler}
          onShowMore={showMoreHandler}
          isVisible={isVisibleButton}
        />
      </Container>
    </section>
  );
};

export default ProductsPage;
