import React, { FC, useState, useEffect, useRef } from 'react';
import { BiFilterAlt } from 'react-icons/bi';

import { Container } from '@components/Container';
import { Loader } from '@components/Loader';
import { Notification } from '@components/Notification';
import { Pagination } from '@components/Pagination';
import { ProductsList } from '@components/ProductsList';
import { Sidebar } from '@components/Sidebar';
import { Sort } from '@components/Sort';
import { useAppSelector } from '@hooks';
import { getCategories, getBrandsByCategory } from '@services';
import {
  selectCategory,
  selectLimit,
  selectPage,
} from '@store/filters/selectors';
import {
  selectProducts,
  selectVisibleProducts,
  selectIsLoading,
} from '@store/products/selectors';
import { Product } from '@types';
import { getProductPerPage } from '@utils';

import './ProductsPage.scss';

const ProductsPage: FC = () => {
  const products = useAppSelector(selectProducts);
  const visibleProducts = useAppSelector(selectVisibleProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const selectedCategory = useAppSelector(selectCategory);
  const selectedPage = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);

  const sidebarRef = useRef<HTMLBaseElement>(null);
  const productsListRef = useRef<HTMLDivElement>(null);
  const isVisibleButton = selectedPage * limit < visibleProducts.length;

  const categoriesObject = getCategories(products);
  const brands = getBrandsByCategory(products, selectedCategory);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState<Product[]>([]);

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
        sidebarRef.current.classList.add('sidebar_opened');
        document.body.style.overflow = 'hidden';
        document.addEventListener('mousedown', handleOutsideClick);
      } else {
        sidebarRef.current.classList.remove('sidebar_opened');
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
        <div className="products__title">
          <h1 className="products__heading">All Products</h1>
          <div className="products__quantity">
            <span className="products__quantity_number">
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
            className="secondary-button filter-button"
          >
            <BiFilterAlt size={20} />
            <span>Filters</span>
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="products__content" ref={productsListRef}>
            <Sidebar
              ref={sidebarRef}
              categories={categoriesObject}
              brands={brands}
            />
            {!isLoading && products.length && !visibleProducts.length ? (
              <Notification message="We're sorry, but there are no products." />
            ) : (
              <ProductsList products={productsPerPage} />
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
