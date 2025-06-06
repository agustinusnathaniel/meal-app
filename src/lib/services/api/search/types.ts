import type { MealEntry } from '@/lib/services/api/types';

export type GetMealSearchResultQueryParams = {
  s?: string;
  f?: string;
};

export type GetMealSearchResultResponseData = {
  meals?: Array<MealEntry>;
};
