import { RootState } from '../index';

export const selectCategory = (state: RootState) => state.filters.category;

export const selectQuery = (state: RootState) => state.filters.query;
