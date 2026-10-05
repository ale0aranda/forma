import { Monitor } from 'lucide-react';

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
    <section className='min-w-0 flex-1 overflow-auto bg-neutral-100'>
      <div className='sticky top-0 z-10 flex h-10 items-center justify-between border-neutral-200 border-b bg-neutral-100 px-4'>
        <div className='flex items-center gap-2 text-neutral-500'>
          <Monitor
            aria-hidden='true'
            size={13}
          />
          <span className='text-xs'>Preview</span>
        </div>

        <span className='text-neutral-400 text-xs'>/{profile.username}</span>
      </div>

      <div className='p-8'>
        <div className='mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm'>
          <div
            className={`min-h-screen px-10 py-12 ${
              previewBackgroundClasses[design.appearance][design.palette]
            }`}
          >
            <div className='mx-auto w-full max-w-3xl'>
              <ProfileRenderer profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
