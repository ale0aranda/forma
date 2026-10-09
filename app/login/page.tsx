import Link from 'next/link';
import { redirect } from 'next/navigation';

import { loadAuthenticationState } from '@/src/composition/session';
import { LoginForm } from '@/src/features/auth/presentation/components/login-form';
import { SocialLogin } from '@/src/features/auth/presentation/components/social-login';

interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const authenticated = await loadAuthenticationState();

  if (authenticated) {
    redirect('/editor');
  }

  const { error } = await searchParams;

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
            Welcome back
          </h1>

          <p className='mt-3 text-neutral-500 text-sm'>
            Log in to continue editing your profile.
          </p>
        </div>

        {error === 'oauth' && (
          <div
            className='mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-red-600 text-sm'
            role='alert'
          >
            Could not complete sign in. Please try again.
          </div>
        )}

        <LoginForm error={error === 'oauth' ? undefined : error} />

        <SocialLogin />

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
