import { PublicProfile } from '@/components/profile/public-profile';
import { getProfile } from '@/lib/profiles';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const fallbackProfile = getProfile(username);

  if (!fallbackProfile) {
    return <PublicProfile username={username} />;
  }

  return (
    <PublicProfile
      fallbackProfile={fallbackProfile}
      username={username}
    />
  );
}
