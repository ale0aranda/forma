import Link from 'next/link';

interface AppHeaderProps {
  authenticated?: boolean;
  username?: string;
}

export function AppHeader({ authenticated = false, username }: AppHeaderProps) {
  return (
    <header className='border-neutral-200 border-b'>
      <div className='mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6'>
        <Link
          className='font-semibold text-neutral-950'
          href='/'
        >
          Forma
        </Link>

        <nav
          aria-label='Main navigation'
          className='flex items-center gap-1'
        >
          <Link
            className='rounded-lg px-3 py-2 text-neutral-500 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
            href='/explore'
          >
            Explore
          </Link>

          {authenticated ? (
            <>
              {username && (
                <Link
                  className='rounded-lg px-3 py-2 text-neutral-500 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
                  href={`/${username}`}
                >
                  Profile
                </Link>
              )}

              <Link
                className='rounded-lg px-3 py-2 text-neutral-500 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
                href='/settings'
              >
                Settings
              </Link>

              <Link
                className='rounded-lg bg-neutral-950 px-3 py-2 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
                href='/editor'
              >
                Editor
              </Link>
            </>
          ) : (
            <>
              <Link
                className='rounded-lg px-3 py-2 text-neutral-500 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
                href='/login'
              >
                Log in
              </Link>

              <Link
                className='rounded-lg bg-neutral-950 px-3 py-2 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
                href='/signup'
              >
                Create profile
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
