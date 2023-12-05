import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { TextInputField } from '_components/fields/TextInputField';
import Button from '_components/ui/Button';
import { Form } from '_components/ui/Form';
import { route as productListRoute } from '_routes/_loggedIn/products.index.ts';
import { noop } from '_utils';

import { useLoginMutation } from './_LoginForm.hooks.ts';
import { type LoginFormSchema, loginSchema } from './_LoginForm.schema';

function LoginForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const { mutate } = useLoginMutation();

  return (
    <Form {...form}>
      <form
        className='space-y-8'
        onSubmit={form.handleSubmit(req =>
          mutate(req, {
            onSuccess: () => {
              router.navigate({ to: productListRoute.to }).catch(noop);
            },
          })
        )}
      >
        <TextInputField name='username' control={form.control} label='Username' />
        <TextInputField
          name='password'
          inputProps={{ type: 'password' }}
          control={form.control}
          label='Password'
        />
        <div className='px-10'>
          <Button
            type='submit'
            className='w-full text-center'
            shadow='sm'
            loading={form.formState.isSubmitting}
            disabled={!form.formState.isValid}
          >
            Login
          </Button>
        </div>
      </form>
      <DevTool control={form.control} />
    </Form>
  );
}

export default LoginForm;
