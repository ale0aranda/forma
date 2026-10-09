import {
  AboutBlock,
  ExperienceBlock,
  GalleryBlock,
  NowBlock,
  ProjectsBlock
} from '@/components/profile/renderer/profile-blocks';
import {
  borderClasses,
  cardPaddingClasses,
  radiusClasses
} from '@/components/profile/renderer/styles';

import type { ReactNode } from 'react';
import type {
  Profile,
  ProfileBlock
} from '@/src/features/profile/domain/profile';
import type { ProfileViewport } from './styles';

interface ProfileCardProps {
  block: ProfileBlock;
  profile: Profile;
  selected: boolean;
  viewport: ProfileViewport;
  onSelectBlock?: ((block: ProfileBlock) => void) | undefined;
}

export function ProfileCard({
  block,
  profile,
  selected,
  viewport,
  onSelectBlock
}: ProfileCardProps) {
  const { design } = profile;

  const className = `relative ${getSelectableCardClassName(
    Boolean(onSelectBlock),
    selected
  )} border ${borderClasses[design.borders]} ${
    radiusClasses[design.radius]
  } ${cardPaddingClasses[design.density]}`;

  let content: ReactNode = null;

  if (block === 'about') {
    content = (
      <>
        <SectionTitle>About</SectionTitle>

        <AboutBlock
          profile={profile}
          viewport={viewport}
        />
      </>
    );
  }

  if (block === 'projects') {
    content = (
      <>
        <SectionTitle>Projects</SectionTitle>

        <ProjectsBlock
          editing={Boolean(onSelectBlock)}
          profile={profile}
          viewport={viewport}
        />
      </>
    );
  }

  if (block === 'experience') {
    content = (
      <>
        <SectionTitle>Experience</SectionTitle>

        <ExperienceBlock
          profile={profile}
          viewport={viewport}
        />
      </>
    );
  }

  if (block === 'gallery') {
    content = (
      <>
        <SectionTitle>Gallery</SectionTitle>

        <GalleryBlock
          profile={profile}
          viewport={viewport}
        />
      </>
    );
  }

  if (block === 'now') {
    content = (
      <>
        <SectionTitle>Now</SectionTitle>

        <NowBlock
          profile={profile}
          viewport={viewport}
        />
      </>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <section className={className}>
      {onSelectBlock && (
        <button
          aria-label={`Edit ${block}`}
          className='absolute inset-0 z-10 cursor-pointer'
          onClick={() => onSelectBlock(block)}
          type='button'
        />
      )}

      {content}
    </section>
  );
}

interface SectionTitleProps {
  children: string;
}

function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className='mb-6 font-medium text-sm'>{children}</h2>;
}

function getSelectableCardClassName(editable: boolean, selected: boolean) {
  if (!editable) {
    return '';
  }

  if (selected) {
    return 'outline outline-1 outline-neutral-400 outline-offset-2';
  }

  return 'outline outline-1 outline-transparent outline-offset-2 transition-colors hover:outline-neutral-300';
}
