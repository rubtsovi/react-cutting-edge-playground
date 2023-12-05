import { rootRouteWithContext } from '@tanstack/react-router';

import { RootLayout } from '_components/ui/Layout';
import queryClient from '_config/queryClient';
import { IHttpClient } from '_models/httpClient.ts';

export const route = rootRouteWithContext<{
  queryClient: typeof queryClient;
  httpClient: IHttpClient;
}>()({
  component: RootLayout,
});
