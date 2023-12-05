import { FileRoute, redirect } from '@tanstack/react-router';

import { LoggedOutLayout } from '_components/ui/Layout';

import { route as productListRoute } from './_loggedIn/products.index.ts';

export const route = new FileRoute('/_loggedOut').createRoute({
  beforeLoad: () => {
    const token = localStorage.getItem('token');
    if (token) {
      throw redirect({
        to: productListRoute.to,
      });
    }
  },
  component: LoggedOutLayout,
});
