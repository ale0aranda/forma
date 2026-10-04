import Link from 'next/link';

import type { ProfileSearchResult } from '@/lib/profile-search-repository';

interface ProfileResultProps {
  result: ProfileSearchResult;
}

export function ProfileResult({ result }: ProfileResultProps) {
  const { profile, username, followers } = result;

  const initial = profile.identity.name.trim().charAt(0).toUpperCase();

  return (
    <Link
      className='flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-neutral-100'
      href={`/${username}`}
    >
      <div className='flex size-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white font-medium text-neutral-700'>
        {initial}
      </div>

      <div className='min-w-0 flex-1'>
        <div className='flex items-center gap-2'>
          <p className='truncate font-medium text-neutral-950 text-sm'>
            {profile.identity.name}
          </p>

          <span className='shrink-0 text-neutral-400 text-sm'>@{username}</span>
        </div>

        {profile.identity.role && (
          <p className='mt-0.5 truncate text-neutral-500 text-sm'>
            {profile.identity.role}
          </p>
        )}
      </div>

      <span className='shrink-0 text-neutral-400 text-xs'>
        {followers} {followers === 1 ? 'follower' : 'followers'}
      </span>
    </Link>
  );
}
