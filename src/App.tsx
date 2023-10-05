import { Suspense, lazy, useEffect, useState } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Card, CardContent, CardHeader, CardTitle } from '_components/ui/Card';
import initHttpClient, { FetchApiClient } from '_config/httpClient';
import queryClient from '_config/queryClient';
import HttpClientProvider from '_context/HttpClientContext';
import TestForm from '_src/TestForm.tsx';

const httpClient = initHttpClient(FetchApiClient);

const ReactQueryDevToolsStaging = lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(d => ({
    default: d.ReactQueryDevtools,
  }))
);

function App() {
  const [showDevTools, setShowDevTools] = useState(false);
  useEffect(() => {
    window.toggleDevTools = () => setShowDevTools(curr => !curr);
  }, []);
  return (
    <>
      <HttpClientProvider client={httpClient}>
        <QueryClientProvider client={queryClient}>
          <div className='container max-w-2xl py-20'>
            <Card>
              <CardHeader className='justify-center'>
                <CardTitle>Type your data</CardTitle>
              </CardHeader>
              <CardContent className='px-14'>
                <TestForm />
              </CardContent>
            </Card>
          </div>
          <ReactQueryDevtools />
          {import.meta.env.PROD && import.meta.env.MODE === 'staging' && showDevTools && (
            <Suspense fallback={null}>
              <ReactQueryDevToolsStaging />
            </Suspense>
          )}
        </QueryClientProvider>
      </HttpClientProvider>
    </>
  );
}

export default App;
