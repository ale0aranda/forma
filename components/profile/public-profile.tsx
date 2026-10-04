'use client';

import { useEffect, useState } from 'react';

import { ProfileRenderer } from '@/components/profile/profile-renderer';
import { getPublishedProfile } from '@/lib/profile-storage';

import type { Profile, ProfileAppearance, ProfilePalette } from '@/lib/profile';

interface PublicProfileProps {
  username: string;
  fallbackProfile?: Profile;
}

const pageBackgroundClasses: Record<
  ProfileAppearance,
  Record<ProfilePalette, string>
> = {
  light: {
    mono: 'bg-white',
    paper: 'bg-stone-100',
    forest: 'bg-emerald-50',
    blue: 'bg-sky-50'
  },
  dark: {
    mono: 'bg-neutral-950',
    paper: 'bg-stone-900',
    forest: 'bg-emerald-950',
    blue: 'bg-slate-950'
  }
};

export function PublicProfile({
  username,
  fallbackProfile
}: PublicProfileProps) {
  const [profile, setProfile] = useState<Profile | undefined>(fallbackProfile);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const publishedProfile = getPublishedProfile(username);

    setProfile(publishedProfile ?? fallbackProfile);

    setLoaded(true);
  }, [fallbackProfile, username]);

  if (!loaded) {
    return <main className='min-h-screen bg-white' />;
  }

  if (!profile) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-white px-6'>
        <div className='text-center'>
          <p className='font-medium'>Profile not found</p>

          <p className='mt-2 text-neutral-500 text-sm'>
            This profile hasn't been published.
          </p>
        </div>
      </main>
    );
  }

  const { design } = profile;

  return (
    <main
      className={`min-h-screen px-6 py-20 ${
        pageBackgroundClasses[design.appearance][design.palette]
      }`}
    >
      <div className='mx-auto w-full max-w-3xl'>
        <ProfileRenderer profile={profile} />
      </div>
    </main>
  );
}
