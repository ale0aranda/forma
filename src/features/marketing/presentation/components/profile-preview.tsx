export function LandingProfilePreview() {
  return (
    <div className='bg-neutral-50 p-3'>
      <div className='h-full min-h-96 rounded-lg border border-neutral-200 bg-white p-6'>
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-xs tracking-widest'>FORMA</p>

          <div className='flex gap-4 text-neutral-400 text-xs'>
            <span>Projects</span>
            <span>Now</span>
            <span>Gallery</span>
          </div>
        </div>

        <div className='mt-10 flex gap-4'>
          <div className='flex size-16 shrink-0 items-center justify-center rounded-xl bg-neutral-950 font-semibold text-lg text-white'>
            AA
          </div>

          <div>
            <h3 className='font-semibold text-lg'>John Doe</h3>

            <p className='mt-0.5 text-neutral-600 text-xs'>Bot</p>

            <p className='mt-3 max-w-sm text-neutral-500 text-xs leading-5'>
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
