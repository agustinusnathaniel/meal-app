import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { useMemo } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import { Heading } from '@/components/ui/heading';
import { lookupMealDetailByIDQueryOptions } from '@/services/api/lookup';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export const Route = createFileRoute('/meal/view/$mealId')({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { mealId } }) => {
    const res = await queryClient.ensureQueryData(
      lookupMealDetailByIDQueryOptions({ id: mealId }),
    );
    if (!res.meals) {
      return notFound();
    }
    return res;
  },
});

function RouteComponent() {
  const mealId = Route.useParams().mealId;
  const { data } = useSuspenseQuery(
    lookupMealDetailByIDQueryOptions({ id: mealId }),
  );
  const detailData = data.meals?.[0];

  const youtubeID = useMemo(() => {
    if (!detailData?.strYoutube) {
      return undefined;
    }
    const url = new URL(detailData?.strYoutube);
    return url.searchParams.get('v');
  }, [detailData?.strYoutube]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-6">
      <img
        src={detailData?.strMealThumb}
        className="rounded-xl aspect-3/2 object-cover"
        alt={detailData?.strMeal}
      />
      <div className="flex flex-col gap-2 md:gap-4">
        <Heading>{detailData?.strMeal}</Heading>
        <div className="text-gray-500">
          <p>{detailData?.strCategory}</p>
          <p>{detailData?.strTags}</p>
        </div>

        <p className="text-sm">{detailData?.strInstructions}</p>
        {youtubeID ? (
          <LiteYouTubeEmbed
            title={detailData?.strMeal ?? ''}
            id={youtubeID}
            wrapperClass="yt-lite rounded-xl max-w-lg"
          />
        ) : null}
      </div>
    </div>
  );
}
