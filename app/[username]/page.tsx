import { notFound } from 'next/navigation';

import { ProfileRenderer } from '@/components/profile/profile-renderer';
import { getProfile } from '@/lib/profiles';

import type { ProfileAppearance, ProfilePalette } from '@/lib/profile';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
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

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = getProfile(username);

  if (!profile) {
    notFound();
  }

  const { design } = profile;

  return (
    <main
      className={`min-h-screen px-6 py-20 ${
        pageBackgroundClasses[design.appearance][design.palette]
      }`}
    >
      <div className='mx-auto w-full max-w-xl'>
        <ProfileRenderer profile={profile} />
      </div>
    </main>
  );
}
