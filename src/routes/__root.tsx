import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Providers } from '@/lib/components/providers';
import { RootLayout } from '@/lib/layout';

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
          name: 'description',
          content: description,
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          name: 'theme-color',
          content: '#000000',
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
      links: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon-180x180.png',
        },
        {
          rel: 'manifest',
          href: '/manifest.webmanifest',
        },
      ],
      scripts: [
        ...(import.meta.env.VITE_UMAMI_SCRIPT_URL &&
        import.meta.env.VITE_UMAMI_WEBSITE_ID
          ? [
              {
                src: import.meta.env.VITE_UMAMI_SCRIPT_URL,
                async: true,
                'data-website-id': import.meta.env.VITE_UMAMI_WEBSITE_ID,
              },
            ]
          : []),
      ],
    }),
    component: () => (
      <>
        <HeadContent />
        <Providers>
          <RootLayout>
            <Outlet />
          </RootLayout>
        </Providers>
        <TanStackRouterDevtools position="bottom-right" />
      </>
    ),
  },
);
