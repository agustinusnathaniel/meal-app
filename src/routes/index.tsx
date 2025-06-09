import { debounce } from '@tanstack/react-pacer';
import { useQuery } from '@tanstack/react-query';
import {
  createFileRoute,
  Link,
  stripSearchParams,
  useNavigate,
} from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { domAnimation, LazyMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { z } from 'zod';

import { Card } from '@/lib/components/ui/card';
import { Loader } from '@/lib/components/ui/loader';
import { TextField } from '@/lib/components/ui/text-field';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { fetchMealSearchResultQueryOptions } from '@/lib/services/api/search';

const mealSearchSchema = z.object({
  keyword: fallback(z.string(), '').default(''),
});

const defaultSearchParams = {
  keyword: '',
};

export const Route = createFileRoute('/')({
  component: App,
  validateSearch: zodValidator(mealSearchSchema),
  loaderDeps: ({ search: { keyword } }) => ({ keyword }),
  loader: ({ context: { queryClient }, deps }) => {
    queryClient.ensureQueryData(
      fetchMealSearchResultQueryOptions({
        queryParams: {
          s: deps.keyword,
        },
      }),
    );
  },
  search: {
    middlewares: [stripSearchParams(defaultSearchParams)],
  },
});

function App() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { keyword } = Route.useSearch();
  const mealSearchResult = useQuery(
    fetchMealSearchResultQueryOptions({
      queryParams: { s: keyword ?? '' },
    }),
  );
  const data = mealSearchResult.data;
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleChangeKeyword = debounce(
    (keyword: string) => navigate({ to: '/', search: { keyword } }),
    {
      wait: 500,
    },
  );

  return (
    <div className="flex flex-col gap-4">
      <TextField
        onChange={handleChangeKeyword}
        defaultValue={keyword}
        placeholder="Insert keyword here"
      />
      {mealSearchResult.isLoading ? (
        <div className="mx-auto my-24">
          <Loader variant="ring" size="large" />
        </div>
      ) : null}
      {!(mealSearchResult.isLoading || mealSearchResult.data?.meals?.length) ? (
        <p className="text-center">No Result Found</p>
      ) : null}
      {data?.meals?.length ? (
        <LazyMotion features={domAnimation}>
          <m.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4"
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {data.meals.map((meal) => (
              <Link
                to="/meal/view/$mealId"
                params={{ mealId: meal.idMeal }}
                preload={isMobile ? 'viewport' : undefined}
                key={meal.idMeal}
              >
                <m.div
                  variants={{
                    hidden: {
                      y: 50,
                      opacity: 0,
                      filter: 'blur(15px)',
                    },
                    show: {
                      y: 0,
                      opacity: 1,
                      filter: 'blur(0)',
                      transition: { type: 'spring' },
                    },
                  }}
                >
                  <Card>
                    <Card.Header>
                      <Card.Title>{meal.strMeal}</Card.Title>
                      <Card.Description>{meal.strCategory}</Card.Description>
                    </Card.Header>
                    <Card.Content>
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="rounded-xl aspect-3/2 object-cover"
                      />
                    </Card.Content>
                  </Card>
                </m.div>
              </Link>
            ))}
          </m.div>
        </LazyMotion>
      ) : null}
    </div>
  );
}
