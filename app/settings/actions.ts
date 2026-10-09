'use server';

import { redirect } from 'next/navigation';

import { accountUseCases } from '@/src/composition/settings';

export async function deleteAccount() {
  const result = await accountUseCases.deleteAccount();

  if (result === 'unauthenticated') {
    redirect('/login');
  }

  if (result === 'failed') {
    redirect('/settings?error=delete');
  }

  redirect('/');
}
