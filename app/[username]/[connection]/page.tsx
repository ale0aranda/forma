import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProfileConnectionList } from '@/components/profile/profile-connection-list';
import { getProfileConnections } from '@/lib/profile-social-repository';
import { getPublicProfile } from '@/lib/public-profile-repository';

import type { ProfileConnectionType } from '@/lib/profile-social-repository';

interface ProfileConnectionsPageProps {
  params: Promise<{
    username: string;
    connection: string;
  }>;
}

function isConnectionType(value: string): value is ProfileConnectionType {
  return value === 'followers' || value === 'following';
}

export default async function ProfileConnectionsPage({
  params
}: ProfileConnectionsPageProps) {
  const { username, connection } = await params;

  if (!isConnectionType(connection)) {
    notFound();
  }

  const publicProfile = await getPublicProfile(username);

  if (!publicProfile) {
    notFound();
  }

  const connections = await getProfileConnections(username, connection);

  const { profile } = publicProfile;
  const appearance = profile.design.appearance;

  const backgroundClass = appearance === 'dark' ? 'bg-neutral-950' : 'bg-white';

  const headingClass =
    appearance === 'dark' ? 'text-white' : 'text-neutral-950';

  const mutedClass =
    appearance === 'dark' ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <main className={`min-h-screen ${backgroundClass}`}>
      <div className='mx-auto w-full max-w-xl px-6 py-12'>
        <Link
          className={`text-sm transition-colors hover:opacity-70 ${mutedClass}`}
          href={`/${username}`}
        >
          ← @{username}
        </Link>

        <div className='mb-8 mt-6'>
          <h1 className={`font-semibold text-xl ${headingClass}`}>
            {connection === 'followers' ? 'Followers' : 'Following'}
          </h1>

          <p className={`mt-1 text-sm ${mutedClass}`}>
            {profile.identity.name}
          </p>
        </div>

        <ProfileConnectionList
          appearance={appearance}
          connections={connections}
        />
      </div>
    </main>
  );
}
