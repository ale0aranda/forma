import type {
  Profile,
  ProfileAppearance,
  ProfileBlock,
  ProfileBorders,
  ProfileDensity,
  ProfilePalette,
  ProfileRadius,
  ProfileTypography
} from '@/lib/profile';

interface ProfileRendererProps {
  profile: Profile;
}

const typographyClasses: Record<ProfileTypography, string> = {
  sans: 'font-profile-sans',
  arial: 'font-profile-arial',
  system: 'font-profile-system',
  serif: 'font-profile-serif',
  times: 'font-profile-times',
  mono: 'font-profile-mono'
};

const radiusClasses: Record<ProfileRadius, string> = {
  square: 'rounded-none',
  small: 'rounded-lg',
  rounded: 'rounded-2xl'
};

const cardPaddingClasses: Record<ProfileDensity, string> = {
  compact: 'p-5',
  balanced: 'p-6',
  airy: 'p-7'
};

const cardGapClasses: Record<ProfileDensity, string> = {
  compact: 'gap-3',
  balanced: 'gap-4',
  airy: 'gap-5'
};

const borderClasses: Record<ProfileBorders, string> = {
  none: 'border-transparent',
  subtle: 'border-current/10',
  strong: 'border-current/25'
};

const appearanceClasses: Record<
  ProfileAppearance,
  Record<ProfilePalette, string>
> = {
  light: {
    mono: 'bg-white text-neutral-950',
    paper: 'bg-stone-100 text-stone-900',
    forest: 'bg-emerald-50 text-emerald-950',
    blue: 'bg-sky-50 text-slate-950'
  },
  dark: {
    mono: 'bg-neutral-950 text-neutral-100',
    paper: 'bg-stone-900 text-stone-100',
    forest: 'bg-emerald-950 text-emerald-50',
    blue: 'bg-slate-950 text-sky-50'
  }
};

export function ProfileRenderer({ profile }: ProfileRendererProps) {
  const { design } = profile;

  const visible = (block: ProfileBlock) => profile.blocks[block].visible;

  const contentBlocks = profile.blockOrder.filter(
    (block) =>
      block !== 'identity'
      && block !== 'links'
      && block !== 'now'
      && visible(block)
  );

  return (
    <article
      className={`${typographyClasses[design.typography]} ${
        appearanceClasses[design.appearance][design.palette]
      }`}
    >
      {visible('identity') && (
        <IdentityHero
          profile={profile}
          showLinks={visible('links')}
        />
      )}

      {contentBlocks.length > 0 && (
        <div
          className={`mt-14 grid grid-cols-2 ${cardGapClasses[design.density]}`}
        >
          {contentBlocks.map((block) => (
            <ProfileCard
              block={block}
              key={block}
              profile={profile}
            />
          ))}
        </div>
      )}

      {visible('now') && (
        <div className='mt-10'>
          <NowBlock profile={profile} />
        </div>
      )}
    </article>
  );
}

interface IdentityHeroProps {
  profile: Profile;
  showLinks: boolean;
}

