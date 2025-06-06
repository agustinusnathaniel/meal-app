import { appQueryOptionsConstructor } from '../utils';
import type { GetMealDetailByIDResponseData } from './types';

type LookupMealDetailByIDQueryOptionsParams = {
  id: string;
};

export const lookupMealDetailByIDQueryOptions = ({
  id,
}: LookupMealDetailByIDQueryOptionsParams) =>
  appQueryOptionsConstructor<GetMealDetailByIDResponseData>({
    path: '/lookup.php',
    config: {
      searchParams: { i: id },
    },
  });
