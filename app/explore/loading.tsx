export default function ExploreLoading() {
  return (
    <main className='min-h-screen bg-white'>
      <div className='border-neutral-200 border-b'>
        <div className='mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6'>
          <div className='h-4 w-12 animate-pulse rounded bg-neutral-200' />

          <div className='h-8 w-24 animate-pulse rounded-lg bg-neutral-100' />
        </div>
      </div>

      <div className='mx-auto w-full max-w-xl px-6 py-12'>
        <div className='h-7 w-24 animate-pulse rounded bg-neutral-200' />

        <div className='mt-3 h-4 w-48 animate-pulse rounded bg-neutral-100' />

        <div className='mt-8 h-11 w-full animate-pulse rounded-lg bg-neutral-100' />

        <div className='mt-8 space-y-3'>
          {['one', 'two', 'three', 'four'].map((item) => (
            <div
              className='flex items-center gap-4 px-3 py-3'
              key={item}
            >
              <div className='size-11 shrink-0 animate-pulse rounded-full bg-neutral-100' />

              <div className='flex-1'>
                <div className='h-4 w-32 animate-pulse rounded bg-neutral-200' />

                <div className='mt-2 h-3 w-20 animate-pulse rounded bg-neutral-100' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
