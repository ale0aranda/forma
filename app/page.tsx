import Link from 'next/link';

import { AppHeader } from '@/components/app-header';
import { getCurrentUsername } from '@/lib/current-profile';
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const authenticated = Boolean(data.user);

  const username = authenticated ? await getCurrentUsername() : undefined;

  return (
    <main className='min-h-screen bg-white'>
      <AppHeader
        authenticated={authenticated}
        username={username}
      />

      <section className='mx-auto flex w-full max-w-5xl flex-col px-6 py-24'>
        <p className='mb-4 text-neutral-400 text-sm'>Your profile, your way.</p>

        <h1 className='max-w-2xl font-semibold text-4xl text-neutral-950 tracking-tight sm:text-5xl'>
          A place for everything that makes you, you.
        </h1>

        <p className='mt-6 max-w-xl text-base text-neutral-500 leading-7'>
          Build a personal profile, share what you are working on and discover
          other people creating on Forma.
        </p>

        <div className='mt-8 flex items-center gap-3'>
          <Link
            className='rounded-lg bg-neutral-950 px-4 py-2.5 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
            href={authenticated ? '/editor' : '/signup'}
          >
            {authenticated ? 'Open editor' : 'Create your profile'}
          </Link>

          <Link
            className='rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-600 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950'
            href='/explore'
          >
            Explore profiles
          </Link>
        </div>
      </section>
    </main>
  );
}
