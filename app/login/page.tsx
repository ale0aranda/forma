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
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/editor');
  }

  const { error } = await searchParams;

  return (
    <main className='flex min-h-screen items-center justify-center bg-white px-6'>
      <div className='w-full max-w-sm'>
        <Link
          className='font-semibold text-neutral-950'
          href='/'
        >
          Forma
        </Link>

        <h1 className='mt-10 font-semibold text-2xl text-neutral-950'>
          Welcome back
        </h1>

        <p className='mt-2 text-neutral-500 text-sm'>
          Log in to continue editing your profile.
        </p>

        {error && (
          <p className='mt-6 text-red-600 text-sm'>
            {error === 'invalid'
              ? 'Enter a valid email and password.'
              : 'Invalid email or password.'}
          </p>
        )}

        <form
          action={login}
          className='mt-6 space-y-4'
        >
          <div>
            <label
              className='mb-2 block font-medium text-neutral-700 text-sm'
              htmlFor='email'
            >
              Email
            </label>

            <input
              autoComplete='email'
              className='w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-neutral-950 text-sm outline-none transition-colors focus:border-neutral-400'
              id='email'
              name='email'
              required
              type='email'
            />
          </div>

          <div>
            <label
              className='mb-2 block font-medium text-neutral-700 text-sm'
              htmlFor='password'
            >
              Password
            </label>

            <input
              autoComplete='current-password'
              className='w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-neutral-950 text-sm outline-none transition-colors focus:border-neutral-400'
              id='password'
              minLength={6}
              name='password'
              required
              type='password'
            />
          </div>

          <button
            className='w-full rounded-lg bg-neutral-950 px-4 py-2.5 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
            type='submit'
          >
            Log in
          </button>
        </form>

        <p className='mt-6 text-center text-neutral-500 text-sm'>
          New to Forma?{' '}
          <Link
            className='text-neutral-950 hover:underline'
            href='/signup'
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
