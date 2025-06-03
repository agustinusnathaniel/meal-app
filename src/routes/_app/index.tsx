import { debounce } from '@tanstack/react-pacer';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { Card } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { TextField } from '@/components/ui/text-field';
import { fetchMealSearchResultQueryOptions } from '@/services/api/search';

export const Route = createFileRoute('/_app/')({
  component: App,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(fetchMealSearchResultQueryOptions());
  },
});

function App() {
  const [search, setSearch] = useState<string>();
  const mealSearchResult = useQuery(
    fetchMealSearchResultQueryOptions({ queryParams: { s: search ?? '' } }),
  );
  const data = mealSearchResult.data;

  const handleChangeKeyword = debounce((value: string) => setSearch(value), {
    wait: 500,
  });

  return (
    <div className="flex flex-col gap-4">
      <TextField
        onChange={handleChangeKeyword}
        placeholder="Insert keyword here"
      />
      {mealSearchResult.isLoading ? (
        <div className="mx-auto">
          <Loader variant="ring" />
        </div>
      ) : null}
      {!mealSearchResult.isLoading && !mealSearchResult.data?.meals?.length ? (
        <p className="text-center">No Result Found</p>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(data?.meals ?? []).map((meal) => (
          <Card key={meal.idMeal}>
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
        ))}
      </div>
    </div>
  );
}
