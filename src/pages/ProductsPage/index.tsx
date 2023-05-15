import React, { FC, useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BiFilterAlt } from 'react-icons/bi';

import { Product } from '@types';

import { useAppSelector } from '@hooks';
import { selectProducts } from '@store/products/selectors';

import { getFilteredProducts } from '@utils/getFilteredProducts';

import { Container } from '@components/Container';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { Sort } from '@components/Sort';
import { Sidebar } from '@components/Sidebar';
import { ProductsList } from '@components/ProductsList';

import './ProductsPage.scss';

const ProductsPage: FC = () => {
  const products = useAppSelector(selectProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
  const [searchParams] = useSearchParams();
  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );
  const { category, query } = params;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLBaseElement>(null);

  useEffect(() => {
    const allProducts = getFilteredProducts({ category, query, products });
    setFilteredProducts(allProducts);
  }, [category, query, products]);

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
              {filteredProducts.length}
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
        <div className="products__content">
          <Sidebar ref={sidebarRef} />
          <ProductsList products={filteredProducts} />
        </div>
      </Container>
    </section>
  );
};

export default ProductsPage;
