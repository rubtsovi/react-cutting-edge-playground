import { Card, CardContent, CardHeader, CardTitle } from '_components/ui/Card';

import LoginForm from './Form';

function Login() {
  return (
    <Card className='relative w-screen max-w-md' shadow='default'>
      <CardHeader className='justify-center'>
        <CardTitle>Login to panel</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}

export default Login;
