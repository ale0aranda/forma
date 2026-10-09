import { ArrowLeft, Pencil } from 'lucide-react';
import Link from 'next/link';

import { FollowButton } from '@/src/features/follows/presentation/components/follow-button';
import { ProfileRenderer } from '@/src/features/profile/presentation/components/profile-renderer';
import { ShareProfileButton } from '@/src/features/profile/presentation/components/share-profile-button';

import type {
  Profile,
  ProfileAppearance,
  ProfilePalette
} from '@/src/features/profile/domain/profile';

interface PublicProfileProps {
  profile: Profile;
  followers: number;
  following: number;
  followsProfile: boolean;
  authenticated: boolean;
  ownProfile: boolean;
}

const backgroundClasses: Record<
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

const textClasses: Record<ProfileAppearance, string> = {
  light: 'text-neutral-950',
  dark: 'text-white'
};

const mutedClasses: Record<ProfileAppearance, string> = {
  light: 'text-neutral-500',
  dark: 'text-neutral-400'
};

const hoverClasses: Record<ProfileAppearance, string> = {
  light: 'hover:text-neutral-950',
  dark: 'hover:text-white'
};

export function PublicProfile({
  profile,
  followers,
  following,
  followsProfile,
  authenticated,
  ownProfile
}: PublicProfileProps) {
  const { design } = profile;

  const heroAside = (
    <div className='flex w-full flex-col items-start md:items-end'>
      <div className='flex items-center gap-2 text-sm'>
        <Link
          className={`transition-colors ${
            mutedClasses[design.appearance]
          } ${hoverClasses[design.appearance]}`}
          href={`/${profile.username}/followers`}
        >
          <strong className={`font-medium ${textClasses[design.appearance]}`}>
            {followers}
          </strong>{' '}
          {followers === 1 ? 'follower' : 'followers'}
        </Link>

        <span
          aria-hidden='true'
          className={mutedClasses[design.appearance]}
        >
          ·
        </span>

        <Link
          className={`transition-colors ${
            mutedClasses[design.appearance]
          } ${hoverClasses[design.appearance]}`}
          href={`/${profile.username}/following`}
        >
          <strong className={`font-medium ${textClasses[design.appearance]}`}>
            {following}
          </strong>{' '}
          following
        </Link>
      </div>

      <div className='mt-5 flex items-center gap-2'>
        {ownProfile ? (
          <Link
            className={
              design.appearance === 'dark'
                ? 'flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-neutral-300 text-sm transition-colors hover:bg-white/5 hover:text-white'
                : 'flex h-9 items-center gap-2 rounded-lg border border-neutral-200 px-3 text-neutral-600 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950'
            }
            href='/editor'
          >
            <Pencil
              aria-hidden='true'
              size={14}
            />
            Edit
          </Link>
        ) : (
          <FollowButton
            appearance={design.appearance}
            authenticated={authenticated}
            following={followsProfile}
            username={profile.username}
          />
        )}

        <ShareProfileButton
          appearance={design.appearance}
          username={profile.username}
        />
      </div>
    </div>
  );

  return (
    <main
      className={`min-h-screen ${
        backgroundClasses[design.appearance][design.palette]
      }`}
    >
      <div className='mx-auto w-full max-w-5xl px-6 py-10 sm:py-12'>
        <Link
          className={`inline-flex items-center gap-2 text-sm transition-colors ${
            mutedClasses[design.appearance]
          } ${hoverClasses[design.appearance]}`}
          href='/explore'
        >
          <ArrowLeft
            aria-hidden='true'
            size={14}
          />
          Explore
        </Link>

        <div className='mt-16'>
          <ProfileRenderer
            heroAside={heroAside}
            profile={profile}
          />
        </div>
      </div>
    </main>
  );
}
