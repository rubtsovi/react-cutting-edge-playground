import { Router } from '@tanstack/react-router';

import httpClient from '_config/httpClient';
import queryClient from '_config/queryClient';

import { routeTree } from './routeTree.gen.ts';

const router = new Router({ routeTree, context: { queryClient, httpClient } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
