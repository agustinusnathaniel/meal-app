import { useAppFetcher } from '@/services/api/hooks';

import type {
  GetMealSearchResultQueryParams,
  GetMealSearchResultResponseData,
} from './types';

type UseGetMealSearchResultParams = {
  queryParams: GetMealSearchResultQueryParams;
};

export const useGetMealSearchResult = ({
  queryParams,
}: UseGetMealSearchResultParams) =>
  useAppFetcher<GetMealSearchResultResponseData>({
    path: '/search.php',
    config: {
      searchParams: queryParams,
    },
  });
