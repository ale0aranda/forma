export default function Loading() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-white'>
      <div
        aria-label='Loading'
        className='size-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950'
        role='status'
      />
    </main>
  );
}
