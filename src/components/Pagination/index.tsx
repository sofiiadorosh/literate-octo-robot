import React, { FC, useState, useEffect } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { useAppSelector, useAppDispatch } from '@hooks';
import {
  selectPage,
  selectLimit,
  selectCategory,
  selectBrand,
  selectQuery,
  selectRating,
  selectSort,
  selectPrice,
} from '@store/filters/selectors';
import { setPage, setNextPage } from '@store/filters/slice';
import {
  selectProducts,
  selectVisibleProducts,
} from '@store/products/selectors';

import './Pagination.scss';

type PaginationProps = {
  onShowNext: (page: number) => void;
  onShowMore: (page: number) => void;
  isVisible: boolean;
};

export const Pagination: FC<PaginationProps> = ({
  onShowNext,
  onShowMore,
  isVisible,
}) => {
  const dispatch = useAppDispatch();
  const visibleProducts = useAppSelector(selectVisibleProducts);
  const category = useAppSelector(selectCategory);
  const brand = useAppSelector(selectBrand);
  const query = useAppSelector(selectQuery);
  const rating = useAppSelector(selectRating);
  const sort = useAppSelector(selectSort);
  const price = useAppSelector(selectPrice);
  const limit = useAppSelector(selectLimit);
  const selectedPage = useAppSelector(selectPage);
  const products = useAppSelector(selectProducts);

  const pages = Math.ceil(visibleProducts.length / limit);
  const nextPage = selectedPage + 1;
  const prevPage = selectedPage - 1;

  const [activePages, setActivePages] = useState<number[]>([selectedPage]);

  useEffect(() => {
    setActivePages([selectedPage]);
  }, [category, brand, query, rating, sort, price]);

  const setPageHandler = (page: number) => {
    dispatch(setPage(page));
    onShowNext(page);
    setActivePages([page]);
  };

  const showMoreHandler = () => {
    dispatch(setNextPage());
    onShowMore(nextPage);
    setActivePages(prevState => [...prevState, nextPage]);
  };

  const renderPageNumbers = () => {
    const pageNumbers: React.ReactElement[] = [];
    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(
          <li
            key={i}
            onClick={() => setPageHandler(i)}
            className={
              activePages.includes(i)
                ? 'page-list__item page-list__item_active'
                : 'page-list__item'
            }
          >
            {i}
          </li>
        );
      }
    } else {
      if (selectedPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(
            <li
              key={i}
              onClick={() => setPageHandler(i)}
              className={
                activePages.includes(i)
                  ? 'page-list__item page-list__item_active'
                  : 'page-list__item'
              }
            >
              {i}
            </li>
          );
        }
        pageNumbers.push(
          <li
            key="elleipsis-left"
            className="page-list__item page-list__item_ellipsis"
          >
            ...
          </li>
        );
        pageNumbers.push(
          <li
            key={pages}
            onClick={() => setPageHandler(pages)}
            className={
              activePages.includes(pages)
                ? 'page-list__item page-list__item_active'
                : 'page-list__item'
            }
          >
            {pages}
          </li>
        );
      } else if (selectedPage > pages - 3) {
        pageNumbers.push(
          <li
            key={1}
            onClick={() => setPageHandler(1)}
            className={
              activePages.includes(1)
                ? 'page-list__item page-list__item_active'
                : 'page-list__item'
            }
          >
            1
          </li>
        );
        pageNumbers.push(
          <li
            key="ellipsis-right"
            className="page-list__item page-list__item_ellipsis"
          >
            ...
          </li>
        );
        for (let i = pages - 3; i <= pages; i++) {
          pageNumbers.push(
            <li
              key={i}
              onClick={() => setPageHandler(i)}
              className={
                activePages.includes(i)
                  ? 'page-list__item page-list__item_active'
                  : 'page-list__item'
              }
            >
              {i}
            </li>
          );
        }
      } else {
        pageNumbers.push(
          <li
            key={1}
            onClick={() => setPageHandler(1)}
            className={
              activePages.includes(1)
                ? 'page-list__item page-list__item_active'
                : 'page-list__item'
            }
          >
            1
          </li>
        );
        pageNumbers.push(
          <li
            key="ellipsis-left"
            className="page-list__item page-list__item_ellipsis"
          >
            ...
          </li>
        );
        for (let i = selectedPage - 1; i <= selectedPage + 1; i++) {
          pageNumbers.push(
            <li
              key={i}
              onClick={() => setPageHandler(i)}
              className={
                activePages.includes(i)
                  ? 'page-list__item page-list__item_active'
                  : 'page-list__item'
              }
            >
              {i}
            </li>
          );
        }
        pageNumbers.push(
          <li
            key="ellipsis-right"
            className="page-list__item page-list__item_ellipsis"
          >
            ...
          </li>
        );
        pageNumbers.push(
          <li
            key={pages}
            onClick={() => setPageHandler(pages)}
            className={
              activePages.includes(pages)
                ? 'page-list__item page-list__item_active'
                : 'page-list__item'
            }
          >
            {pages}
          </li>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <div className="pagination__page">
        <span className="page__title">Page:</span>
        <ul className="page__list">
          <button
            type="button"
            disabled={selectedPage === 1}
            className="arrow-button"
            onClick={() => setPageHandler(prevPage)}
          >
            <Arrow className="arrow-button__icon arrow-button__left" />
          </button>
          {renderPageNumbers()}
          <button
            type="button"
            disabled={selectedPage === pages}
            className="arrow-button"
            onClick={() => setPageHandler(nextPage)}
          >
            <Arrow className="arrow-button__icon arrow-button__right" />
          </button>
        </ul>
      </div>
      {(selectedPage !== pages || isVisible) && (
        <button
          type="button"
          className="pagination-button"
          onClick={showMoreHandler}
        >
          <span>Show more products</span>
          <Arrow className="pagination-button__icon" />
        </button>
      )}
      <div className="pagination__quantity">
        <span className="quantity__number">{products.length}</span>
        <span className="quantity__name">Products</span>
      </div>
    </div>
  );
};
