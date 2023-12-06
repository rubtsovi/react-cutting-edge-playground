import { HelpCircle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '_components/ui/Card';
import Tooltip from '_components/ui/Tooltip';

import LoginForm from './Form';

function Login() {
  return (
    <Card className='relative w-screen max-w-md' shadow='default'>
      <CardHeader className='justify-center'>
        <CardTitle className='flex items-center gap-2'>
          Login to panel
          <Tooltip
            tooltipContent={
              <div>
                Authorization data for testing you can find here:{' '}
                <a
                  className='text-primary underline'
                  href='https://dummyjson.com/users'
                  target='_blank'
                  rel='noreferrer'
                >
                  users
                </a>
              </div>
            }
          >
            <HelpCircle size={16} className='text-primary' />
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}

export default Login;
