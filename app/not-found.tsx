import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-white px-6'>
      <div className='w-full max-w-md text-center'>
        <p className='text-neutral-400 text-sm'>404</p>

        <h1 className='mt-3 font-semibold text-2xl text-neutral-950'>
          Nothing here.
        </h1>

        <p className='mt-2 text-neutral-500 text-sm'>
          This page or profile does not exist.
        </p>

        <div className='mt-6 flex justify-center gap-2'>
          <Link
            className='rounded-lg bg-neutral-950 px-4 py-2 text-sm text-white transition-colors hover:bg-neutral-800'
            href='/'
          >
            Home
          </Link>

          <Link
            className='rounded-lg border border-neutral-200 px-4 py-2 text-neutral-600 text-sm transition-colors hover:bg-neutral-50'
            href='/explore'
          >
            Explore
          </Link>
        </div>
      </div>
    </main>
  );
}
