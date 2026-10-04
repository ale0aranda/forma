import Link from 'next/link';

import type { Profile, ProfileAppearance } from '@/lib/profile';

interface ProfileConnection {
  username: string;
  profile: Profile;
}

interface ProfileConnectionListProps {
  connections: ProfileConnection[];
  appearance: ProfileAppearance;
}

const borderClasses: Record<ProfileAppearance, string> = {
  light: 'border-neutral-200',
  dark: 'border-white/10'
};

const nameClasses: Record<ProfileAppearance, string> = {
  light: 'text-neutral-950',
  dark: 'text-white'
};

const mutedClasses: Record<ProfileAppearance, string> = {
  light: 'text-neutral-500',
  dark: 'text-neutral-400'
};

const hoverClasses: Record<ProfileAppearance, string> = {
  light: 'hover:bg-neutral-50',
  dark: 'hover:bg-white/5'
};

export function ProfileConnectionList({
  connections,
  appearance
}: ProfileConnectionListProps) {
  if (connections.length === 0) {
    return (
      <p className={`text-sm ${mutedClasses[appearance]}`}>Nothing here yet.</p>
    );
  }

  return (
    <div className={`divide-y ${borderClasses[appearance]}`}>
      {connections.map(({ username, profile }) => (
        <Link
          className={`flex items-center gap-4 py-4 transition-colors ${
            hoverClasses[appearance]
          }`}
          href={`/${username}`}
          key={username}
        >
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-full border text-sm ${
              borderClasses[appearance]
            } ${nameClasses[appearance]}`}
          >
            {profile.identity.name.trim().charAt(0).toUpperCase()}
          </div>

          <div className='min-w-0'>
            <p
              className={`truncate font-medium text-sm ${
                nameClasses[appearance]
              }`}
            >
              {profile.identity.name}
            </p>

            <p className={`truncate text-sm ${mutedClasses[appearance]}`}>
              @{username}
              {profile.identity.role ? ` · ${profile.identity.role}` : ''}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
