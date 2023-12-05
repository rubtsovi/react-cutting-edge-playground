// import { lazy } from 'react';
import { Outlet } from '@tanstack/react-router';

// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

/*const DevOnlyRouterDevTools =
  import.meta.env.PROD && import.meta.env.MODE !== 'staging'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then(d => ({ default: d.TanStackRouterDevtools }))
      );*/

function RootLayout() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      <Outlet />
      {/*<TanStackRouterDevtools />*/}
    </div>
  );
}

export default RootLayout;
