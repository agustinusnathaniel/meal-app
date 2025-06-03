import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { domAnimation, LazyMotion, type Variants } from 'motion/react';
import * as m from 'motion/react-m';
import { useMemo } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import { lookupMealDetailByIDQueryOptions } from '@/services/api/lookup';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { useScrollTopCheck } from '@/hooks/use-scroll-top-check';

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

const childVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
    filter: 'blur(20px)',
  },
  show: {
    y: 0,
    opacity: 1,
    filter: 'blur(0)',
    transition: { type: 'spring' },
  },
};

function RouteComponent() {
  const ready = useScrollTopCheck();

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
    <LazyMotion features={domAnimation}>
      <m.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_2fr] 2xl:grid-cols-[3fr_7fr] gap-4 md:gap-6"
      >
        <m.img
          variants={childVariants}
          src={detailData?.strMealThumb}
          className="rounded-xl aspect-3/2 object-cover"
          alt={detailData?.strMeal}
        />
        <div className="flex flex-col gap-2 md:gap-4">
          <m.h1 variants={childVariants} className="text-4xl font-bold">
            {detailData?.strMeal}
          </m.h1>
          <m.div variants={childVariants} className="text-gray-500">
            <p>{detailData?.strCategory}</p>
            <p>{detailData?.strTags}</p>
          </m.div>

          <m.p variants={childVariants} className="text-sm">
            {detailData?.strInstructions}
          </m.p>
          {youtubeID ? (
            <m.div variants={childVariants}>
              <LiteYouTubeEmbed
                title={detailData?.strMeal ?? ''}
                id={youtubeID}
                wrapperClass="yt-lite rounded-xl max-w-lg"
              />
            </m.div>
          ) : null}
        </div>
      </m.div>
    </LazyMotion>
  );
}
