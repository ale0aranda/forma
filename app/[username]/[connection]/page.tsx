import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AppHeader } from '@/components/app-header';
import { ProfileConnectionList } from '@/components/profile/profile-connection-list';
import { getCurrentProfile } from '@/lib/current-profile';
import {
  getProfileConnections,
  type ProfileConnectionType
} from '@/lib/profile-social-repository';
import { getPublicProfile } from '@/lib/public-profile-repository';
import { createClient } from '@/lib/supabase/server';

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

  const [publicProfile, connections, supabase] = await Promise.all([
    getPublicProfile(username),
    getProfileConnections(username, connection),
    createClient()
  ]);

  if (!publicProfile) {
    notFound();
  }

  const { data } = await supabase.auth.getUser();

  const authenticated = Boolean(data.user);

  const currentProfile = authenticated ? await getCurrentProfile() : undefined;

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
