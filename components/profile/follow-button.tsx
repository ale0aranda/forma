'use client';

import { useState, useTransition } from 'react';

import { followProfile, unfollowProfile } from '@/app/[username]/actions';

import type { ProfileAppearance } from '@/lib/profile';

interface FollowButtonProps {
  username: string;
  userId: string;
  following: boolean;
  authenticated: boolean;
  appearance: ProfileAppearance;
}

export function FollowButton({
  username,
  userId,
  following: initialFollowing,
  authenticated,
  appearance
}: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing);

  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  function handleFollow() {
    if (!authenticated) {
      window.location.href = '/login';

      return;
    }

    setError(undefined);

    startTransition(async () => {
      const result = following
        ? await unfollowProfile(username, userId)
        : await followProfile(username, userId);

      if (result.error) {
        setError(result.error);

        return;
      }

      setFollowing((current) => !current);
    });
  }

  const className =
    appearance === 'dark'
      ? following
        ? 'rounded-lg border border-white/10 px-4 py-2 text-neutral-300 text-sm transition-colors hover:bg-white/5 disabled:opacity-50'
        : 'rounded-lg bg-white px-4 py-2 font-medium text-neutral-950 text-sm transition-colors hover:bg-neutral-200 disabled:opacity-50'
      : following
        ? 'rounded-lg border border-neutral-200 px-4 py-2 text-neutral-600 text-sm transition-colors hover:bg-neutral-50 disabled:opacity-50'
        : 'rounded-lg bg-neutral-950 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-neutral-800 disabled:opacity-50';

  return (
    <div>
      <button
        className={className}
        disabled={pending}
        onClick={handleFollow}
        type='button'
      >
        {pending ? '...' : following ? 'Following' : 'Follow'}
      </button>

      {error && <p className='mt-2 text-red-500 text-xs'>{error}</p>}
    </div>
  );
}
