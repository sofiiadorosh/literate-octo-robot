import React, { FC } from 'react';

import { useAppSelector, useAppDispatch } from '@hooks';
import {
  selectProducts,
  selectVisibleProducts,
} from '@store/products/selectors';
import { selectPage, selectLimit } from '@store/filters/selectors';
import { setPage, setNextPage } from '@store/filters/slice';

import { ReactComponent as Arrow } from '@assets/arrow.svg';

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
  const limit = useAppSelector(selectLimit);
  const selectedPage = useAppSelector(selectPage);
  const visibleProducts = useAppSelector(selectVisibleProducts);
  const products = useAppSelector(selectProducts);
  const pages = Math.ceil(visibleProducts.length / limit);

  const setPageHandler = (page: number) => {
    dispatch(setPage(page));
    onShowNext(page);
  };

  const showMoreHandler = () => {
    dispatch(setNextPage());
    onShowMore(selectedPage + 1);
  };

  return (
    <div className="pagination">
      <div className="pagination__page">
        <span className="page__title">Page:</span>
        <ul className="page__list">
          {[...Array(pages)].map((_, index) => (
            <li
              key={index}
              onClick={() => setPageHandler(index + 1)}
              className={
                selectedPage === index + 1
                  ? 'page-list__item page-list__item--active'
                  : 'page-list__item'
              }
            >
              {index + 1}
            </li>
          ))}
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
