import React from 'react';

import ReactDOM from 'react-dom/client';

import initHttpClient, { FetchApiClient } from '_config/httpClient';
import HttpClientProvider from '_src/context/HttpClientContext';

import App from './App.tsx';

const httpClient = initHttpClient(FetchApiClient);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HttpClientProvider client={httpClient}>
      <App />
    </HttpClientProvider>
  </React.StrictMode>
);
