import { notFound } from 'next/navigation';

import { PublicProfile } from '@/components/profile/public-profile';
import { getPublishedProfile } from '@/lib/public-profile-repository';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const profile = await getPublishedProfile(username);

  if (!profile) {
    notFound();
  }

  return <PublicProfile profile={profile} />;
}
