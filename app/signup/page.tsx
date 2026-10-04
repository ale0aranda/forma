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
  const { error, success } = await searchParams;

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
          <h1 className='font-semibold text-2xl'>Create your account</h1>

          <p className='mt-2 text-neutral-500 text-sm'>
            Create and publish your profile.
          </p>
        </div>

        {success === 'confirmation' && (
          <p className='mt-6 rounded-lg bg-neutral-100 px-3 py-2 text-neutral-600 text-sm'>
            Check your email to confirm your account.
          </p>
        )}

        {error && (
          <p className='mt-6 rounded-lg bg-red-50 px-3 py-2 text-red-600 text-sm'>
            {error === 'signup'
              ? "We couldn't create your account."
              : 'Enter a valid email and password.'}
          </p>
        )}

        <form
          action={signup}
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
              autoComplete='new-password'
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
            Create account
          </button>
        </form>

        <p className='mt-6 text-center text-neutral-500 text-sm'>
          Already have an account?{' '}
          <Link
            className='text-neutral-950 underline underline-offset-4'
            href='/login'
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
