import Link from 'next/link';
import { redirect } from 'next/navigation';

import { SignupForm } from '@/components/auth/signup-form';
import { SocialLogin } from '@/components/auth/social-login';
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
    <main className='flex min-h-screen items-center justify-center bg-white px-6 py-12'>
      <div className='w-full max-w-md'>
        <div className='text-center'>
          <Link
            className='inline-block font-semibold text-2xl text-neutral-950 tracking-tight transition-opacity hover:opacity-60'
            href='/'
          >
            Forma
          </Link>

          <h1 className='mt-12 font-semibold text-4xl text-neutral-950 tracking-tight'>
            Create your profile
          </h1>

          <p className='mt-3 text-neutral-500 text-sm'>
            Create an account and start building.
          </p>
        </div>

        {success === 'confirmation' && (
          <div
            className='mt-6 rounded-lg border border-neutral-200 p-4'
            role='status'
          >
            <p className='font-medium text-neutral-950 text-sm'>
              Check your email
            </p>

            <p className='mt-1 text-neutral-500 text-sm'>
              Confirm your email, then come back and log in.
            </p>
          </div>
        )}

        {error && (
          <div
            className='mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-red-600 text-sm'
            role='alert'
          >
            {error === 'invalid'
              ? 'Enter a valid email and matching passwords.'
              : 'Could not create your account.'}
          </div>
        )}

        {success !== 'confirmation' && (
          <>
            <SignupForm />

            <SocialLogin />
          </>
        )}

        <p className='mt-8 text-center text-neutral-500 text-sm'>
          Already have an account?{' '}
          <Link
            className='font-medium text-neutral-950 transition-opacity hover:opacity-60'
            href='/login'
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
