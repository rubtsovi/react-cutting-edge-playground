import { Suspense, lazy, useEffect, useState } from 'react';

import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';

import httpClient from '_config/httpClient';
import queryClient from '_config/queryClient';
import HttpClientProvider from '_context/HttpClientContext';
import router from '_src/router';

const ReactQueryDevToolsStaging = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(d => ({
    default: d.ReactQueryDevtools,
  }))
);

/*const TanStackRouterDevToolsStaging = lazy(() =>
  import('@tanstack/router-devtools').then(d => ({
    default: d.TanStackRouterDevtools,
  }))
);*/

function App() {
  const [showDevTools, setShowDevTools] = useState(false);
  useEffect(() => {
    window.toggleDevTools = () => setShowDevTools(curr => !curr);
  }, []);
  return (
    <>
      <HttpClientProvider client={httpClient}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider delayDuration={300}>
            <RouterProvider router={router} />
          </TooltipProvider>
          <ReactQueryDevtools buttonPosition='bottom-left' position='bottom' />
          {import.meta.env.PROD && import.meta.env.MODE === 'staging' && showDevTools && (
            <Suspense fallback={null}>
              <ReactQueryDevToolsStaging />
              {/*<TanStackRouterDevToolsStaging router={router} />*/}
            </Suspense>
          )}
        </QueryClientProvider>
      </HttpClientProvider>
    </>
  );
}

export default App;
