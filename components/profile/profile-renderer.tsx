import { IdentityHero } from '@/components/profile/renderer/identity-hero';
import { ProfileCard } from '@/components/profile/renderer/profile-card';
import {
  appearanceClasses,
  cardGapClasses,
  type ProfileViewport,
  typographyClasses
} from '@/components/profile/renderer/styles';

import type { ReactNode } from 'react';
import type {
  Profile,
  ProfileBlock
} from '@/src/features/profile/domain/profile';

interface ProfileRendererProps {
  profile: Profile;
  heroAside?: ReactNode;
  selectedBlock?: ProfileBlock | undefined;
  onSelectBlock?: ((block: ProfileBlock) => void) | undefined;
  viewport?: ProfileViewport;
}

export function ProfileRenderer({
  profile,
  heroAside,
  selectedBlock,
  onSelectBlock,
  viewport = 'responsive'
}: ProfileRendererProps) {
  const { design } = profile;

  const visible = (block: ProfileBlock) => profile.blocks[block].visible;

  const contentBlocks = profile.blockOrder.filter(
    (block) => block !== 'identity' && block !== 'links' && visible(block)
  );

  const fixedViewport = viewport !== 'responsive';

  const contentLayoutClassName = fixedViewport
    ? viewport === 'mobile'
      ? 'grid grid-cols-1'
      : 'grid grid-cols-2'
    : 'grid grid-cols-1 sm:grid-cols-2';

  return (
    <article
      className={`${typographyClasses[design.typography]} ${
        appearanceClasses[design.appearance][design.palette]
      }`}
    >
      {visible('identity') && (
        <IdentityHero
          aside={heroAside}
          onSelectBlock={onSelectBlock}
          profile={profile}
          selectedBlock={selectedBlock}
          showLinks={visible('links')}
          viewport={viewport}
        />
      )}

      {contentBlocks.length > 0 && (
        <div
          className={`mt-10 sm:mt-16 ${contentLayoutClassName} ${
            cardGapClasses[design.density]
          }`}
        >
          {contentBlocks.map((block) => (
            <ProfileCard
              block={block}
              key={block}
              onSelectBlock={onSelectBlock}
              profile={profile}
              selected={selectedBlock === block}
              viewport={viewport}
            />
          ))}
        </div>
      )}
    </article>
  );
}
