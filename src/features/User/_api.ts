import { z } from 'zod';

import httpClient from '_config/httpClient';

import { LoginFormSchema, userSchema } from './_models.ts';

export async function authenticate(authRequest: LoginFormSchema) {
  const loginResponse = await httpClient.post('auth/login', authRequest).response;
  const token = z.object({ token: z.string() }).parse(loginResponse)?.token ?? null;
  httpClient.setAuthToken(token);
  if (token) {
    localStorage.setItem('token', token);
  }
  return userSchema.parse(loginResponse);
}

export async function getUserData(userId: number) {
  const userDataResponse = await httpClient.get(`auth/user/${userId}`).response;
  return userSchema.parse(userDataResponse);
}
