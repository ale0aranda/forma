'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { followProfile, unfollowProfile } from '@/app/[username]/actions';

import type { ProfileAppearance } from '@/lib/profile';

interface FollowButtonProps {
  username: string;
  authenticated: boolean;
  following: boolean;
  appearance: ProfileAppearance;
}

export function FollowButton({
  username,
  authenticated,
  following: initialFollowing,
  appearance
}: FollowButtonProps) {
  const router = useRouter();

  const [following, setFollowing] = useState(initialFollowing);

  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!authenticated) {
      router.push('/login');

      return;
    }

    setError(undefined);

    startTransition(async () => {
      const result = following
        ? await unfollowProfile(username)
        : await followProfile(username);

      if (!result.success) {
        setError(result.error);

        return;
      }

      setFollowing((current) => !current);

      router.refresh();
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
        onClick={handleClick}
        type='button'
      >
        {pending ? '...' : following ? 'Following' : 'Follow'}
      </button>

      {error && <p className='mt-2 text-red-500 text-xs'>{error}</p>}
    </div>
  );
}
