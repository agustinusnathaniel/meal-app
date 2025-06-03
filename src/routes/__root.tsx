import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Providers } from '@/components/providers';
import { RootLayout } from '@/layout';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <Providers>
          <RootLayout>
            <Outlet />
          </RootLayout>
        </Providers>
        <TanStackRouterDevtools />
      </>
    ),
  },
);
