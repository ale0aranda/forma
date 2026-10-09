import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { loadCurrentProfile } from '@/src/composition/current-profile';
import { loadProfileConnections } from '@/src/composition/profile-connections';
import { loadPublicProfile } from '@/src/composition/public-profile';
import { loadAuthenticationState } from '@/src/composition/session';
import { ProfileConnectionList } from '@/src/features/follows';
import { AppHeader } from '@/src/features/navigation/presentation/components/app-header';

import type { ProfileConnectionType } from '@/src/features/follows';

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

  const [publicProfile, connections, authenticated] = await Promise.all([
    loadPublicProfile(username),
    loadProfileConnections(username, connection),
    loadAuthenticationState()
  ]);

  if (!publicProfile) {
    notFound();
  }

  const currentProfile = authenticated ? await loadCurrentProfile() : undefined;

  const { profile } = publicProfile;

  const title = connection === 'followers' ? 'Followers' : 'Following';

  return (
    <main className='min-h-screen bg-white'>
      <AppHeader
        authenticated={authenticated}
        profile={currentProfile}
        search
      />

      <div className='mx-auto w-full max-w-4xl px-6 py-14 sm:py-16'>
        <Link
          className='inline-flex items-center gap-2 text-neutral-400 text-sm transition-colors hover:text-neutral-950'
          href={`/${username}`}
        >
          <ArrowLeft
            aria-hidden='true'
            size={15}
          />
          @{username}
        </Link>

        <header className='mt-10'>
          <h1 className='font-semibold text-4xl text-neutral-950 tracking-tight'>
            {title}
          </h1>

          <p className='mt-2 text-neutral-500'>{profile.identity.name}</p>

          <p className='mt-6 max-w-2xl text-neutral-400 text-sm leading-6'>
            {connection === 'following'
              ? `People ${profile.identity.name} follows will appear here.`
              : `People following ${profile.identity.name} will appear here.`}
          </p>
        </header>

        <div className='mt-10'>
          <ProfileConnectionList
            connections={connections}
            type={connection}
          />
        </div>
      </div>
    </main>
  );
}
