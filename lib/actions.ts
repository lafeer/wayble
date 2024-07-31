'use server';

import { signIn } from '@/auth';

export async function authenticate({ username, password }: { username: string; password: string }) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  await signIn('credentials', formData);
}
