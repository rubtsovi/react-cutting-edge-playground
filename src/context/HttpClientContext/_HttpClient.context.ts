import { createContext } from 'react';

import { IHttpClient } from '_models/httpClient.ts';

interface IHttpClientContext {
  httpClient: IHttpClient;
}

const HttpClientContext = createContext<IHttpClientContext | null>(null);

export default HttpClientContext;
