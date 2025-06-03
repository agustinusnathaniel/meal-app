import { appQueryOptionsConstructor } from '@/services/api/utils';

import type {
  GetMealSearchResultQueryParams,
  GetMealSearchResultResponseData,
} from './types';

type FetchMealSearchResultParams = {
  queryParams: GetMealSearchResultQueryParams;
};

export const fetchMealSearchResultQueryOptions = (
  params?: FetchMealSearchResultParams,
) =>
  appQueryOptionsConstructor<GetMealSearchResultResponseData>({
    path: '/search.php',
    config: {
      searchParams: params?.queryParams ?? { s: '' },
    },
  });
