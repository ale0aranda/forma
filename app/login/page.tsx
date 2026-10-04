import Link from 'next/link';
import { redirect } from 'next/navigation';

import { login } from '@/app/login/actions';
import { createClient } from '@/lib/supabase/server';

interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    redirect('/editor');
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-white px-5 text-neutral-950'>
      <div className='w-full max-w-sm'>
        <Link
          className='font-semibold tracking-widest'
          href='/'
        >
          FORMA
        </Link>

        <div className='mt-12'>
          <h1 className='font-semibold text-2xl'>Sign in</h1>

          <p className='mt-2 text-neutral-500 text-sm'>
            Continue editing your profile.
          </p>
        </div>

        {error && (
          <p className='mt-6 rounded-lg bg-red-50 px-3 py-2 text-red-600 text-sm'>
            {error === 'credentials'
              ? 'Incorrect email or password.'
              : 'Enter a valid email and password.'}
          </p>
        )}

        <form
          action={login}
          className='mt-8 space-y-4'
        >
          <label className='block'>
            <span className='mb-2 block text-neutral-600 text-sm'>Email</span>

            <input
              autoComplete='email'
              className='w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-neutral-400'
              name='email'
              placeholder='you@example.com'
              required
              type='email'
            />
          </label>

          <label className='block'>
            <span className='mb-2 block text-neutral-600 text-sm'>
              Password
            </span>

            <input
              autoComplete='current-password'
              className='w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-neutral-400'
              minLength={6}
              name='password'
              required
              type='password'
            />
          </label>

          <button
            className='w-full rounded-lg bg-neutral-950 px-4 py-2.5 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
            type='submit'
          >
            Sign in
          </button>
        </form>

        <p className='mt-6 text-center text-neutral-500 text-sm'>
          No account ?{' '}
          <Link
            className='text-neutral-950 underline underline-offset-4'
            href='/signup'
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
