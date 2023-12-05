import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userQueryKeys } from '_features/User';
import { authenticate } from '_features/User';
import { LoginFormSchema } from '_src/pages/Login/Form/_LoginForm.schema.ts';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginFormSchema) => authenticate(data),
    onSuccess: loggedInData => {
      queryClient.setQueryData(userQueryKeys.loggedIn, loggedInData);
    },
  });
}
