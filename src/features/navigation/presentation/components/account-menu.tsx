'use client';

import { ChevronDown, LogOut, Settings, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { logout } from '@/app/editor/actions';

import type { CurrentProfile } from '@/src/features/profile';

interface AccountMenuProps {
  profile: CurrentProfile;
}

export function AccountMenu({ profile }: AccountMenuProps) {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current
        && !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);

      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const initials = getInitials(profile.name);

  return (
    <div
      className='relative'
      ref={containerRef}
    >
      <button
        aria-expanded={open}
        aria-haspopup='menu'
        aria-label='Open account menu'
        className='flex h-9 items-center gap-2 rounded-lg px-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950'
        onClick={() => setOpen((current) => !current)}
        type='button'
      >
        <Avatar
          avatar={profile.avatar}
          initials={initials}
        />

        <ChevronDown
          aria-hidden='true'
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          size={14}
        />
      </button>

      {open && (
        <div
          className='absolute top-11 right-0 z-50 w-56 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg'
          role='menu'
        >
          <div className='px-2.5 py-2'>
            <p className='truncate font-medium text-neutral-950 text-sm'>
              {profile.name}
            </p>

            <p className='mt-0.5 truncate text-neutral-400 text-xs'>
              @{profile.username}
            </p>
          </div>

          <div className='my-1 border-neutral-100 border-t' />

          <Link
            className='flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-neutral-600 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
            href={`/${profile.username}`}
            onClick={() => setOpen(false)}
            role='menuitem'
          >
            <UserRound
              aria-hidden='true'
              size={15}
            />
            View profile
          </Link>

          <Link
            className='flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-neutral-600 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
            href='/settings'
            onClick={() => setOpen(false)}
            role='menuitem'
          >
            <Settings
              aria-hidden='true'
              size={15}
            />
            Settings
          </Link>

          <div className='my-1 border-neutral-100 border-t' />

          <form action={logout}>
            <button
              className='flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-neutral-600 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
              role='menuitem'
              type='submit'
            >
              <LogOut
                aria-hidden='true'
                size={15}
              />
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

interface AvatarProps {
  avatar?: string | undefined;
  initials: string;
}

function Avatar({ avatar, initials }: AvatarProps) {
  return (
    <span className='flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 font-medium text-neutral-600 text-xs'>
      {avatar ? (
        <picture>
          <source srcSet={avatar} />

          <img
            alt=''
            className='size-7 object-cover'
            height={28}
            src={avatar}
            width={28}
          />
        </picture>
      ) : (
        initials
      )}
    </span>
  );
}

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  return initials || '?';
}
