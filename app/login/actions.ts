'use server';

import { redirect } from 'next/navigation';

import { authUseCases } from '@/src/composition/auth-server';

export async function login(formData: FormData) {
  const result = await authUseCases.login(formData);

  if (result !== 'success') {
    redirect(`/login?error=${result}`);
  }

  redirect('/editor');
}

export async function signup(formData: FormData) {
  const result = await authUseCases.signup(formData);

  if (result !== 'success') {
    redirect(`/signup?error=${result}`);
  }

  redirect('/signup?success=confirmation');
}
