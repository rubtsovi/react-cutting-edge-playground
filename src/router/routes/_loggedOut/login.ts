import { FileRoute } from '@tanstack/react-router';

import Login from '_src/pages/Login';

export const route = new FileRoute('/_loggedOut/login').createRoute({
  component: Login,
});
