import { useContext } from 'react';

import HttpClientContext from '_src/context/HttpClientContext/_HttpClientContext.ts';

function useHttpClientContext() {
  const context = useContext(HttpClientContext);
  if (context === null) {
    throw Error("There's no HttpClientContext found");
  }

  return context;
}

export default useHttpClientContext;
