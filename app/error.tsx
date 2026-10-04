'use client';

import Link from 'next/link';

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className='flex min-h-screen items-center justify-center bg-white px-6'>
      <div className='w-full max-w-md text-center'>
        <p className='text-neutral-400 text-sm'>Something went wrong</p>

        <h1 className='mt-3 font-semibold text-2xl text-neutral-950'>
          We couldn't load this page.
        </h1>

        <p className='mt-2 text-neutral-500 text-sm'>
          Try again or return home.
        </p>

        <div className='mt-6 flex justify-center gap-2'>
          <button
            className='rounded-lg bg-neutral-950 px-4 py-2 text-sm text-white transition-colors hover:bg-neutral-800'
            onClick={reset}
            type='button'
          >
            Try again
          </button>

          <Link
            className='rounded-lg border border-neutral-200 px-4 py-2 text-neutral-600 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950'
            href='/'
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
