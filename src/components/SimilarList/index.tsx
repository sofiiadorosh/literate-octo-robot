import React, { FC, useState, useEffect, useRef } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { SimilarItem } from '@components/SimilarItem';
import { useWindowSize } from '@hooks';
import { Product } from '@types';

import './SimilarList.scss';

enum ScreenWidth {
  'MOBILE' = 644,
  'TABLET' = 927,
  'DESKTOP' = 1200,
}

enum ItemsPerPage {
  'MOBILE_S' = 1,
  'MOBILE_M' = 2,
  'TABLET' = 3,
  'DESKTOP' = 4,
}

type SimilarListProps = {
  items: Product[];
};

export const SimilarList: FC<SimilarListProps> = ({ items }) => {
  const [width] = useWindowSize();
  const sliderRef = useRef<HTMLUListElement>(null);

  const calculateLastIndex = () => {
    let index = 0;
    if (width < ScreenWidth.MOBILE) {
      index = items.length - ItemsPerPage.MOBILE_S;
    } else if (width >= ScreenWidth.MOBILE && width < ScreenWidth.TABLET) {
      const prevIndex = getLastIndex(items.length, ItemsPerPage.MOBILE_M);
      index = prevIndex <= 0 ? index : prevIndex;
    } else if (width >= ScreenWidth.TABLET && width < ScreenWidth.DESKTOP) {
      const prevIndex = getLastIndex(items.length, ItemsPerPage.TABLET);
      index = prevIndex <= 0 ? index : prevIndex;
    } else {
      const prevIndex = getLastIndex(items.length, ItemsPerPage.DESKTOP);
      index = prevIndex <= 0 ? index : prevIndex;
    }
    return index;
  };

  const getLastIndex = (items: number, itemsPerPage: ItemsPerPage) =>
    items - itemsPerPage;

  const [activeIndex, setActiveIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState<number>(calculateLastIndex());

  useEffect(() => {
    setLastIndex(calculateLastIndex());
  }, [activeIndex, width]);

  useEffect(() => {
    if (sliderRef.current) {
      if (width < ScreenWidth.MOBILE) {
        sliderRef.current.style.transform = `translateX(-${
          activeIndex * 100
        }%)`;
      } else if (width >= ScreenWidth.MOBILE && width < ScreenWidth.TABLET) {
        sliderRef.current.style.transform = `translateX(-${activeIndex * 50}%)`;
      } else if (width >= ScreenWidth.TABLET && width < ScreenWidth.DESKTOP) {
        sliderRef.current.style.transform = `translateX(-${activeIndex * 34}%)`;
      } else {
        sliderRef.current.style.transform = `translateX(-${activeIndex * 25}%)`;
      }
    }
  }, [activeIndex, width]);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }
    setActiveIndex(newIndex);
  };
  return (
    <>
      <div className="similar__heading">
        <h2 className="similar__title">You will maybe love</h2>
        <div className="similar__control">
          <button
            type="button"
            disabled={!activeIndex}
            className="similar__arrow"
            onClick={() => updateIndex(activeIndex - 1)}
          >
            <Arrow className="similar__arrow-icon similar__arrow-icon_left" />
          </button>
          <span>More products</span>
          <button
            type="button"
            disabled={activeIndex === lastIndex}
            className="similar__arrow"
            onClick={() => updateIndex(activeIndex + 1)}
          >
            <Arrow className="similar__arrow-icon similar__arrow-icon_right" />
          </button>
        </div>
      </div>
      <div className="similar__carousel">
        <ul className="similar__list" ref={sliderRef}>
          {items.map(item => (
            <SimilarItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};
