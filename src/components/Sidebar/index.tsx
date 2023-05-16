import React, { forwardRef, ForwardedRef } from 'react';
import { IoMdClose } from 'react-icons/io';

import { CategoryCount } from '@types';

import { CategoriesFilter } from '@components/CategoriesFilter';
import { BrandsFilter } from '@components/BrandsFilter';
import { RatingFilter } from '@components/RatingFilter';
import { PriceFilter } from '@components/PriceFilter';

import './Sidebar.scss';

type SidebarProps = {
  categories: CategoryCount;
  brands: string[];
  price: {
    maxPrice: number;
    minPrice: number;
  };
} & React.HTMLProps<HTMLBaseElement>;

export const Sidebar = forwardRef(function Sidebar(
  props: SidebarProps,
  ref: ForwardedRef<HTMLBaseElement>
) {
  const closeSidebarHandler = (ref: ForwardedRef<HTMLBaseElement>) => {
    if (ref && 'current' in ref) {
      ref.current?.classList.remove('sidebar--opened');
      document.body.style.overflow = 'auto';
    } else if (typeof ref === 'function') {
      ref(null);
    }
  };

  return (
    <aside {...props} ref={ref} className="sidebar">
      <div className="sidebar__overlay">
        <button
          type="button"
          onClick={() => closeSidebarHandler(ref)}
          className="filter-button close-button"
        >
          <IoMdClose size={20} />
          <span>Close</span>
        </button>
        <CategoriesFilter categories={props.categories} />
        <BrandsFilter brands={props.brands} />
        <RatingFilter />
        <PriceFilter min={props.price.minPrice} max={props.price.maxPrice} />
        <button type="button" className="reset-button">
          Reset
        </button>
      </div>
    </aside>
  );
});
