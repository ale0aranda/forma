import { notFound } from 'next/navigation';

import { PublicProfile } from '@/components/profile/public-profile';
import { getPublicProfile } from '@/lib/public-profile-repository';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const publicProfile = await getPublicProfile(username);

  if (!publicProfile) {
    notFound();
  }

  return (
    <PublicProfile
      followers={publicProfile.followers}
      following={publicProfile.following}
      profile={publicProfile.profile}
    />
  );
}
