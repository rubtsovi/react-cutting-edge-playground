import { Outlet } from '@tanstack/react-router';

import AppHeader from './_AppHeader.tsx';

function LoggedInLayout() {
  return (
    <div>
      <AppHeader />
      <div className='rounded-3xl border-input p-3'>
        <Outlet />
      </div>
    </div>
  );
}

export default LoggedInLayout;
