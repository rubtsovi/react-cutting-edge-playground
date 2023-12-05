import { FileRoute, redirect } from '@tanstack/react-router';
import { jwtDecode } from 'jwt-decode';

import { LoggedInLayout } from '_components/ui/Layout';
import httpClient from '_config/httpClient';
import queryClient from '_config/queryClient';
import { User, getUserData, userQueryKeys } from '_features/User';
import { noop } from '_utils';

import { route as loginRoute } from './_loggedOut/login.ts';

export const route = new FileRoute('/_loggedIn').createRoute({
  beforeLoad: async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: userQueryKeys.loggedIn,
      queryFn: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw redirect({
            to: loginRoute.to,
          });
        }

        const { id: userId } = jwtDecode<User>(token);
        return await getUserData(userId);
      },
      staleTime: Infinity,
    });

    return {
      loggedInUser: data,
    };
  },
  onError: err => {
    if (err instanceof Error && err.message === '401') {
      localStorage.removeItem('token');
      queryClient.resetQueries({ queryKey: userQueryKeys.loggedIn }).catch(noop);
      httpClient.setAuthToken(null);
      throw redirect({
        to: loginRoute.to,
      });
    }
  },
  component: LoggedInLayout,
});
