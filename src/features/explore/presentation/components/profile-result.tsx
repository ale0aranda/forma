import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import type { ProfileSearchResult } from '@/src/features/profile/application/ports/profile-search-repository';

interface ProfileResultProps {
  result: ProfileSearchResult;
}

export function ProfileResult({ result }: ProfileResultProps) {
  const { profile, username, followers } = result;

  const initials = getInitials(profile.identity.name);

  const description =
    profile.identity.bio.trim() || profile.identity.role.trim();

  return (
    <Link
      className='group flex items-center gap-5 border-neutral-200 border-b px-1 py-5 transition-colors last:border-b-0'
      href={`/${username}`}
    >
      <div className='flex min-w-0 flex-1 items-center gap-4'>
        <div className='flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 font-medium text-neutral-600 text-sm'>
          {profile.identity.avatar ? (
            <picture>
              <source srcSet={profile.identity.avatar} />

              <img
                alt=''
                className='size-12 object-cover'
                height={48}
                loading='lazy'
                src={profile.identity.avatar}
                width={48}
              />
            </picture>
          ) : (
            initials
          )}
        </div>

        <div className='w-44 shrink-0'>
          <p className='truncate font-medium text-neutral-950 text-sm'>
            {profile.identity.name}
          </p>

          <p className='mt-0.5 truncate text-neutral-400 text-sm'>
            @{username}
          </p>
        </div>

        <div className='hidden min-w-0 flex-1 sm:block'>
          {description ? (
            <p className='max-w-sm text-neutral-500 text-sm leading-5'>
              {description}
            </p>
          ) : (
            <p className='text-neutral-300 text-sm'>No bio yet.</p>
          )}
        </div>
      </div>

      <div className='flex shrink-0 items-center gap-6'>
        <span className='hidden text-neutral-400 text-xs md:block'>
          {formatFollowers(followers)}
        </span>

        <div className='flex size-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-all group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white'>
          <ArrowRight
            aria-hidden='true'
            className='transition-transform group-hover:translate-x-0.5'
            size={14}
          />
        </div>
      </div>
    </Link>
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

function formatFollowers(followers: number) {
  if (followers === 1) {
    return '1 follower';
  }

  if (followers < 1000) {
    return `${followers} followers`;
  }

  const formatted = new Intl.NumberFormat('en', {
    maximumFractionDigits: 1,
    notation: 'compact'
  }).format(followers);

  return `${formatted} followers`;
}
