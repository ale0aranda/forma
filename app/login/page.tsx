import Link from 'next/link';
import { redirect } from 'next/navigation';

import { LoginForm } from '@/components/auth/login-form';
import { createClient } from '@/lib/supabase/server';

interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/editor');
  }

  const { error } = await searchParams;

  return (
    <main className='flex min-h-screen items-center justify-center bg-white px-6 py-12'>
      <div className='w-full max-w-md'>
        <Link
          className='inline-block font-semibold text-lg text-neutral-950 tracking-tight'
          href='/'
        >
          Forma
        </Link>

        <div className='mt-14'>
          <h1 className='font-semibold text-3xl text-neutral-950 tracking-tight'>
            Welcome back
          </h1>

          <p className='mt-2 text-base text-neutral-500'>
            Log in to continue editing your profile.
          </p>
        </div>

        <LoginForm error={error} />

        <p className='mt-8 text-center text-neutral-500 text-sm'>
          New to Forma?{' '}
          <Link
            className='font-medium text-neutral-950 transition-opacity hover:opacity-60'
            href='/signup'
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
