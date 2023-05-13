import React, { forwardRef, ForwardedRef } from 'react';
import { IoMdClose } from 'react-icons/io';

import { CategoriesFilter } from '@components/CategoriesFilter';
import { BrandsFilter } from '@components/BrandsFilter';
import { RatingFilter } from '@components/RatingFilter';
import { PriceFilter } from '@components/PriceFilter';

import './Sidebar.scss';

type SidebarProps = React.HTMLProps<HTMLBaseElement>;

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
      <button
        type="button"
        onClick={() => closeSidebarHandler(ref)}
        className="filter-button close-button"
      >
        <IoMdClose size={20} />
        <span>Close</span>
      </button>
      <CategoriesFilter />
      <BrandsFilter />
      <RatingFilter />
      <PriceFilter min={0} max={1000} />
      <button type="button" className="reset-button">
        Reset
      </button>
    </aside>
  );
});
