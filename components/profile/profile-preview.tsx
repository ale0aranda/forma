import { ProfileRenderer } from '@/components/profile/profile-renderer';

import type { Profile, ProfileAppearance, ProfilePalette } from '@/lib/profile';

interface ProfilePreviewProps {
  profile: Profile;
}

const previewBackgroundClasses: Record<
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

export function ProfilePreview({ profile }: ProfilePreviewProps) {
  const { design } = profile;

  return (
    <section className='min-w-0 flex-1 overflow-auto bg-neutral-100 p-10'>
      <div className='mx-auto w-full max-w-3xl'>
        <div className='mb-3 flex items-center justify-between'>
          <p className='text-neutral-500 text-xs'>Preview</p>

          <p className='text-neutral-400 text-xs'>/{profile.username}</p>
        </div>

        <div
          className={`min-h-screen px-12 py-16 ${
            previewBackgroundClasses[design.appearance][design.palette]
          }`}
        >
          <div className='mx-auto max-w-xl'>
            <ProfileRenderer profile={profile} />
          </div>
        </div>
      </div>
    </section>
  );
}
