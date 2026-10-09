import { notFound } from 'next/navigation';

import { PublicProfile } from '@/components/profile/public-profile';
import { loadFollowState } from '@/src/composition/follows';
import { loadPublicProfile } from '@/src/composition/public-profile';

import type { Metadata } from 'next';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({
  params
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;

  const publicProfile = await loadPublicProfile(username);

  if (!publicProfile) {
    return {
      title: 'Profile not found'
    };
  }

  const { profile } = publicProfile;

  const description =
    profile.identity.bio.trim()
    || profile.identity.role.trim()
    || `View @${profile.username} on Forma.`;

  return {
    title: profile.identity.name,
    description
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const publicProfile = await loadPublicProfile(username);

  if (!publicProfile) {
    notFound();
  }

  const followState = await loadFollowState(publicProfile.userId);

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
