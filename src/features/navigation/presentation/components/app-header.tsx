'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AccountMenu } from '@/src/features/navigation/presentation/components/account-menu';

import type { CurrentProfile } from '@/src/features/profile';

interface AppHeaderProps {
  authenticated?: boolean;
  profile?: CurrentProfile | undefined;
  search?: boolean;
}

export function AppHeader({
  authenticated = false,
  profile,
  search = false
}: AppHeaderProps) {
  const pathname = usePathname();

  return (
    <header className='border-neutral-200 border-b bg-white'>
      <div className='mx-auto flex h-16 w-full max-w-6xl items-center gap-8 px-6'>
        <Link
          className='shrink-0 font-semibold text-lg text-neutral-950 tracking-tight'
          href='/'
        >
          Forma
        </Link>

        <nav
          aria-label='Main navigation'
          className='hidden items-center gap-1 sm:flex'
        >
          <NavigationLink
            active={pathname === '/explore'}
            href='/explore'
          >
            Explore
          </NavigationLink>

          {authenticated && (
            <>
              <NavigationLink
                active={pathname === '/settings'}
                href='/settings'
              >
                Settings
              </NavigationLink>

              <NavigationLink
                active={pathname.startsWith('/editor')}
                href='/editor'
              >
                Editor
              </NavigationLink>
            </>
          )}
        </nav>

        <div className='ml-auto flex items-center gap-3'>
          {search && (
            <Link
              aria-label='Search profiles'
              className='flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-950'
              href='/explore'
            >
              <Search
                aria-hidden='true'
                size={17}
              />
            </Link>
          )}

          {authenticated && profile ? (
            <>
              <div className='hidden h-5 border-neutral-200 border-l sm:block' />

              <AccountMenu profile={profile} />
            </>
          ) : authenticated ? null : (
            <div className='flex items-center gap-1'>
              <Link
                className='rounded-lg px-3 py-2 text-neutral-500 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
                href='/login'
              >
                Sign in
              </Link>

              <Link
                className='rounded-lg bg-neutral-950 px-3 py-2 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
                href='/signup'
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

interface NavigationLinkProps {
  href: string;
  active: boolean;
  children: string;
}

function NavigationLink({ href, active, children }: NavigationLinkProps) {
  return (
    <Link
      aria-current={active ? 'page' : undefined}
      className={`rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? 'bg-neutral-100 font-medium text-neutral-950'
          : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950'
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
