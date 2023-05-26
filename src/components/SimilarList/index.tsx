import React, { FC, useState, useEffect, useRef } from 'react';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { SimilarItem } from '@components/SimilarItem';
import { useWindowSize } from '@hooks';
import { Product } from '@types';
import { calculateLastIndex, isMobile, isTablet, isDesktop } from '@utils';

import './SimilarList.scss';

type SimilarListProps = {
  items: Product[];
};

export const SimilarList: FC<SimilarListProps> = ({ items }) => {
  const [width] = useWindowSize();
  const sliderRef = useRef<HTMLUListElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState<number>(
    calculateLastIndex(items.length, width)
  );

  useEffect(() => {
    const index = calculateLastIndex(items.length, width);
    setLastIndex(index);
    if (activeIndex > index) {
      setActiveIndex(index);
    }
  }, [activeIndex, width]);

  useEffect(() => {
    if (sliderRef.current) {
      if (isMobile(width)) {
        setTranslateValue(100);
      } else if (isTablet(width)) {
        setTranslateValue(50);
      } else if (isDesktop(width)) {
        setTranslateValue(34);
      } else {
        setTranslateValue(25);
      }
    }
  }, [activeIndex, width]);

  const setTranslateValue = (value: number) => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${
        activeIndex * value
      }%)`;
    }
  };

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
