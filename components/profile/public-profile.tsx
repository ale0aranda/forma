import { ProfileRenderer } from '@/components/profile/profile-renderer';

import type { Profile, ProfileAppearance, ProfilePalette } from '@/lib/profile';

interface PublicProfileProps {
  profile: Profile;
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

export function PublicProfile({ profile }: PublicProfileProps) {
  const { design } = profile;

  return (
    <main
      className={`min-h-screen ${
        backgroundClasses[design.appearance][design.palette]
      }`}
    >
      <div className='mx-auto w-full max-w-3xl px-6 py-16'>
        <ProfileRenderer profile={profile} />
      </div>
    </main>
  );
}
