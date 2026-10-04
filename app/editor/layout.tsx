import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import type { ReactNode } from 'react';

interface EditorLayoutProps {
  children: ReactNode;
}

export default async function EditorLayout({ children }: EditorLayoutProps) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect('/login');
  }

  return children;
}
