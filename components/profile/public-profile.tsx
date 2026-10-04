import { ProfileRenderer } from '@/components/profile/profile-renderer';
import { ShareProfileButton } from '@/components/profile/share-profile-button';

import type { Profile, ProfileAppearance, ProfilePalette } from '@/lib/profile';

interface PublicProfileProps {
  profile: Profile;
  followers: number;
  following: number;
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
  light: 'text-neutral-500',
  dark: 'text-neutral-400'
};

export function PublicProfile({
  profile,
  followers,
  following
}: PublicProfileProps) {
  const { design } = profile;

  return (
    <main
      className={`min-h-screen ${
        backgroundClasses[design.appearance][design.palette]
      }`}
    >
      <div className='mx-auto w-full max-w-3xl px-6 py-8'>
        <div className='mb-8 flex items-center justify-between'>
          <div
            className={`flex items-center gap-4 text-sm ${
              textClasses[design.appearance]
            }`}
          >
            <span>
              <strong className='font-medium'>{followers}</strong> followers
            </span>

            <span>
              <strong className='font-medium'>{following}</strong> following
            </span>
          </div>

          <ShareProfileButton
            appearance={design.appearance}
            username={profile.username}
          />
        </div>

        <ProfileRenderer profile={profile} />
      </div>
    </main>
  );
}
