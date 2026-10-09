'use server';

import { redirect } from 'next/navigation';

import { authUseCases } from '@/src/composition/auth-server';

export async function logout() {
  await authUseCases.logout();

  redirect('/login');
}
