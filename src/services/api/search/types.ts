import type { MealEntry } from '@/services/api/types';

export type GetMealSearchResultQueryParams = {
  s?: string;
  f?: string;
};

export type GetMealSearchResultResponseData = {
  meals?: Array<MealEntry>;
};
