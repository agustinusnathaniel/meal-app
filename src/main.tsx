import { createRouter, RouterProvider } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

import '@fontsource-variable/geologica';
import './styles.css';

import { QueryClientProvider } from '@tanstack/react-query';

import { Loader } from '@/components/ui/loader.tsx';

import { buttonStyles } from './components/ui/button.tsx';
import { Link } from './components/ui/link.tsx';
import reportWebVitals from './reportWebVitals.ts';
import { queryClient } from './services/api/constants.ts';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: () => (
    <div className="flex justify-center my-24">
      <Loader size="large" variant="ring" />
    </div>
  ),
  defaultPendingMs: 100,
  defaultNotFoundComponent: () => (
    <div className="text-center my-24 flex flex-col gap-4 items-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Not Found</p>

      <Link
        className={(renderProps) =>
          buttonStyles({ ...renderProps, intent: 'primary' })
        }
        href="/"
      >
        Back to Home
      </Link>
    </div>
  ),
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </NuqsAdapter>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
