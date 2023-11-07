import { useMemo } from 'react';

import { IHttpClient } from '_models/httpClient.ts';

import HttpClientContext from './_HttpClient.context.ts';

interface IHttpClientProviderProps {
  client: IHttpClient;
}

function HttpClientProvider({
  client,
  children,
}: React.PropsWithChildren<IHttpClientProviderProps>) {
  const contextValue = useMemo<
    React.ComponentProps<typeof HttpClientContext.Provider>['value']
  >(() => {
    return {
      httpClient: client,
    };
  }, [client]);
  return <HttpClientContext.Provider value={contextValue}>{children}</HttpClientContext.Provider>;
}

export default HttpClientProvider;
