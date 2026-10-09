import { redirect } from 'next/navigation';

import { loadVerifiedClaimsState } from '@/src/composition/session';

import type { ReactNode } from 'react';

interface EditorLayoutProps {
  children: ReactNode;
}

export default async function EditorLayout({ children }: EditorLayoutProps) {
  const authenticated = await loadVerifiedClaimsState();

  if (!authenticated) {
    redirect('/login');
  }

  return children;
}
