import { notFound } from 'next/navigation';

import { ProfileRenderer } from '@/components/profile/profile-renderer';
import { getProfile } from '@/lib/profiles';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = getProfile(username);

  if (!profile) {
    notFound();
  }

  return (
    <main className='min-h-screen bg-neutral-50 px-6 py-16'>
      <div className='mx-auto w-full max-w-2xl'>
        <ProfileRenderer profile={profile} />
      </div>
    </main>
  );
}
