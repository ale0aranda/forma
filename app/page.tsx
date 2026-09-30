import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-white px-6'>
      <div className='w-full max-w-xl'>
        <p className='text-neutral-400 text-sm'>FORMA</p>

        <h1 className='mt-4 font-semibold text-4xl tracking-tight'>
          Your corner of the internet.
        </h1>

        <p className='mt-4 max-w-md text-neutral-500 leading-7'>
          Build a personal profile that looks and feels like you.
        </p>

        <div className='mt-8 flex gap-3'>
          <Link
            className='rounded-lg bg-neutral-950 px-4 py-2 font-medium text-sm text-white'
            href='/editor'
          >
            Open editor
          </Link>

          <Link
            className='rounded-lg border border-neutral-200 px-4 py-2 text-sm'
            href='/alejandro'
          >
            View example
          </Link>
        </div>
      </div>
    </main>
  );
}
