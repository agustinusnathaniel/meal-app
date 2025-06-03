import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Providers } from '@/components/providers';
import { RootLayout } from '@/layout';

const title = 'Meal App';
const description = 'Meal database';
const url = 'https://zippy.sznm.dev';
const ogImgUrl =
  'https://og.sznm.dev/api/generate?heading=meal-app&text=Meal+Database&template=color';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        {
          title: title,
        },
        {
          name: 'theme-color',
          content: '#000000',
        },
        {
          name: 'description',
          content: description,
        },
        {
          name: 'og:type',
          content: 'website',
        },
        {
          name: 'og:url',
          content: url,
        },
        {
          name: 'og:title',
          content: title,
        },
        {
          name: 'og:description',
          content: description,
        },
        {
          name: 'og:image',
          content: ogImgUrl,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:url',
          content: url,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:image',
          content: ogImgUrl,
        },
      ],
    }),
    component: () => (
      <Providers>
        <HeadContent />
        <RootLayout>
          <Outlet />
        </RootLayout>
        <TanStackRouterDevtools position="bottom-right" />
      </Providers>
    ),
  },
);