function IdentityHero({ profile, showLinks }: IdentityHeroProps) {
  return (
    <header className='mx-auto max-w-2xl py-8'>
      <div className='flex items-start gap-6'>
        <div className='flex size-20 shrink-0 items-center justify-center rounded-full border border-current/10 bg-current/5 font-medium text-xl'>
          {getInitials(profile.identity.name)}
        </div>

        <div className='min-w-0 pt-1'>
          <h1 className='font-semibold text-3xl tracking-tight'>
            {profile.identity.name || 'Your name'}
          </h1>

          <p className='mt-1 text-sm opacity-50'>
            {profile.identity.role || 'Your role'}
          </p>

          {profile.identity.bio && (
            <p className='mt-4 max-w-lg text-sm leading-6 opacity-70'>
              {profile.identity.bio}
            </p>
          )}

          {showLinks && profile.links.length > 0 && (
            <div className='mt-5 flex flex-wrap gap-x-4 gap-y-2'>
              {profile.links.map((link) =>
                link.url ? (
                  <a
                    className='text-sm opacity-50 transition-opacity hover:opacity-100'
                    href={link.url}
                    key={link.id}
                    rel='noreferrer'
                    target='_blank'
                  >
                    {link.label || 'Untitled'} ↗
                  </a>
                ) : (
                  <span
                    className='text-sm opacity-50'
                    key={link.id}
                  >
                    {link.label || 'Untitled'}
                  </span>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

interface ProfileCardProps {
  block: ProfileBlock;
  profile: Profile;
}

function ProfileCard({ block, profile }: ProfileCardProps) {
  const { design } = profile;

  const className = `border ${borderClasses[design.borders]} ${
    radiusClasses[design.radius]
  } ${cardPaddingClasses[design.density]}`;

  if (block === 'about') {
    return (
      <section className={className}>
        <SectionTitle>About</SectionTitle>
        <AboutBlock profile={profile} />
      </section>
    );
  }

  if (block === 'projects') {
    return (
      <section className={className}>
        <SectionTitle>Projects</SectionTitle>
        <ProjectsBlock profile={profile} />
      </section>
    );
  }

  if (block === 'experience') {
    return (
      <section className={className}>
        <SectionTitle>Experience</SectionTitle>
        <ExperienceBlock profile={profile} />
      </section>
    );
  }

  if (block === 'gallery') {
    return (
      <section className={className}>
        <SectionTitle>Gallery</SectionTitle>
        <GalleryBlock profile={profile} />
      </section>
    );
  }

  return null;
}

interface BlockProps {
  profile: Profile;
}

function AboutBlock({ profile }: BlockProps) {
  return (
    <p className='text-sm leading-6 opacity-65'>
      {profile.about || 'Nothing here yet.'}
    </p>
  );
}

function ProjectsBlock({ profile }: BlockProps) {
  if (profile.projects.length === 0) {
    return <EmptyState>No projects yet.</EmptyState>;
  }

  return (
    <div className='space-y-1'>
      {profile.projects.map((project) => {
        const content = (
          <>
            <div className='flex items-center justify-between gap-4'>
              <h3 className='font-medium text-sm'>
                {project.name || 'Untitled project'}
              </h3>

              {project.url && (
                <span className='shrink-0 text-xs opacity-40'>↗</span>
              )}
            </div>

            {project.description && (
              <p className='mt-1 text-xs leading-5 opacity-50'>
                {project.description}
              </p>
            )}
          </>
        );

        if (project.url) {
          return (
            <a
              className='block rounded-md px-2 py-3 transition-colors hover:bg-current/5'
              href={project.url}
              key={project.id}
              rel='noreferrer'
              target='_blank'
            >
              {content}
            </a>
          );
        }

        return (
          <div
            className='px-2 py-3'
            key={project.id}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}

function ExperienceBlock({ profile }: BlockProps) {
  if (profile.experience.length === 0) {
    return <EmptyState>No experience yet.</EmptyState>;
  }

  return (
    <div className='space-y-5'>
      {profile.experience.map((experience) => (
        <div
          className='relative border-current/10 border-l pl-4'
          key={experience.id}
        >
          <span className='absolute top-2 -left-1 size-2 rounded-full bg-current opacity-30' />

          <div className='flex items-start justify-between gap-4'>
            <div>
              <h3 className='font-medium text-sm'>
                {experience.role || 'Untitled role'}
              </h3>

              <p className='mt-1 text-xs opacity-50'>
                {experience.company || 'Company'}
              </p>
            </div>

            {experience.period && (
              <p className='shrink-0 text-xs opacity-40'>{experience.period}</p>
            )}
          </div>

          {experience.description && (
            <p className='mt-2 text-xs leading-5 opacity-50'>
              {experience.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function GalleryBlock({ profile }: BlockProps) {
  const { design } = profile;

  if (profile.gallery.length === 0) {
    return <EmptyState>No images yet.</EmptyState>;
  }

  return (
    <div className='grid grid-cols-3 gap-2'>
      {profile.gallery.map((item) => (
        <figure key={item.id}>
          {item.src ? (
            <picture>
              <source srcSet={item.src} />

              <img
                alt={item.alt}
                className={`aspect-square w-full object-cover ${
                  radiusClasses[design.radius]
                }`}
                loading='lazy'
                src={item.src}
              />
            </picture>
          ) : (
            <div
              className={`flex aspect-square items-center justify-center bg-current/5 text-xs opacity-50 ${
                radiusClasses[design.radius]
              }`}
            >
              Image
            </div>
          )}
        </figure>
      ))}
    </div>
  );
}

function NowBlock({ profile }: BlockProps) {
  return (
    <section className='flex items-baseline gap-4 border-current/10 border-t pt-5'>
      <p className='shrink-0 text-xs uppercase tracking-widest opacity-35'>
        Now
      </p>

      <p className='text-sm opacity-60'>{profile.now || 'Nothing here yet.'}</p>
    </section>
  );
}

interface SectionTitleProps {
  children: string;
}

function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className='mb-5 font-medium text-sm'>{children}</h2>;
}

interface EmptyStateProps {
  children: string;
}

function EmptyState({ children }: EmptyStateProps) {
  return <p className='text-sm opacity-35'>{children}</p>;
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
