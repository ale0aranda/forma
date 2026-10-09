import { ArrowRight, UsersRound } from 'lucide-react';
import Link from 'next/link';

import type {
  ProfileConnection,
  ProfileConnectionType
} from '@/src/features/follows/application/ports/profile-connections-repository';

interface ProfileConnectionListProps {
  connections: ProfileConnection[];
  type: ProfileConnectionType;
}

export function ProfileConnectionList({
  connections,
  type
}: ProfileConnectionListProps) {
  if (connections.length === 0) {
    return <EmptyConnections type={type} />;
  }

  return (
    <div className='border-neutral-200 border-t'>
      {connections.map(({ username, profile }) => {
        const description =
          profile.identity.bio.trim() || profile.identity.role.trim();

        return (
          <Link
            className='group flex items-center gap-5 border-neutral-200 border-b px-1 py-5 transition-colors'
            href={`/${username}`}
            key={username}
          >
            <div className='flex min-w-0 flex-1 items-center gap-4'>
              <ProfileAvatar
                avatar={profile.identity.avatar}
                name={profile.identity.name}
              />

              <div className='w-44 shrink-0'>
                <p className='truncate font-medium text-neutral-950 text-sm'>
                  {profile.identity.name}
                </p>

                <p className='mt-0.5 truncate text-neutral-400 text-sm'>
                  @{username}
                </p>
              </div>

              <div className='hidden min-w-0 flex-1 sm:block'>
                {description ? (
                  <p className='max-w-sm text-neutral-500 text-sm leading-5'>
                    {description}
                  </p>
                ) : (
                  <p className='text-neutral-300 text-sm'>No bio yet.</p>
                )}
              </div>
            </div>

            <div className='flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-all group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white'>
              <ArrowRight
                aria-hidden='true'
                className='transition-transform group-hover:translate-x-0.5'
                size={14}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

interface EmptyConnectionsProps {
  type: ProfileConnectionType;
}

function EmptyConnections({ type }: EmptyConnectionsProps) {
  const following = type === 'following';

  return (
    <div className='flex flex-col items-center border-neutral-200 border-t px-6 py-20 text-center'>
      <div className='flex size-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500'>
        <UsersRound
          aria-hidden='true'
          size={20}
        />
      </div>

      <h2 className='mt-5 font-medium text-neutral-950'>
        {following ? 'No one here yet' : 'No followers yet'}
      </h2>

      <p className='mt-2 max-w-sm text-neutral-400 text-sm leading-6'>
        {following
          ? 'Discover people on Forma and follow profiles you want to find again.'
          : 'When people follow this profile, they’ll appear here.'}
      </p>

      {following && (
        <Link
          className='mt-6 rounded-lg bg-neutral-950 px-4 py-2.5 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
          href='/explore'
        >
          Explore people
        </Link>
      )}
    </div>
  );
}

interface ProfileAvatarProps {
  avatar?: string | undefined;
  name: string;
}

function ProfileAvatar({ avatar, name }: ProfileAvatarProps) {
  const initials = getInitials(name);

  return (
    <div className='flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 font-medium text-neutral-600 text-sm'>
      {avatar ? (
        <picture>
          <source srcSet={avatar} />

          <img
            alt=''
            className='size-12 object-cover'
            height={48}
            loading='lazy'
            src={avatar}
            width={48}
          />
        </picture>
      ) : (
        initials
      )}
    </div>
  );
}

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  return initials || '?';
}
