import { Outlet } from '@tanstack/react-router';
import { HandMetalIcon } from 'lucide-react';

import Typography from '_components/ui/Typography';

function LoggedOutLayout() {
  return (
    <div className='container flex flex-col items-center justify-center gap-6 py-20'>
      <div className='flex items-center gap-3'>
        <HandMetalIcon size={48} />
        <div className='flex flex-col gap-1 leading-none'>
          <Typography variant='h3' fontStyle='bolder' asChild>
            <div className='flex gap-0.5'>
              <span className='font-normal'>Rock</span>
              <span className='uppercase'>Box</span>
            </div>
          </Typography>
          <Typography textColor='slate'>Like sandbox, but with rocks</Typography>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default LoggedOutLayout;
