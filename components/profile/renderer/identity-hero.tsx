import { ProfileLink } from '@/components/profile/profile-link';
import { radiusClasses } from '@/components/profile/renderer/styles';
import { getProfileLayouts } from '@/src/features/profile/domain/profile-defaults';

import type { ReactNode } from 'react';
import type {
  Profile,
  ProfileBlock
} from '@/src/features/profile/domain/profile';
import type { ProfileViewport } from './styles';

interface IdentityHeroProps {
  profile: Profile;
  showLinks: boolean;
  viewport: ProfileViewport;
  aside?: ReactNode;
  selectedBlock?: ProfileBlock | undefined;
  onSelectBlock?: ((block: ProfileBlock) => void) | undefined;
}

export function IdentityHero({
  profile,
  showLinks,
  viewport,
  aside,
  selectedBlock,
  onSelectBlock
}: IdentityHeroProps) {
  const { design } = profile;
  const layouts = getProfileLayouts(profile);
  const centered = layouts.identity === 'centered';

  const mobile = viewport === 'mobile';
  const fixedViewport = viewport !== 'responsive';

  const layoutClassName = fixedViewport
    ? mobile
      ? 'grid gap-8'
      : 'grid grid-cols-2 gap-12'
    : 'grid gap-8 md:grid-cols-2 md:gap-12';

  const leftIdentityLayoutClassName = fixedViewport
    ? mobile
      ? 'flex min-w-0 flex-col gap-4'
      : 'flex min-w-0 gap-6'
    : 'flex min-w-0 flex-col gap-4 sm:flex-row sm:gap-6';

  const identityLayoutClassName = centered
    ? 'flex min-w-0 flex-col items-center gap-4 text-center'
    : leftIdentityLayoutClassName;

  const avatarSizeClassName = fixedViewport
    ? mobile
      ? 'size-16'
      : 'size-24'
    : 'size-16 sm:size-24';

  const titleClassName = fixedViewport
    ? mobile
      ? 'text-3xl'
      : 'text-4xl'
    : 'text-3xl sm:text-4xl';

  const asideClassName = fixedViewport
    ? mobile
      ? 'relative z-20'
      : 'relative z-20 pl-12'
    : 'relative z-20 md:pl-12';

  return (
    <header
      className={`relative ${layoutClassName} ${
        onSelectBlock
          ? selectedBlock === 'identity'
            ? 'rounded-lg outline outline-neutral-300 outline-offset-4'
            : 'rounded-lg outline outline-transparent outline-offset-4 transition-colors hover:outline-neutral-200'
          : ''
      }`}
    >
      {onSelectBlock && (
        <button
          aria-label='Edit identity'
          className='absolute inset-0 z-10 cursor-pointer rounded-lg'
          onClick={() => onSelectBlock('identity')}
          type='button'
        />
      )}

      <div className={identityLayoutClassName}>
        <div
          className={`flex shrink-0 items-center justify-center overflow-hidden bg-current/5 font-medium text-lg ${avatarSizeClassName} ${
            radiusClasses[design.radius]
          }`}
        >
          {profile.identity.avatar ? (
            <picture>
              <source srcSet={profile.identity.avatar} />

              <img
                alt=''
                className='size-full object-cover'
                height={96}
                src={profile.identity.avatar}
                width={96}
              />
            </picture>
          ) : (
            getInitials(profile.identity.name)
          )}
        </div>

        <div className='min-w-0 flex-1'>
          <p className='text-sm opacity-40'>@{profile.username}</p>

          <h1
            className={`wrap-break-word mt-2 font-semibold tracking-tight ${titleClassName}`}
          >
            {profile.identity.name || 'Your name'}
          </h1>

          <p className='mt-2 text-sm opacity-50'>
            {profile.identity.role || 'Your role'}
          </p>

          {profile.identity.bio && (
            <p
              className={`wrap-break-word mt-6 max-w-lg text-base leading-7 opacity-70 sm:mt-7 ${
                centered ? 'mx-auto' : ''
              }`}
            >
              {profile.identity.bio}
            </p>
          )}

          {showLinks && profile.links.length > 0 && (
            <div
              className={`relative z-20 mt-6 flex flex-wrap items-center gap-2 sm:mt-7 ${
                centered ? 'justify-center' : ''
              }`}
            >
              {onSelectBlock && (
                <button
                  aria-label='Edit links'
                  className='absolute inset-0 cursor-pointer rounded-lg'
                  onClick={() => onSelectBlock('links')}
                  type='button'
                />
              )}

              {profile.links.map((link) => (
                <ProfileLink
                  key={link.id}
                  link={link}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {aside && <div className={asideClassName}>{aside}</div>}
    </header>
  );
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return '?';
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}
