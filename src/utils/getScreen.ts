import { ScreenWidth } from '@types';

export const isMobile = (width: number) => width < ScreenWidth.MOBILE;
export const isTablet = (width: number) =>
  width >= ScreenWidth.MOBILE && width < ScreenWidth.TABLET;
export const isDesktop = (width: number) =>
  width >= ScreenWidth.TABLET && width < ScreenWidth.DESKTOP;
