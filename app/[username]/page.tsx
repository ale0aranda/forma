import { notFound } from 'next/navigation';

import { PublicProfile } from '@/components/profile/public-profile';
import { getFollowState } from '@/lib/follows';
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

  const followState = await getFollowState(publicProfile.userId);

  return (
    <PublicProfile
      authenticated={followState.authenticated}
      followers={publicProfile.followers}
      following={publicProfile.following}
      followsProfile={followState.following}
      ownProfile={followState.ownProfile}
      profile={publicProfile.profile}
    />
  );
}
