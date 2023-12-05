import { z } from 'zod';

/*export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  image: string;
}*/

export const userSchema = z.object({
  id: z.number().gte(0),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  image: z.string(),
  gender: z.enum(['male', 'female']),
});

export type User = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
