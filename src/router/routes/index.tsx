import { FileRoute, Navigate } from '@tanstack/react-router';

import { route as loggedInRoute } from './_loggedIn/products.index';
import { route as loggedOutRoute } from './_loggedOut/login';

export const route = new FileRoute('/').createRoute({
  component: () =>
    localStorage.getItem('token') ? (
      <Navigate search={{}} to={loggedInRoute.to} />
    ) : (
      <Navigate search={{}} to={loggedOutRoute.to} />
    ),
});
