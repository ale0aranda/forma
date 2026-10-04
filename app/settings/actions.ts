'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function deleteAccount() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/login');
  }

  const { error } = await supabase.rpc('delete_account');

  if (error) {
    redirect('/settings?error=delete');
  }

  await supabase.auth.signOut();

  redirect('/');
}
