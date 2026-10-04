export default function ProfileLoading() {
  return (
    <main className='min-h-screen bg-white'>
      <div className='mx-auto w-full max-w-3xl px-6 py-8'>
        <div className='mb-12 flex justify-between'>
          <div className='flex gap-3'>
            <div className='h-4 w-20 animate-pulse rounded bg-neutral-100' />

            <div className='h-4 w-20 animate-pulse rounded bg-neutral-100' />
          </div>

          <div className='h-9 w-20 animate-pulse rounded-lg bg-neutral-100' />
        </div>

        <div className='flex items-center gap-4'>
          <div className='size-16 animate-pulse rounded-full bg-neutral-100' />

          <div>
            <div className='h-6 w-40 animate-pulse rounded bg-neutral-200' />

            <div className='mt-2 h-4 w-28 animate-pulse rounded bg-neutral-100' />
          </div>
        </div>

        <div className='mt-10 space-y-3'>
          <div className='h-4 w-full animate-pulse rounded bg-neutral-100' />

          <div className='h-4 w-4/5 animate-pulse rounded bg-neutral-100' />

          <div className='h-4 w-2/3 animate-pulse rounded bg-neutral-100' />
        </div>
      </div>
    </main>
  );
}
