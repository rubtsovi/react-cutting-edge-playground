import { useQuery } from '@tanstack/react-query';

import { User, userQueryKeys } from '_features/User';

function AppHeader() {
  const { data } = useQuery<User>({ queryKey: userQueryKeys.loggedIn });
  return (
    <div className='p-3'>
      <div className='grid w-full rounded-2xl bg-card p-3'>
        Hello, {data?.firstName}&nbsp;{data?.lastName}
      </div>
    </div>
  );
}

export default AppHeader;
