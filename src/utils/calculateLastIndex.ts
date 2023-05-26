import { ItemsPerPage } from '@types';

import { isMobile, isTablet, isDesktop } from './getScreen';

export const getLastIndex = (items: number, itemsPerPage: ItemsPerPage) =>
  items - itemsPerPage;

export const calculateLastIndex = (arrayLength: number, width: number) => {
  let index = 0;
  if (isMobile(width)) {
    index = arrayLength - ItemsPerPage.MOBILE_S;
  } else if (isTablet(width)) {
    const prevIndex = getLastIndex(arrayLength, ItemsPerPage.MOBILE_M);
    index = prevIndex <= 0 ? index : prevIndex;
  } else if (isDesktop(width)) {
    const prevIndex = getLastIndex(arrayLength, ItemsPerPage.TABLET);
    index = prevIndex <= 0 ? index : prevIndex;
  } else {
    const prevIndex = getLastIndex(arrayLength, ItemsPerPage.DESKTOP);
    index = prevIndex <= 0 ? index : prevIndex;
  }
  return index;
};
