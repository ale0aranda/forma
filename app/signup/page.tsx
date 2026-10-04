import Link from 'next/link';
import { redirect } from 'next/navigation';

import { signup } from '@/app/login/actions';
import { createClient } from '@/lib/supabase/server';

interface SignupPageProps {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/editor');
  }

  const { error, success } = await searchParams;

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
          Create your profile
        </h1>

        <p className='mt-2 text-neutral-500 text-sm'>
          Create an account and start building.
        </p>

        {success === 'confirmation' && (
          <div className='mt-6 rounded-lg border border-neutral-200 p-4'>
            <p className='font-medium text-neutral-950 text-sm'>
              Check your email
            </p>

            <p className='mt-1 text-neutral-500 text-sm'>
              Confirm your email, then come back and log in.
            </p>
          </div>
        )}

        {error && (
          <p className='mt-6 text-red-600 text-sm'>
            {error === 'invalid'
              ? 'Enter a valid email and a password with at least 6 characters.'
              : 'Could not create your account.'}
          </p>
        )}

        {success !== 'confirmation' && (
          <form
            action={signup}
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
                autoComplete='new-password'
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
              Create account
            </button>
          </form>
        )}

        <p className='mt-6 text-center text-neutral-500 text-sm'>
          Already have an account?{' '}
          <Link
            className='text-neutral-950 hover:underline'
            href='/login'
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
