import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Providers } from '@/components/providers';
import { queryClient } from '@/services/api/constants';

export const Route = createRootRoute({
  component: () => (
    <>
      <Providers>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </Providers>
      <TanStackRouterDevtools />
    </>
  ),
});
