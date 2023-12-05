import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
